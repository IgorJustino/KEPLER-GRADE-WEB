import React, { useEffect, useRef, useState } from 'react';
import { KoiFishCanvas } from './KoiFishCanvas';
import { TELAINIcialBureau } from './TELAINIcialBureau';
import './landing-datasight.css';

interface TELAINIcialProps {
  onGoToBookStore: () => void;
  onEnterSimulator: (screenId?: number) => void;
  onOpenFlowchart?: () => void;
}

interface GazetteLandingProps extends TELAINIcialProps {
  onToggleDesign: () => void;
}

const GazetteLanding: React.FC<GazetteLandingProps> = ({
  onGoToBookStore,
  onEnterSimulator,
  onOpenFlowchart,
  onToggleDesign,
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
          HEADER EDITORIAL — ESTILO CABEÇALHO DE JORNAL HISTÓRICO
      ==================================================================== */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
          >
            {/* Selo Carimbo Vermelho de Imprensa */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                background: '#B83218',
                border: '1.5px solid #EFE5D2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF9F0',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: '14px',
                boxShadow: '0 2px 10px rgba(184, 50, 24, 0.5)',
              }}
            >
              K
            </div>
            <div>
              <span
                style={{
                  fontSize: '1.15rem',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  color: '#FFF9F0',
                }}
              >
                KEPLER GAZETTE
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  color: '#C9B6A1',
                  textTransform: 'uppercase',
                }}
              >
                Edição Acadêmica · FGA / UnB
              </div>
            </div>
          </div>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            <a
              href="#leitura"
              style={{ color: '#E8DCC8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B83218')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#E8DCC8')}
            >
              O Periódico
            </a>
            <a
              href="#casos"
              style={{ color: '#E8DCC8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B83218')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#E8DCC8')}
            >
              Crônicas de Uso
            </a>
            <a
              href="#metodo"
              style={{ color: '#E8DCC8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B83218')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#E8DCC8')}
            >
              5 Engenharias
            </a>
            <a
              href="#inteligencia"
              style={{ color: '#E8DCC8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B83218')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#E8DCC8')}
            >
              Editorial
            </a>
          </nav>

          <div className="landing-header-actions">
            <button
              type="button"
              className="landing-theme-toggle"
              onClick={onToggleDesign}
              aria-label="Ativar design Bureau Vitoriano"
              title="Trocar para o design Bureau Vitoriano"
            >
              <span className="landing-theme-toggle__icon" aria-hidden="true">◐</span>
              <span className="landing-theme-toggle__label">Modo Bureau</span>
            </button>
            <button
              onClick={() => onEnterSimulator(0)}
              style={{
              padding: '0.5rem 1.4rem',
              borderRadius: 4,
              background: '#B83218',
              color: '#FFF9F0',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(184, 50, 24, 0.4)',
              transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#CF3D20')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#B83218')}
            >
              Acessar Grade
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          SECTION 01 — HERO (MANCHETE DE JORNAL COM CARPAS KOI EM ARTE JORNAL)
      ==================================================================== */}
      <section className="landing-hero-v2">
        {/* Canvas com as Carpas Koi em Arte Jornal nadando no mapa do Pacífico */}
        <KoiFishCanvas interactive={true} />

        {/* Camada pátina de papel jornal envelhecido */}
        <div className="hero-prism-shade" aria-hidden="true" />

        {/* Carimbo de Edição no Canto */}
        <div className="hero-index" aria-hidden="true">
          EDIÇÃO 01 · 2026
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
        >
          <div style={{ maxWidth: '66rem' }}>
            {/* Tarja de Notícia / Kicker */}
            <div className="landing-kicker">
              <span>EXTRA · CARTOGRAFIA ACADÊMICA · GAMA / UNB</span>
            </div>

            {/* Manchete Principal de Capa: KEPLER em tipografia de imprensa clássica */}
            <h1 className="hero-brand-title">
              <span className="hero-logo-cascade">KEPLER</span>
            </h1>

            {/* Linha Fina Dupla de Jornal sob o Título */}
            <div
              style={{
                height: 3,
                borderTop: '1px solid #C9B6A1',
                borderBottom: '1px solid #C9B6A1',
                margin: '1rem 0 1.25rem',
                maxWidth: '45rem',
                opacity: 0.7,
              }}
            />

            {/* Submanchete */}
            <p
              style={{
                fontSize: 'clamp(1.3rem, 2.2vw, 2.2rem)',
                fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontStyle: 'italic',
                fontWeight: 500,
                lineHeight: 1.15,
                color: '#EFE5D2',
                maxWidth: '46rem',
              }}
            >
              A jornada universitária impressa com clareza, sem conflitos na grade e com rigor matemático.
            </p>
          </div>

          {/* Coluna de Artigo de Abertura */}
          <div
            style={{
              maxWidth: 460,
              paddingBottom: '0.5rem',
              background: 'rgba(28, 20, 13, 0.82)',
              padding: '1.5rem',
              borderRadius: 6,
              border: '1.5px solid #4A3725',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#B83218',
                fontWeight: 700,
                letterSpacing: '0.12em',
                marginBottom: 6,
              }}
            >
              DESPACHO DO DIRETÓRIO ACADÊMICO
            </div>
            <p
              style={{
                fontSize: '0.92rem',
                fontFamily: "'Newsreader', Georgia, serif",
                lineHeight: 1.6,
                color: '#E2D5C3',
                margin: '0 0 1.25rem',
              }}
            >
              O KEPLER unifica currículos oficiais, histórico discente e ofertas do SIGAA em uma única matriz visual. Planeje suas matérias com segurança e autonomia.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => onEnterSimulator(0)} className="btn-enter-radar">
                Abrir Simulador ➔
              </button>

              <a href="#leitura" aria-label="Avançar para a próxima página" className="btn-circle-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 02 — CADERNO DE LEITURA (COLUNAS DE JORNAL)
      ==================================================================== */}
      <section id="leitura" className="landing-flow-section">
        <div className="section-stamp" aria-hidden="true">
          CADERNO 02
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="landing-kicker">Metodologia da Redação</p>
            <h2
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: '#FFF9F0',
              }}
            >
              Da matrícula inicial ao diploma, sem perder a fonte de verdade.
            </h2>
            <p
              style={{
                maxWidth: '36rem',
                marginTop: '1rem',
                fontSize: '1rem',
                fontFamily: "'Newsreader', serif",
                lineHeight: 1.7,
                color: '#C9B8A2',
              }}
            >
              Cada cálculo mantém rigor histórico: pré-requisitos encadeados, cargas horárias oficiais (90h, 60h, 30h) e código de horário das turmas vigentes.
            </p>
          </div>

          {/* Artigos em 4 Colunas de Gazeta */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                stamp: 'REGISTRO I',
                title: 'Histórico & Equivalências',
                body: 'Importação segura do histórico do SIGAA. Reconhecimento imediato de disciplinas concluídas e cálculo de créditos.',
              },
              {
                stamp: 'REGISTRO II',
                title: 'Elegibilidade Automática',
                body: 'Mapeamento visual de matérias liberadas na cadeia de pré-requisitos, eliminando dúvidas na matrícula.',
              },
              {
                stamp: 'REGISTRO III',
                title: 'Ofertas SIGAA em Tempo Real',
                body: '267 turmas ativas no período com horários cruzados, salas de aula e quadro docente completo.',
              },
              {
                stamp: 'REGISTRO IV',
                title: 'Grade Livre de Colisões',
                body: 'Detecção matemática imediata de sobreposições de código (ex: 24T23 vs 46M34) com sugestões de alívio.',
              },
            ].map((col, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2rem 1.6rem',
                  borderRadius: 6,
                  background: 'rgba(32, 23, 15, 0.9)',
                  border: '1.5px solid #4D3927',
                  borderTop: '4px solid #B83218',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 230,
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B83218';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#4D3927';
                  e.currentTarget.style.borderTopColor = '#B83218';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    color: '#B83218',
                  }}
                >
                  {col.stamp}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#FFF9F0',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {col.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      fontFamily: "'Newsreader', serif",
                      lineHeight: 1.6,
                      color: '#C9B8A2',
                      margin: 0,
                    }}
                  >
                    {col.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 03 — CASOS DE USO (3 CARTÕES CLÁSSICOS DE ARTE JORNAL)
      ==================================================================== */}
      <section id="casos" className="landing-flow-section" style={{ paddingTop: '6rem' }}>
        <div className="section-stamp" aria-hidden="true">
          CADERNO 03
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <p className="landing-kicker">Crônicas de Uso</p>
          <div style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: '#FFF9F0',
              }}
            >
              O mesmo jornal atende a momentos distintos da graduação.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Card 1: Papel Jornal Autêntico Bege Claro */}
            <div
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 8,
                background: '#F4EBD9',
                color: '#1C150E',
                border: '2px solid #3E2F20',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 330,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#735438',
                }}
              >
                RELATO MATRÍCULA
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                    color: '#1C150E',
                  }}
                >
                  Planejamento Semestral
                </h3>
                <p
                  style={{
                    fontSize: '0.96rem',
                    fontFamily: "'Newsreader', serif",
                    lineHeight: 1.6,
                    color: '#423326',
                    margin: 0,
                  }}
                >
                  Compare turmas, horários de aula e corpo docente para montar sua grade com previsibilidade e sem surpresas na confirmação.
                </p>
              </div>
            </div>

            {/* Card 2: Carimbo Vermelho de Jornal */}
            <div
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 8,
                background: '#B83218',
                color: '#FFF9F0',
                border: '2px solid #4D1206',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 330,
                boxShadow: '0 12px 30px rgba(184, 50, 24, 0.4)',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#FFE2DC',
                }}
              >
                ALERTA EDITORIAL
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                    color: '#FFF9F0',
                  }}
                >
                  Resolução de Conflitos
                </h3>
                <p
                  style={{
                    fontSize: '0.96rem',
                    fontFamily: "'Newsreader', serif",
                    lineHeight: 1.6,
                    color: '#FFF1EE',
                    margin: 0,
                  }}
                >
                  Identifique no ato sobreposições de código de horário do SIGAA e teste combinações alternativas com um único clique.
                </p>
              </div>
            </div>

            {/* Card 3: Nanquim Profundo de Imprensa */}
            <div
              style={{
                padding: '2.5rem 2rem',
                borderRadius: 8,
                background: '#241B13',
                color: '#F7F1E5',
                border: '2px solid #543E2C',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 330,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.55)',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#C9B6A1',
                }}
              >
                ARQUIVO FORMANDOS
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                    color: '#FFF9F0',
                  }}
                >
                  Integralização de Curso
                </h3>
                <p
                  style={{
                    fontSize: '0.96rem',
                    fontFamily: "'Newsreader', serif",
                    lineHeight: 1.6,
                    color: '#D4C6B4',
                    margin: 0,
                  }}
                >
                  Acompanhe a barra de progresso curricular, créditos obrigatórios cursados, optativas pendentes e estimativa real do semestre de colação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 04 — AS 5 ENGENHARIAS DA FGA (STAMP 04)
      ==================================================================== */}
      <section id="metodo" className="landing-flow-section">
        <div className="section-stamp" aria-hidden="true">
          CADERNO 04
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="landing-kicker">Cursos Ativos FGA</p>
            <h2
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: '#FFF9F0',
              }}
            >
              O ecossistema das cinco engenharias do Gama.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              { code: 'FGA-SW', name: 'Engenharia de Software', hours: '3720h', color: '#B83218' },
              { code: 'FGA-AERO', name: 'Engenharia Aeroespacial', hours: '3780h', color: '#8C5828' },
              { code: 'FGA-AUTO', name: 'Engenharia Automotiva', hours: '3750h', color: '#A06A32' },
              { code: 'FGA-ELET', name: 'Engenharia Eletrônica', hours: '3720h', color: '#735438' },
              { code: 'FGA-ENERG', name: 'Engenharia de Energia', hours: '3750h', color: '#5C442D' },
            ].map((eng, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.8rem',
                  borderRadius: 6,
                  border: '1.5px solid #4D3927',
                  background: 'rgba(30, 22, 14, 0.88)',
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
                      color: '#B83218',
                      border: '1px solid #B83218',
                      padding: '2px 6px',
                      borderRadius: 3,
                    }}
                  >
                    {eng.code}
                  </span>
                  <span style={{ fontSize: '11px', color: '#C9B6A1', fontFamily: 'var(--font-mono)' }}>
                    {eng.hours}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '1.2rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 800,
                      color: '#FFF9F0',
                    }}
                  >
                    {eng.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#A89680', marginTop: 4 }}>
                    Campus FGA · UnB Gama
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 05 — EDITORIAL CONTEXTUAL (FUNDO PAPEL DE JORNAL)
      ==================================================================== */}
      <section
        id="inteligencia"
        className="landing-flow-section"
        style={{
          background: '#F4EBD9',
          color: '#1C150E',
          borderBottom: '3px solid #3E2F20',
        }}
      >
        <div className="section-stamp section-stamp--dark" aria-hidden="true">
          EDITORIAL 05
        </div>

        <div style={{ maxWidth: 1480, marginInline: 'auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="landing-kicker" style={{ color: '#B83218' }}>
              Coluna de Opinião &amp; Algoritmo
            </p>
            <h2
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 900,
                lineHeight: 0.95,
                color: '#1C150E',
              }}
            >
              Os dados explicam.
              <br />
              O KEPLER ajuda a agir.
            </h2>
            <p
              style={{
                maxWidth: '36rem',
                marginTop: '1.25rem',
                fontSize: '1.05rem',
                fontFamily: "'Newsreader', serif",
                lineHeight: 1.7,
                color: '#3E2F20',
              }}
            >
              Ele analisa o histórico acadêmico do estudante, aponta gargalos curriculares e matérias trancadoras, traduzindo resoluções da UnB em decisões claras para o próximo semestre.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onEnterSimulator(0)}
              style={{
                padding: '0.85rem 1.8rem',
                borderRadius: 4,
                background: '#B83218',
                color: '#FFF9F0',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 14px rgba(184, 50, 24, 0.4)',
              }}
            >
              Simular Grade Agora ➔
            </button>
            {onOpenFlowchart && (
              <button
                onClick={onOpenFlowchart}
                style={{
                  padding: '0.85rem 1.8rem',
                  borderRadius: 4,
                  background: 'transparent',
                  border: '1.5px solid #3E2F20',
                  color: '#1C150E',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                Abrir Fluxograma Interativo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 06 — AMBIENTE DO ESTUDANTE COM ÓRBITA KEPLER
      ==================================================================== */}
      <section
        id="acesso"
        className="landing-flow-section"
        style={{ minHeight: '75svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <div className="section-stamp" aria-hidden="true">
          ARQUIVO 06
        </div>

        {/* Órbitas Cartográficas em Nanquim e Carimbo Vermelho */}
        <div className="access-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#B83218',
              boxShadow: '0 0 24px rgba(184, 50, 24, 0.8)',
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1480, marginInline: 'auto', width: '100%' }}>
          <p className="landing-kicker">Ambiente Acadêmico</p>
          <div style={{ maxWidth: '48rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: '#FFF9F0',
                marginBottom: '1.5rem',
              }}
            >
              Sua trajetória acadêmica organizada com clareza.
            </h2>
            <p
              style={{
                fontSize: '1rem',
                fontFamily: "'Newsreader', serif",
                lineHeight: 1.6,
                color: '#C9B6A1',
                marginBottom: '2rem',
              }}
            >
              Dados oficiais do SIGAA com fonte única de verdade. Planeje sua graduação com autonomia e precisão.
            </p>
            <button onClick={() => onEnterSimulator(0)} className="btn-enter-radar">
              Abrir Simulador KEPLER ➔
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          RODAPÉ DE IMPRENSA
      ==================================================================== */}
      <footer
        style={{
          borderTop: '2px solid #3D2D1D',
          padding: '2rem 1.5rem',
          background: '#161009',
        }}
      >
        <div
          style={{
            maxWidth: 1480,
            marginInline: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '10.5px',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#A89680',
          }}
        >
          <span>KEPLER GAZETTE · PLANEJAMENTO ACADÊMICO FGA / UNB</span>
          <span>BRASÍLIA · EDIÇÃO 2026</span>
        </div>
      </footer>

      {/* ====================================================================
          BOTÃO FLUTUANTE DA PÁGINA DOS LIVROS (SELO EDITORIAL)
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

const LANDING_DESIGN_KEY = 'kepler-landing-design';

export const TELAINIcial: React.FC<TELAINIcialProps> = (props) => {
  const [design, setDesign] = useState<'gazette' | 'bureau'>(() => {
    if (typeof window === 'undefined') return 'gazette';
    const requestedDesign = new URLSearchParams(window.location.search).get('design');
    if (requestedDesign === 'bureau' || requestedDesign === 'gazette') return requestedDesign;
    return window.localStorage.getItem(LANDING_DESIGN_KEY) === 'bureau' ? 'bureau' : 'gazette';
  });

  const toggleDesign = () => {
    setDesign((current) => {
      const next = current === 'gazette' ? 'bureau' : 'gazette';
      window.localStorage.setItem(LANDING_DESIGN_KEY, next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
  };

  if (design === 'bureau') {
    return <TELAINIcialBureau {...props} onToggleDesign={toggleDesign} />;
  }

  return <GazetteLanding {...props} onToggleDesign={toggleDesign} />;
};
