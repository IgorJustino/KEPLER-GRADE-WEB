# Histórias de usuário

Cada história descreve valor para um ator e possui critérios observáveis. **Must** compõe o núcleo do MVP; **Should** amplia a jornada sem esconder dependências essenciais.

## EP-01 — Identidade e perfil

### US-01 — Criar conta

> Como estudante, quero criar uma conta com e-mail e senha para manter meu progresso e meus planos.

**Prioridade:** Must · **Requisito:** RF-001 · **Dependência:** nenhuma

**Critérios de aceite:**

- e-mail válido e senha conforme a política criam a conta;
- e-mail já cadastrado produz mensagem clara sem revelar dados sensíveis;
- campos inválidos são identificados antes do envio;
- após a confirmação aplicável, o usuário pode seguir para o onboarding.

### US-02 — Entrar e sair

> Como estudante cadastrado, quero iniciar e encerrar uma sessão para acessar meus dados com segurança.

**Prioridade:** Must · **Requisito:** RF-002 · **Dependência:** US-01

**Critérios de aceite:**

- credenciais válidas iniciam uma sessão;
- credenciais inválidas geram erro claro e genérico;
- sair encerra a sessão e impede acesso às rotas privadas;
- atualizar uma página privada mantém uma sessão ainda válida.

### US-03 — Recuperar acesso

> Como estudante, quero recuperar o acesso por e-mail para voltar a usar minha conta se esquecer a senha.

**Prioridade:** Should · **Requisito:** RF-003 · **Dependência:** US-01

**Critérios de aceite:**

- o formulário aceita um e-mail válido;
- a resposta não confirma se o endereço está cadastrado;
- um token válido permite definir nova senha;
- token inválido ou expirado apresenta opção de novo envio.

### US-04 — Escolher curso e editar perfil

> Como estudante, quero informar meu nome e curso para receber currículo e ofertas compatíveis.

**Prioridade:** Must · **Requisitos:** RF-004, RF-005 · **Dependência:** US-02

**Critérios de aceite:**

- o onboarding lista somente cursos suportados;
- salvar associa o curso ao perfil autenticado;
- nome e curso podem ser editados depois;
- mudar o curso solicita confirmação e atualiza as visões curriculares.

### US-05 — Proteger meus dados

> Como estudante, quero que apenas eu acesse meu progresso e minha grade para preservar minha privacidade.

**Prioridade:** Must · **Requisito:** RF-006 · **Dependência:** US-02

**Critérios de aceite:**

- uma requisição autenticada acessa apenas registros do próprio usuário;
- identificadores de outro usuário não contornam a autorização;
- usuário anônimo não acessa dados pessoais;
- a restrição é verificada no servidor e na persistência.

## EP-02 — Currículo compreensível

### US-06 — Visualizar currículo

> Como estudante, quero visualizar as disciplinas por semestre recomendado para compreender a estrutura do curso.

**Prioridade:** Must · **Requisitos:** RF-010, RF-011 · **Dependência:** US-04

**Critérios de aceite:**

- são exibidas apenas disciplinas do currículo e da vigência selecionados;
- disciplinas são agrupadas pelo semestre recomendado;
- cada item mostra código, nome, carga ou créditos e tipo;
- ausência de dados apresenta fonte, vigência e estado vazio claro.

### US-07 — Consultar requisitos e dependências

> Como estudante, quero ver pré-requisitos e dependências para entender a sequência entre disciplinas.

**Prioridade:** Must · **Requisito:** RF-012 · **Dependência:** US-06

**Critérios de aceite:**

- os detalhes listam pré-requisitos, correquisitos e dependentes existentes;
- relações usam código e nome da disciplina;
- disciplina sem relações apresenta essa condição explicitamente;
- relações pertencem à mesma versão curricular exibida.

## EP-03 — Progresso e elegibilidade

### US-08 — Atualizar estado da disciplina

> Como estudante, quero marcar uma disciplina como não iniciada, em curso ou concluída para representar meu progresso real.

**Prioridade:** Must · **Requisitos:** RF-013, RF-016 · **Dependência:** US-06

**Critérios de aceite:**

- o estado pode ser alterado entre as três opções permitidas;
- marcar e desmarcar conclusão atualiza a mesma fonte de progresso;
- a mudança persiste para o usuário autenticado;
- falha ao salvar mantém o estado anterior e informa o problema.

### US-09 — Acompanhar progresso

> Como estudante, quero ver percentual e créditos concluídos para acompanhar quanto avancei no currículo.

**Prioridade:** Must · **Requisito:** RF-014 · **Dependência:** US-08

**Critérios de aceite:**

- o percentual considera o conjunto curricular aplicável;
- créditos ou carga concluída são somados sem duplicidade;
- alterar uma disciplina atualiza os indicadores;
- a interface explica a base usada no cálculo.

### US-10 — Entender elegibilidade

> Como estudante, quero saber se uma disciplina está elegível e por quê para decidir o que posso cursar.

**Prioridade:** Must · **Requisito:** RF-015 · **Dependências:** US-07, US-08

**Critérios de aceite:**

- todos os pré-requisitos obrigatórios concluídos tornam a disciplina elegível;
- requisito pendente identifica cada disciplina que bloqueia a elegibilidade;
- correquisito considera conclusão ou seleção simultânea conforme a regra vigente;
- ausência de dados suficientes não é exibida como aprovação.

### US-11 — Registrar semestre real

> Como estudante, quero registrar quando cursei uma disciplina para distinguir minha trajetória do fluxo recomendado.

**Prioridade:** Should · **Requisito:** RF-017 · **Dependência:** US-08

**Critérios de aceite:**

- semestre real aceita um período acadêmico válido;
- semestre recomendado permanece inalterado;
- o registro pertence somente ao usuário;
- limpar o período real não altera a definição curricular.

### US-12 — Registrar tentativas e reprovações

> Como estudante, quero registrar tentativas para acompanhar disciplinas que exigem atenção.

**Prioridade:** Should · **Requisito:** RF-018 · **Dependência:** US-08

**Critérios de aceite:**

- o total de tentativas aceita apenas inteiro não negativo;
- reprovações não alteram nome, créditos ou requisitos oficiais;
- a informação fica restrita ao usuário;
- inconsistências entre estado e tentativas são sinalizadas.

### US-13 — Alternar visões de progresso

> Como estudante, quero filtrar meu progresso por situação para localizar rapidamente disciplinas relevantes.

**Prioridade:** Should · **Requisito:** RF-019 · **Dependência:** US-08

**Critérios de aceite:**

- há visões para concluídas, pendentes, cursando, elegíveis e com reprovação;
- todas derivam da mesma fonte de progresso;
- contadores correspondem aos itens exibidos;
- uma visão sem resultados apresenta estado vazio contextual.

## EP-04 — Descoberta de ofertas

### US-14 — Consultar ofertas do período

> Como estudante, quero listar ofertas de um período letivo para saber quais turmas estão disponíveis.

**Prioridade:** Must · **Requisito:** RF-020 · **Dependência:** US-04

**Critérios de aceite:**

- o período ativo fica visível e pode ser identificado sem ambiguidade;
- apenas ofertas pertencentes ao período selecionado são listadas;
- cada oferta identifica disciplina e turma;
- período sem oferta apresenta estado vazio e fonte dos dados.

### US-15 — Filtrar ofertas

> Como estudante, quero combinar filtros para encontrar turmas compatíveis com minhas preferências.

**Prioridade:** Must · **Requisito:** RF-021 · **Dependência:** US-14

**Critérios de aceite:**

- busca considera código e nome da disciplina;
- curso, professor, dia e bloco podem ser combinados;
- remover um filtro recalcula o resultado sem apagar os demais;
- a interface mostra filtros ativos e quantidade encontrada.

### US-16 — Consultar encontros da turma

> Como estudante, quero ver todos os encontros semanais de uma turma para avaliar seu horário completo.

**Prioridade:** Must · **Requisito:** RF-022 · **Dependência:** US-14

**Critérios de aceite:**

- cada encontro mostra dia, início e fim;
- turmas com múltiplos encontros exibem todos eles;
- código original pode ser consultado quando houver;
- horário inválido é sinalizado e não tratado silenciosamente como válido.

## EP-05 — Planejamento da grade

### US-17 — Adicionar turma à grade

> Como estudante, quero adicionar uma oferta ao meu plano para construir a grade do semestre.

**Prioridade:** Must · **Requisito:** RF-023 · **Dependência:** US-16

**Critérios de aceite:**

- uma oferta válida pode ser adicionada ao plano ativo;
- a ação confirma qual turma foi incluída;
- encontros aparecem na visualização da grade;
- falha ao salvar não cria uma seleção apenas aparente.

### US-18 — Evitar oferta duplicada

> Como estudante, quero ser impedido de adicionar a mesma oferta duas vezes para manter a grade consistente.

**Prioridade:** Must · **Requisito:** RF-024 · **Dependência:** US-17

**Critérios de aceite:**

- a mesma oferta aparece no máximo uma vez no plano;
- nova tentativa retorna mensagem informativa;
- proteção existe na interface e na persistência;
- a tentativa não altera carga ou créditos totais.

### US-19 — Identificar conflito

> Como estudante, quero receber uma explicação quando turmas se sobrepõem para corrigir a combinação.

**Prioridade:** Must · **Requisito:** RF-025 · **Dependências:** US-16, US-17

**Critérios de aceite:**

- qualquer interseção no mesmo dia é detectada;
- horários apenas adjacentes não são conflito;
- todos os encontros das ofertas são comparados;
- a mensagem identifica turmas, dia e intervalo conflitante.

### US-20 — Remover turma

> Como estudante, quero remover uma oferta para experimentar outra composição de grade.

**Prioridade:** Must · **Requisito:** RF-026 · **Dependência:** US-17

**Critérios de aceite:**

- remover exige uma intenção clara do usuário;
- oferta e encontros desaparecem do plano;
- carga total e conflitos são recalculados;
- falha preserva a seleção e informa o erro.

### US-21 — Recuperar grade salva

> Como estudante, quero recuperar meu plano em outra sessão para continuar o planejamento.

**Prioridade:** Must · **Requisito:** RF-027 · **Dependência:** US-17

**Critérios de aceite:**

- ofertas adicionadas reaparecem após atualizar a página;
- sair e entrar novamente recupera o plano do mesmo usuário;
- outro usuário não recebe essas seleções;
- dados de um período anterior não se misturam ao plano ativo.

### US-22 — Visualizar semana

> Como estudante, quero visualizar as turmas em uma semana para compreender a distribuição dos horários.

**Prioridade:** Must · **Requisito:** RF-028 · **Dependência:** US-17

**Critérios de aceite:**

- dias e intervalos mantêm ordem cronológica;
- cada encontro identifica sua disciplina e turma;
- conflitos recebem distinção visual e textual;
- em tela estreita existe uma representação legível equivalente.

### US-23 — Ver carga selecionada

> Como estudante, quero ver a carga ou os créditos selecionados para avaliar o volume do semestre.

**Prioridade:** Should · **Requisito:** RF-029 · **Dependência:** US-17

**Critérios de aceite:**

- o total usa cada disciplina selecionada uma única vez;
- adicionar e remover atualizam o valor;
- a unidade de cálculo fica visível;
- item sem carga válida é sinalizado e não distorce o total.

## EP-06 — Governança de dados acadêmicos

### US-24 — Importar catálogo versionado

> Como administrador de dados, quero importar catálogo e ofertas para atualizar o período de maneira controlada.

**Prioridade:** Should · **Requisito:** RF-030 · **Dependência:** HT-05

**Critérios de aceite:**

- o arquivo segue formato e versão documentados;
- uma importação identifica período e fonte;
- repetir o mesmo lote não cria duplicidades;
- falha crítica impede gravação parcial.

### US-25 — Validar dados importados

> Como administrador de dados, quero validar referências e horários para impedir dados incoerentes no catálogo.

**Prioridade:** Should · **Requisito:** RF-031 · **Dependência:** US-24

**Critérios de aceite:**

- disciplinas e cursos inexistentes são rejeitados;
- chaves duplicadas são identificadas;
- códigos de horário inválidos são reportados;
- validação ocorre antes da confirmação do lote.

### US-26 — Consultar relatório de importação

> Como administrador de dados, quero um relatório do lote para revisar o que foi aceito ou rejeitado.

**Prioridade:** Should · **Requisito:** RF-032 · **Dependência:** US-25

**Critérios de aceite:**

- o relatório totaliza linhas aceitas, rejeitadas e corrigidas;
- cada rejeição informa linha, campo e motivo;
- o relatório possui identificador e horário da execução;
- nenhum segredo ou dado pessoal aparece no resultado.

### US-27 — Rastrear origem e vigência

> Como administrador de dados, quero registrar fonte, versão e vigência para auditar informações acadêmicas.

**Prioridade:** Should · **Requisito:** RF-033 · **Dependência:** US-24

**Critérios de aceite:**

- currículo, requisito e oferta mantêm fonte identificável;
- a vigência possui início e, quando aplicável, fim;
- uma nova versão não apaga o histórico anterior;
- a interface informa qual versão está sendo usada.

## Definition of Done

Uma história só é concluída quando critérios de aceite, autorização, estados de interface, teste proporcional ao risco, acessibilidade, documentação e rastreabilidade foram verificados, e os gates da CI passam.
