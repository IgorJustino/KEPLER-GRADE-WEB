<section class="kepler-hero">
  <div class="kepler-hero-copy">
    <div class="kepler-badge">
      <span class="kepler-badge-dot"></span>
      Sistema de Órbita Acadêmica · FGA / UnB
    </div>
    <h1>Planeje sua órbita acadêmica com precisão.</h1>
    <p>O <strong>KEPLER</strong> harmoniza fluxogramas, ofertas de turmas, pré-requisitos e algoritmos de detecção de conflitos para que cada semestre na Universidade de Brasília seja uma decisão consciente, transparente e fundamentada.</p>
    <div class="kepler-actions">
      <a class="kepler-btn-primary" href="produto/visao/">
        <span>Conhecer o Produto</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
      <a class="kepler-btn-secondary" href="requisitos/funcionais/">
        <span>Explorar Requisitos</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    </div>
  </div>

  <div class="kepler-instrument-display" aria-hidden="true">
    <div class="kepler-instrument-header">
      <div class="kepler-instrument-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
        <span>Observatório FGA</span>
      </div>
      <span class="kepler-status-pill">● Online · v2.4</span>
    </div>

    <div class="kepler-metrics-grid">
      <div class="kepler-metric-card">
        <div class="kepler-metric-label">Cursos Mapeados</div>
        <div class="kepler-metric-value">5 <span style="font-size: 0.75rem; color: #38d6fc; font-weight: 600;">Engenharias</span></div>
        <div class="kepler-eng-tags">
          <span class="kepler-eng-tag" style="background: rgba(33, 150, 243, 0.2); color: #64b5f6;">SW</span>
          <span class="kepler-eng-tag" style="background: rgba(0, 188, 212, 0.2); color: #4dd0e1;">AERO</span>
          <span class="kepler-eng-tag" style="background: rgba(255, 152, 0, 0.2); color: #ffb74d;">AUTO</span>
          <span class="kepler-eng-tag" style="background: rgba(156, 39, 176, 0.2); color: #ba68c8;">ELET</span>
          <span class="kepler-eng-tag" style="background: rgba(76, 175, 80, 0.2); color: #81c784;">ENERG</span>
        </div>
      </div>

      <div class="kepler-metric-card">
        <div class="kepler-metric-label">Motor de Conflito</div>
        <div class="kepler-metric-value">Zero <span style="font-size: 0.75rem; color: #2ed573; font-weight: 600;">Colisões</span></div>
        <div class="kepler-metric-desc">Validação matemática cruzada entre códigos de horário do SIGAA.</div>
      </div>

      <div class="kepler-metric-card">
        <div class="kepler-metric-label">Matriz Curricular</div>
        <div class="kepler-metric-value">100% <span style="font-size: 0.75rem; color: #ffb443; font-weight: 600;">Interativa</span></div>
        <div class="kepler-metric-desc">Fluxogramas com cargas horárias oficiais (90h, 60h, 30h) e pré-requisitos.</div>
      </div>

      <div class="kepler-metric-card">
        <div class="kepler-metric-label">Elegibilidade</div>
        <div class="kepler-metric-value">Tempo Real</div>
        <div class="kepler-metric-desc">Cálculo de liberação de matérias com base no histórico do aluno.</div>
      </div>
    </div>
  </div>
</section>

## Uma documentação viva

Esta página reúne os artefatos de **Métodos de Desenvolvimento de Software**, **Engenharia de Requisitos** e **Arquitetura e Desenho de Software** do KEPLER. A organização combina as práticas do [AQUI TEM FCTE](https://github.com/UnBArqDsw2025-2-Turma02) com a modelagem de dados e os requisitos não funcionais do [CHEF Indica](https://github.com/UnBArqDsw2024-2), com conteúdo próprio derivado do blueprint e do protótipo deste repositório.

<div class="kepler-grid">
  <a class="kepler-card" href="produto/visao/">
    <div class="kepler-card-icon">🧭</div>
    <strong>Produto</strong>
    <p>Problema acadêmico na FGA, proposta de valor, stakeholders, personas mapeadas e recorte estratégico do MVP.</p>
  </a>
  <a class="kepler-card" href="requisitos/funcionais/">
    <div class="kepler-card-icon">📐</div>
    <strong>Requisitos</strong>
    <p>Processo de elicitação, requisitos funcionais (RFs), não funcionais (RNFs), backlog unificado e rastreabilidade.</p>
  </a>
  <a class="kepler-card" href="desenvolvimento/arquitetura/">
    <div class="kepler-card-icon">🏛️</div>
    <strong>Arquitetura</strong>
    <p>Modelos estáticos, dinâmicos e de dados, padrões de reutilização, diagramas C4 e decisões de engenharia.</p>
  </a>
  <a class="kepler-card" href="desenvolvimento/metodologia/">
    <div class="kepler-card-icon">🚀</div>
    <strong>Desenvolvimento</strong>
    <p>Metodologia ágil híbrida, garantia de qualidade, esteira de testes, CI/CD automatizado e roadmap evolutivo.</p>
  </a>
</div>

## Jornada do projeto

A esteira de concepção e engenharia do KEPLER segue cinco fases fundamentais e integradas:

<ol class="kepler-rail">
  <li>Compreender</li>
  <li>Especificar</li>
  <li>Priorizar</li>
  <li>Construir</li>
  <li>Validar</li>
</ol>

!!! info "Estado do projeto"
    O repositório contém um protótipo operacional construído em **React, TypeScript e Vite**, apoiado por uma API em **FastAPI**. O [blueprint técnico](https://github.com/IgorJustino/KEPLER-GRADE-WEB/blob/main/KEPLER_V2_BLUEPRINT.md) descreve a visão completa e a arquitetura alvo. As páginas distinguem o que já existe em código do que está planejado para as próximas versões.

## Comece por aqui

- [Visão do produto](produto/visao.md): por que o KEPLER existe e qual problema ele soluciona.
- [Processo de requisitos](requisitos/processo.md): como as necessidades dos estudantes e professores são descobertas e validadas.
- [Backlog e critérios](requisitos/backlog.md): como as entregas de valor são convertidas em incrementos verificáveis.
- [Arquitetura](desenvolvimento/arquitetura.md): estado atual do protótipo e direção técnica futura.
- [Modelagem de dados](arquitetura/modelagem-dados.md): modelo conceitual, lógico e físico da grade curricular.
- [NFR Framework](requisitos/nfr-framework.md): metas de qualidade, impactos cruzados e concessões técnicas.
- [Roadmap](desenvolvimento/roadmap.md): sequência cronológica de evolução do MVP.
