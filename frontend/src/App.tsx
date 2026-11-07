import React, { useEffect, useMemo, useState } from 'react';
import { KeplerState, OfferingItem, ScreenId, SubjectItem } from './types';
import { BookStoreScreen } from './BookStoreScreen';
import { DataSightLandingScreen } from './DataSightLandingScreen';

const COLOR_HEX: Record<string, string> = {
  orange: '#FF5A1F',
  green: '#10B981',
  cyan: '#38BDF8',
  sand: '#E5D9B6',
  blue: '#60A5FA',
  white: '#FFFFFF',
  muted: '#94A3B8',
};

const COLOR_BG: Record<string, string> = {
  orange: 'rgba(255, 90, 31, 0.16)',
  green: 'rgba(16, 185, 129, 0.16)',
  cyan: 'rgba(56, 189, 248, 0.16)',
  sand: 'rgba(229, 217, 182, 0.13)',
  blue: 'rgba(96, 165, 250, 0.16)',
  muted: 'rgba(15, 23, 42, 0.45)',
};

export function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('landing');
  const [backdropMode, setBackdropMode] = useState<'obsidian-blur' | 'journal-blue' | 'vision-lounge'>('journal-blue');
  const [state, setState] = useState<KeplerState | null>(null);
  const [selectedSubjCode, setSelectedSubjCode] = useState<string>('FGA0146');
  const [fluxoTab, setFluxoTab] = useState<string>('Todas');
  const [fluxoSearch, setFluxoSearch] = useState<string>('');
  const [offerSearch, setOfferSearch] = useState<string>('');
  const [offerTurnoFilter, setOfferTurnoFilter] = useState<string>('Todos');
  const [onlyEligible, setOnlyEligible] = useState<boolean>(false);
  const [compactMatrix, setCompactMatrix] = useState<boolean>(false);
  const [hubPrompt, setHubPrompt] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    document.body.setAttribute('data-backdrop', backdropMode);
  }, [backdropMode]);

  useEffect(() => {
    fetch('/api/state')
      .then((r) => r.json())
      .then((data: KeplerState) => setState(data))
      .catch((err) => console.error('Erro ao carregar API FastAPI:', err));
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSubjectStateChange = async (
    code: string,
    newState: 'Não iniciada' | 'Cursando' | 'Concluída'
  ) => {
    try {
      const res = await fetch(`/api/subjects/${code}/state`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState }),
      });
      if (res.ok) {
        const refreshed = await fetch('/api/state').then((r) => r.json());
        setState(refreshed);
        showToast(`Estado de ${code} atualizado para "${newState}"`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleOffering = async (offeringId: string) => {
    try {
      const res = await fetch('/api/schedule/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offering_id: offeringId }),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.detail || 'Não foi possível alterar a turma');
        return;
      }
      const refreshed = await fetch('/api/state').then((r) => r.json());
      setState(refreshed);
      showToast('Grade Principal 2026/2 atualizada sem conflitos!');
    } catch (e) {
      console.error(e);
    }
  };

  const selectedOfferings = useMemo(
    () => (state ? state.offerings.filter((o) => o.selected) : []),
    [state]
  );

  const selectedCredits = useMemo(
    () => selectedOfferings.reduce((acc, o) => acc + o.credits, 0),
    [selectedOfferings]
  );

  const selectedHours = useMemo(
    () => selectedOfferings.reduce((acc, o) => acc + o.hours, 0),
    [selectedOfferings]
  );

  const inspectedSubject: SubjectItem | undefined = useMemo(() => {
    if (!state) return undefined;
    return (
      state.subjects.find((s) => s.code === selectedSubjCode) || state.subjects[0]
    );
  }, [state, selectedSubjCode]);

  if (!state) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#050505',
          color: '#FFFFFF',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#FF5A1F',
              letterSpacing: '0.14em',
              marginBottom: 8,
            }}
          >
            KEPLER V2.4 · FASTAPI + REACT
          </div>
          <div>Carregando grafo de requisitos e 267 turmas do SIGAA...</div>
        </div>
      </div>
    );
  }

  const navItems: {
    id: ScreenId;
    num: string;
    label: string;
    sub: string;
    count: string;
  }[] = [
    {
      id: 0,
      num: '00',
      label: 'Hub Inicial (Data Sight)',
      sub: 'Central de comando',
      count: 'IA/Cmd',
    },
    {
      id: 1,
      num: '01',
      label: 'Progresso & Fluxo',
      sub: '63% concluído',
      count: '38',
    },
    {
      id: 2,
      num: '02',
      label: 'Buscar Ofertas',
      sub: 'SIGAA 2026/2',
      count: '267',
    },
    {
      id: 3,
      num: '03',
      label: 'Grade Semanal',
      sub: 'Simulação Primária',
      count: `${selectedCredits}cr`,
    },
    {
      id: 4,
      num: '04',
      label: 'Simulador de Matrícula',
      sub: 'Grafo de pré-req',
      count: '1ª Fase',
    },
    {
      id: 5,
      num: '05',
      label: 'Atlas UnB (5 Campus 3D)',
      sub: 'Darcy, Gama FCTE, FCE, FUP...',
      count: '3D',
    },
  ];

  if (activeScreen === 'landing') {
    return (
      <DataSightLandingScreen
        onGoToBookStore={() => setActiveScreen(5)}
        onEnterSimulator={(scr) => setActiveScreen((scr as ScreenId) ?? 0)}
        onOpenFlowchart={() => setActiveScreen(1)}
      />
    );
  }

  return (
    <>
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      <div className="kepler-shell">
      {/* ====================================================================
          SIDEBAR ESQUERDA (264px — Identidade Data Sight Dark + Laranja)
      ==================================================================== */}
      <aside className="sidebar">
        <div
          className="brand-row"
          onClick={() => setActiveScreen('landing')}
          style={{ cursor: 'pointer' }}
          title="Clique para voltar à Página Inicial (Data Sight)"
        >
          <div className="brand-squircle">
            <div className="brand-orbit">
              <div className="brand-core" />
            </div>
          </div>
          <div>
            <div className="brand-title-line">
              <span className="brand-title">KEPLER</span>
              <span className="badge orange" style={{ padding: '1px 6px', fontSize: 9 }}>
                v2.4
              </span>
            </div>
            <div className="brand-sub">FGA · UNB · PLANEJADOR</div>
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="course-context-box">
          <div className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
            CURSO &amp; CURRÍCULO ATIVO
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--text-white)',
              marginTop: 4,
            }}
          >
            {state.profile.course}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--text-secondary)', marginTop: 3 }}>
            {state.profile.campus} · {state.profile.curriculum} · {state.profile.term}
          </div>
        </div>

        <div className="nav-section-label">SIMULADOR &amp; PLANEJAMENTO (5 TELAS)</div>
        <nav className="nav-list">
          <button
            className="nav-item"
            onClick={() => setActiveScreen('landing')}
            style={{
              background: 'rgba(255, 90, 31, 0.08)',
              border: '1px solid rgba(255, 90, 31, 0.25)',
              marginBottom: 6,
            }}
          >
            <div className="nav-item-left">
              <span className="nav-num" style={{ color: '#FF5A1F' }}>✦</span>
              <div>
                <div className="nav-label" style={{ color: '#FF5A1F' }}>Início · Data Sight</div>
                <div className="nav-sub">Carpas Koi &amp; Visão Geral</div>
              </div>
            </div>
            <span className="badge orange">Yin Yang</span>
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
              onClick={() => setActiveScreen(item.id)}
            >
              <div className="nav-item-left">
                <span className="nav-num">{item.num}</span>
                <div>
                  <div className="nav-label">{item.label}</div>
                  <div className="nav-sub">{item.sub}</div>
                </div>
              </div>
              <span className={`badge ${activeScreen === item.id ? 'orange' : ''}`}>
                {item.count}
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="nav-section-label">VISÕES DO CURRÍCULO (FONTE ÚNICA)</div>
        <div className="proj-list">
          {[
            { label: 'Disciplinas Concluídas', val: '24 / 38', col: '#19A47A', tab: 'Concluídas' },
            { label: 'Elegíveis neste Período', val: '09 liberadas', col: '#FF5A1F', tab: 'Elegíveis Agora' },
            { label: 'Em Curso (2026/2)', val: `${selectedOfferings.length} turmas`, col: '#D6CCB2', tab: 'Cursando' },
            { label: 'Pendentes no Fluxo', val: '09 matérias', col: '#9E9EA6', tab: 'Pendentes' },
            { label: 'Com Reprovação / Atenção', val: '01 alerta', col: '#FF6A2B', tab: 'Com Reprovação' },
          ].map((proj) => (
            <div
              key={proj.label}
              className="proj-row"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setFluxoTab(proj.tab);
                setActiveScreen(1);
              }}
            >
              <span style={{ color: 'var(--text-ink)', fontWeight: 500 }}>
                <span className="proj-dot" style={{ background: proj.col }} />
                {proj.label}
              </span>
              <span style={{ color: proj.col, fontWeight: 700, fontSize: 10 }}>
                {proj.val}
              </span>
            </div>
          ))}
        </div>

        {/* IRA & Credits Widget */}
        <div className="ira-widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
              IRA ACUMULADO · DESEMPENHO
            </span>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--green-accent)' }}>
              {state.profile.ira}
            </span>
          </div>
          <div
            style={{
              height: 7,
              background: 'var(--bg-muted)',
              borderRadius: 4,
              margin: '8px 0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '82%',
                height: '100%',
                background: 'var(--green-accent)',
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 10,
              color: 'var(--text-secondary)',
            }}
          >
            <span>
              Créditos: {state.profile.credits_completed} / {state.profile.credits_total}
            </span>
            <span style={{ color: 'var(--orange-tint)', fontWeight: 700 }}>47.5%</span>
          </div>
          <div style={{ fontSize: 9, color: 'var(--green-soft)', marginTop: 6 }}>
            ● Status SIGAA: Sincronizado ({state.profile.sigaa_sync_minutes}m)
          </div>
        </div>

        {/* User Footer */}
        <div className="user-footer">
          <div className="user-avatar">{state.profile.initials}</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-white)' }}>
              {state.profile.name}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
              Eng. de Software · {state.profile.current_semester}
            </div>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 600,
                color: 'var(--green-accent)',
                marginTop: 2,
              }}
            >
              ● RLS Ativo · Conta Verificada
            </div>
          </div>
        </div>
      </aside>

      {/* ====================================================================
          ÁREA PRINCIPAL (5 TELAS DA VERSÃO PRETA)
      ==================================================================== */}
      <main style={{ minWidth: 0 }}>
        {toastMsg && (
          <div
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
              background: '#140804',
              border: '1.5px solid #FF5A1F',
              color: '#FFFFFF',
              padding: '12px 18px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600,
              boxShadow: '0 10px 30px rgba(0,0,0,0.65)',
            }}
          >
            ⚡ {toastMsg}
          </div>
        )}

        {/* ==================================================================
            TELA 00 — HUB INICIAL (INSPIRADO EM DATA SIGHT)
        ================================================================== */}
        {activeScreen === 0 && (
          <div>
            <header
              style={{
                height: 56,
                background: 'rgba(15, 23, 42, 0.42)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border-card)',
                padding: '0 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: 'var(--green-accent)',
                  letterSpacing: '0.06em',
                }}
              >
                ● GRAFO DE REQUISITOS CARREGADO · 267 TURMAS MAPEADAS
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                <span className="badge">MATRÍCULA FGA / UNB 2026/2</span>
                <span className="badge orange">MOTOR OTIMIZADOR ATIVO</span>
              </div>
            </header>

            <div className="screen-body">
              <section className="hub-hero">
                <div className="eyebrow" style={{ color: 'var(--orange-soft)', fontSize: 10 }}>
                  — INTELIGÊNCIA COMPUTACIONAL APLICADA À MATRÍCULA UNB
                </div>
                <h1 className="hub-title">
                  <span style={{ color: 'var(--text-white)', display: 'block' }}>
                    O que você quer
                  </span>
                  <span style={{ color: 'var(--orange-primary)', display: 'block' }}>
                    planejar agora?
                  </span>
                </h1>
                <p
                  style={{
                    fontSize: 13.5,
                    color: 'var(--text-secondary)',
                    maxWidth: 680,
                    margin: '0 auto',
                    lineHeight: 1.5,
                  }}
                >
                  Consulte ofertas em tempo real, simule matriz de horários sem choque e
                  descubra o caminho mais rápido para formatura.
                </p>

                {/* Command Bar Spotlight */}
                <form
                  className="cmd-box"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!hubPrompt.trim()) {
                      setActiveScreen(2);
                      return;
                    }
                    setOfferSearch(hubPrompt);
                    setActiveScreen(2);
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--orange-primary)',
                    }}
                  >
                    ⌘
                  </span>
                  <input
                    className="cmd-input"
                    value={hubPrompt}
                    onChange={(e) => setHubPrompt(e.target.value)}
                    placeholder="Pergunte algo como: 'Quais matérias destravam o 6º semestre?' ou busque turmas..."
                  />
                  <button type="submit" className="badge orange" style={{ cursor: 'pointer', padding: '6px 12px' }}>
                    BUSCAR ↵
                  </button>
                </form>

                {/* Chips de Sugestão Rápida */}
                <div className="chip-row">
                  {[
                    {
                      label: 'Quais matérias posso cursar no 5º semestre?',
                      action: () => {
                        setFluxoTab('Elegíveis Agora');
                        setActiveScreen(1);
                      },
                    },
                    {
                      label: 'Simular grade matutina sem choques',
                      action: () => setActiveScreen(3),
                    },
                    {
                      label: 'Conflitos entre FGA0138 (MDS) e FGA0003',
                      action: () => {
                        setOfferSearch('FGA');
                        setActiveScreen(2);
                      },
                    },
                    {
                      label: 'Calcular risco de reprovação e trancamento',
                      action: () => setActiveScreen(4),
                    },
                  ].map((chip) => (
                    <button key={chip.label} className="chip-btn" onClick={chip.action}>
                      {chip.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Seção Inferior: 4 Módulos Operacionais (Estilo Data Sight) */}
              <section style={{ marginTop: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>
                    <div className="eyebrow" style={{ color: 'var(--orange-primary)' }}>
                      A ARQUITETURA DO SISTEMA
                    </div>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: 'var(--text-white)',
                        marginTop: 4,
                      }}
                    >
                      Abra uma frente de planejamento
                    </h2>
                  </div>
                  <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
                    SELECIONE UM MÓDULO PARA OPERAR ↗
                  </span>
                </div>

                <div className="mod-cards-grid">
                  {[
                    {
                      num: '01',
                      title: 'Progresso & Fluxograma',
                      desc: 'Grafo completo do fluxo 2023.2, pré-requisitos, equivalências e impacto na cadeia.',
                      acc: '#FF5A1F',
                      accBg: '#1D0C06',
                      target: 1 as ScreenId,
                    },
                    {
                      num: '02',
                      title: 'Catálogo de Ofertas',
                      desc: '267 turmas normalizadas do SIGAA com filtros de turno, vagas e professores.',
                      acc: '#4CD7F6',
                      accBg: '#081E24',
                      target: 2 as ScreenId,
                    },
                    {
                      num: '03',
                      title: 'Grade Semanal UnB',
                      desc: 'Matriz M1-M5 / T23-T6 / N12 com detecção automática de 0 colidências.',
                      acc: '#19A47A',
                      accBg: '#0B1F18',
                      target: 3 as ScreenId,
                    },
                    {
                      num: '04',
                      title: 'Simulador de Matrícula',
                      desc: 'Algoritmo de prioridade para 1ª fase do SIGAA, IRA ponderado e cenários de risco.',
                      acc: '#FBBF24',
                      accBg: '#201804',
                      target: 4 as ScreenId,
                    },
                  ].map((m) => (
                    <div
                      key={m.num}
                      className="mod-card"
                      onClick={() => setActiveScreen(m.target)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          className="badge"
                          style={{
                            background: m.accBg,
                            borderColor: m.acc,
                            color: m.acc,
                          }}
                        >
                          {m.num}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>↗</span>
                      </div>

                      {/* Motivo Gráfico de Barras Verticais do Data Sight */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          gap: 9,
                          height: 110,
                          padding: '16px 6px',
                        }}
                      >
                        {[24, 42, 60, 78].map((h, i) => (
                          <div
                            key={i}
                            style={{
                              width: 5,
                              height: h,
                              borderRadius: 2,
                              background: i === 2 ? m.acc : '#1C1C22',
                            }}
                          />
                        ))}
                      </div>

                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: 'var(--text-white)',
                          marginTop: 'auto',
                        }}
                      >
                        {m.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 11,
                          color: 'var(--text-secondary)',
                          marginTop: 8,
                          lineHeight: 1.45,
                        }}
                      >
                        {m.desc}
                      </p>
                      <div
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: m.acc,
                          marginTop: 18,
                        }}
                      >
                        Acessar Módulo →
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Barra de Telemetria Geral no Rodapé do Hub */}
              <section
                style={{
                  marginTop: 22,
                  background: 'rgba(15, 23, 42, 0.48)',
                  backdropFilter: 'blur(22px)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 16,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 20,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 300 }}>
                  <div className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
                    TELEMETRIA DE CARREIRA ACADÊMICA — {state.profile.name.toUpperCase()} (MATRÍCULA{' '}
                    {state.profile.registration})
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--text-white)',
                      marginTop: 6,
                    }}
                  >
                    {state.profile.completion_pct}% Concluído · {state.profile.credits_completed} /{' '}
                    {state.profile.credits_total} Créditos · IRA {state.profile.ira} ·{' '}
                    {selectedOfferings.length} Matérias em Simulação · 0 Choques Detectados
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: '#1E1E24',
                      borderRadius: 3,
                      marginTop: 10,
                      maxWidth: 760,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${state.profile.completion_pct}%`,
                        height: '100%',
                        background: 'var(--orange-primary)',
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
                <button
                  className="badge orange"
                  style={{
                    padding: '10px 18px',
                    fontSize: 10,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    showToast('Otimização combinatória concluída: 5 turmas ideais alocadas!');
                    setActiveScreen(3);
                  }}
                >
                  RODAR OTIMIZAÇÃO TOTAL ⚡
                </button>
              </section>
            </div>
          </div>
        )}

        {/* ==================================================================
            TELA 01 — PROGRESSO & FLUXOGRAMA CURRICULAR
        ================================================================== */}
        {activeScreen === 1 && (
          <div>
            <header className="topbar">
              <div>
                <div className="eyebrow" style={{ color: 'var(--orange-bright)' }}>
                  KEPLER V2 / OPERAÇÃO CURRICULAR · VISÃO UNIFICADA
                </div>
                <div
                  style={{
                    fontSize: 15.5,
                    fontWeight: 700,
                    color: 'var(--text-white)',
                    marginTop: 3,
                  }}
                >
                  Progresso Acadêmico &amp; Fluxograma Orientado por Dados
                </div>
              </div>
              <div className="topbar-controls">
                <span className="select-pill">Curso: Eng. Software ▾</span>
                <span className="select-pill">Período: 2026/2 ▾</span>
                <button className="btn-primary" onClick={() => setActiveScreen(3)}>
                  + Simular Grade do Período 2026/2 →
                </button>
              </div>
            </header>

            <div className="screen-body">
              {/* 4 KPIs */}
              <div className="kpi-grid-4">
                {[
                  {
                    title: 'INTEGRALIZAÇÃO DO CURRÍCULO',
                    big: `${state.profile.completion_pct}%`,
                    sub: '1.920h de 3.040h concluídas',
                    accent: '#FF5A1F',
                    pill: '24 / 38 obrigatórias',
                  },
                  {
                    title: 'DISCIPLINAS ELEGÍVEIS AGORA',
                    big: '09',
                    sub: 'Liberadas para matrícula em 2026/2',
                    accent: '#19A47A',
                    pill: '+3 desbloqueadas',
                  },
                  {
                    title: 'EM CURSO NO PLANO ATUAL',
                    big: `0${selectedOfferings.length}`,
                    sub: `${selectedCredits} créditos · ${selectedHours} horas semestrais`,
                    accent: '#D6CCB2',
                    pill: 'Grade Principal',
                  },
                  {
                    title: 'ALERTA DE TRAJETÓRIA / REPROVAÇÃO',
                    big: '01',
                    sub: 'FGA0146 · Estrutura de Dados 2',
                    accent: '#FF6A2B',
                    pill: 'Tranca 3 matérias',
                  },
                ].map((kpi) => (
                  <div
                    key={kpi.title}
                    className="kpi-card"
                    style={{ '--accent-color': kpi.accent } as React.CSSProperties}
                  >
                    <div className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                      {kpi.title}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: '8px 0',
                      }}
                    >
                      <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-white)' }}>
                        {kpi.big}
                      </span>
                      <span
                        className="badge"
                        style={{
                          borderColor: 'var(--border-strong)',
                          color: kpi.accent,
                        }}
                      >
                        {kpi.pill}
                      </span>
                    </div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Projection Filter Bar */}
              <div
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  marginBottom: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {[
                    { key: 'Todas', label: 'Todas (38)' },
                    { key: 'Elegíveis Agora', label: 'Elegíveis Agora (9)' },
                    { key: 'Concluídas', label: 'Concluídas (24)' },
                    { key: 'Cursando', label: `Cursando (${selectedOfferings.length})` },
                    { key: 'Pendentes', label: 'Pendentes (9)' },
                    { key: 'Com Reprovação', label: 'Com Reprovação (1)' },
                  ].map((t) => {
                    const isOn = fluxoTab === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setFluxoTab(t.key)}
                        style={{
                          background: isOn ? 'var(--orange-bg)' : 'var(--bg-elevated)',
                          border: `1px solid ${isOn ? 'var(--orange-primary)' : 'var(--border-subtle)'}`,
                          color: isOn ? 'var(--text-white)' : 'var(--text-secondary)',
                          fontWeight: isOn ? 700 : 500,
                          fontSize: 10.5,
                          padding: '6px 12px',
                          borderRadius: 7,
                          cursor: 'pointer',
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
                <input
                  value={fluxoSearch}
                  onChange={(e) => setFluxoSearch(e.target.value)}
                  placeholder="Buscar código (FGA0146) ou matéria..."
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 7,
                    padding: '6px 12px',
                    color: 'var(--text-white)',
                    fontSize: 10.5,
                    width: 260,
                  }}
                />
              </div>

              {/* Fluxograma Columns + Right Inspector */}
              <div className="fluxo-layout">
                <div>
                  <div className="semesters-grid">
                    {[
                      {
                        sem: 2,
                        title: '2º SEMESTRE',
                        sub: '100% Concluído · 24 cr',
                        col: '#19A47A',
                      },
                      {
                        sem: 3,
                        title: '3º SEMESTRE',
                        sub: '75% Concluído · 1 em curso',
                        col: '#D6CCB2',
                      },
                      {
                        sem: 4,
                        title: '4º SEMESTRE',
                        sub: 'Foco Atual · 2 Elegíveis',
                        col: '#FF5A1F',
                      },
                      {
                        sem: 5,
                        title: '5º SEMESTRE',
                        sub: 'Próximo Ciclo · Dependências',
                        col: '#9E9EA6',
                      },
                    ].map((sCol) => {
                      const colSubjects = state.subjects.filter((subj) => {
                        if (subj.semester !== sCol.sem) return false;
                        if (
                          fluxoSearch &&
                          !`${subj.code} ${subj.name}`
                            .toLowerCase()
                            .includes(fluxoSearch.toLowerCase())
                        ) {
                          return false;
                        }
                        if (fluxoTab === 'Elegíveis Agora')
                          return subj.status.includes('ELEGÍVEL') || subj.status.includes('CORREQUISITO');
                        if (fluxoTab === 'Concluídas') return subj.status === 'CONCLUÍDA';
                        if (fluxoTab === 'Cursando') return subj.status === 'CURSANDO';
                        if (fluxoTab === 'Pendentes') return subj.status !== 'CONCLUÍDA';
                        if (fluxoTab === 'Com Reprovação') return subj.retakes > 0;
                        return true;
                      });

                      return (
                        <div key={sCol.sem} className="semester-col">
                          <div
                            className="semester-hdr"
                            style={{ '--sem-color': sCol.col } as React.CSSProperties}
                          >
                            <div
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                color: 'var(--text-white)',
                              }}
                            >
                              {sCol.title}
                            </div>
                            <div
                              style={{
                                fontSize: 9.5,
                                color: sCol.col,
                                fontWeight: 500,
                                marginTop: 2,
                              }}
                            >
                              {sCol.sub}
                            </div>
                          </div>

                          <div className="subj-list">
                            {colSubjects.map((subj) => {
                              const isSel = subj.code === selectedSubjCode;
                              const stHex = COLOR_HEX[subj.color] || '#19A47A';
                              const cardBg =
                                subj.color === 'muted'
                                  ? 'var(--bg-panel)'
                                  : COLOR_BG[subj.color] || 'var(--bg-card)';
                              return (
                                <button
                                  key={subj.code}
                                  className={`subj-card ${isSel ? 'selected' : ''}`}
                                  style={
                                    {
                                      '--st-color': stHex,
                                      background: cardBg,
                                    } as React.CSSProperties
                                  }
                                  onClick={() => setSelectedSubjCode(subj.code)}
                                >
                                  <div
                                    style={{
                                      fontSize: 10,
                                      fontWeight: 700,
                                      letterSpacing: '0.06em',
                                      color: isSel ? 'var(--orange-tint)' : 'var(--text-secondary)',
                                    }}
                                  >
                                    {subj.code}
                                  </div>
                                  <div
                                    className="badge"
                                    style={{
                                      marginTop: 5,
                                      background: 'var(--bg-main)',
                                      borderColor: stHex,
                                      color: stHex,
                                      fontSize: 8.5,
                                      width: '100%',
                                      justifyContent: 'flex-start',
                                    }}
                                  >
                                    {subj.status}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 11.5,
                                      fontWeight: 700,
                                      color: 'var(--text-white)',
                                      marginTop: 8,
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {subj.name}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 9.5,
                                      color: 'var(--text-secondary)',
                                      marginTop: 8,
                                    }}
                                  >
                                    {subj.hours}h · {subj.credits} cr · {subj.type}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 9,
                                      fontWeight: 600,
                                      color: stHex,
                                      marginTop: 4,
                                    }}
                                  >
                                    {subj.foot_note}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Flow Footer Legend Bar */}
                  <div
                    style={{
                      marginTop: 12,
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      fontSize: 10,
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    ● CONCLUÍDA (24) &nbsp;&nbsp; ● ELEGÍVEL P/ MATRÍCULA (9) &nbsp;&nbsp; ● EM
                    CURSO NO PLANO ({selectedOfferings.length}) &nbsp;&nbsp; ● BLOQUEADA POR PRÉ-REQ
                    (9) &nbsp;&nbsp; | &nbsp;&nbsp; Semestre Ideal vs. Real ativo
                  </div>
                </div>

                {/* Right Inspector Panel (RF-015) */}
                {inspectedSubject && (
                  <aside
                    style={{
                      background: 'var(--bg-card)',
                      border: '1.5px solid var(--orange-primary)',
                      borderRadius: 12,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--orange-bg-dark)',
                        padding: '14px 16px',
                      }}
                    >
                      <div className="eyebrow" style={{ color: 'var(--orange-bright)' }}>
                        INSPEÇÃO EXPLICÁVEL · RF-015
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: 'var(--sand-accent)',
                          marginTop: 4,
                        }}
                      >
                        {inspectedSubject.code} · {inspectedSubject.semester}º Semestre Ideal
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: 'var(--text-white)',
                          marginTop: 4,
                        }}
                      >
                        {inspectedSubject.name}
                      </div>
                    </div>

                    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <div className="eyebrow" style={{ color: 'var(--text-muted)', marginBottom: 6 }}>
                          ESTADO PESSOAL DA DISCIPLINA
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                          {(['Não iniciada', 'Cursando', 'Concluída'] as const).map((stName) => {
                            const active = inspectedSubject.personal_state === stName;
                            return (
                              <button
                                key={stName}
                                onClick={() => handleSubjectStateChange(inspectedSubject.code, stName)}
                                style={{
                                  background: active ? 'var(--orange-bg)' : 'var(--bg-elevated)',
                                  border: `1px solid ${active ? 'var(--orange-primary)' : 'var(--border-card)'}`,
                                  color: active ? 'var(--text-white)' : 'var(--text-secondary)',
                                  fontWeight: active ? 700 : 500,
                                  fontSize: 9.5,
                                  padding: '7px 4px',
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                }}
                              >
                                {stName}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Diagnóstico de Elegibilidade */}
                      <div
                        style={{
                          background: 'var(--bg-panel)',
                          border: '1px solid var(--border-card)',
                          borderRadius: 9,
                          padding: 12,
                        }}
                      >
                        <div className="eyebrow" style={{ color: 'var(--green-accent)' }}>
                          DIAGNÓSTICO DE ELEGIBILIDADE
                        </div>
                        <div
                          style={{
                            fontSize: 10.5,
                            fontWeight: 600,
                            color: 'var(--text-white)',
                            marginTop: 8,
                          }}
                        >
                          ✓ Pré-requisitos:{' '}
                          {inspectedSubject.prerequisites.length > 0
                            ? inspectedSubject.prerequisites.join(', ')
                            : 'Nenhum exigido'}
                        </div>
                        <div style={{ fontSize: 9.5, color: 'var(--text-secondary)', marginTop: 2 }}>
                          Validação curricular no fluxo 2023.2
                        </div>
                        <div
                          style={{
                            fontSize: 10.5,
                            fontWeight: 600,
                            color: 'var(--text-white)',
                            marginTop: 8,
                          }}
                        >
                          ✓ Oferta disponível em 2026/2
                        </div>
                        <div style={{ fontSize: 9.5, color: 'var(--green-soft)', marginTop: 2 }}>
                          {inspectedSubject.offerings_summary}
                        </div>
                      </div>

                      {/* Histórico & Impacto na Cadeia */}
                      <div
                        style={{
                          background: 'var(--orange-bg-dark)',
                          border: '1px solid rgba(255, 90, 31, 0.4)',
                          borderRadius: 9,
                          padding: 12,
                        }}
                      >
                        <div className="eyebrow" style={{ color: 'var(--orange-bright)' }}>
                          HISTÓRICO &amp; IMPACTO NA CADEIA
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-ink)', marginTop: 8 }}>
                          • Semestre no fluxo: {inspectedSubject.semester}º | Atual: 5º
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: 'var(--orange-tint)',
                            fontWeight: 600,
                            marginTop: 4,
                          }}
                        >
                          • Tentativas registradas: {inspectedSubject.retakes} reprovação(ões)
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-ink)', marginTop: 4 }}>
                          • Dependentes diretas ({inspectedSubject.dependents.length}):
                        </div>
                        <div style={{ fontSize: 9.5, color: 'var(--sand-accent)', marginTop: 3 }}>
                          {inspectedSubject.dependents.length > 0
                            ? inspectedSubject.dependents.join(', ')
                            : 'Nenhuma matéria trancada diretamente'}
                        </div>
                      </div>

                      {/* Turmas em 2026/2 (Seleção Rápida) */}
                      <div
                        style={{
                          background: 'var(--bg-panel)',
                          border: '1px solid var(--border-card)',
                          borderRadius: 9,
                          padding: 12,
                        }}
                      >
                        <div className="eyebrow" style={{ color: 'var(--sand-accent)', marginBottom: 8 }}>
                          TURMAS EM 2026/2 (SELEÇÃO RÁPIDA)
                        </div>
                        <div
                          style={{
                            background: 'var(--green-bg)',
                            border: '1px solid var(--green-accent)',
                            borderRadius: 7,
                            padding: 9,
                            marginBottom: 8,
                          }}
                        >
                          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-white)' }}>
                            Turma 01 · Prof. Maurício Serrano
                          </div>
                          <div style={{ fontSize: 9.5, color: 'var(--green-soft)', marginTop: 2 }}>
                            35M34 (Ter/Qui 10:00–11:50) · Sem choque
                          </div>
                          <div
                            style={{
                              fontSize: 8.5,
                              fontWeight: 700,
                              color: 'var(--green-accent)',
                              marginTop: 4,
                            }}
                          >
                            ✓ COMPATÍVEL COM SUA GRADE
                          </div>
                        </div>

                        <div
                          style={{
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-card)',
                            borderRadius: 7,
                            padding: 9,
                          }}
                        >
                          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-secondary)' }}>
                            Turma 02 · Prof. John Lenon
                          </div>
                          <div style={{ fontSize: 9.5, color: 'var(--text-muted)', marginTop: 2 }}>
                            24T23 (Seg/Qua 14:00–15:45)
                          </div>
                          <div
                            style={{
                              fontSize: 8.5,
                              fontWeight: 600,
                              color: 'var(--orange-soft)',
                              marginTop: 4,
                            }}
                          >
                            ⚠ Conflita c/ FGA0003 (Compiladores 1)
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn-primary"
                        style={{ width: '100%', padding: '12px' }}
                        onClick={() => {
                          setOfferSearch(inspectedSubject.code);
                          setActiveScreen(2);
                        }}
                      >
                        Inspecionar no Catálogo de Ofertas →
                      </button>
                    </div>
                  </aside>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TELA 02 — CATÁLOGO DE OFERTAS & SIMULADOR
        ================================================================== */}
        {activeScreen === 2 && (
          <div>
            <header className="topbar">
              <div>
                <div className="eyebrow" style={{ color: 'var(--orange-bright)' }}>
                  KEPLER V2 / CATÁLOGO DE OFERTAS · 267 TURMAS NORMALIZADAS
                </div>
                <div
                  style={{
                    fontSize: 15.5,
                    fontWeight: 700,
                    color: 'var(--text-white)',
                    marginTop: 3,
                  }}
                >
                  Pesquisa de Turmas, Encontros Semanais e Validação de Conflitos
                </div>
              </div>
              <div className="topbar-controls">
                <span className="select-pill">Curso: Eng. Software ▾</span>
                <span className="select-pill">Período: 2026/2 ▾</span>
                <button className="btn-primary" onClick={() => setActiveScreen(3)}>
                  Ver Grade Semanal ({selectedOfferings.length} turmas · {selectedCredits} cr) →
                </button>
              </div>
            </header>

            <div className="screen-body">
              {/* Offer Filter Panel */}
              <div
                className="kpi-card"
                style={{ marginBottom: 16, padding: '14px 18px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <input
                    value={offerSearch}
                    onChange={(e) => setOfferSearch(e.target.value)}
                    placeholder="🔍 Buscar por código, matéria, professor ou horário (ex: 35T23)..."
                    style={{
                      flex: 1,
                      minWidth: 280,
                      background: 'var(--bg-main)',
                      border: '1px solid var(--orange-primary)',
                      borderRadius: 8,
                      padding: '9px 14px',
                      color: 'var(--text-ink)',
                      fontSize: 11,
                    }}
                  />
                  <span className="select-pill">Curso: Eng. de Software (54) ▾</span>
                  <select
                    className="select-pill"
                    value={offerTurnoFilter}
                    onChange={(e) => setOfferTurnoFilter(e.target.value)}
                  >
                    <option value="Todos">Turno: Manhã + Tarde ▾</option>
                    <option value="Manhã">Turno: Somente Manhã</option>
                    <option value="Tarde">Turno: Somente Tarde</option>
                  </select>
                  <span className="select-pill">Dia: Seg a Sex ▾</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      className={`badge ${onlyEligible ? 'orange' : ''}`}
                      style={{ cursor: 'pointer', padding: '5px 10px' }}
                      onClick={() => setOnlyEligible(!onlyEligible)}
                    >
                      ✓ Somente disciplinas elegíveis (RF-015)
                    </button>
                    <span className="badge green" style={{ padding: '5px 10px' }}>
                      ✓ Detectar choque c/ Grade Principal
                    </span>
                    <span className="badge sand" style={{ padding: '5px 10px' }}>
                      ✓ Incluir correquisitos do plano
                    </span>
                  </div>
                  <span style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>
                    Exibindo ofertas compatíveis · Catálogo 2026/2 (267 ofertas)
                  </span>
                </div>
              </div>

              <div className="fluxo-layout">
                {/* Lista de Ofertas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {state.offerings
                    .filter((off) => {
                      if (onlyEligible && !off.eligible) return false;
                      if (offerTurnoFilter !== 'Todos' && off.turno !== offerTurnoFilter)
                        return false;
                      if (
                        offerSearch &&
                        !`${off.code} ${off.name} ${off.prof} ${off.raw_code}`
                          .toLowerCase()
                          .includes(offerSearch.toLowerCase())
                      ) {
                        return false;
                      }
                      return true;
                    })
                    .map((off: OfferingItem) => {
                      const isConflict = off.status_type === 'conflict';
                      const isBlocked = off.status_type === 'blocked';
                      const isSelected = off.selected;
                      const stCol = isSelected
                        ? '#19A47A'
                        : isConflict
                        ? '#FF5A1F'
                        : isBlocked
                        ? '#717178'
                        : '#D6CCB2';

                      return (
                        <div
                          key={off.id}
                          style={{
                            background: isSelected
                              ? 'var(--green-bg)'
                              : isConflict
                              ? 'var(--orange-bg-dark)'
                              : isBlocked
                              ? 'var(--bg-panel)'
                              : 'var(--bg-card)',
                            border: `1.5px solid ${stCol}`,
                            borderRadius: 12,
                            padding: '14px 16px 14px 20px',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 14,
                              bottom: 14,
                              width: 4,
                              borderRadius: 2,
                              background: stCol,
                            }}
                          />
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              gap: 12,
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span
                                  className="badge"
                                  style={{
                                    background: 'var(--bg-main)',
                                    borderColor: 'var(--border-strong)',
                                    color: 'var(--orange-tint)',
                                  }}
                                >
                                  {off.code}
                                </span>
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: 'var(--text-white)',
                                  }}
                                >
                                  {off.name} · {off.sec}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontSize: 10.5,
                                  color: 'var(--text-secondary)',
                                  marginTop: 4,
                                  marginLeft: 2,
                                }}
                              >
                                {off.credits_meta}
                              </div>
                            </div>

                            <span
                              className="badge"
                              style={{
                                background: 'var(--bg-main)',
                                borderColor: stCol,
                                color: stCol,
                              }}
                            >
                              {off.status_badge}
                            </span>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 12,
                              marginTop: 12,
                              flexWrap: 'wrap',
                            }}
                          >
                            <span style={{ fontSize: 11, color: 'var(--text-ink)', fontWeight: 500 }}>
                              Docente: {off.prof}
                            </span>
                            <span className="badge sand">{off.raw_code}</span>
                            <span style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>
                              {off.meetings}
                            </span>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 12,
                              marginTop: 12,
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                background: 'var(--bg-main)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 6,
                                padding: '8px 12px',
                                fontSize: 10,
                                fontWeight: 600,
                                color: stCol,
                              }}
                            >
                              {off.explain}
                            </div>

                            <button
                              onClick={() => handleToggleOffering(off.id)}
                              style={{
                                background: isSelected
                                  ? 'rgba(16, 185, 129, 0.22)'
                                  : isConflict
                                  ? 'var(--orange-bg)'
                                  : isBlocked
                                  ? 'var(--bg-elevated)'
                                  : 'var(--orange-primary)',
                                border: `1px solid ${stCol}`,
                                color: isSelected
                                  ? 'var(--green-soft)'
                                  : isConflict
                                  ? 'var(--orange-tint)'
                                  : isBlocked
                                  ? 'var(--text-muted)'
                                  : 'var(--text-white)',
                                borderRadius: 8,
                                padding: '10px 16px',
                                fontSize: 11,
                                fontWeight: 700,
                                cursor: isBlocked ? 'not-allowed' : 'pointer',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {isSelected
                                ? '✓ Na Grade (Remover)'
                                : isConflict
                                ? 'Choque Evitado'
                                : isBlocked
                                ? 'Requisito Pendente'
                                : '+ Adicionar à Grade'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Coluna Direita: Resumo da Grade Principal & Parser Inspector */}
                <aside
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 12,
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div>
                    <div className="eyebrow" style={{ color: 'var(--orange-bright)' }}>
                      SIMULAÇÃO PRIMÁRIA · v1.2
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: 'var(--text-white)',
                        marginTop: 3,
                      }}
                    >
                      Grade Principal 2026/2
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 9,
                      padding: 12,
                    }}
                  >
                    <div className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                      CRÉDITOS SELECIONADOS (RF-029)
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: 'var(--text-white)',
                        marginTop: 4,
                      }}
                    >
                      {selectedCredits} / 32 máx · {selectedHours}h
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: 'var(--bg-muted)',
                        borderRadius: 4,
                        marginTop: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(100, (selectedCredits / 32) * 100)}%`,
                          height: '100%',
                          background: 'var(--orange-primary)',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="eyebrow" style={{ color: 'var(--text-muted)', marginBottom: 8 }}>
                      MINHA SELEÇÃO ({selectedOfferings.length} TURMAS)
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {selectedOfferings.map((sm) => (
                        <div
                          key={sm.id}
                          style={{
                            background: 'var(--bg-panel)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 8,
                            padding: '8px 10px 8px 14px',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 7,
                              bottom: 7,
                              width: 3,
                              borderRadius: 2,
                              background: COLOR_HEX[sm.accent] || '#FF5A1F',
                            }}
                          />
                          <div>
                            <div
                              style={{
                                fontSize: 10.5,
                                fontWeight: 700,
                                color: 'var(--text-white)',
                              }}
                            >
                              {sm.code} · {sm.short_name}
                            </div>
                            <div style={{ fontSize: 9.5, color: 'var(--text-secondary)', marginTop: 2 }}>
                              {sm.sec_short} · {sm.raw_code} · {sm.days_summary} ({sm.credits} cr)
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggleOffering(sm.id)}
                            title="Remover da grade"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              fontSize: 15,
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parser Box */}
                  <div
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 10,
                      padding: 12,
                      fontSize: 9.5,
                      lineHeight: 1.6,
                    }}
                  >
                    <div className="eyebrow" style={{ color: 'var(--sand-accent)' }}>
                      PADRONIZAÇÃO DE SLOTS UNB (M/T/N)
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: 'var(--orange-tint)',
                        margin: '4px 0 6px',
                      }}
                    >
                      Granularidade M1–M5 · T1–T6 · N12
                    </div>
                    <div>• M1 (08:00–08:50) | M2 (08:55–09:45)</div>
                    <div>• M3 (10:00–10:50) | M4 (10:55–11:45)</div>
                    <div style={{ color: 'var(--green-soft)' }}>
                      • M5 (12:00–12:50 · Intervalo RU Livre)
                    </div>
                    <div>• T23 (14:00–15:45) | T45 (16:00–17:45)</div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      • T6 (18:00–18:50) | N12 (19:00–20:45)
                    </div>
                    <div
                      style={{
                        color: 'var(--orange-soft)',
                        fontWeight: 600,
                        marginTop: 4,
                      }}
                    >
                      ✓ 6M1234 expande em 4 blocos contínuos
                    </div>
                  </div>

                  <button
                    className="btn-primary"
                    style={{ width: '100%', padding: 12 }}
                    onClick={() => setActiveScreen(3)}
                  >
                    Abrir Planejador de Grade 2026/2 →
                  </button>
                </aside>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TELA 03 — GRADE SEMANAL UNB & DETECTOR DE CONFLITOS
        ================================================================== */}
        {activeScreen === 3 && (
          <div>
            <header
              style={{
                height: 52,
                background: 'var(--bg-main)',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: 9.5 }}>
                FACULDADE DO GAMA (FGA) / ENGENHARIA DE SOFTWARE / CURRÍCULO 2023.2
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="badge green">● Status SIGAA: Sincronizado</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                  Atualizado há 12 min
                </span>
              </div>
            </header>

            <div className="screen-body">
              {/* 1. Sync Toast Banner */}
              <div
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 9,
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--green-accent)',
                    }}
                  />
                  <span className="eyebrow" style={{ color: 'var(--green-accent)', fontSize: 9.5 }}>
                    MOTOR KEPLER V2.4
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                    Algoritmo de conciliação ativo: 0 colisões detectadas entre 14 ofertas simuladas
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>
                    Matriz SIGAA 2026/2
                  </span>
                  <span className="badge orange">FGA Presencial</span>
                </div>
              </div>

              {/* 2. Header de Ações e Resumo */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h1 style={{ fontSize: 20.5, fontWeight: 800, color: 'var(--text-white)' }}>
                      Planejador de Grade — 2026/2
                    </h1>
                    <span className="badge green">✓ Sem conflitos de horário</span>
                    <span className="badge">Simulação Primária · v1.2</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                    {selectedOfferings.length} turmas selecionadas · {selectedCredits} créditos ·{' '}
                    {selectedHours} horas de carga horária semestral
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    className="select-pill"
                    style={{ cursor: 'pointer', fontWeight: 700 }}
                    onClick={() => showToast('Link de compartilhamento somente-leitura copiado!')}
                  >
                    Compartilhar
                  </button>
                  <button
                    className="select-pill"
                    style={{ cursor: 'pointer', fontWeight: 700 }}
                    onClick={() => showToast('Exportando calendário .iCal / PDF da grade 2026/2...')}
                  >
                    Exportar .iCal / PDF
                  </button>
                  <button
                    className="select-pill"
                    style={{
                      cursor: 'pointer',
                      fontWeight: 700,
                      color: 'var(--sand-accent)',
                      borderColor: 'var(--border-strong)',
                    }}
                    onClick={() => setActiveScreen(4)}
                  >
                    + Nova Simulação
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => showToast('Grade Principal 2026/2 salva com sucesso!')}
                  >
                    Salvar Grade Principal
                  </button>
                </div>
              </div>

              {/* 3. 4 Mini Cards de Estatísticas */}
              <div className="kpi-grid-4">
                <div
                  className="kpi-card"
                  style={{ '--accent-color': '#FF5A1F' } as React.CSSProperties}
                >
                  <div className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                    CRÉDITOS SELECIONADOS
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-white)' }}>
                      {selectedCredits}
                    </span>{' '}
                    <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>/ 32 máx</span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: 'var(--bg-muted)',
                      borderRadius: 3,
                      marginTop: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, (selectedCredits / 32) * 100)}%`,
                        height: '100%',
                        background: 'var(--orange-primary)',
                      }}
                    />
                  </div>
                </div>

                <div
                  className="kpi-card"
                  style={{ '--accent-color': '#19A47A' } as React.CSSProperties}
                >
                  <div className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                    CARGA SEMANAL
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-white)' }}>
                      {selectedCredits}h
                    </span>{' '}
                    <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
                      em sala / sem
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: 'var(--green-accent)',
                      marginTop: 6,
                    }}
                  >
                    Fluxo balanceado
                  </div>
                </div>

                <div
                  className="kpi-card"
                  style={{ '--accent-color': '#D6CCB2' } as React.CSSProperties}
                >
                  <div className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                    JANELAS LIVRES
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-white)' }}>
                      3
                    </span>{' '}
                    <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>intervalos</span>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: 'var(--sand-accent)',
                      marginTop: 6,
                    }}
                  >
                    Otimizada (almoço livre)
                  </div>
                </div>

                <div
                  className="kpi-card"
                  style={{ '--accent-color': '#4CD7F6' } as React.CSSProperties}
                >
                  <div className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                    COMPOSIÇÃO
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-white)' }}>
                      {selectedOfferings.length}
                    </span>{' '}
                    <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>matérias</span>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: 'var(--cyan-accent)',
                      marginTop: 6,
                    }}
                  >
                    3 Obrigatórias · 2 Optativas
                  </div>
                </div>
              </div>

              {/* 4. Matriz Semanal + Minha Seleção */}
              <div className="schedule-layout">
                {/* A) Matriz Semanal de Ocupação */}
                <section
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 12,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <h2 style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-white)' }}>
                        Matriz Semanal de Ocupação
                      </h2>
                      <span className="badge sand">Padronização UnB (M/T/N)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        className={`badge ${compactMatrix ? 'orange' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCompactMatrix(true)}
                      >
                        Compactar
                      </button>
                      <button
                        className={`badge ${!compactMatrix ? 'orange' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setCompactMatrix(false)}
                      >
                        Expandido
                      </button>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: 'var(--green-accent)',
                        }}
                      >
                        ● 100% Presencial FGA
                      </span>
                    </div>
                  </div>

                  {/* Cabeçalho das 7 colunas */}
                  <div
                    className="matrix-grid-row"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 7,
                      padding: '7px 4px',
                      marginBottom: 8,
                    }}
                  >
                    {[
                      'SLOT / TURNO',
                      'Segunda (2)',
                      'Terça (3)',
                      'Quarta (4)',
                      'Quinta (5)',
                      'Sexta (6)',
                      'Sábado (7)',
                    ].map((colName, idx) => (
                      <div
                        key={colName}
                        style={{
                          paddingLeft: 8,
                          fontSize: idx === 0 ? 8.5 : 10.5,
                          fontWeight: 700,
                          color: idx === 0 || idx === 6 ? 'var(--text-secondary)' : 'var(--text-white)',
                        }}
                      >
                        {colName}
                      </div>
                    ))}
                  </div>

                  {/* TURNO MATUTINO */}
                  <div
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 5,
                      padding: '4px 10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <span className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
                      TURNO MATUTINO
                    </span>
                    <span style={{ fontSize: 8.5, color: 'var(--text-muted)', fontWeight: 600 }}>
                      08:00 — 12:50
                    </span>
                  </div>

                  {(
                    [
                      { code: 'M1', time: '08:00–08:50' },
                      { code: 'M2', time: '08:55–09:45' },
                      { code: 'M3', time: '10:00–10:50' },
                      { code: 'M4', time: '10:55–11:45' },
                    ] as const
                  ).map((row) => (
                    <div key={row.code} className="matrix-grid-row">
                      <div className="slot-cell">
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: 'var(--orange-tint)',
                          }}
                        >
                          {row.code}
                        </div>
                        <div style={{ fontSize: 8.5, color: 'var(--text-muted)' }}>
                          {row.time}
                        </div>
                      </div>
                      {([1, 2, 3, 4, 5, 6] as const).map((dayIdx) => {
                        const occ = selectedOfferings.find((o) =>
                          o.slots.some((s) => s.slot === row.code && s.day === dayIdx)
                        );
                        const slotMeta = occ?.slots.find(
                          (s) => s.slot === row.code && s.day === dayIdx
                        );
                        if (!occ || !slotMeta) {
                          return (
                            <div
                              key={dayIdx}
                              className="day-cell"
                              style={{
                                background: dayIdx === 6 ? '#070709' : 'var(--bg-main)',
                                alignItems: 'center',
                              }}
                            >
                              <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>
                                {dayIdx === 6 ? 'Livre' : '—'}
                              </span>
                            </div>
                          );
                        }
                        const hex = COLOR_HEX[occ.accent] || '#FF5A1F';
                        const bg = COLOR_BG[occ.accent] || '#1D0C06';
                        return (
                          <div
                            key={dayIdx}
                            className="day-cell occupied"
                            style={
                              {
                                background: bg,
                                borderColor: hex,
                                '--cell-accent': hex,
                              } as React.CSSProperties
                            }
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <span style={{ fontSize: 9, fontWeight: 700, color: hex }}>
                                {occ.code}
                              </span>
                              <span
                                style={{
                                  fontSize: 8,
                                  fontWeight: 700,
                                  color: 'var(--text-ink)',
                                }}
                              >
                                {slotMeta.badge}
                              </span>
                            </div>
                            {!compactMatrix && !slotMeta.compact && (
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 600,
                                  color: 'var(--text-white)',
                                  marginTop: 2,
                                }}
                              >
                                {occ.short_name}
                              </div>
                            )}
                            <div
                              style={{
                                fontSize: 8,
                                color: 'var(--text-secondary)',
                                marginTop: 2,
                              }}
                            >
                              {occ.room} · {occ.prof.replace('Profa. ', '').replace('Prof. ', '')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {/* M5 Intervalo Almoço RU */}
                  <div className="matrix-grid-row" style={{ marginBottom: 8 }}>
                    <div className="slot-cell">
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)' }}>
                        M5
                      </div>
                      <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>12:00–12:50</div>
                    </div>
                    <div
                      style={{
                        gridColumn: 'span 6',
                        background: 'rgba(15, 23, 42, 0.42)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 6,
                        display: 'grid',
                        placeItems: 'center',
                        padding: '8px',
                        fontSize: 9.5,
                        color: 'var(--sand-accent)',
                        fontWeight: 500,
                      }}
                    >
                      Intervalo Livre de Almoço RU / Convivência (Janela Preservada 12:00–13:55)
                    </div>
                  </div>

                  {/* TURNO VESPERTINO */}
                  <div
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 5,
                      padding: '4px 10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <span className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
                      TURNO VESPERTINO
                    </span>
                    <span style={{ fontSize: 8.5, color: 'var(--text-muted)', fontWeight: 600 }}>
                      14:00 — 18:50
                    </span>
                  </div>

                  {(
                    [
                      { code: 'T23', time: '14:00–15:45' },
                      { code: 'T45', time: '16:00–17:45' },
                    ] as const
                  ).map((row) => (
                    <div key={row.code} className="matrix-grid-row">
                      <div className="slot-cell">
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: 'var(--orange-tint)',
                          }}
                        >
                          {row.code}
                        </div>
                        <div style={{ fontSize: 8.5, color: 'var(--text-muted)' }}>
                          {row.time}
                        </div>
                      </div>
                      {([1, 2, 3, 4, 5, 6] as const).map((dayIdx) => {
                        const occ = selectedOfferings.find((o) =>
                          o.slots.some((s) => s.slot === row.code && s.day === dayIdx)
                        );
                        const slotMeta = occ?.slots.find(
                          (s) => s.slot === row.code && s.day === dayIdx
                        );
                        if (!occ || !slotMeta) {
                          return (
                            <div
                              key={dayIdx}
                              className="day-cell"
                              style={{
                                background: dayIdx === 6 ? '#070709' : 'var(--bg-main)',
                                alignItems: 'center',
                              }}
                            >
                              <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>
                                {dayIdx === 6 ? 'Livre' : '—'}
                              </span>
                            </div>
                          );
                        }
                        const hex = COLOR_HEX[occ.accent] || '#FF5A1F';
                        const bg = COLOR_BG[occ.accent] || '#1D0C06';
                        return (
                          <div
                            key={dayIdx}
                            className="day-cell occupied"
                            style={
                              {
                                background: bg,
                                borderColor: hex,
                                '--cell-accent': hex,
                              } as React.CSSProperties
                            }
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <span style={{ fontSize: 9, fontWeight: 700, color: hex }}>
                                {occ.code}
                              </span>
                              <span
                                style={{
                                  fontSize: 8,
                                  fontWeight: 700,
                                  color: 'var(--text-ink)',
                                }}
                              >
                                {slotMeta.badge}
                              </span>
                            </div>
                            {!compactMatrix && (
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 600,
                                  color: 'var(--text-white)',
                                  marginTop: 2,
                                }}
                              >
                                {occ.short_name}
                              </div>
                            )}
                            <div
                              style={{
                                fontSize: 8,
                                color: 'var(--text-secondary)',
                                marginTop: 2,
                              }}
                            >
                              {occ.room} · {occ.prof.replace('Profa. ', '').replace('Prof. ', '')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {/* T6 (18:00-18:50) */}
                  <div className="matrix-grid-row" style={{ marginBottom: 8 }}>
                    <div className="slot-cell">
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)' }}>
                        T6
                      </div>
                      <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>18:00–18:50</div>
                    </div>
                    <div
                      style={{
                        gridColumn: 'span 3',
                        background: 'var(--bg-panel)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 6,
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 9,
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)' }}>
                        Janela livre após as aulas da tarde
                      </span>
                      <span style={{ color: 'var(--sand-accent)', fontWeight: 600 }}>
                        Estudo / FGA Biblioteca
                      </span>
                    </div>
                    <div
                      style={{
                        gridColumn: 'span 2',
                        background: 'var(--orange-bg-dark)',
                        border: '1px solid var(--orange-primary)',
                        borderRadius: 6,
                        padding: '8px 10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 9,
                      }}
                    >
                      <span style={{ color: 'var(--orange-tint)', fontWeight: 700 }}>
                        ⓘ Choque evitado: SBD 2
                      </span>
                      <span className="badge orange" style={{ fontSize: 7.5, padding: '2px 5px' }}>
                        RESOLVIDO
                      </span>
                    </div>
                    <div
                      className="day-cell"
                      style={{ background: '#070709', alignItems: 'center' }}
                    >
                      <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>—</span>
                    </div>
                  </div>

                  {/* TURNO NOTURNO */}
                  <div
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 5,
                      padding: '4px 10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <span className="eyebrow" style={{ color: 'var(--orange-soft)' }}>
                      TURNO NOTURNO
                    </span>
                    <span style={{ fontSize: 8.5, color: 'var(--text-muted)', fontWeight: 600 }}>
                      19:00 — 20:45
                    </span>
                  </div>

                  <div className="matrix-grid-row" style={{ marginBottom: 10 }}>
                    <div className="slot-cell">
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)' }}>
                        N12
                      </div>
                      <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>19:00–20:45</div>
                    </div>
                    <div
                      style={{
                        gridColumn: 'span 6',
                        background: 'rgba(15, 23, 42, 0.38)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 6,
                        display: 'grid',
                        placeItems: 'center',
                        padding: '8px',
                        fontSize: 9.5,
                        color: 'var(--text-muted)',
                      }}
                    >
                      Sem compromissos noturnos alocados na simulação atual
                    </div>
                  </div>

                  {/* Legenda & Telemetria de Otimização Semanal */}
                  <div
                    style={{
                      background: 'var(--bg-panel)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 8,
                      padding: '8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                      {[
                        { l: 'Obrigatórias FGA (MDS)', c: '#FF5A1F' },
                        { l: 'Optativas / IHC', c: '#4CD7F6' },
                        { l: 'Projetos / DAS', c: '#19A47A' },
                        { l: 'Requisitos / Básico', c: '#66B3FF' },
                        { l: 'Compiladores', c: '#D6CCB2' },
                      ].map((it) => (
                        <span
                          key={it.l}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 9,
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <span
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 2,
                              background: it.c,
                            }}
                          />
                          {it.l}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--green-accent)' }}>
                      ✓ Compatível c/ matrícula em lote
                    </span>
                  </div>

                  {/* Telemetria de Otimização Semanal */}
                  <div
                    className="kpi-card"
                    style={
                      {
                        '--accent-color': '#19A47A',
                        background: 'var(--bg-panel)',
                      } as React.CSSProperties
                    }
                  >
                    <div className="eyebrow" style={{ color: 'var(--orange-bright)' }}>
                      TELEMETRIA DE OTIMIZAÇÃO SEMANAL · MOTOR KEPLER V2
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginTop: 4,
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-white)' }}>
                        Índice de Otimização Semanal: 96.4%
                      </span>
                      <span className="badge green">✓ 0 Colisões · Almoço 100% Livre</span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: 'var(--bg-muted)',
                        borderRadius: 4,
                        margin: '8px 0',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '96.4%',
                          height: '100%',
                          background: 'var(--green-accent)',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 9.5,
                        color: 'var(--text-secondary)',
                        flexWrap: 'wrap',
                        gap: 6,
                      }}
                    >
                      <span>• Densidade de Janelas: Baixa (apenas 3 intervalos úteis)</span>
                      <span style={{ color: 'var(--sand-accent)' }}>
                        • Deslocamentos Internos FGA: Sala S1 → Sala I7 → Sala I3 → Lab SS → Lab
                        MOC
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 9.5,
                        fontWeight: 600,
                        color: 'var(--text-ink)',
                        marginTop: 4,
                      }}
                    >
                      • Códigos SIGAA Consolidados:{' '}
                      {selectedOfferings.map((o) => `${o.raw_code} (${o.code})`).join(' · ')}
                    </div>
                  </div>
                </section>

                {/* B) Coluna Lateral Direita: Minha Seleção */}
                <aside
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 12,
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-white)' }}>
                      Minha Seleção
                    </h2>
                    <span className="badge orange">{selectedOfferings.length} turmas</span>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                    {selectedCredits} créditos p/ 1ª fase de matrícula SIGAA.
                  </div>

                  <div
                    style={{
                      background: 'var(--green-bg)',
                      border: '1px solid var(--green-accent)',
                      borderRadius: 8,
                      padding: '8px 10px',
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--green-soft)' }}>
                      ✓ Validação de Interseção Ativa
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--text-secondary)', marginTop: 2 }}>
                      Precedência e horários validados sem choques.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selectedOfferings.map((card) => {
                      const hex = COLOR_HEX[card.accent] || '#FF5A1F';
                      return (
                        <article
                          key={card.id}
                          style={{
                            background: 'var(--bg-panel)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 9,
                            padding: '10px 10px 10px 14px',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 8,
                              bottom: 8,
                              width: 3,
                              borderRadius: 2,
                              background: hex,
                            }}
                          />
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 10, fontWeight: 700, color: hex }}>
                                {card.code}
                              </span>
                              <span
                                className="badge"
                                style={{
                                  borderColor: hex,
                                  color: hex,
                                  fontSize: 8,
                                  padding: '1px 5px',
                                }}
                              >
                                {card.sec_short}
                              </span>
                              <span className="badge" style={{ fontSize: 8, padding: '1px 5px' }}>
                                {card.credits} cr
                              </span>
                            </div>
                            <button
                              onClick={() => handleToggleOffering(card.id)}
                              title="Remover turma"
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: 11,
                              }}
                            >
                              🗑
                            </button>
                          </div>

                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: 'var(--text-white)',
                              marginTop: 5,
                            }}
                          >
                            {card.name}
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 4,
                            }}
                          >
                            <span style={{ fontSize: 9.5, color: 'var(--text-ink)' }}>
                              {card.days_summary}
                            </span>
                            <span className="badge sand" style={{ fontSize: 8.5, padding: '1px 5px' }}>
                              {card.raw_code}
                            </span>
                          </div>

                          <div
                            style={{
                              fontSize: 9,
                              color: 'var(--text-secondary)',
                              marginTop: 4,
                            }}
                          >
                            {card.prof} · {card.room}
                          </div>

                          <div
                            style={{
                              background: 'var(--bg-main)',
                              borderRadius: 5,
                              padding: '4px 8px',
                              marginTop: 6,
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: 8.5,
                            }}
                          >
                            <span
                              style={{
                                color: card.vacancies.includes('Espera')
                                  ? 'var(--orange-tint)'
                                  : 'var(--green-soft)',
                                fontWeight: 600,
                              }}
                            >
                              {card.vacancies}
                            </span>
                            <span
                              style={{
                                color: 'var(--orange-soft)',
                                fontWeight: 700,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                setOfferSearch(card.code);
                                setActiveScreen(2);
                              }}
                            >
                              Alternar Turma ⇄
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  <button
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px', marginTop: 4 }}
                    onClick={() => setActiveScreen(2)}
                  >
                    ⊕ Adicionar Mais Matérias (/ofertas)
                  </button>
                </aside>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TELA 04 — SIMULADOR DE MATRÍCULA & GRAFO DE PRIORIDADES
        ================================================================== */}
        {activeScreen === 4 && (
          <div>
            <header className="topbar">
              <div>
                <div className="eyebrow" style={{ color: 'var(--orange-bright)' }}>
                  KEPLER V2 / SIMULADOR COMBINATÓRIO DE MATRÍCULA
                </div>
                <div
                  style={{
                    fontSize: 15.5,
                    fontWeight: 700,
                    color: 'var(--text-white)',
                    marginTop: 3,
                  }}
                >
                  Simulação de 1ª Fase SIGAA, Risco de Indeferimento &amp; Grafo Crítico
                </div>
              </div>
              <div className="topbar-controls">
                <span className="select-pill">Curso: Eng. Software ▾</span>
                <span className="select-pill">Período: 2026/2 ▾</span>
                <button
                  className="btn-primary"
                  onClick={() =>
                    showToast('Plano de Matrícula 2026/2 confirmado e salvo para a 1ª fase!')
                  }
                >
                  Confirmar Plano de Matrícula →
                </button>
              </div>
            </header>

            <div className="screen-body">
              {/* 4 KPIs */}
              <div className="kpi-grid-4">
                {state.simulator.kpis.map((k) => {
                  const col = COLOR_HEX[k.accent] || '#FF5A1F';
                  return (
                    <div
                      key={k.title}
                      className="kpi-card"
                      style={{ '--accent-color': col } as React.CSSProperties}
                    >
                      <div className="eyebrow" style={{ color: col }}>
                        {k.title}
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: 'var(--text-white)',
                          margin: '8px 0 6px',
                        }}
                      >
                        {k.value}
                      </div>
                      <div style={{ fontSize: 9.5, color: 'var(--text-secondary)' }}>{k.sub}</div>
                    </div>
                  );
                })}
              </div>

              <div className="fluxo-layout" style={{ gridTemplateColumns: '1fr 390px' }}>
                {/* Coluna Esquerda: Ordem de Prioridade 1ª Fase SIGAA */}
                <section
                  style={{
                    background: 'var(--bg-panel)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <div className="eyebrow" style={{ color: 'var(--orange-primary)', fontSize: 10 }}>
                    ORDEM DE PRIORIDADE PARA 1ª FASE DO SIGAA (CRITÉRIO UNB)
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                    O algoritmo ordena as turmas por urgência na cadeia de formatura e taxa
                    histórica de concorrência.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      marginTop: 18,
                    }}
                  >
                    {state.simulator.priorities.map((p) => {
                      const ucol = COLOR_HEX[p.accent] || '#9E9EA6';
                      return (
                        <div
                          key={p.code}
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-card)',
                            borderRadius: 8,
                            padding: '14px 16px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: 8,
                            }}
                          >
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <span className="badge orange" style={{ fontSize: 11 }}>
                                {p.pos}
                              </span>
                              <span
                                className="badge"
                                style={{ color: 'var(--text-white)', fontSize: 10 }}
                              >
                                {p.code}
                              </span>
                              <span className="badge cyan" style={{ fontSize: 10 }}>
                                {p.slots}
                              </span>
                            </div>
                            <span
                              className="badge"
                              style={{
                                background: '#160C08',
                                borderColor: ucol,
                                color: ucol,
                                fontSize: 9,
                              }}
                            >
                              {p.urgency}
                            </span>
                          </div>

                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: 'var(--text-white)',
                              marginTop: 10,
                            }}
                          >
                            {p.name}
                          </div>
                          <div
                            style={{
                              fontSize: 10.5,
                              color: 'var(--text-secondary)',
                              marginTop: 3,
                            }}
                          >
                            {p.tinfo}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Coluna Direita: Grafo da Cadeia Crítica */}
                <aside
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 12,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <div>
                    <div className="eyebrow" style={{ color: 'var(--orange-soft)', fontSize: 10 }}>
                      GRAFO DA CADEIA CRÍTICA
                    </div>
                    <h2
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: 'var(--text-white)',
                        marginTop: 4,
                      }}
                    >
                      Gargalos de Formatura
                    </h2>
                  </div>

                  {state.simulator.bottlenecks.map((g) => {
                    const gcol = COLOR_HEX[g.accent] || '#9E9EA6';
                    return (
                      <div
                        key={g.name}
                        style={{
                          background: 'var(--bg-panel)',
                          border: '1px solid var(--border-card)',
                          borderRadius: 8,
                          padding: 14,
                        }}
                      >
                        <span
                          className="badge"
                          style={{
                            background: '#1D0C06',
                            borderColor: gcol,
                            color: gcol,
                            fontSize: 8.5,
                          }}
                        >
                          {g.badge}
                        </span>
                        <div
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: 'var(--text-white)',
                            marginTop: 8,
                          }}
                        >
                          {g.name}
                        </div>
                        <p
                          style={{
                            fontSize: 10,
                            color: 'var(--text-secondary)',
                            marginTop: 6,
                            lineHeight: 1.45,
                          }}
                        >
                          {g.desc}
                        </p>
                      </div>
                    );
                  })}

                  <button
                    className="btn-primary"
                    style={{ width: '100%', padding: '13px', marginTop: 'auto' }}
                    onClick={() =>
                      showToast('Comprovante simulado SIGAA (.pdf) gerado com sucesso!')
                    }
                  >
                    Salvar e Exportar Comprovante SIGAA (.pdf)
                  </button>
                </aside>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TELA 05 — PAPER STORE / JOURNAL 3D (5 LIVROS ANIMADOS)
        ================================================================== */}
        {activeScreen === 5 && (
          <BookStoreScreen
            onNavigateScreen={(s) => setActiveScreen(s)}
            onSelectCourseToast={(msg) => showToast(msg)}
          />
        )}
      </main>
      </div>
    </>
  );
}
