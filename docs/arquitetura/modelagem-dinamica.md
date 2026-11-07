# Modelagem dinâmica

Os modelos dinâmicos descrevem como atores e componentes colaboram nos fluxos de maior risco. Eles servem como base para critérios de aceite e testes de integração.

## Atores e casos de uso

| Ator | Casos de uso principais |
|---|---|
| Estudante | consultar currículo, registrar progresso, avaliar elegibilidade e montar grade |
| Administrador de dados | importar, validar e publicar catálogo acadêmico |
| Provedor de identidade | autenticar e fornecer a identidade confiável |
| Pipeline de entrega | verificar código, publicar documentação e implantar versões aprovadas |

## Adicionar uma turma ao plano

```mermaid
sequenceDiagram
    actor E as Estudante
    participant UI as Interface
    participant API as API
    participant UC as Serviço de planejamento
    participant D as Regras de domínio
    participant DB as PostgreSQL

    E->>UI: solicita inclusão da turma
    UI->>API: POST /planos/{id}/ofertas
    API->>UC: adicionarOferta(usuario, plano, oferta)
    UC->>DB: carrega plano, progresso e encontros
    DB-->>UC: dados vigentes
    UC->>D: avalia elegibilidade e conflitos
    D-->>UC: decisão e justificativas
    alt inclusão permitida
        UC->>DB: grava item do plano
        DB-->>UC: confirmação
        UC-->>API: plano atualizado
        API-->>UI: 201 Created
    else requisito ou horário inválido
        UC-->>API: motivo estruturado
        API-->>UI: 409 Conflict
    end
    UI-->>E: apresenta resultado e explicação
```

O servidor repete as validações mesmo que a interface antecipe o resultado. A resposta deve indicar quais requisitos faltam ou quais encontros se sobrepõem.

## Importar dados acadêmicos

```mermaid
flowchart TD
    A[Receber arquivo e metadados] --> B[Identificar fonte e versão]
    B --> C[Converter para formato canônico]
    C --> D{Estrutura válida?}
    D -- Não --> R[Gerar relatório de rejeição]
    D -- Sim --> E[Validar referências e horários]
    E --> F{Há erros bloqueantes?}
    F -- Sim --> R
    F -- Não --> G[Comparar com versão vigente]
    G --> H[Gravar em transação]
    H --> I[Publicar versão e relatório]
```

Uma falha bloqueante encerra a transação. Avisos podem ser publicados no relatório sem ocultar a origem do dado.

## Estado de uma disciplina para o estudante

```mermaid
stateDiagram-v2
    [*] --> NaoCursada
    NaoCursada --> Planejada: adicionada a um plano
    Planejada --> Cursando: matrícula confirmada
    Cursando --> Aprovada: resultado aprovado
    Cursando --> Reprovada: resultado reprovado
    Reprovada --> Planejada: nova tentativa
    Reprovada --> Cursando: matrícula confirmada
    Aprovada --> [*]
```

Alterações manuais precisam registrar data, origem e usuário responsável. Uma disciplina aprovada só deve voltar a outro estado por uma operação explícita e auditável.

## Ciclo de um plano de estudos

```mermaid
stateDiagram-v2
    [*] --> Rascunho
    Rascunho --> Valido: sem conflitos bloqueantes
    Valido --> Rascunho: oferta ou progresso alterado
    Valido --> Arquivado: período encerrado
    Rascunho --> Arquivado: descartado pelo estudante
    Arquivado --> [*]
```

## Colaboração por responsabilidade

| Passo | Interface | Aplicação | Domínio | Dados |
|---|---|---|---|---|
| Consultar currículo | solicita e apresenta | seleciona versão vigente | calcula progresso | preserva relações e vigência |
| Avaliar disciplina | mostra justificativa | reúne contexto | decide elegibilidade | fornece requisitos e histórico |
| Montar grade | permite intenção | coordena alteração | detecta conflito | garante unicidade |
| Importar catálogo | mostra relatório | controla transação | valida regras canônicas | registra fonte e versão |

## Cobertura de testes sugerida

- teste unitário para interseção de horários e grupos `all_of`/`one_of`;
- teste de integração para gravação atômica do plano;
- teste com dois usuários para impedir leitura cruzada;
- teste de contrato para erros estruturados da API;
- teste de importação repetida para comprovar idempotência.
