# Requisitos não funcionais

| ID | Qualidade | Requisito | Evidência esperada |
|---|---|---|---|
| RNF-001 | Manutenibilidade | TypeScript estrito, sem `any` injustificado. | Typecheck na CI |
| RNF-002 | Segurança | Dados pessoais protegidos por política de acesso por linha. | Teste com dois usuários |
| RNF-003 | Segurança | Nenhum segredo no código ou em variáveis públicas. | Revisão e secret scanning |
| RNF-004 | Responsividade | Páginas principais utilizáveis a partir de 360 px. | Teste visual e E2E |
| RNF-005 | Acessibilidade | Foco visível e operação por teclado. | Auditoria manual |
| RNF-006 | Acessibilidade | Contraste compatível com WCAG AA. | Análise automatizada e manual |
| RNF-007 | Usabilidade | Erros claros, sem stack trace para o usuário. | Testes de erro |
| RNF-008 | Reprodutibilidade | Migrações criam o banco em ambiente vazio. | Pipeline de integração |
| RNF-009 | Confiabilidade | CI bloqueia merge quando verificações falham. | Proteção de branch |
| RNF-010 | Observabilidade | Ações críticas geram logs sem dados sensíveis. | Inspeção de logs |
| RNF-011 | Testabilidade | Conflito e elegibilidade têm testes unitários. | Relatório de testes |
| RNF-012 | Rastreabilidade | Catálogo registra fonte e atualização. | Metadados no banco |

## Prioridades de qualidade

1. **Correção:** decisões acadêmicas incorretas têm impacto direto no planejamento.
2. **Segurança e privacidade:** progresso e planos pertencem ao estudante.
3. **Usabilidade e acessibilidade:** o valor depende de tornar regras complexas compreensíveis.
4. **Manutenibilidade:** currículos e ofertas mudam e precisam ser versionados.
