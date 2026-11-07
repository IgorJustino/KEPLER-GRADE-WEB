# Especificação suplementar

Esta especificação organiza as qualidades pelo modelo **FURPS+**, seguindo o nível de formalização do CHEF Indica. Os identificadores permanecem ligados à lista oficial de RNFs.

## Classificação FURPS+

| Categoria | Requisitos | Aplicação no KEPLER |
|---|---|---|
| Functionality | RNF-002, RNF-003 | Segurança, autorização e proteção de segredos |
| Usability | RNF-004 a RNF-007 | Responsividade, teclado, contraste e erros claros |
| Reliability | RNF-008, RNF-009 | Banco reproduzível e gates de integração |
| Performance | NFR-P01, NFR-P02 | Abertura e interação sem bloqueio perceptível |
| Supportability | RNF-001, RNF-010 a RNF-012 | Tipos, logs, testes e procedência dos dados |
| + Design | ARC-01 | Regras de domínio isoladas da interface |
| + Implementation | ARC-02 | React/TypeScript e FastAPI no protótipo |
| + Interface | ARC-03 | API HTTP com contratos versionáveis |
| + Data | ARC-04 | PostgreSQL alvo, migrações, integridade e RLS |

## Cenários de qualidade

| ID | Estímulo e contexto | Resposta esperada | Medida |
|---|---|---|---|
| NFR-P01 | Usuário abre detalhes de disciplina em dispositivo intermediário | Conteúdo aparece sem congelar a interação | p95 de interação abaixo de 200 ms após dados carregados |
| NFR-P02 | Usuário filtra 267 ofertas | Resultado é recalculado sem bloquear navegação | p95 abaixo de 300 ms no cliente de referência |
| NFR-S01 | Usuário A tenta acessar plano de B | Operação é negada no servidor e no banco | 100% dos testes de isolamento passam |
| NFR-A01 | Usuário navega somente por teclado | Controles recebem foco na ordem lógica | Jornada crítica concluída sem mouse |
| NFR-R01 | Nova instalação executa migrações e seed | Ambiente fica pronto sem correção manual | Pipeline reproduzível em banco vazio |
| NFR-T01 | Catálogo é atualizado | Fonte, versão, vigência e relatório permanecem consultáveis | 100% dos lotes identificados |

!!! note "Valores iniciais"
    As metas de desempenho são hipóteses de engenharia. Elas devem ser calibradas com medição no ambiente de referência e registradas como decisão.

## Restrições

- idioma do produto: português do Brasil;
- frontend atual: React, TypeScript e Vite;
- backend atual: FastAPI com dados em memória;
- alvo de persistência: PostgreSQL versionado por migrações;
- uso móvel essencial a partir de 360 px;
- dados acadêmicos precisam de fonte e vigência;
- matrícula oficial permanece fora do sistema.

## Evidência de conformidade

Cada requisito de qualidade deve apontar para pelo menos uma evidência: teste automatizado, medição, auditoria, log sanitizado, revisão ou demonstração. A [matriz de rastreabilidade](rastreabilidade.md) mantém a relação com histórias técnicas.
