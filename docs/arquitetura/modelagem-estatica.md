# Modelagem estática

Esta página apresenta a estrutura lógica do KEPLER. Os diagramas separam o **protótipo atual**, observado no código, da **arquitetura alvo**, definida para orientar a evolução do produto.

## Situação dos artefatos

| Artefato | Situação | Fonte |
|---|---|---|
| Componentes do protótipo | Implementado | `frontend/` e `backend/main.py` |
| Pacotes de domínio | Planejado | Blueprint e requisitos |
| Modelo de classes de domínio | Proposto | Regras acadêmicas documentadas |
| Implantação com banco e autenticação | Proposta | Cenários de qualidade |

## Componentes atuais

```mermaid
flowchart LR
    E[Estudante] --> SPA[Aplicação React]
    SPA --> API[API FastAPI]
    API --> MEM[(Estado em memória)]
```

O protótipo valida a navegação, o catálogo, a visualização de disciplinas e a montagem da grade. O estado global no backend permite demonstrações, mas não oferece persistência por usuário, isolamento nem versionamento.

## Pacotes da arquitetura alvo

```mermaid
flowchart TB
    UI[Interface Web] --> CLIENT[Cliente de API]
    CLIENT --> APP[Serviços de aplicação]
    APP --> DOMAIN[Domínio acadêmico]
    APP --> PORTS[Portas de persistência]
    PORTS --> REPOS[Repositórios PostgreSQL]
    APP --> AUTH[Autenticação e autorização]
    IMPORT[Importadores por fonte] --> APP

    subgraph DOMAIN[Domínio acadêmico]
        EL[Elegibilidade]
        CF[Conflitos de horário]
        PG[Progresso curricular]
        PL[Planejamento]
    end
```

As regras de domínio não devem depender de componentes React, FastAPI ou SQL. Essa separação permite testar decisões acadêmicas com entradas controladas e reutilizá-las na interface e no servidor.

## Classes de domínio

```mermaid
classDiagram
    class Course {
      +UUID id
      +string slug
      +string name
    }
    class Curriculum {
      +UUID id
      +string name
      +date effectiveFrom
      +date effectiveTo
    }
    class Subject {
      +UUID id
      +string code
      +string name
      +int credits
    }
    class CurriculumSubject {
      +int recommendedSemester
      +RequirementType type
    }
    class SubjectRequirement {
      +RequirementKind kind
      +RuleType rule
      +string groupKey
    }
    class AcademicTerm {
      +UUID id
      +string code
    }
    class ClassOffering {
      +UUID id
      +string section
      +string professorName
    }
    class ClassMeeting {
      +int weekday
      +time startsAt
      +time endsAt
      +string room
    }
    class Profile {
      +UUID id
      +string displayName
    }
    class UserSubjectProgress {
      +ProgressStatus status
      +int failureCount
    }
    class StudyPlan {
      +UUID id
      +string name
      +bool active
    }

    Course "1" --> "many" Curriculum
    Curriculum "1" --> "many" CurriculumSubject
    Subject "1" --> "many" CurriculumSubject
    Subject "1" --> "many" SubjectRequirement : disciplina
    SubjectRequirement "many" --> "1" Subject : requisito
    AcademicTerm "1" --> "many" ClassOffering
    Subject "1" --> "many" ClassOffering
    ClassOffering "1" --> "many" ClassMeeting
    Profile "many" --> "1" Course
    Profile "1" --> "many" UserSubjectProgress
    Subject "1" --> "many" UserSubjectProgress
    Profile "1" --> "many" StudyPlan
    StudyPlan "many" --> "1" AcademicTerm
    StudyPlan "many" --> "many" ClassOffering
```

## Implantação alvo

```mermaid
flowchart LR
    B[Navegador] --> CDN[Hospedagem do frontend]
    CDN --> API[Serviço FastAPI]
    API --> AUTH[Provedor de identidade]
    API --> DB[(PostgreSQL)]
    JOB[Importador versionado] --> API
    GHA[GitHub Actions] --> CDN
    GHA --> API
```

## Responsabilidades e dependências

| Camada | Responsabilidade | Não deve conhecer |
|---|---|---|
| Interface | interação, estados visuais e acessibilidade | SQL e credenciais |
| Aplicação | casos de uso e coordenação transacional | detalhes de componentes visuais |
| Domínio | elegibilidade, conflito e progresso | framework web e banco |
| Infraestrutura | API, repositórios, autenticação e importação | decisões de apresentação |
| Dados | integridade, vigência, histórico e isolamento | navegação da interface |

## Evolução necessária

1. extrair o cliente HTTP e os tipos compartilhados do componente principal;
2. mover conflito, elegibilidade e progresso para módulos puros;
3. criar serviços de aplicação para os casos de uso;
4. substituir o estado global por repositórios persistentes;
5. introduzir identidade, autorização e políticas por usuário;
6. versionar importações, currículo e ofertas.
