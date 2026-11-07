# Metodologia de desenvolvimento

## Abordagem

O KEPLER adota desenvolvimento iterativo com descoberta contínua. Requisitos e implementação avançam no mesmo ciclo: problemas são investigados, convertidos em incrementos pequenos, construídos e validados antes da expansão do escopo.

## Fluxo de trabalho

| Etapa | Atividade | Saída |
|---|---|---|
| Descoberta | Analisar fontes, stakeholders e protótipos | Necessidade e hipótese |
| Refinamento | Modelar regra e escrever aceite | História pronta |
| Planejamento | Priorizar valor, risco e dependências | Backlog do incremento |
| Construção | Implementar uma fatia vertical | Software executável |
| Verificação | Testar regra, integração e interface | Evidência técnica |
| Validação | Demonstrar e observar uso | Aprendizado e decisão |

## Cadência sugerida

- ciclo semanal de planejamento e revisão;
- atualização contínua do backlog;
- demonstração ao final de cada incremento utilizável;
- retrospectiva curta para registrar problemas de processo;
- release quando a fatia vertical cumpre a Definition of Done.

## Estratégia de versionamento

- `main` representa o estado integrável;
- mudanças entram por branches curtas e pull requests;
- commits descrevem uma intenção verificável;
- tags identificam demonstrações e releases;
- documentação muda junto com o comportamento correspondente.

## Artefatos

- visão, cenário, escopo e personas;
- requisitos funcionais e não funcionais;
- backlog, critérios e matriz de rastreabilidade;
- arquitetura e registros de decisão;
- estratégia e evidências de testes;
- roadmap, revisões e lições aprendidas.
