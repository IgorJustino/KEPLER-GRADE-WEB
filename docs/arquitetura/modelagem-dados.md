# Modelagem de dados

A modelagem segue a profundidade usada pelo **CHEF Indica**: visão conceitual, modelo lógico, decisões físicas e regras de integridade. No KEPLER, este é um **modelo alvo**. O protótipo ainda mantém dados em memória e deve migrar de forma incremental.

## Visão conceitual

```mermaid
erDiagram
    CURSO ||--o{ CURRICULO : possui
    CURRICULO ||--o{ DISCIPLINA_CURRICULO : organiza
    DISCIPLINA ||--o{ DISCIPLINA_CURRICULO : participa
    DISCIPLINA ||--o{ REQUISITO : exige
    PERIODO ||--o{ OFERTA : disponibiliza
    DISCIPLINA ||--o{ OFERTA : origina
    OFERTA ||--|{ ENCONTRO : ocorre
    USUARIO }o--|| CURSO : pertence
    USUARIO ||--o{ PROGRESSO : registra
    DISCIPLINA ||--o{ PROGRESSO : recebe
    USUARIO ||--o{ PLANO : cria
    PERIODO ||--o{ PLANO : contextualiza
    PLANO }o--o{ OFERTA : seleciona
```

O período recomendado no currículo representa a posição ideal da disciplina. O período real pertence ao progresso do estudante. Manter esses conceitos separados evita alterar o currículo para acomodar trajetórias individuais.

## Modelo lógico

```mermaid
erDiagram
    COURSES {
        uuid id PK
        text slug UK
        text name UK
        boolean active
    }
    PROFILES {
        uuid id PK
        text display_name
        uuid course_id FK
        timestamptz created_at
        timestamptz updated_at
    }
    SUBJECTS {
        uuid id PK
        text code UK
        text name
        integer credits
        integer workload_hours
        boolean active
    }
    CURRICULA {
        uuid id PK
        uuid course_id FK
        text name
        date effective_from
        date effective_to
        boolean active
    }
    CURRICULUM_SUBJECTS {
        uuid curriculum_id PK,FK
        uuid subject_id PK,FK
        integer recommended_semester
        text requirement_type
        integer credits_required_group
    }
    SUBJECT_REQUIREMENTS {
        uuid id PK
        uuid subject_id FK
        uuid required_subject_id FK
        text requirement_kind
        text group_key
        text rule_type
        text source_reference
        date valid_from
        date valid_to
    }
    ACADEMIC_TERMS {
        uuid id PK
        text code UK
        date starts_on
        date ends_on
        boolean active
    }
    CLASS_OFFERINGS {
        uuid id PK
        text legacy_id
        uuid term_id FK
        uuid subject_id FK
        text section
        text professor_name
        text status
        text source
    }
    CLASS_MEETINGS {
        uuid id PK
        uuid offering_id FK
        integer weekday
        time starts_at
        time ends_at
        text campus
        text room
        text raw_code
    }
    USER_SUBJECT_PROGRESS {
        uuid id PK
        uuid user_id FK
        uuid subject_id FK
        text status
        uuid actual_term_id FK
        integer failure_count
        timestamptz completed_at
        timestamptz updated_at
    }
    STUDY_PLANS {
        uuid id PK
        uuid user_id FK
        uuid term_id FK
        text name
        boolean active
    }
    STUDY_PLAN_OFFERINGS {
        uuid study_plan_id PK,FK
        uuid offering_id PK,FK
        timestamptz created_at
    }

    COURSES ||--o{ PROFILES : contextualiza
    COURSES ||--o{ CURRICULA : possui
    CURRICULA ||--o{ CURRICULUM_SUBJECTS : inclui
    SUBJECTS ||--o{ CURRICULUM_SUBJECTS : integra
    SUBJECTS ||--o{ SUBJECT_REQUIREMENTS : disciplina
    SUBJECTS ||--o{ SUBJECT_REQUIREMENTS : requerida
    ACADEMIC_TERMS ||--o{ CLASS_OFFERINGS : recebe
    SUBJECTS ||--o{ CLASS_OFFERINGS : oferece
    CLASS_OFFERINGS ||--|{ CLASS_MEETINGS : detalha
    PROFILES ||--o{ USER_SUBJECT_PROGRESS : mantém
    SUBJECTS ||--o{ USER_SUBJECT_PROGRESS : acompanha
    ACADEMIC_TERMS ||--o{ USER_SUBJECT_PROGRESS : realizado_em
    PROFILES ||--o{ STUDY_PLANS : cria
    ACADEMIC_TERMS ||--o{ STUDY_PLANS : planeja
    STUDY_PLANS ||--o{ STUDY_PLAN_OFFERINGS : contém
    CLASS_OFFERINGS ||--o{ STUDY_PLAN_OFFERINGS : selecionada
```

## Decisões do modelo físico

| Decisão | Regra |
|---|---|
| Identificadores | UUID para entidades persistentes; códigos acadêmicos continuam como chaves naturais únicas |
| Datas | `date` para vigência e `timestamptz` para auditoria |
| Horários | dia da semana entre 1 e 6; início menor que término |
| Exclusão | registros acadêmicos são inativados ou encerram vigência; dados pessoais seguem política própria |
| Multiplicidade | uma oferta possui um ou mais encontros; um plano não repete a mesma oferta |
| Histórico | fonte, referência e vigência são preservadas quando a regra pode mudar |
| Privacidade | tabelas pessoais filtram `user_id` pela identidade autenticada |

## Restrições essenciais

```sql
alter table class_meetings
  add constraint valid_weekday check (weekday between 1 and 6),
  add constraint valid_interval check (starts_at < ends_at);

alter table user_subject_progress
  add constraint unique_user_subject unique (user_id, subject_id);

alter table study_plan_offerings
  add constraint unique_plan_offering unique (study_plan_id, offering_id);

alter table class_offerings
  add constraint unique_term_subject_section
  unique (term_id, subject_id, section);
```

Conflitos de horário dependem de vários encontros e devem ser validados no domínio dentro da mesma transação da inclusão. Uma restrição simples de linha não cobre esse caso.

## Índices iniciais

```sql
create index idx_offerings_term_subject
  on class_offerings (term_id, subject_id);

create index idx_meetings_offering_weekday
  on class_meetings (offering_id, weekday, starts_at);

create index idx_progress_user_status
  on user_subject_progress (user_id, status);

create index idx_requirements_subject_validity
  on subject_requirements (subject_id, valid_from, valid_to);
```

Os índices devem ser confirmados por consultas reais e planos de execução. Índices adicionais sem evidência aumentam o custo de escrita e manutenção.

## Isolamento dos dados pessoais

```sql
alter table study_plans enable row level security;

create policy study_plans_by_owner
on study_plans
using (user_id = auth.uid())
with check (user_id = auth.uid());
```

A mesma política deve cobrir progresso e itens do plano, inclusive acessos feitos por junção. A API também valida a identidade; a política no banco atua como segunda barreira.

## Ordem de migração

1. curso, disciplina, período e currículo;
2. relações curriculares e requisitos;
3. ofertas e encontros;
4. perfil e progresso individual;
5. planos e ofertas selecionadas;
6. políticas de acesso, índices e dados de referência;
7. importação versionada e verificação de integridade.

## Critérios de validação

- o banco é criado a partir de zero somente com migrações versionadas;
- duas execuções da mesma importação produzem o mesmo resultado;
- requisitos inválidos ou circulares aparecem no relatório;
- dois usuários não conseguem consultar nem alterar dados um do outro;
- cada registro importado pode ser associado à fonte e à versão.
