import React, { useEffect, useRef } from 'react';
import { KoiFishCanvas } from './KoiFishCanvas';
import './landing-datasight.css';

interface DataSightLandingScreenProps {
  onGoToBookStore: () => void;
  onEnterSimulator: (screenId?: number) => void;
  onOpenFlowchart?: () => void;
}

export const DataSightLandingScreen: React.FC<DataSightLandingScreenProps> = ({
  onGoToBookStore,
  onEnterSimulator,
  onOpenFlowchart,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5).toFixed(3);
      const mouseY = (e.clientY / window.innerHeight - 0.5).toFixed(3);
      el.style.setProperty('--mouse-x', mouseX);
      el.style.setProperty('--mouse-y', mouseY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <main ref={containerRef} className="landing-v2">
      {/* ====================================================================
          HEADER FIXO (MIX-BLEND-DIFFERENCE — MESMO DO RADAR ELEITORAL)
      ==================================================================== */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            {/* Ícone de Marca Geométrico KEPLER */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#ff5a1f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(255, 90, 31, 0.4)',
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  border: '2px solid #000',
                  borderRadius: '50%',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    background: '#000',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>
              KEPLER
            </span>
          </div>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <a
              href="#leitura"
              style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
            >
              O Painel
            </a>
            <a
              href="#casos"
              style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
            >
              Casos de Uso
            </a>
            <a
              href="#metodo"
              style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
            >
              5 Engenharias
            </a>
            <a
              href="#inteligencia"
              style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)')}
            >
              Inteligência
            </a>
          </nav>

          <button
            onClick={() => onEnterSimulator(0)}
            style={{
              padding: '0.45rem 1.25rem',
              borderRadius: 9999,
              background: '#ffffff',
              color: '#000000',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Entrar
          </button>
        </div>
      </header>

      {/* ====================================================================
          SECTION 01 — HERO (DESIGN IDÊNTICO COM ANIMAÇÃO DOS PEIXES NO FUNDO)
      ==================================================================== */}
      <section className="landing-hero-v2">
        {/* Animação das Carpas Koi vivas no fundo da tela */}
        <KoiFishCanvas interactive={true} />

        {/* Camada shade e vinheta cinematográfica idêntica ao site */}
        <div className="hero-prism-shade" aria-hidden="true" />

        {/* Marcador de seção 01 */}
        <div className="hero-index" aria-hidden="true">
          01
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 20,
            marginInline: 'auto',
            width: '100%',
            maxWidth: 1480,
            display: 'grid',
            alignItems: 'flex-end',
            gap: '2.5rem',
            gridTemplateColumns: '1fr',
          }}
          className="hero-grid-cols"
        >
          <div style={{ maxWidth: '64rem' }}>
            {/* Kicker Superior idêntico */}
            <div
              style={{
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <span style={{ width: 40, height: 1, background: '#ff5a1f' }} />
              PLANEJAMENTO ACADÊMICO · FGA / UNB
            </div>

            {/* Título Monumental KEPLER com tipografia e tracking idênticos */}
            <h1 className="hero-brand-title">
              <span className="hero-logo-cascade">KEPLER</span>
            </h1>

            {/* Subtítulo de impacto */}
            <p
              style={{
                marginTop: '1.75rem',
                fontSize: 'clamp(1.35rem, 2.2vw, 2.4rem)',
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: '-0.045em',
                color: 'rgba(255, 255, 255, 0.62)',
              }}
            >
              Sua órbita acadêmica com clareza matemática.
            </p>
          </div>

          {/* Lado Direito do Grid */}
          <div style={{ maxWidth: 440, paddingBottom: '0.5rem' }}>
            <p
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.625,
                color: 'rgba(255, 255, 255, 0.62)',
              }}
            >
              O KEPLER junta disciplinas, pré-requisitos, ofertas do SIGAA e histórico discente. A comunidade acadêmica abre uma única tela e entende o percurso sem colisões de horário.
            </p>

            <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => onEnterSimulator(0)} className="btn-enter-radar">
                Entrar no simulador
              </button>

              <a href="#leitura" aria-label="Ir para a próxima seção" className="btn-circle-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 02 — COMO MONITORAMOS SEU FLUXO (STAMP 02)
      ==================================================================== */}
      <section id="leitura" className="landing-flow-section">
        <div className="section-stamp" aria-hidden="true">
          02
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <div
            style={{
              marginBottom: '2.5rem',
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: '1fr',
            }}
          >
            <div>
              <p className="landing-kicker">Como organizamos seu currículo</p>
              <h2
                style={{
                  marginTop: '1.25rem',
                  maxWidth: '56rem',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 600,
                  lineHeight: 0.92,
                  letterSpacing: '-0.055em',
                  color: '#ffffff',
                }}
              >
                Da disciplina inicial ao TCC, sem perder a origem.
              </h2>
            </div>
            <p style={{ maxWidth: '28rem', fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(255, 255, 255, 0.5)' }}>
              Acompanhe a esteira de dados. Cada cálculo preserva período, carga horária oficial (90h, 60h, 30h), pré-requisitos e turmas disponíveis para conferência.
            </p>
          </div>

          {/* Cards Horizontais da Esteira */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Histórico & Equivalências',
                desc: 'Importação e reconhecimento de disciplinas concluídas, dispensas e créditos obtidos.',
              },
              {
                step: '02',
                title: 'Elegibilidade Automática',
                desc: 'Mapeamento instantâneo de matérias liberadas na cadeia de pré-requisitos e co-requisitos.',
              },
              {
                step: '03',
                title: 'Ofertas SIGAA em Tempo Real',
                desc: '267 turmas ativas no semestre com códigos de horários oficiais, salas e corpo docente.',
              },
              {
                step: '04',
                title: 'Grade Sem Conflitos',
                desc: 'Algoritmo matemático de verificação que impede sobreposição de horários e assegura integridade.',
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'rgba(16, 16, 16, 0.75)',
                  backdropFilter: 'blur(16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 220,
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 90, 31, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#ff5a1f',
                    letterSpacing: '0.14em',
                  }}
                >
                  PASSO {card.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.55)', margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 03 — CASOS DE USO (STAMP 03 COM OS 3 CARDS IDÊNTICOS)
      ==================================================================== */}
      <section id="casos" className="landing-flow-section" style={{ paddingTop: '6rem' }}>
        <div className="section-stamp" aria-hidden="true">
          03
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <p className="landing-kicker">Casos de uso</p>
          <div
            style={{
              marginTop: '1.25rem',
              marginBottom: '3rem',
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: '1fr',
            }}
          >
            <h2
              style={{
                maxWidth: '56rem',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 0.92,
                letterSpacing: '-0.055em',
                color: '#ffffff',
              }}
            >
              O mesmo dado responde a rotinas diferentes.
            </h2>
            <p style={{ maxWidth: '28rem', fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(255, 255, 255, 0.5)' }}>
              Veja como o KEPLER atende desde a matrícula inicial do calouro até o cálculo fino de integralização do formando.
            </p>
          </div>

          {/* Os 3 Cards Idênticos ao Radar Eleitoral (Bege, Laranja e Preto) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Card 1: Bege Claro */}
            <div
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 20,
                background: '#e7e5e1',
                color: '#111111',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 340,
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{ fontSize: '2rem' }}>📐</div>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                  Planejamento Semestral
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'rgba(0,0,0,0.7)', margin: 0 }}>
                  Compare disciplinas, horários de aula e professores para montar sua grade com mais previsibilidade e sem sustos na matrícula.
                </p>
              </div>
            </div>

            {/* Card 2: Laranja Vibrante */}
            <div
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 20,
                background: '#ff5a1f',
                color: '#090909',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 340,
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{ fontSize: '2rem' }}>⚡</div>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                  Resolução de Conflitos
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'rgba(0,0,0,0.82)', margin: 0 }}>
                  Identifique na hora choques de horário entre turmas do SIGAA (ex: 24T23 vs 46M34) e teste combinações alternativas com um clique.
                </p>
              </div>
            </div>

            {/* Card 3: Preto Profundo */}
            <div
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 20,
                background: '#171717',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 340,
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{ fontSize: '2rem' }}>🎓</div>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
                  Integralização de Curso
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                  Acompanhe a barra de progresso curricular, créditos obrigatórios cursados, optativas pendentes e estimativa real de semestre de formatura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 04 — 5 ENGENHARIAS DO GAMA (STAMP 04)
      ==================================================================== */}
      <section id="metodo" className="landing-flow-section">
        <div className="section-stamp" aria-hidden="true">
          04
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="landing-kicker">Cursos Ativos FGA</p>
            <h2
              style={{
                marginTop: '1.25rem',
                maxWidth: '56rem',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 0.92,
                letterSpacing: '-0.055em',
                color: '#ffffff',
              }}
            >
              A jornada da FGA em um único ecossistema.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              { code: 'FGA-SW', name: 'Engenharia de Software', hours: '3720h', color: '#2196F3' },
              { code: 'FGA-AERO', name: 'Engenharia Aeroespacial', hours: '3780h', color: '#00BCD4' },
              { code: 'FGA-AUTO', name: 'Engenharia Automotiva', hours: '3750h', color: '#FF9800' },
              { code: 'FGA-ELET', name: 'Engenharia Eletrônica', hours: '3720h', color: '#9C27B0' },
              { code: 'FGA-ENERG', name: 'Engenharia de Energia', hours: '3750h', color: '#4CAF50' },
            ].map((eng, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.75rem',
                  borderRadius: 14,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(12, 12, 12, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 180,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: eng.color,
                    }}
                  >
                    {eng.code}
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{eng.hours}</span>
                </div>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#ffffff' }}>{eng.name}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                    Campus FGA · UnB Gama
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 05 — INTELIGÊNCIA CONTEXTUAL (STAMP 05 FUNDO BEGE CLARO)
      ==================================================================== */}
      <section
        id="inteligencia"
        className="landing-flow-section"
        style={{
          background: '#e7e5e1',
          color: '#000000',
        }}
      >
        <div className="section-stamp section-stamp--dark" aria-hidden="true">
          05
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p
              className="landing-kicker"
              style={{
                color: 'rgba(0, 0, 0, 0.48)',
              }}
            >
              Inteligência contextual
            </p>
            <h2
              style={{
                marginTop: '1.25rem',
                maxWidth: '60rem',
                fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
                fontWeight: 600,
                lineHeight: 0.9,
                letterSpacing: '-0.06em',
                color: '#111111',
              }}
            >
              Os dados explicam.
              <br />
              O KEPLER ajuda a agir.
            </h2>
            <p
              style={{
                maxWidth: '32rem',
                marginTop: '1.25rem',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
              Ele lê o histórico acadêmico do estudante, resume gargalos da grade, aponta matérias trancadoras e transforma os regulamentos da UnB em próximos passos claros.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onEnterSimulator(0)}
              style={{
                padding: '0.85rem 1.8rem',
                borderRadius: 9999,
                background: '#ff5a1f',
                color: '#000000',
                fontWeight: 700,
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Simular Grade Agora ➔
            </button>
            {onOpenFlowchart && (
              <button
                onClick={onOpenFlowchart}
                style={{
                  padding: '0.85rem 1.8rem',
                  borderRadius: 9999,
                  background: 'transparent',
                  border: '1px solid rgba(0, 0, 0, 0.25)',
                  color: '#111111',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                }}
              >
                Abrir Fluxograma Interativo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 06 — AMBIENTE AUTENTICADO & ÓRBITA KEPLER (STAMP 06)
      ==================================================================== */}
      <section
        id="acesso"
        className="landing-flow-section"
        style={{ minHeight: '75svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <div className="section-stamp" aria-hidden="true">
          06
        </div>

        {/* Anéis orbitais idênticos aos do Radar Eleitoral */}
        <div className="access-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#ff5a1f',
              boxShadow: '0 0 24px #ff5a1f',
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1480, marginInline: 'auto', width: '100%' }}>
          <p className="landing-kicker">Ambiente acadêmico</p>
          <div style={{ maxWidth: '48rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 0.9,
                letterSpacing: '-0.06em',
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}
            >
              Sua trajetória acadêmica organizada com clareza.
            </h2>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.55)', marginBottom: '2rem' }}>
              Dados oficiais e fonte única de verdade. Planeje com total autonomia sem riscos de horários conflitantes.
            </p>
            <button onClick={() => onEnterSimulator(0)} className="btn-enter-radar">
              Abrir Simulador KEPLER ➔
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER PADRÃO
      ==================================================================== */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '1.75rem 1.25rem',
        }}
      >
        <div
          style={{
            maxWidth: 1480,
            marginInline: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.35)',
          }}
        >
          <span>KEPLER · PLANEJAMENTO ACADÊMICO FGA / UNB</span>
          <span>BRASÍLIA · 2026</span>
        </div>
      </footer>

      {/* ====================================================================
          BOTÃO FLUTUANTE NO CANTO INFERIOR DIREITO
          (Leva direto para a página dos livros)
      ==================================================================== */}
      <button
        onClick={onGoToBookStore}
        className="floating-bookstore-button"
        title="Acessar a Página dos Livros 3D"
      >
        <span className="floating-bookstore-badge">📖</span>
        <span>Biblioteca de Livros FGA ➔</span>
      </button>
    </main>
  );
};
