# Rastreabilidade

Esta matriz conecta necessidades, requisitos, incrementos e evidências. O campo de evidência deve apontar para teste, demonstração ou registro de validação quando o item for entregue.

| Necessidade | Requisitos | História | Evidência planejada |
|---|---|---|---|
| N-01 Compreender o currículo | RF-010 a RF-012 | US-01, US-03 | Teste da navegação curricular |
| N-02 Acompanhar progresso real | RF-013 a RF-019 | US-02 | Testes de domínio e jornada E2E |
| N-03 Encontrar turmas | RF-020 a RF-022 | US-04 | Teste de filtros combinados |
| N-04 Evitar combinações inviáveis | RF-023 a RF-026 | US-05, US-06 | Testes de interseção e E2E |
| N-05 Manter o plano | RF-027 a RF-029 | US-07 | Teste de persistência entre sessões |
| N-06 Confiar nos dados | RF-030 a RF-033, RNF-012 | US-08 | Relatório de importação e metadados |
| N-07 Proteger informações pessoais | RF-006, RNF-002, RNF-003 | Transversal | Teste com usuários distintos |
| N-08 Usar em diferentes contextos | RNF-004 a RNF-007 | Transversal | Auditoria responsiva e acessível |

## Política de atualização

- requisito novo recebe identificador estável;
- requisito removido permanece no histórico como descontinuado;
- mudança de regra atualiza critério e evidência;
- toda entrega deve referenciar histórias ou requisitos afetados;
- validação com stakeholder registra data, participantes e resultado.
