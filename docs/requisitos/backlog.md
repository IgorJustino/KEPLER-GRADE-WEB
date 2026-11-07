# Backlog e critérios de aceite

## Épicos e histórias prioritárias

| ID | História de usuário | Prioridade | Requisitos |
|---|---|---|---|
| US-01 | Como estudante, quero escolher meu curso para ver informações compatíveis com meu currículo. | Must | RF-004, RF-010 |
| US-02 | Como estudante, quero registrar meu progresso para entender o que já concluí. | Must | RF-013, RF-014, RF-016 |
| US-03 | Como estudante, quero compreender um bloqueio para saber qual pré-requisito falta. | Must | RF-012, RF-015 |
| US-04 | Como estudante, quero pesquisar ofertas para encontrar turmas adequadas. | Must | RF-020, RF-021, RF-022 |
| US-05 | Como estudante, quero adicionar uma turma para compor minha grade. | Must | RF-023, RF-024 |
| US-06 | Como estudante, quero ser avisado sobre choques para corrigir minha grade. | Must | RF-025 |
| US-07 | Como estudante, quero rever minha grade depois para continuar o planejamento. | Must | RF-026, RF-027, RF-028 |
| US-08 | Como administrador, quero importar dados com relatório para manter o catálogo auditável. | Should | RF-030 a RF-033 |

## Critérios de aceite por jornada

### US-02 — Registrar progresso

```gherkin
Cenário: concluir uma disciplina
  Dado que o estudante abriu uma disciplina do seu currículo
  Quando marcar a disciplina como concluída
  Então o progresso deve ser recalculado
  E as visões derivadas devem refletir o mesmo estado
```

### US-06 — Detectar conflito

```gherkin
Cenário: adicionar uma oferta com choque de horário
  Dado que a grade possui uma oferta na terça-feira entre 10h e 12h
  Quando o estudante tentar adicionar outra oferta que intersecta esse período
  Então o sistema deve sinalizar o conflito
  E deve identificar as ofertas e o encontro envolvidos
```

### US-07 — Persistir a grade

```gherkin
Cenário: recuperar o planejamento
  Dado que o estudante salvou ofertas em sua grade
  Quando iniciar uma nova sessão
  Então as mesmas ofertas devem aparecer no plano ativo
```

## Definition of Done

Uma história está concluída quando:

- comportamento e critérios de aceite foram atendidos;
- estados de carregamento, vazio e erro foram considerados;
- tipos e autorização foram verificados;
- teste proporcional ao risco foi executado;
- acessibilidade básica foi revisada;
- documentação e rastreabilidade foram atualizadas;
- build e verificações automatizadas passam;
- logs e fixtures não contêm segredos ou dados pessoais.
