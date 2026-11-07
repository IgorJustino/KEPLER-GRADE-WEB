# Requisitos funcionais

Os requisitos abaixo derivam do blueprint. O estado de implementação deve ser confirmado pelo incremento e seus testes; esta lista representa o escopo do produto.

## Conta e perfil

| ID | Requisito |
|---|---|
| RF-001 | Criar conta com e-mail e senha. |
| RF-002 | Autenticar e encerrar sessão. |
| RF-003 | Recuperar acesso por e-mail. |
| RF-004 | Selecionar um dos cursos suportados. |
| RF-005 | Editar nome e curso. |
| RF-006 | Impedir acesso a dados de outro usuário. |

## Currículo e progresso

| ID | Requisito |
|---|---|
| RF-010 | Listar disciplinas do currículo por semestre recomendado. |
| RF-011 | Exibir código, nome, créditos ou carga e tipo da disciplina. |
| RF-012 | Exibir pré-requisitos e dependências. |
| RF-013 | Marcar e desmarcar disciplina concluída. |
| RF-014 | Calcular percentual e créditos concluídos. |
| RF-015 | Explicar por que uma disciplina não está elegível. |
| RF-016 | Registrar estado: não iniciada, em curso ou concluída. |
| RF-017 | Distinguir semestre recomendado do período cursado. |
| RF-018 | Registrar tentativas e reprovações. |
| RF-019 | Exibir visões coerentes de concluídas, pendentes, cursando, elegíveis e com reprovação. |

## Oferta e grade

| ID | Requisito |
|---|---|
| RF-020 | Listar ofertas de um período letivo. |
| RF-021 | Filtrar por texto, curso, professor, dia e bloco. |
| RF-022 | Exibir todos os encontros semanais de uma turma. |
| RF-023 | Adicionar oferta à grade do usuário. |
| RF-024 | Impedir duplicação da oferta na mesma grade. |
| RF-025 | Detectar interseção de encontros e sinalizar conflito. |
| RF-026 | Remover oferta selecionada. |
| RF-027 | Persistir a grade entre sessões. |
| RF-028 | Exibir a grade em formato semanal. |
| RF-029 | Calcular carga ou créditos selecionados. |

## Administração de dados

| ID | Requisito |
|---|---|
| RF-030 | Importar catálogo e ofertas de arquivo versionado. |
| RF-031 | Validar referências, duplicidades e códigos de horário. |
| RF-032 | Relatar linhas aceitas, rejeitadas e corrigidas. |
| RF-033 | Registrar fonte, versão e vigência dos dados acadêmicos. |
