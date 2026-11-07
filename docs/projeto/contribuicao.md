# Como contribuir

## Preparação

1. abra uma issue ou associe a mudança a um item do backlog;
2. identifique requisitos e critérios afetados;
3. crie uma branch curta a partir de `main`;
4. mantenha código e documentação coerentes.

## Pull request

O pull request deve explicar:

- problema resolvido;
- comportamento alterado;
- requisitos relacionados;
- como a mudança foi verificada;
- riscos ou decisões relevantes.

## Documentação local

Com Python disponível:

```bash
python -m pip install -r requirements-docs.txt
mkdocs serve
```

O site fica disponível em `http://127.0.0.1:8000`. Antes de integrar:

```bash
mkdocs build --strict
```

## Convenções

- português do Brasil para produto e documentação;
- identificadores estáveis para requisitos e histórias;
- links relativos entre páginas;
- nenhuma informação pessoal ou segredo em exemplos;
- ADR para decisões arquiteturais de impacto duradouro.
