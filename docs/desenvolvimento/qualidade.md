# Qualidade e testes

## Estratégia por camada

| Camada | Foco | Exemplos |
|---|---|---|
| Unidade | Regras puras e limites | parser de horário, conflito, elegibilidade, progresso |
| Integração | Persistência e autorização | migração vazia, isolamento entre usuários, importação |
| Componente | Estados e interação | filtros, cartões, formulários, grade vazia |
| E2E | Jornadas críticas | cadastro, progresso, seleção, conflito e persistência |

## Jornadas críticas

1. cadastrar, escolher curso e abrir progresso;
2. concluir pré-requisito e observar elegibilidade;
3. pesquisar uma oferta e adicioná-la à grade;
4. tentar adicionar uma oferta conflitante e compreender a causa;
5. remover a oferta e verificar a resolução;
6. iniciar nova sessão e recuperar o plano;
7. confirmar que um usuário não acessa dados de outro.

## Dados mínimos de teste

O conjunto determinístico deve conter dois cursos, seis disciplinas, três relações de pré-requisito, oito ofertas, dois conflitos intencionais e dois usuários.

## Gates de integração

- verificação de tipos;
- lint e formatação;
- testes de domínio;
- testes de integração relevantes;
- build de produção;
- build estrito da documentação.

## Revisão de experiência

- tela principal utilizável em 360 px e desktop;
- navegação completa por teclado;
- foco visível;
- contraste WCAG AA;
- mensagens de erro acionáveis;
- movimento respeita `prefers-reduced-motion`;
- carregamento e abertura de detalhes sem bloqueio perceptível.
