import React, { useEffect, useRef } from 'react';
import { DynamicChessHeroCanvas } from './DynamicChessHeroCanvas';
import { KoiFishCanvas } from './KoiFishCanvas';
import './landing-bureau.css';

interface TELAINIcialBureauProps {
  design: 'gazette' | 'bureau';
  onGoToBookStore: () => void;
  onEnterSimulator: (screenId?: number) => void;
  onOpenFlowchart?: () => void;
  onToggleDesign: () => void;
}

const records = [
  {
    index: 'I',
    title: 'Histórico & Equivalências',
    description:
      'Importação segura do histórico do SIGAA e reconhecimento imediato das disciplinas concluídas, com registro das menções concedidas.',
    note: 'Autenticado em Cartório Discente',
    tone: 'brass',
  },
  {
    index: 'II',
    title: 'Elegibilidade Automática',
    description:
      'Mapeamento visual das matérias liberadas na cadeia de pré-requisitos, com cálculo determinístico de pendências em tempo real.',
    note: 'Regra RF-015 Verificada',
    tone: 'emerald',
  },
  {
    index: 'III',
    title: 'Ofertas em Tempo Real',
    description:
      '267 turmas ativas catalogadas no período, com horários, docentes e salas da Faculdade do Gama.',
    note: 'Sincronia SIGAA 2026/2',
    tone: 'brass',
  },
  {
    index: 'IV',
    title: 'Grade sem Colisões',
    description:
      'Detecção de sobreposição de códigos como 35T23 e 46M34, com prevenção automática de choques de horário.',
    note: 'Algoritmo de Interseção Zero',
    tone: 'crimson',
  },
] as const;

const useCases = [
  {
    index: 'I',
    label: 'Relato de matrícula',
    title: 'Planejamento Semestral',
    description:
      'Compare turmas, horários e docentes para montar sua grade com previsibilidade antes da confirmação oficial.',
    footer: 'Matriz 2026/2',
    action: 'Sem choque',
    tone: 'paper',
  },
  {
    index: 'II',
    label: 'Alerta editorial',
    title: 'Resolução de Conflitos',
    description:
      'Identifique sobreposições do código de horário do SIGAA e teste combinações alternativas com uma única simulação.',
    footer: 'Diagnóstico instantâneo',
    action: 'Substituir',
    tone: 'crimson',
  },
  {
    index: 'III',
    label: 'Arquivo de formandos',
    title: 'Integralização de Curso',
    description:
      'Acompanhe progresso curricular, créditos obrigatórios, optativas pendentes e a estimativa do semestre de conclusão.',
    footer: 'Simulação de TCC',
    action: 'Certificado',
    tone: 'leather',
  },
] as const;

const engineeringCourses = [
  { code: 'FGA-SW', title: 'Engenharia de Software', hours: '3720h', detail: 'Matriz vigente 2023.2', credits: '240 créditos', tone: 'crimson' },
  { code: 'FGA-AERO', title: 'Engenharia Aeroespacial', hours: '3780h', detail: 'Mecânica & órbita', credits: '252 créditos', tone: 'brass' },
  { code: 'FGA-AUTO', title: 'Engenharia Automotiva', hours: '3750h', detail: 'Propulsão & estruturas', credits: '248 créditos', tone: 'copper' },
  { code: 'FGA-ELET', title: 'Engenharia Eletrônica', hours: '3720h', detail: 'Sistemas embarcados', credits: '240 créditos', tone: 'emerald' },
  { code: 'FGA-ENERG', title: 'Engenharia de Energia', hours: '3750h', detail: 'Geração & transmissão', credits: '246 créditos', tone: 'ochre' },
] as const;

const AstrolabeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let angle = 0;
    let frameId = 0;
    let running = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const centerX = width * (width < 760 ? 0.68 : 0.74);
      const centerY = height * 0.48;
      const outerRadius = Math.min(340, Math.max(180, Math.min(width, height) * 0.4));
      const middleRadius = outerRadius * 0.7;
      const innerRadius = outerRadius * 0.47;

      context.save();
      context.translate(centerX, centerY);
      context.strokeStyle = 'rgba(200, 157, 82, 0.3)';
      context.lineWidth = 1.25;
      context.beginPath();
      context.arc(0, 0, outerRadius, 0, Math.PI * 2);
      context.stroke();

      context.save();
      context.rotate(angle * 0.15);
      for (let index = 0; index < 72; index += 1) {
        const radians = (index * Math.PI) / 36;
        const tickStart = outerRadius - 10;
        const tickEnd = index % 6 === 0 ? outerRadius : outerRadius - 5;
        context.beginPath();
        context.moveTo(Math.cos(radians) * tickStart, Math.sin(radians) * tickStart);
        context.lineTo(Math.cos(radians) * tickEnd, Math.sin(radians) * tickEnd);
        context.stroke();
      }
      context.restore();

      context.strokeStyle = 'rgba(200, 157, 82, 0.2)';
      context.beginPath();
      context.arc(0, 0, middleRadius, 0, Math.PI * 2);
      context.stroke();

      context.strokeStyle = 'rgba(184, 50, 24, 0.3)';
      context.beginPath();
      context.arc(0, 0, innerRadius, 0, Math.PI * 2);
      context.stroke();

      context.save();
      context.rotate(-angle * 0.25);
      context.strokeStyle = 'rgba(200, 157, 82, 0.14)';
      context.beginPath();
      context.moveTo(-outerRadius, 0);
      context.lineTo(outerRadius, 0);
      context.moveTo(0, -outerRadius);
      context.lineTo(0, outerRadius);
      context.stroke();
      context.restore();

      context.fillStyle = '#c89d52';
      context.beginPath();
      context.arc(
        Math.cos(angle * 0.5) * middleRadius,
        Math.sin(angle * 0.5) * middleRadius,
        4,
        0,
        Math.PI * 2
      );
      context.fill();

      context.fillStyle = '#b83218';
      context.beginPath();
      context.arc(
        Math.cos(-angle * 0.8) * innerRadius,
        Math.sin(-angle * 0.8) * innerRadius,
        5,
        0,
        Math.PI * 2
      );
      context.fill();
      context.restore();

      if (!reducedMotion && running) {
        angle += 0.005;
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running && !reducedMotion) {
        window.cancelAnimationFrame(frameId);
        frameId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="bureau-astrolabe" aria-hidden="true" />;
};

export const TELAINIcialBureau: React.FC<TELAINIcialBureauProps> = ({
  design,
  onGoToBookStore,
  onEnterSimulator,
  onOpenFlowchart,
  onToggleDesign,
}) => {
  const isBureau = design === 'bureau';
  const nextDesignLabel = isBureau ? 'Gazeta' : 'Bureau';

  const openFlowchart = () => {
    if (onOpenFlowchart) onOpenFlowchart();
    else onEnterSimulator(1);
  };

  return (
    <main className={`bureau bureau--${design}`} data-design={design}>
      <header className="bureau-header">
        <div className="bureau-header__inner">
          <button
            type="button"
            className="bureau-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Voltar ao início"
          >
            <span className="bureau-brand__seal">K</span>
            <span>
              <strong>KEPLER · GRADE WEB</strong>
              <small>Arquivo Cartográfico · FGA / Universidade de Brasília</small>
            </span>
          </button>

          <nav className="bureau-nav" aria-label="Navegação da página inicial">
            <a href="#bureau-dossie"><i>I.</i> O Periódico</a>
            <a href="#bureau-cadernos"><i>II.</i> Crônicas de Uso</a>
            <a href="#bureau-engenharias"><i>III.</i> 5 Engenharias</a>
            <a href="#bureau-editorial"><i>IV.</i> Chancelaria</a>
          </nav>

          <div className="bureau-header__actions">
            <button
              type="button"
              className="bureau-theme-toggle"
              onClick={onToggleDesign}
              aria-label={`Ativar tema ${nextDesignLabel}`}
              title={`Trocar para o tema ${nextDesignLabel}`}
            >
              <span aria-hidden="true">{isBureau ? '☼' : '◐'}</span>
              <span className="bureau-theme-toggle__label">Tema {nextDesignLabel}</span>
            </button>
            <button type="button" className="bureau-button bureau-button--gold" onClick={() => onEnterSimulator(0)}>
              Acessar grade <span aria-hidden="true">➔</span>
            </button>
          </div>
        </div>
      </header>

      <section className="bureau-hero">
        {isBureau ? (
          <KoiFishCanvas interactive={true} />
        ) : (
          <DynamicChessHeroCanvas opacity={0.92} interactive={true} />
        )}
        <AstrolabeCanvas />
        <div className="bureau-wind" aria-hidden="true">
          <img
            className="bureau-wind__paper bureau-wind__paper--euclid"
            src="/bg/bureau-paper-euclid.webp"
            alt=""
            draggable={false}
            decoding="async"
          />
          <img
            className="bureau-wind__paper bureau-wind__paper--orbit"
            src="/bg/bureau-paper-orbit.webp"
            alt=""
            draggable={false}
            decoding="async"
          />
          <img
            className="bureau-wind__paper bureau-wind__paper--fragment"
            src="/bg/bureau-paper-orbit.webp"
            alt=""
            draggable={false}
            decoding="async"
          />
          <img
            className="bureau-wind__paper bureau-wind__paper--center-top"
            src="/bg/bureau-paper-center-top.webp"
            alt=""
            draggable={false}
            decoding="async"
          />
          <img
            className="bureau-wind__paper bureau-wind__paper--center-bottom"
            src="/bg/bureau-paper-center-bottom.webp"
            alt=""
            draggable={false}
            decoding="async"
          />
          <svg
            className="bureau-kepler-motion"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
            focusable="false"
          >
            <ellipse className="bureau-kepler-motion__orbit bureau-kepler-motion__orbit--outer" cx="500" cy="390" rx="122" ry="70" pathLength="1" />
            <circle className="bureau-kepler-motion__focus" cx="456" cy="390" r="3" />
            <circle className="bureau-kepler-motion__planet bureau-kepler-motion__planet--outer" r="5">
              <animateMotion
                dur="9s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.2 0.75 0.35 1;0.65 0 0.8 0.25"
                path="M 622 390 A 122 70 0 1 1 378 390 A 122 70 0 1 1 622 390"
              />
            </circle>
            <g transform="rotate(-18 500 390)">
              <ellipse className="bureau-kepler-motion__orbit bureau-kepler-motion__orbit--inner" cx="500" cy="390" rx="82" ry="47" pathLength="1" />
              <circle className="bureau-kepler-motion__planet bureau-kepler-motion__planet--inner" r="3.5">
                <animateMotion
                  dur="6.5s"
                  repeatCount="indefinite"
                  path="M 582 390 A 82 47 0 1 1 418 390 A 82 47 0 1 1 582 390"
                />
              </circle>
            </g>
            <text className="bureau-kepler-motion__formula" x="540" y="300" textAnchor="middle">T² ∝ a³</text>
          </svg>
        </div>
        <div className="bureau-hero__shade" aria-hidden="true" />
        <span className="bureau-protocol">Protocolo SIGAA: 2026/2 · Lavrado</span>

        <div className="bureau-hero__grid">
          <div className="bureau-hero__copy">
            <p className="bureau-kicker"><span /> Cartografia Acadêmica · Secretaria do Gama / UnB</p>
            <h1>
              KEPLER
              <span>O Grande Compêndio Curricular</span>
            </h1>
            <div className="bureau-double-rule" />
            <p className="bureau-hero__lead">
              A rota acadêmica decifrada com clareza cartográfica: sem colisões de turno,
              com precedência matemática e pleno controle das matrizes do SIGAA.
            </p>
            <div className="bureau-quick-stats">
              <span><i>⌖</i> 05 cursos mapeados</span>
              <span><i>✓</i> 0 conflitos aceitos</span>
              <span><i>❖</i> 267 ofertas vigentes</span>
            </div>
          </div>

          <aside className="bureau-dispatch">
            <div className="bureau-dispatch__head">
              <span>Despacho do Diretório Acadêmico</span>
              <strong>Termo n° 1889</strong>
            </div>
            <p>
              O <strong>KEPLER</strong> unifica currículos oficiais, histórico discente e
              ofertas do SIGAA em uma única matriz visual. Planeje suas matérias com
              segurança matemática, decifrando códigos como <code>35T23</code> antes da matrícula.
            </p>
            <div className="bureau-dispatch__metrics">
              <div><small>Índice médio acumulado</small><strong>IRA 4.28</strong></div>
              <div><small>Integralização</small><strong>67,5%</strong></div>
            </div>
            <div className="bureau-dispatch__actions">
              <button type="button" className="bureau-button bureau-button--gold" onClick={() => onEnterSimulator(0)}>
                Abrir simulador
              </button>
              <button type="button" className="bureau-button bureau-button--outline" onClick={openFlowchart}>
                Ver fluxograma
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section id="bureau-dossie" className="bureau-section bureau-section--deep">
        <div className="bureau-section__inner">
          <header className="bureau-section__head">
            <div>
              <p>Caderno 02 · Metodologia KEPLER</p>
              <h2>Da matrícula inicial à outorga de grau, sem extraviar a verdade.</h2>
            </div>
            <span>
              Cada cálculo respeita a cartografia oficial: pré-requisitos encadeados,
              cargas horárias auditadas e turnos vigentes.
            </span>
          </header>

          <div className="bureau-records">
            {records.map((record) => (
              <article className="bureau-record" key={record.index}>
                <div className={`bureau-record__index bureau-tone--${record.tone}`}>
                  <span>Registro {record.index}</span><i>❖</i>
                </div>
                <h3>{record.title}</h3>
                <p>{record.description}</p>
                <small>{record.note}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bureau-cadernos" className="bureau-section bureau-section--raised">
        <div className="bureau-section__inner">
          <header className="bureau-section__center">
            <p>Caderno 03 · Crônicas de Expedição</p>
            <h2>O mesmo compêndio atende a momentos distintos da graduação.</h2>
            <div className="bureau-double-rule" />
          </header>

          <div className="bureau-use-cases">
            {useCases.map((useCase) => (
              <article className={`bureau-case bureau-case--${useCase.tone}`} key={useCase.index}>
                <span className="bureau-case__label">{useCase.label}</span>
                <i className="bureau-case__index">{useCase.index}</i>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
                <div>
                  <span>{useCase.footer}</span>
                  <strong>{useCase.action} ➔</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bureau-engenharias" className="bureau-section bureau-section--deep">
        <div className="bureau-section__inner">
          <header className="bureau-section__head">
            <div>
              <p>Caderno 04 · Cursos Cartografados</p>
              <h2>O ecossistema das cinco engenharias do Gama.</h2>
            </div>
            <small>Campus FGA · UnB · Plano Decenal</small>
          </header>

          <div className="bureau-courses">
            {engineeringCourses.map((course) => (
              <article className="bureau-course" key={course.code}>
                <div>
                  <span className={`bureau-course__code bureau-course__code--${course.tone}`}>{course.code}</span>
                  <strong>{course.hours}</strong>
                </div>
                <h3>{course.title}</h3>
                <p>{course.detail}</p>
                <small>{course.credits}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bureau-editorial" className="bureau-editorial">
        <div className="bureau-editorial__inner">
          <div className="bureau-editorial__copy">
            <p>Editorial 05 · Coluna de Opinião & Algoritmo</p>
            <h2>Os dados explicam.<br /><em>O KEPLER ajuda a agir.</em></h2>
            <span className="bureau-editorial__rule" />
            <p>
              O sistema analisa o histórico acadêmico, aponta gargalos curriculares e
              traduz resoluções da UnB em decisões claras para o próximo semestre.
            </p>
            <div>
              <button type="button" className="bureau-button bureau-button--crimson" onClick={() => onEnterSimulator(0)}>
                Simular grade agora ➔
              </button>
              <button type="button" className="bureau-button bureau-button--ink" onClick={openFlowchart}>
                Consultar fluxograma
              </button>
            </div>
          </div>

          <aside className="bureau-chancery">
            <span className="bureau-chancery__seal">K</span>
            <h3>Chancelaria FGA</h3>
            <p>“Pelo rigor da matemática acadêmica e pela clareza cartográfica do discente.”</p>
            <small>Documento registrado · 1889/2026</small>
          </aside>
        </div>
      </section>

      <footer className="bureau-footer">
        <div>
          <span>❖</span>
          <p>KEPLER Grade Web & Archive · Planejamento Acadêmico FGA / UnB</p>
        </div>
        <div>
          <span>Brasília · Edição Cartográfica 2026</span>
          <a href="#bureau-dossie">Retornar ao topo ↑</a>
        </div>
      </footer>

      <button type="button" className="bureau-library" onClick={onGoToBookStore}>
        <span aria-hidden="true">▤</span>
        <strong>Biblioteca FGA</strong>
      </button>
    </main>
  );
};
