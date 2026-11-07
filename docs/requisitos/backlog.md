# Backlog do produto

O backlog organiza as 27 histórias de usuário em ordem de valor, dependência e risco. A prioridade usa **MoSCoW**: Must, Should, Could e Won't no recorte atual.

## Backlog priorizado

| Ordem | ID | Resumo | Épico | Prioridade | Entrega |
|---:|---|---|---|---|---|
| 1 | US-01 | Criar conta | EP-01 | Must | E1 |
| 2 | US-02 | Entrar e sair | EP-01 | Must | E1 |
| 3 | US-04 | Escolher curso e editar perfil | EP-01 | Must | E1 |
| 4 | US-05 | Proteger dados pessoais | EP-01 | Must | E1 |
| 5 | US-06 | Visualizar currículo | EP-02 | Must | E2 |
| 6 | US-07 | Consultar requisitos | EP-02 | Must | E2 |
| 7 | US-08 | Atualizar estado da disciplina | EP-03 | Must | E2 |
| 8 | US-09 | Acompanhar progresso | EP-03 | Must | E2 |
| 9 | US-10 | Entender elegibilidade | EP-03 | Must | E2 |
| 10 | US-14 | Consultar ofertas do período | EP-04 | Must | E3 |
| 11 | US-15 | Filtrar ofertas | EP-04 | Must | E3 |
| 12 | US-16 | Consultar encontros da turma | EP-04 | Must | E3 |
| 13 | US-17 | Adicionar turma à grade | EP-05 | Must | E4 |
| 14 | US-18 | Evitar oferta duplicada | EP-05 | Must | E4 |
| 15 | US-19 | Identificar conflito | EP-05 | Must | E4 |
| 16 | US-20 | Remover turma | EP-05 | Must | E4 |
| 17 | US-21 | Recuperar grade salva | EP-05 | Must | E4 |
| 18 | US-22 | Visualizar semana | EP-05 | Must | E4 |
| 19 | US-03 | Recuperar acesso | EP-01 | Should | E1 |
| 20 | US-11 | Registrar semestre real | EP-03 | Should | E2 |
| 21 | US-12 | Registrar tentativas | EP-03 | Should | E2 |
| 22 | US-13 | Alternar visões de progresso | EP-03 | Should | E2 |
| 23 | US-23 | Ver carga selecionada | EP-05 | Should | E4 |
| 24 | US-24 | Importar catálogo versionado | EP-06 | Should | E3 |
| 25 | US-25 | Validar dados importados | EP-06 | Should | E3 |
| 26 | US-26 | Consultar relatório de importação | EP-06 | Should | E3 |
| 27 | US-27 | Rastrear origem e vigência | EP-06 | Should | E3 |

## Entregas incrementais

| Entrega | Objetivo demonstrável | Histórias |
|---|---|---|
| E0 — Fundação | Ambiente, CI, documentação e decisões iniciais | HT-01, HT-05 |
| E1 — Identidade | Estudante acessa uma área privada vinculada ao curso | US-01 a US-05, HT-02 |
| E2 — Progresso | Estudante compreende currículo, progresso e elegibilidade | US-06 a US-13, HT-03 |
| E3 — Ofertas | Catálogo versionado pode ser consultado e filtrado | US-14 a US-16, US-24 a US-27 |
| E4 — Planejamento | Estudante monta, corrige e recupera sua grade | US-17 a US-23, HT-04 |
| E5 — Consolidação | Jornada responsiva, acessível, testada e documentada | Todas |

## Histórias técnicas

| ID | História técnica | RNFs | Prioridade |
|---|---|---|---|
| HT-01 | Configurar typecheck, lint, testes e build como gates da CI. | RNF-001, RNF-009 | Must |
| HT-02 | Aplicar autenticação, autorização e gestão segura de segredos. | RNF-002, RNF-003, RNF-010 | Must |
| HT-03 | Cobrir elegibilidade e progresso com testes de domínio. | RNF-011 | Must |
| HT-04 | Cobrir conflitos de horário com testes unitários e E2E. | RNF-011 | Must |
| HT-05 | Tornar migrações e catálogo reproduzíveis e rastreáveis. | RNF-008, RNF-012 | Must |
| HT-06 | Validar interface em 360 px, teclado, contraste e erros. | RNF-004, RNF-005, RNF-006, RNF-007 | Must |

## Políticas do backlog

- uma história só entra em desenvolvimento quando cumpre a Definition of Ready;
- prioridade pode mudar após validação, com justificativa registrada;
- histórias não concluídas retornam ao backlog sem ocultar trabalho restante;
- a evidência de conclusão deve aparecer na [matriz de rastreabilidade](rastreabilidade.md);
- o texto e os critérios detalhados ficam no [catálogo de histórias](historias-usuario.md).
