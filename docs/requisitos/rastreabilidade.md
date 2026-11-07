# Rastreabilidade

A matriz conecta necessidade, épico, requisito, história e evidência planejada. A evidência deve receber um link para teste, demonstração ou registro de validação quando a história for entregue.

## Requisitos funcionais

| Necessidade | Épico | Requisitos | Histórias | Evidência planejada |
|---|---|---|---|---|
| N-01 Manter identidade | EP-01 | RF-001 | US-01 | E2E de cadastro |
| N-01 Manter identidade | EP-01 | RF-002 | US-02 | E2E de login e logout |
| N-01 Manter identidade | EP-01 | RF-003 | US-03 | Integração de recuperação |
| N-02 Contextualizar experiência | EP-01 | RF-004, RF-005 | US-04 | E2E de onboarding e perfil |
| N-03 Preservar privacidade | EP-01 | RF-006 | US-05 | Teste com dois usuários |
| N-04 Compreender currículo | EP-02 | RF-010, RF-011 | US-06 | Teste da visão curricular |
| N-04 Compreender currículo | EP-02 | RF-012 | US-07 | Teste de relações curriculares |
| N-05 Representar trajetória | EP-03 | RF-013, RF-016 | US-08 | Integração do estado pessoal |
| N-05 Representar trajetória | EP-03 | RF-014 | US-09 | Teste de cálculo de progresso |
| N-06 Decidir elegibilidade | EP-03 | RF-015 | US-10 | Testes de domínio e E2E |
| N-05 Representar trajetória | EP-03 | RF-017 | US-11 | Teste de período real |
| N-05 Representar trajetória | EP-03 | RF-018 | US-12 | Teste de tentativas |
| N-05 Representar trajetória | EP-03 | RF-019 | US-13 | Teste das visões derivadas |
| N-07 Encontrar turmas | EP-04 | RF-020 | US-14 | Integração de período letivo |
| N-07 Encontrar turmas | EP-04 | RF-021 | US-15 | Teste de filtros combinados |
| N-07 Encontrar turmas | EP-04 | RF-022 | US-16 | Teste de encontros múltiplos |
| N-08 Montar plano | EP-05 | RF-023 | US-17 | E2E de adição |
| N-08 Montar plano | EP-05 | RF-024 | US-18 | Restrição única e E2E |
| N-09 Evitar incompatibilidades | EP-05 | RF-025 | US-19 | Unidade de interseção e E2E |
| N-08 Montar plano | EP-05 | RF-026 | US-20 | E2E de remoção |
| N-10 Manter plano | EP-05 | RF-027 | US-21 | E2E entre sessões |
| N-08 Montar plano | EP-05 | RF-028 | US-22 | Teste responsivo da grade |
| N-08 Montar plano | EP-05 | RF-029 | US-23 | Teste de carga total |
| N-11 Confiar nos dados | EP-06 | RF-030 | US-24 | Integração idempotente |
| N-11 Confiar nos dados | EP-06 | RF-031 | US-25 | Fixtures inválidas controladas |
| N-11 Confiar nos dados | EP-06 | RF-032 | US-26 | Snapshot do relatório |
| N-11 Confiar nos dados | EP-06 | RF-033 | US-27 | Teste de versionamento e vigência |

## Requisitos não funcionais

| Requisitos | Item técnico | Aplicação | Evidência planejada |
|---|---|---|---|
| RNF-001, RNF-009 | HT-01 | Código e integração contínua | Typecheck, lint, testes e build na CI |
| RNF-002, RNF-003, RNF-010 | HT-02 | Identidade e operações pessoais | RLS, teste de autorização e inspeção de logs |
| RNF-011 | HT-03 | Elegibilidade e progresso | Relatório de testes de domínio |
| RNF-011 | HT-04 | Grade e conflitos | Unidade e E2E da jornada |
| RNF-008, RNF-012 | HT-05 | Banco e catálogo | Migração vazia e metadados da fonte |
| RNF-004, RNF-005, RNF-006, RNF-007 | HT-06 | Todas as interfaces | Auditoria em 360 px, teclado, contraste e erros |

## Rastreabilidade arquitetural

| Decisão ou risco | Requisitos relacionados | Artefato | Evidência de conclusão |
|---|---|---|---|
| Isolamento por usuário | RF-006, RNF-002 | Modelagem de dados e arquitetura | teste com duas identidades |
| Explicação de elegibilidade | RF-015, RNF-007, RNF-011 | Modelagem dinâmica e NFR Framework | testes de domínio e contrato da API |
| Conflito de horários | RF-025, RNF-011 | Modelagem dinâmica e padrões | unidade de intervalo e jornada E2E |
| Persistência reproduzível | RF-027, RNF-008 | Modelagem de dados e CI/CD | banco vazio criado pela pipeline |
| Fonte e vigência do catálogo | RF-030 a RF-033, RNF-012 | Modelagem de dados | relatório idempotente de importação |
| Interface responsiva e acessível | RNF-004 a RNF-006 | Especificação Suplementar | auditoria automatizada e manual |
| Entrega protegida | RNF-003, RNF-009, RNF-010 | CI/CD | execução ligada ao commit da release |

## Cobertura

- **30 de 30 requisitos funcionais** possuem história e evidência planejada;
- **12 de 12 requisitos não funcionais** estão ligados a histórias técnicas e artefatos de verificação;
- **7 épicos** cobrem identidade, currículo, progresso, ofertas, grade, dados e qualidade.

## Política de atualização

- requisito novo recebe identificador estável;
- requisito removido permanece no histórico como descontinuado;
- mudança de regra atualiza história, critérios e evidência;
- entrega referencia os IDs afetados no pull request;
- validação com stakeholder registra data, participantes e resultado.
