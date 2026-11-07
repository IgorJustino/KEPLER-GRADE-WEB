import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  BoxColorCategory,
  CourseFlowchart,
  FlowSubject,
  getCourseFlowchart,
} from './fullFlowchartData';

interface Props {
  course: {
    code: string;
    name: string;
    campus?: string;
    unit?: string;
  };
  onClose: () => void;
  onOpenKeplerPlan?: () => void;
}

interface ArrowConnection {
  id: string;
  fromCode: string;
  toCode: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  pathD: string;
  color: string;
  colorIdx: number;
}

// Paleta de altíssimo contraste e saturação para que as linhas fiquem bem fortes na tela e no PNG/PDF
const LINE_COLORS = [
  '#D50000', // 0: Vermelho Rubi Forte
  '#0044FF', // 1: Azul Royal Elétrico
  '#00802B', // 2: Verde Esmeralda Intenso
  '#8E00CE', // 3: Roxo Imperial Vivo
  '#E64A00', // 4: Laranja Fogo Forte
  '#00768C', // 5: Azul Petróleo Intenso
  '#C2005B', // 6: Magenta / Vinho Vivo
  '#1A237E', // 7: Azul Índigo Profundo
  '#B71C1C', // 8: Carmim Imperial
  '#00604F', // 9: Verde Teal Escuro
  '#4A148C', // 10: Violeta Nobre Forte
  '#0D47A1', // 11: Azul Safira Forte
  '#BF360C', // 12: Terracota Intenso
  '#1B5E20', // 13: Verde Floresta Forte
];

// Cores oficiais do Fluxograma da FGA/UnB para os cards (Amarelo, Verde, Rosa, Laranja)
const BOX_CATEGORY_STYLES: Record<
  BoxColorCategory,
  {
    headerBg: string;
    bodyBg: string;
    footerBg: string;
    border: string;
    text: string;
    headerText: string;
    label: string;
    description: string;
  }
> = {
  amarelo: {
    headerBg: '#F9A825',
    bodyBg: '#FFE033',
    footerBg: '#FBC02D',
    border: '#111111',
    text: '#111111',
    headerText: '#111111',
    label: 'Ciclo Básico FGA',
    description: 'Núcleo Comum das Engenharias da FGA (Matemática, Física, Eletrônica Digital, Economia, Gestão e Humanidades)',
  },
  verde: {
    headerBg: '#43A047',
    bodyBg: '#81C784',
    footerBg: '#66BB6A',
    border: '#111111',
    text: '#0D1F0E',
    headerText: '#FFFFFF',
    label: 'Específicas do Curso',
    description: 'Núcleo Profissionalizante Obrigatório da Habilitação',
  },
  rosa: {
    headerBg: '#D81B60',
    bodyBg: '#F48FB1',
    footerBg: '#EC407A',
    border: '#111111',
    text: '#1F0510',
    headerText: '#FFFFFF',
    label: 'Optativas',
    description: 'Disciplinas Optativas / Cadeia de Seletividade',
  },
  laranja: {
    headerBg: '#E65100',
    bodyBg: '#FFAB73',
    footerBg: '#FF8A50',
    border: '#111111',
    text: '#1F0D03',
    headerText: '#FFFFFF',
    label: 'Projetos, Estágio e TCC',
    description: 'Projeto Integrador de Engenharia 1 e 2, Estágio Supervisionado e Trabalho de Conclusão de Curso 1 e 2',
  },
};

type ArrowDisplayMode = 'all-active' | 'classic-blue' | 'hover-only';

export const CourseFlowchartModal: React.FC<Props> = ({ course, onClose, onOpenKeplerPlan }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Obter o fluxograma correspondente (com dados 100% oficiais para as 5 engenharias do Gama)
  const flowchartData: CourseFlowchart = useMemo(() => {
    const campusName = course.campus || course.unit || 'Faculdade UnB Gama (FGA)';
    return getCourseFlowchart(course.code, course.name, campusName);
  }, [course]);

  const [arrowMode, setArrowMode] = useState<ArrowDisplayMode>('all-active');
  const [uiScale, setUiScale] = useState<number>(0.88);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [selectedSubj, setSelectedSubj] = useState<FlowSubject | null>(null);
  const [filterBoxCategory, setFilterBoxCategory] = useState<string>('todas');
  const [connections, setConnections] = useState<ArrowConnection[]>([]);
  const [svgDimensions, setSvgDimensions] = useState<{ width: number; height: number }>({ width: 2200, height: 950 });
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Dimensões escaláveis: cards mais compactos e distância maior entre eles para as linhas não se misturarem
  const cardWidth = Math.round(146 * uiScale);
  const cardHeight = Math.round(86 * uiScale);
  const colGap = Math.round(84 * uiScale);
  const rowGap = Math.round(38 * uiScale);
  const barHeight = Math.max(15, Math.round(18 * uiScale));

  // Mapa de cor exclusiva por disciplina emissora (que destrava outras matérias)
  const subjectColorMap = useMemo(() => {
    const map: Record<string, { color: string; idx: number }> = {};
    let colorCounter = 0;
    flowchartData.subjects.forEach((subj) => {
      if (subj.dependents && subj.dependents.length > 0) {
        const idx = colorCounter % LINE_COLORS.length;
        map[subj.code] = {
          color: LINE_COLORS[idx],
          idx,
        };
        colorCounter++;
      }
    });
    return map;
  }, [flowchartData]);

  // Agrupar disciplinas por semestre e ordenar pela linha horizontal (row)
  const semGroups = useMemo(() => {
    const map: Record<number, FlowSubject[]> = {};
    for (let i = 1; i <= flowchartData.semestersCount; i++) {
      map[i] = [];
    }
    flowchartData.subjects.forEach((subj) => {
      if (!map[subj.semester]) map[subj.semester] = [];
      map[subj.semester].push(subj);
    });
    Object.values(map).forEach((list) => list.sort((a, b) => (a.row ?? 0) - (b.row ?? 0)));
    return map;
  }, [flowchartData]);

  // Maior índice de linha (row) para alinhar os slots horizontalmente em todos os semestres
  const maxRowIndex = useMemo(() => {
    return flowchartData.subjects.reduce((max, s) => Math.max(max, s.row ?? 0), 0);
  }, [flowchartData]);

  // Função auxiliar para criar caminhos ortogonais com cantos suavemente arredondados
  // Garante que o trecho final (chegada na cabeça da seta) seja perfeitamente horizontal e reto
  const buildSmoothOrthogonalPath = (points: { x: number; y: number }[], radius = 8): string => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];

      const v1x = curr.x - prev.x;
      const v1y = curr.y - prev.y;
      const len1 = Math.hypot(v1x, v1y);

      const v2x = next.x - curr.x;
      const v2y = next.y - curr.y;
      const len2 = Math.hypot(v2x, v2y);

      if (len1 < 2 || len2 < 2) {
        d += ` L ${curr.x} ${curr.y}`;
        continue;
      }

      // No último segmento que chega à cabeça da seta (i === points.length - 2),
      // limita o raio para preservar um segmento reto de pelo menos 14px na ponta
      let maxR = Math.min(radius, len1 / 2, len2 / 2);
      if (i === points.length - 2) {
        maxR = Math.min(maxR, Math.max(2, len2 - 14));
      }

      const startX = curr.x - (v1x / len1) * maxR;
      const startY = curr.y - (v1y / len1) * maxR;
      const endX = curr.x + (v2x / len2) * maxR;
      const endY = curr.y + (v2y / len2) * maxR;

      d += ` L ${startX} ${startY} Q ${curr.x} ${curr.y} ${endX} ${endY}`;
    }
    const last = points[points.length - 1];
    d += ` L ${last.x} ${last.y}`;
    return d;
  };

  // Recalcular posições das setas sempre que o layout renderizar, redimensionar ou rolar
  const updateConnections = () => {
    if (!scrollAreaRef.current) return;
    const scrollEl = scrollAreaRef.current;
    const scrollRect = scrollEl.getBoundingClientRect();
    const scrollLeft = scrollEl.scrollLeft;
    const scrollTop = scrollEl.scrollTop;

    const newConnections: ArrowConnection[] = [];
    const subjectsMap = new Map<string, FlowSubject>();
    flowchartData.subjects.forEach((s) => subjectsMap.set(s.code, s));

    // Coletar caixas (bounding boxes) de todos os slots por semestre em coordenadas do SVG
    const semBoxes: Record<number, { top: number; bottom: number; left: number; right: number; code: string }[]> = {};
    flowchartData.subjects.forEach((s) => {
      const el = nodeRefs.current[s.code];
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!semBoxes[s.semester]) semBoxes[s.semester] = [];
      semBoxes[s.semester].push({
        code: s.code,
        left: r.left - scrollRect.left + scrollLeft,
        right: r.right - scrollRect.left + scrollLeft,
        top: r.top - scrollRect.top + scrollTop,
        bottom: r.bottom - scrollRect.top + scrollTop,
      });
    });

    Object.values(semBoxes).forEach((list) => list.sort((a, b) => a.top - b.top));

    const corridorUsage: Record<number, number> = {};
    const channelUsage: Record<string, number> = {};

    flowchartData.subjects.forEach((subj) => {
      const fromEl = nodeRefs.current[subj.code];
      if (!fromEl) return;
      const fromRect = fromEl.getBoundingClientRect();

      const colorEntry = subjectColorMap[subj.code] || { color: LINE_COLORS[0], idx: 0 };
      // Ordenar dependentes pela linha (row) de destino para as setas saírem ordenadas sem se cruzarem na porta do card
      const deps = [...(subj.dependents || [])].sort((a, b) => {
        const sa = subjectsMap.get(a);
        const sb = subjectsMap.get(b);
        return (sa?.row ?? 0) - (sb?.row ?? 0) || (sa?.semester ?? 0) - (sb?.semester ?? 0);
      });

      deps.forEach((depCode, depIdx) => {
        const toEl = nodeRefs.current[depCode];
        const toSubj = subjectsMap.get(depCode);
        if (!toEl || !toSubj) return;
        const toRect = toEl.getBoundingClientRect();

        const semDiff = toSubj.semester - subj.semester;
        const isSameRowDirect = subj.row !== undefined && subj.row === toSubj.row && semDiff === 1;

        const outSpreadY = isSameRowDirect
          ? 0
          : deps.length > 1
            ? (depIdx - (deps.length - 1) / 2) * (11 * uiScale)
            : 0;

        // Ordenar pré-requisitos pela linha (row) de origem para as setas chegarem ordenadas sem cruzamento
        const targetPrereqs = [...(toSubj.prereqs || [])].sort((a, b) => {
          const sa = subjectsMap.get(a);
          const sb = subjectsMap.get(b);
          return (sa?.row ?? 0) - (sb?.row ?? 0) || (sa?.semester ?? 0) - (sb?.semester ?? 0);
        });
        const inIdx = Math.max(0, targetPrereqs.indexOf(subj.code));
        const inSpreadY = isSameRowDirect
          ? 0
          : targetPrereqs.length > 1
            ? (inIdx - (targetPrereqs.length - 1) / 2) * (12 * uiScale)
            : 0;

        const x1 = fromRect.right - scrollRect.left + scrollLeft;
        const y1 = fromRect.top + fromRect.height / 2 - scrollRect.top + scrollTop + outSpreadY;

        const x2 = toRect.left - scrollRect.left + scrollLeft;
        const y2 = toRect.top + toRect.height / 2 - scrollRect.top + scrollTop + inSpreadY;

        let pathD = '';

        if (semDiff === 1 && x2 >= x1) {
          if (Math.abs(y2 - y1) < 5) {
            pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
          } else {
            const cKey = subj.semester;
            const laneIdx = corridorUsage[cKey] || 0;
            corridorUsage[cKey] = laneIdx + 1;

            const corridorWidth = x2 - x1;
            const offsets = [0.5, 0.3, 0.7, 0.18, 0.82, 0.4, 0.6, 0.24, 0.76, 0.12, 0.88];
            const laneRatio = offsets[laneIdx % offsets.length];
            const midX = x1 + corridorWidth * laneRatio;

            pathD = buildSmoothOrthogonalPath(
              [
                { x: x1, y: y1 },
                { x: midX, y: y1 },
                { x: midX, y: y2 },
                { x: x2, y: y2 },
              ],
              9
            );
          }
        } else if (semDiff > 1 && x2 >= x1) {
          // Se estiverem na mesma linha (row) e não houver nenhum card ocupando essa mesma row nos semestres intermediários, vai 100% reto!
          let hasObstacleInSameRow = false;
          if (subj.row === toSubj.row) {
            for (let s = subj.semester + 1; s < toSubj.semester; s++) {
              const found = (semGroups[s] || []).some((item) => item.row === subj.row);
              if (found) {
                hasObstacleInSameRow = true;
                break;
              }
            }
          } else {
            hasObstacleInSameRow = true;
          }

          if (!hasObstacleInSameRow && Math.abs(y2 - y1) < 7) {
            pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
          } else {
            // Desvia pelo canal horizontal livre entre as linhas (rows) com espaçamento amplo
            const refBoxes = semBoxes[1] || semBoxes[2] || [];
            const candidateChannels: { y: number; key: string }[] = [];
            if (refBoxes.length > 0) {
              candidateChannels.push({ y: refBoxes[0].top - rowGap * 0.48, key: 'top' });
              for (let rIdx = 0; rIdx <= maxRowIndex; rIdx++) {
                const slotBottom = refBoxes[0].top + rIdx * (cardHeight + rowGap) + cardHeight;
                const gapCenter = slotBottom + rowGap / 2;
                candidateChannels.push({ y: gapCenter, key: `row-gap-${rIdx}` });
              }
            } else {
              candidateChannels.push({ y: (y1 + y2) / 2, key: 'mid' });
            }

            const avgY = (y1 + y2) / 2;
            let bestChannel = candidateChannels[0];
            let minDist = Math.abs(avgY - bestChannel.y);
            for (const ch of candidateChannels) {
              const d = Math.abs(avgY - ch.y);
              if (d < minDist) {
                minDist = d;
                bestChannel = ch;
              }
            }

            const chUse = channelUsage[bestChannel.key] || 0;
            channelUsage[bestChannel.key] = chUse + 1;
            const chOffsets = [0, -6.5, 6.5, -12, 12, -3.2, 3.2, -9.5, 9.5].map((v) => v * uiScale);
            const finalChannelY = bestChannel.y + chOffsets[chUse % chOffsets.length];

            const c1Use = corridorUsage[subj.semester] || 0;
            corridorUsage[subj.semester] = c1Use + 1;
            const c2Use = corridorUsage[toSubj.semester - 1] || 0;
            corridorUsage[toSubj.semester - 1] = c2Use + 1;

            const c1X = x1 + (14 + (c1Use % 6) * 7.5) * uiScale;
            const c2X = x2 - (14 + (c2Use % 6) * 7.5) * uiScale;

            pathD = buildSmoothOrthogonalPath(
              [
                { x: x1, y: y1 },
                { x: c1X, y: y1 },
                { x: c1X, y: finalChannelY },
                { x: c2X, y: finalChannelY },
                { x: c2X, y: y2 },
                { x: x2, y: y2 },
              ],
              9
            );
          }
        } else {
          const dx = Math.max(30, Math.abs(x2 - x1) * 0.45);
          pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        }

        newConnections.push({
          id: `${subj.code}->${depCode}`,
          fromCode: subj.code,
          toCode: depCode,
          x1,
          y1,
          x2,
          y2,
          pathD,
          color: colorEntry.color,
          colorIdx: colorEntry.idx,
        });
      });
    });

    setSvgDimensions({
      width: Math.max(scrollEl.scrollWidth, 1800),
      height: Math.max(scrollEl.scrollHeight, 800),
    });
    setConnections(newConnections);
  };

  useLayoutEffect(() => {
    const rAf = requestAnimationFrame(updateConnections);
    const timer1 = setTimeout(updateConnections, 60);
    const timer2 = setTimeout(updateConnections, 220);
    const onResize = () => updateConnections();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rAf);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', onResize);
    };
  }, [flowchartData, filterBoxCategory, uiScale]);

  // Tecla ESC para fechar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Renderizar todo o fluxograma em um Canvas 3x de altíssima definição e cores fortes (para baixar PNG e exportar PDF)
  const generateHighResCanvas = (): HTMLCanvasElement | null => {
    if (!scrollAreaRef.current) return null;
    const scrollEl = scrollAreaRef.current;
    const scrollRect = scrollEl.getBoundingClientRect();
    const scrollLeft = scrollEl.scrollLeft;
    const scrollTop = scrollEl.scrollTop;

    const scale = 3;
    const headerHeight = 104;
    const footerLegendHeight = 100;
    const contentWidth = Math.max(scrollEl.scrollWidth + 40, 1950);
    const contentHeight = Math.max(scrollEl.scrollHeight + 24, 820);
    const totalWidth = contentWidth;
    const totalHeight = headerHeight + contentHeight + footerLegendHeight;

    const canvas = document.createElement('canvas');
    canvas.width = totalWidth * scale;
    canvas.height = totalHeight * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.scale(scale, scale);

    // 1. Fundo bege claro com grade técnica (blueprint) para destacar os cards
    ctx.fillStyle = '#F5EFEB';
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    // Grade sutil no canvas
    ctx.save();
    ctx.strokeStyle = 'rgba(160, 140, 120, 0.12)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < totalWidth; gx += 25) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, totalHeight);
      ctx.stroke();
    }
    for (let gy = 0; gy < totalHeight; gy += 25) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(totalWidth, gy);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Cabeçalho institucional estilo UnB / FGA
    ctx.fillStyle = '#0F2547';
    ctx.font = '900 24px Inter, system-ui, sans-serif';
    ctx.fillText('Universidade de Brasília', 28, 42);

    ctx.font = '900 26px Inter, system-ui, sans-serif';
    ctx.fillText(`Fluxograma — ${flowchartData.courseName}`, totalWidth / 2 - 220, 42);

    ctx.font = '900 22px Inter, system-ui, sans-serif';
    ctx.fillText(flowchartData.campus, totalWidth - 380, 42);

    // Legenda das 4 cores de caixas no cabeçalho
    const categories: BoxColorCategory[] = ['amarelo', 'verde', 'rosa', 'laranja'];
    let catX = 28;
    categories.forEach((cat) => {
      const st = BOX_CATEGORY_STYLES[cat];
      ctx.fillStyle = st.bodyBg;
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2;
      ctx.fillRect(catX, 62, 22, 16);
      ctx.strokeRect(catX, 62, 22, 16);

      ctx.fillStyle = '#0F172A';
      ctx.font = '800 12px Inter, system-ui, sans-serif';
      ctx.fillText(st.label, catX + 28, 75);
      catX += ctx.measureText(st.label).width + 58;
    });

    ctx.save();
    ctx.translate(0, headerHeight);

    const startX = 28;
    const startY = 18;

    // 3. Cabeçalhos Azuis de Semestres (1º Semestre a 10º Semestre) alinhados às colunas reais
    for (let i = 0; i < flowchartData.semestersCount; i++) {
      const semNumber = i + 1;
      const colX = startX + i * (cardWidth + colGap);

      ctx.fillStyle = '#6FA0E6';
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2;
      ctx.fillRect(colX, startY, cardWidth, 28);
      ctx.strokeRect(colX, startY, cardWidth, 28);

      ctx.fillStyle = '#09111E';
      ctx.font = '900 11.5px Inter, system-ui, sans-serif';
      const label = `${semNumber}º Semestre`;
      const lw = ctx.measureText(label).width;
      ctx.fillText(label, colX + (cardWidth - lw) / 2, startY + 18);
    }

    // 4. Desenhar todas as caixas de disciplinas com cores vivas e bordas fortes
    let maxBottomY = 0;
    flowchartData.subjects.forEach((subj) => {
      if (filterBoxCategory !== 'todas' && subj.boxCategory !== filterBoxCategory) return;
      const el = nodeRefs.current[subj.code];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = r.left - scrollRect.left + scrollLeft;
      const y = r.top - scrollRect.top + scrollTop;
      const w = r.width;
      const h = r.height;
      if (y + h > maxBottomY) maxBottomY = y + h;

      const boxStyle = BOX_CATEGORY_STYLES[subj.boxCategory] || BOX_CATEGORY_STYLES.verde;
      const blocks = subj.creditBlocks || [2, 2, 0, 4];

      // Corpo principal
      ctx.fillStyle = boxStyle.bodyBg;
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2.2;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);

      // Faixa superior do código
      ctx.fillStyle = boxStyle.headerBg;
      ctx.fillRect(x, y, w, barHeight);
      ctx.strokeRect(x, y, w, barHeight);

      const displayCode = subj.code.startsWith('OPT') ? '' : subj.code;
      if (displayCode) {
        ctx.fillStyle = boxStyle.headerText;
        ctx.font = `900 ${Math.max(8.5, Math.round(9.5 * uiScale))}px Inter, system-ui, sans-serif`;
        const codeW = ctx.measureText(displayCode).width;
        ctx.fillText(displayCode, x + (w - codeW) / 2, y + barHeight - 4);
      }

      // Nome da matéria e horas no centro
      ctx.fillStyle = boxStyle.text;
      ctx.font = `800 ${Math.max(8.5, Math.round(9.2 * uiScale))}px Inter, system-ui, sans-serif`;
      const words = subj.name.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      for (const word of words) {
        if ((currentLine + ' ' + word).trim().length <= 21) {
          currentLine = (currentLine + ' ' + word).trim();
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);

      const hoursText = `(${subj.hours || subj.credits * 15}h)`;
      const lineH = Math.max(9.5, Math.round(11 * uiScale));
      const bodyCenterY = y + barHeight + (h - barHeight * 2) / 2;
      const totalTextLines = Math.min(lines.length, 2) + 1;
      const startTextY = bodyCenterY - ((totalTextLines - 1) * lineH) / 2 + 2;
      lines.slice(0, 2).forEach((ln, idx) => {
        const lw = ctx.measureText(ln).width;
        ctx.fillText(ln, x + (w - lw) / 2, startTextY + idx * lineH);
      });

      // Desenhar a linha de horas com destaque
      ctx.fillStyle = '#0F172A';
      ctx.font = `900 ${Math.max(8, Math.round(8.5 * uiScale))}px Inter, system-ui, sans-serif`;
      const hw = ctx.measureText(hoursText).width;
      ctx.fillText(hoursText, x + (w - hw) / 2, startTextY + Math.min(lines.length, 2) * lineH);

      // Faixa inferior dividida em 4 caixinhas [T | P | E | S]
      const footY = y + h - barHeight;
      const cellW = w / 4;
      blocks.forEach((val, bIdx) => {
        const cx = x + bIdx * cellW;
        ctx.fillStyle = boxStyle.footerBg;
        ctx.fillRect(cx, footY, cellW, barHeight);
        ctx.strokeRect(cx, footY, cellW, barHeight);

        ctx.fillStyle = '#111111';
        ctx.font = `900 ${Math.max(8.5, Math.round(9.5 * uiScale))}px Inter, system-ui, sans-serif`;
        const vw = ctx.measureText(String(val)).width;
        ctx.fillText(String(val), cx + (cellW - vw) / 2, footY + barHeight - 4);
      });
    });

    // 4.5 Desenhar as caixinhas azuis de Créditos por Semestre e Total Geral (232)
    const creditsY = Math.max(maxBottomY + 20, 620);
    for (let i = 0; i < flowchartData.semestersCount; i++) {
      const colX = startX + i * (cardWidth + colGap);
      const boxW = Math.round(58 * uiScale);
      const boxX = colX + (cardWidth - boxW) / 2;
      const semCred = flowchartData.semesterCredits?.[i] ?? 24;

      ctx.fillStyle = '#6FA0E6';
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2;
      ctx.fillRect(boxX, creditsY, boxW, 24);
      ctx.strokeRect(boxX, creditsY, boxW, 24);

      ctx.fillStyle = '#09111E';
      ctx.font = '900 11px Inter, system-ui, sans-serif';
      const cw = ctx.measureText(String(semCred)).width;
      ctx.fillText(String(semCred), boxX + (boxW - cw) / 2, creditsY + 16);
    }

    // 5. Desenhar TODAS as Linhas Ativas com Cores Fortes e Espessura Destacada + Setas Sólidas
    connections.forEach((conn) => {
      const path2d = new Path2D(conn.pathD);
      const lineColor = arrowMode === 'classic-blue' ? '#0D47A1' : conn.color;

      // Halo branco externo para separar cruzamentos com nitidez total
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6.6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke(path2d);

      // Linha principal forte e saturada
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 3.8;
      ctx.stroke(path2d);

      // Ponto de origem
      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.arc(conn.x1, conn.y1, 3.8, 0, Math.PI * 2);
      ctx.fill();

      // Ponta da seta bem visível
      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.moveTo(conn.x2, conn.y2);
      ctx.lineTo(conn.x2 - 10.5, conn.y2 - 5.5);
      ctx.lineTo(conn.x2 - 10.5, conn.y2 + 5.5);
      ctx.closePath();
      ctx.fill();
    });

    ctx.restore();

    // 6. Rodapé com Legenda de Cores por Disciplina Emissora
    const footerY = headerHeight + contentHeight;
    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(0, footerY, totalWidth, footerLegendHeight);
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(0, footerY, totalWidth, 2);

    ctx.fillStyle = '#0F172A';
    ctx.font = '900 11.5px Inter, system-ui, sans-serif';
    ctx.fillText(
      'LEGENDA DE CORES DAS LINHAS DE DEPENDÊNCIA (CADA COR FORTE IDENTIFICA A MATÉRIA DE PRÉ-REQUISITO):',
      28,
      footerY + 24
    );

    let legX = 28;
    let legY = footerY + 48;
    flowchartData.subjects.forEach((subj) => {
      const entry = subjectColorMap[subj.code];
      if (!entry) return;
      const label = `${subj.code} (${subj.name.slice(0, 20)})`;
      ctx.fillStyle = entry.color;
      ctx.fillRect(legX, legY - 10, 16, 12);
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 1;
      ctx.strokeRect(legX, legY - 10, 16, 12);

      ctx.fillStyle = '#0F172A';
      ctx.font = '800 10.5px Inter, system-ui, sans-serif';
      ctx.fillText(label, legX + 22, legY);

      legX += ctx.measureText(label).width + 44;
      if (legX > totalWidth - 240) {
        legX = 28;
        legY += 22;
      }
    });

    return canvas;
  };

  // Exportar PNG direto
  const handleExportPNG = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const canvas = generateHighResCanvas();
        if (!canvas) return;
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `Fluxograma-${flowchartData.courseCode}-UnB-Gama.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  // Exportar PDF Paisagem
  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const canvas = generateHighResCanvas();
        if (!canvas) return;
        const dataUrl = canvas.toDataURL('image/png');
        const printWin = window.open('', '_blank', 'width=1360,height=880');
        if (!printWin) return;
        printWin.document.write(`
          <!DOCTYPE html>
          <html lang="pt-BR">
            <head>
              <meta charset="UTF-8" />
              <title>Fluxograma Oficial - ${flowchartData.courseName} (${flowchartData.campus})</title>
              <style>
                @page {
                  size: A3 landscape;
                  margin: 5mm;
                }
                * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
                }
                body {
                  background: #FFFFFF;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  font-family: 'Inter', system-ui, sans-serif;
                }
                .toolbar {
                  padding: 12px 24px;
                  background: #1E3A5F;
                  color: #FFFFFF;
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                .toolbar button {
                  background: #E65100;
                  color: #FFF;
                  border: none;
                  padding: 8px 18px;
                  border-radius: 6px;
                  font-weight: 800;
                  cursor: pointer;
                  font-size: 13px;
                }
                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: auto;
                }
                @media print {
                  .toolbar {
                    display: none !important;
                  }
                  body {
                    min-height: auto;
                  }
                  img {
                    width: 100%;
                    max-height: 98vh;
                    object-fit: contain;
                  }
                }
              </style>
            </head>
            <body>
              <div class="toolbar">
                <span><strong>Fluxograma Oficial (${flowchartData.courseName} - ${flowchartData.campus})</strong> — Escolha "Salvar como PDF" na janela de impressão.</span>
                <button onclick="window.print()">🖨️ Salvar em PDF / Imprimir</button>
              </div>
              <img src="${dataUrl}" alt="Fluxograma Oficial UnB" onload="setTimeout(() => window.print(), 250)" />
            </body>
          </html>
        `);
        printWin.document.close();
      } finally {
        setIsExporting(false);
      }
    }, 50);
  };

  // Checar quais códigos estão conectados ao nó ativo (diretos + cadeia transitiva completa!)
  const activeFocusCode = hoveredCode || selectedSubj?.code || null;
  const activeSubjData = activeFocusCode
    ? flowchartData.subjects.find((s) => s.code === activeFocusCode)
    : null;

  const directOutgoingCodes = useMemo(() => {
    if (!activeSubjData) return new Set<string>();
    return new Set(activeSubjData.dependents || []);
  }, [activeSubjData]);

  // TODA a cadeia de dependentes (diretos + indiretos em cascata)
  const transitiveOutgoingCodes = useMemo(() => {
    const result = new Set<string>();
    if (!activeSubjData) return result;
    const subjMap = new Map<string, FlowSubject>();
    flowchartData.subjects.forEach((s) => subjMap.set(s.code, s));

    const queue = [...(activeSubjData.dependents || [])];
    while (queue.length > 0) {
      const code = queue.shift()!;
      if (!result.has(code)) {
        result.add(code);
        const node = subjMap.get(code);
        if (node && node.dependents) {
          node.dependents.forEach((dep) => {
            if (!result.has(dep)) queue.push(dep);
          });
        }
      }
    }
    return result;
  }, [activeSubjData, flowchartData]);

  const directIncomingCodes = useMemo(() => {
    if (!activeSubjData) return new Set<string>();
    return new Set(activeSubjData.prereqs || []);
  }, [activeSubjData]);

  // TODA a cadeia de pré-requisitos ancestrais
  const transitiveIncomingCodes = useMemo(() => {
    const result = new Set<string>();
    if (!activeSubjData) return result;
    const subjMap = new Map<string, FlowSubject>();
    flowchartData.subjects.forEach((s) => subjMap.set(s.code, s));

    const queue = [...(activeSubjData.prereqs || [])];
    while (queue.length > 0) {
      const code = queue.shift()!;
      if (!result.has(code)) {
        result.add(code);
        const node = subjMap.get(code);
        if (node && node.prereqs) {
          node.prereqs.forEach((pr) => {
            if (!result.has(pr)) queue.push(pr);
          });
        }
      }
    }
    return result;
  }, [activeSubjData, flowchartData]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 12, 9, 0.86)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        animation: 'fadeIn 0.22s ease',
      }}
    >
      <div
        style={{
          width: '98vw',
          maxWidth: 1680,
          height: '94vh',
          maxHeight: 960,
          background: '#FFFFFF',
          borderRadius: 14,
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 2px #1E3A5F',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* ====================================================================
            CABEÇALHO SUPERIOR OBSIDIAN THEME: PRETO PROFUNDO, BLUR & GÓTICO ALEMÃO (FRAKTUR)
        ==================================================================== */}
        <header
          style={{
            padding: '12px 24px',
            background: 'rgba(18, 18, 20, 0.88)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            color: '#D8D8D8',
            borderBottom: '1px solid #2B2B30',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexShrink: 0,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Símbolo UnB Gama com acento roxo/Obsidian e Gama em destaque */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: '#16161A',
                padding: '4px 9px',
                borderRadius: 5,
                border: '1px solid #363640',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 900,
                  color: '#A390E4',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                UnB
              </span>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #7C3AED 0%, #00A859 100%)',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'serif',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.35)',
                }}
              >
                γ
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#8C8C94',
                  }}
                >
                  {flowchartData.campus}
                </span>
                <span style={{ fontSize: 10, color: '#4E4E56' }}>•</span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#B5B5BE' }}>
                  {flowchartData.semestersCount} Semestres · {flowchartData.totalCredits} Créditos
                </span>
              </div>
              <h2
                style={{
                  margin: '2px 0 0',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: '#ECECF1',
                }}
              >
                {flowchartData.courseName}
              </h2>
            </div>
          </div>

          {/* Controles estilo Obsidian (Bordas afiadas, botões sutis, acento roxo Obsidian) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {/* Controle de Zoom Obsidian */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                background: '#16161A',
                padding: '3px 5px',
                borderRadius: 5,
                border: '1px solid #2B2B30',
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#7E7E88', marginRight: 3, paddingLeft: 4 }}>
                ZOOM
              </span>
              {[
                { label: '75%', val: 0.75 },
                { label: '88%', val: 0.88 },
                { label: '100%', val: 1.0 },
                { label: '112%', val: 1.12 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setUiScale(preset.val)}
                  style={{
                    background: Math.abs(uiScale - preset.val) < 0.02 ? '#26262E' : 'transparent',
                    color: Math.abs(uiScale - preset.val) < 0.02 ? '#A390E4' : '#8A8A93',
                    border: Math.abs(uiScale - preset.val) < 0.02 ? '1px solid #4B3F72' : '1px solid transparent',
                    borderRadius: 3,
                    padding: '2px 6px',
                    fontSize: 10,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Modos de Setas Obsidian */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                background: '#16161A',
                padding: '3px 5px',
                borderRadius: 5,
                border: '1px solid #2B2B30',
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#7E7E88', marginRight: 3, paddingLeft: 4 }}>
                LINHAS
              </span>
              <button
                onClick={() => setArrowMode('all-active')}
                style={{
                  background: arrowMode === 'all-active' ? '#26262E' : 'transparent',
                  color: arrowMode === 'all-active' ? '#ECECF1' : '#8A8A93',
                  border: arrowMode === 'all-active' ? '1px solid #484854' : '1px solid transparent',
                  borderRadius: 3,
                  padding: '3px 8px',
                  fontSize: 10.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Multicor
              </button>
              <button
                onClick={() => setArrowMode('classic-blue')}
                style={{
                  background: arrowMode === 'classic-blue' ? '#1E293B' : 'transparent',
                  color: arrowMode === 'classic-blue' ? '#93C5FD' : '#8A8A93',
                  border: arrowMode === 'classic-blue' ? '1px solid #3B82F6' : '1px solid transparent',
                  borderRadius: 3,
                  padding: '3px 8px',
                  fontSize: 10.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Azul
              </button>
              <button
                onClick={() => setArrowMode('hover-only')}
                style={{
                  background: arrowMode === 'hover-only' ? '#26262E' : 'transparent',
                  color: arrowMode === 'hover-only' ? '#A390E4' : '#8A8A93',
                  border: arrowMode === 'hover-only' ? '1px solid #4B3F72' : '1px solid transparent',
                  borderRadius: 3,
                  padding: '3px 8px',
                  fontSize: 10.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Foco no Mouse
              </button>
            </div>
          </div>

          {/* Botões de Ação estilo Obsidian (Dark minimalista, acento discreto) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={handleExportPNG}
              disabled={isExporting}
              style={{
                padding: '5px 12px',
                borderRadius: 4,
                background: '#1F1F24',
                color: '#ECECF1',
                border: '1px solid #363640',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Baixar PNG
            </button>

            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              style={{
                padding: '5px 12px',
                borderRadius: 4,
                background: '#1F1F24',
                color: '#ECECF1',
                border: '1px solid #363640',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Exportar PDF
            </button>

            {onOpenKeplerPlan && (
              <button
                onClick={onOpenKeplerPlan}
                style={{
                  padding: '5px 14px',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                }}
              >
                Abrir no Kepler →
              </button>
            )}
            <button
              onClick={onClose}
              title="Fechar (ESC)"
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                background: '#1F1F24',
                border: '1px solid #363640',
                color: '#9E9EA7',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>
        </header>

        {/* ====================================================================
            BARRA DE CATEGORIAS OBSIDIAN (PRETO PROFUNDO, BLUR & MINIMALISTA)
        ==================================================================== */}
        <div
          style={{
            padding: '7px 24px',
            background: 'rgba(22, 22, 26, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid #26262B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            fontSize: 11,
            color: '#8C8C94',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#A1A1AA',
                marginRight: 4,
              }}
            >
              Categorias:
            </span>

            <button
              onClick={() => setFilterBoxCategory('todas')}
              style={{
                padding: '2px 9px',
                borderRadius: 3,
                fontWeight: 600,
                fontSize: 10.5,
                cursor: 'pointer',
                background: filterBoxCategory === 'todas' ? '#2E2E38' : '#1A1A1E',
                color: filterBoxCategory === 'todas' ? '#ECECF1' : '#8C8C94',
                border: filterBoxCategory === 'todas' ? '1px solid #545462' : '1px solid #2B2B32',
              }}
            >
              Todas ({flowchartData.subjects.length})
            </button>

            {(['amarelo', 'verde', 'rosa', 'laranja'] as BoxColorCategory[]).map((cat) => {
              const st = BOX_CATEGORY_STYLES[cat];
              const isSelected = filterBoxCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilterBoxCategory(isSelected ? 'todas' : cat)}
                  title={st.description}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '2px 9px',
                    borderRadius: 3,
                    background: isSelected ? '#2E2E38' : '#1A1A1E',
                    color: isSelected ? '#FFFFFF' : '#B5B5BE',
                    border: isSelected ? '1px solid #545462' : '1px solid #2B2B32',
                    fontWeight: 600,
                    fontSize: 10.5,
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: st.bodyBg,
                      border: '1px solid #111111',
                      display: 'inline-block',
                    }}
                  />
                  {st.label}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#666670' }}>
            [ T | P | E | S ] · Foco dinâmico no mouse
          </div>
        </div>

        {/* ====================================================================
            ÁREA DO FLUXOGRAMA OFICIAL (FUNDO BEGE CLARO COM GRADE / BLUEPRINT)
        ==================================================================== */}
        <div
          ref={scrollAreaRef}
          onScroll={updateConnections}
          style={{
            flex: 1,
            overflow: 'auto',
            position: 'relative',
            padding: '20px 32px 80px 32px',
            backgroundColor: '#F5EFEB', // Bege claro elegante
            backgroundImage: `
              linear-gradient(to right, rgba(160, 140, 120, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(160, 140, 120, 0.15) 1px, transparent 1px),
              linear-gradient(to right, rgba(160, 140, 120, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(160, 140, 120, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          }}
        >
          {/* CAMADA SVG DAS SETAS DIRECIONADAS */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: svgDimensions.width,
              height: svgDimensions.height,
              pointerEvents: 'none',
              zIndex: 15,
            }}
          >
            <defs>
              <marker
                id="arrow-classic-blue"
                viewBox="0 0 10 10"
                refX="9.2"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth="3.2"
                markerHeight="3.2"
                orient="auto"
              >
                <path d="M 0 1.2 L 9.5 5 L 0 8.8 z" fill="#0D47A1" />
              </marker>

              {LINE_COLORS.map((col, idx) => (
                <marker
                  key={idx}
                  id={`arrow-color-${idx}`}
                  viewBox="0 0 10 10"
                  refX="9.2"
                  refY="5"
                  markerUnits="strokeWidth"
                  markerWidth="3.2"
                  markerHeight="3.2"
                  orient="auto"
                >
                  <path d="M 0 1.2 L 9.5 5 L 0 8.8 z" fill={col} />
                </marker>
              ))}
            </defs>

            {connections.map((conn) => {
              const isOutgoingChain = Boolean(
                activeFocusCode &&
                  (conn.fromCode === activeFocusCode || transitiveOutgoingCodes.has(conn.fromCode)) &&
                  transitiveOutgoingCodes.has(conn.toCode)
              );
              const isIncomingChain = Boolean(
                activeFocusCode &&
                  (conn.toCode === activeFocusCode || transitiveIncomingCodes.has(conn.toCode)) &&
                  transitiveIncomingCodes.has(conn.fromCode)
              );
              const isHighlighted = isOutgoingChain || isIncomingChain;
              const isMuted = Boolean(activeFocusCode && !isHighlighted);

              if (arrowMode === 'hover-only' && !activeFocusCode) {
                return null;
              }

              const focusColorEntry = activeFocusCode ? subjectColorMap[activeFocusCode] : null;

              let strokeColor = conn.color;
              let strokeWidth = 2.9;
              let markerEnd = `url(#arrow-color-${conn.colorIdx})`;
              let opacity = 1;

              if (arrowMode === 'classic-blue' && !activeFocusCode) {
                strokeColor = '#0D47A1';
                strokeWidth = 2.6;
                markerEnd = 'url(#arrow-classic-blue)';
                opacity = 0.96;
              }

              if (isOutgoingChain) {
                strokeColor = focusColorEntry ? focusColorEntry.color : '#D50000';
                strokeWidth = 4.2;
                markerEnd = focusColorEntry
                  ? `url(#arrow-color-${focusColorEntry.idx})`
                  : `url(#arrow-color-${conn.colorIdx})`;
                opacity = 1;
              } else if (isIncomingChain) {
                strokeColor = conn.color;
                strokeWidth = 3.8;
                markerEnd = `url(#arrow-color-${conn.colorIdx})`;
                opacity = 1;
              } else if (isMuted) {
                opacity = 0.1;
                strokeWidth = 1.2;
              }

              return (
                <g key={conn.id} style={{ opacity, transition: 'opacity 0.18s' }}>
                  {/* Halo branco sob a linha para separar cruzamentos sem misturar cores */}
                  {!isMuted && (
                    <path
                      d={conn.pathD}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={strokeWidth + 3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  <path
                    d={conn.pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={markerEnd}
                    style={{
                      strokeDasharray: isHighlighted ? '8 4' : 'none',
                      animation: isHighlighted ? 'flowDash 1.1s linear infinite' : 'none',
                    }}
                  />

                  {!isMuted && (
                    <circle cx={conn.x1} cy={conn.y1} r={3.5} fill={strokeColor} stroke="#FFFFFF" strokeWidth={1.2} />
                  )}
                </g>
              );
            })}
          </svg>

          {/* GRADE DOS 10 SEMESTRES (FIEL AO DOCUMENTO DA FGA/UnB, ESCALA COMPACTA E ESPAÇAMENTO AMPLO) */}
          <div
            style={{
              display: 'inline-flex',
              gap: colGap,
              minWidth: 'max-content',
              position: 'relative',
              zIndex: 20,
              alignItems: 'flex-start',
            }}
          >
            {Array.from({ length: flowchartData.semestersCount }).map((_, idx) => {
              const semNumber = idx + 1;
              const subjectsInSem = semGroups[semNumber] || [];
              const semTotalCredits =
                flowchartData.semesterCredits?.[idx] ??
                subjectsInSem.reduce((acc, s) => acc + s.credits, 0);

              return (
                <div
                  key={semNumber}
                  style={{
                    width: cardWidth,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: Math.round(18 * uiScale),
                  }}
                >
                  {/* Cabeçalho Minimalista do Semestre (Estilo Notion) */}
                  <div
                    style={{
                      background: '#F7F6F3',
                      border: '1px solid #E8E5DA',
                      borderRadius: 6,
                      padding: `${Math.round(4 * uiScale)}px 6px`,
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: Math.max(10, Math.round(11 * uiScale)),
                      color: '#37352F',
                    }}
                  >
                    {semNumber}º Semestre
                  </div>

                  {/* Slots das 7 Linhas Horizontais (row 0 a row 6) com distância maior entre os cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: rowGap }}>
                    {Array.from({ length: maxRowIndex + 1 }).map((__, rowIndex) => {
                      const subj = subjectsInSem.find((s) => (s.row ?? 0) === rowIndex);

                      if (!subj || (filterBoxCategory !== 'todas' && subj.boxCategory !== filterBoxCategory)) {
                        return (
                          <div
                            key={`empty-${semNumber}-${rowIndex}`}
                            style={{
                              height: cardHeight,
                              pointerEvents: 'none',
                            }}
                          />
                        );
                      }

                      const boxStyle = BOX_CATEGORY_STYLES[subj.boxCategory] || BOX_CATEGORY_STYLES.verde;
                      const emitterColor = subjectColorMap[subj.code]?.color;
                      const focusColor = activeFocusCode ? subjectColorMap[activeFocusCode]?.color : null;
                      const isHovered = hoveredCode === subj.code;
                      const isSelected = selectedSubj?.code === subj.code;

                      const isDirectOut = directOutgoingCodes.has(subj.code);
                      const isTransitiveOut = transitiveOutgoingCodes.has(subj.code);
                      const isDirectIn = directIncomingCodes.has(subj.code);
                      const isTransitiveIn = transitiveIncomingCodes.has(subj.code);

                      const highlightChainColor = focusColor || '#D50000';
                      const blocks = subj.creditBlocks || [2, 2, 0, 4];
                      const displayCode = subj.code.startsWith('OPT') ? '' : subj.code;

                      let outlineShadow = '0 2px 5px rgba(0,0,0,0.12)';
                      let cardTransform = 'translateY(0)';

                      if (isHovered || isSelected) {
                        outlineShadow = `0 0 0 3px ${emitterColor || '#1E3A5F'}, 0 8px 20px rgba(0,0,0,0.28)`;
                        cardTransform = 'translateY(-2px)';
                      } else if (isTransitiveOut) {
                        outlineShadow = `0 0 0 3px ${highlightChainColor}, 0 0 16px ${highlightChainColor}77`;
                      } else if (isTransitiveIn) {
                        outlineShadow = '0 0 0 3px #00796B, 0 0 14px rgba(0, 121, 107, 0.5)';
                      }

                      return (
                        <div
                          key={subj.code}
                          id={`flow-node-${subj.code}`}
                          ref={(el) => {
                            nodeRefs.current[subj.code] = el;
                          }}
                          onMouseEnter={() => setHoveredCode(subj.code)}
                          onMouseLeave={() => setHoveredCode(null)}
                          onClick={() => setSelectedSubj(selectedSubj?.code === subj.code ? null : subj)}
                          style={{
                            width: '100%',
                            height: cardHeight,
                            boxSizing: 'border-box',
                            background: boxStyle.bodyBg,
                            border: '2px solid #111111',
                            cursor: 'pointer',
                            boxShadow: outlineShadow,
                            transform: cardTransform,
                            transition: 'all 0.16s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            userSelect: 'none',
                          }}
                        >
                          {/* Selos de Cadeia Ativa quando o usuário passa o mouse */}
                          {isTransitiveOut && (
                            <div
                              style={{
                                position: 'absolute',
                                top: -10,
                                right: 3,
                                background: highlightChainColor,
                                color: '#FFF',
                                fontSize: 7.5,
                                fontWeight: 900,
                                padding: '1px 4px',
                                borderRadius: 3,
                                zIndex: 5,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                              }}
                            >
                              {isDirectOut ? 'LIBERA' : 'CADEIA'}
                            </div>
                          )}

                          {isTransitiveIn && (
                            <div
                              style={{
                                position: 'absolute',
                                top: -10,
                                left: 3,
                                background: '#00796B',
                                color: '#FFF',
                                fontSize: 7.5,
                                fontWeight: 900,
                                padding: '1px 4px',
                                borderRadius: 3,
                                zIndex: 5,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                              }}
                            >
                              {isDirectIn ? 'PRÉ-REQ' : 'BASE'}
                            </div>
                          )}

                          {/* 1. FAIXA SUPERIOR DO CARD: CÓDIGO OFICIAL */}
                          <div
                            style={{
                              height: barHeight,
                              background: boxStyle.headerBg,
                              borderBottom: '1.5px solid #111111',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 4,
                              fontSize: Math.max(8.5, Math.round(9.5 * uiScale)),
                              fontWeight: 900,
                              color: boxStyle.headerText,
                              letterSpacing: '0.02em',
                            }}
                          >
                            {emitterColor && (
                              <span
                                title="Cor das setas que saem desta matéria"
                                style={{
                                  width: 7,
                                  height: 7,
                                  borderRadius: '50%',
                                  background: emitterColor,
                                  border: '1px solid #FFF',
                                  display: 'inline-block',
                                }}
                              />
                            )}
                            <span>{displayCode || '\u00A0'}</span>
                          </div>

                          {/* 2. CORPO CENTRAL: NOME DA DISCIPLINA + CARGA HORÁRIA (ex: 90h, 60h) */}
                          <div
                            style={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              padding: '2px 4px',
                              gap: 2,
                            }}
                          >
                            <span
                              style={{
                                fontSize: Math.max(8.5, Math.round(9.5 * uiScale)),
                                fontWeight: 800,
                                color: boxStyle.text,
                                lineHeight: 1.15,
                              }}
                            >
                              {subj.name}
                            </span>
                            <span
                              style={{
                                fontSize: Math.max(7.5, Math.round(8.5 * uiScale)),
                                fontWeight: 900,
                                color: '#1E293B',
                                background: 'rgba(255, 255, 255, 0.65)',
                                padding: '1px 5px',
                                borderRadius: 4,
                                border: '1px solid rgba(0, 0, 0, 0.15)',
                                lineHeight: 1,
                                letterSpacing: '0.02em',
                              }}
                            >
                              {subj.hours || subj.credits * 15}h
                            </span>
                          </div>

                          {/* 3. FAIXA INFERIOR: 4 CAIXINHAS DE CRÉDITOS [ T | P | E | S ] */}
                          <div
                            style={{
                              height: barHeight,
                              borderTop: '1.5px solid #111111',
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, 1fr)',
                              background: boxStyle.footerBg,
                            }}
                          >
                            {blocks.map((num, bIdx) => (
                              <div
                                key={bIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: Math.max(8.5, Math.round(9.5 * uiScale)),
                                  fontWeight: 900,
                                  color: '#111111',
                                  borderRight: bIdx < 3 ? '1.5px solid #111111' : 'none',
                                }}
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Caixinha Minimalista de Total de Créditos do Semestre no Rodapé */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: 6,
                    }}
                  >
                    <div
                      style={{
                        width: Math.round(52 * uiScale),
                        background: '#F7F6F3',
                        border: '1px solid #E8E5DA',
                        borderRadius: 4,
                        padding: '2px 0',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: Math.max(9.5, Math.round(10.5 * uiScale)),
                        color: '#787774',
                      }}
                    >
                      {semTotalCredits} cr
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Coluna Final de Total Geral estilo Notion */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                marginBottom: 2,
              }}
            >
              <div
                style={{
                  width: Math.round(58 * uiScale),
                  background: '#F7F6F3',
                  border: '1px solid #E8E5DA',
                  borderRadius: 4,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: Math.max(9.5, Math.round(10.5 * uiScale)),
                  color: '#37352F',
                }}
              >
                <div style={{ borderBottom: '1px solid #E8E5DA', padding: '2px 0', fontSize: 9.5, color: '#787774' }}>
                  Total
                </div>
                <div style={{ padding: '2px 0' }}>{flowchartData.totalCredits} cr</div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            INSPETOR DA DISCIPLINA SELECIONADA / EM FOCO (PAINEL INFERIOR)
        ==================================================================== */}
        {activeSubjData && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#FFFFFF',
              borderTop: '2px solid #1E3A5F',
              boxShadow: '0 -6px 20px rgba(0,0,0,0.18)',
              padding: '10px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              zIndex: 50,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  background: BOX_CATEGORY_STYLES[activeSubjData.boxCategory]?.bodyBg || '#AED581',
                  color: '#111111',
                  border: '2px solid #1A1A1A',
                  padding: '5px 10px',
                  fontWeight: 900,
                  fontSize: 11.5,
                }}
              >
                {activeSubjData.code}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 900, color: '#0F172A' }}>
                  {activeSubjData.name}{' '}
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', marginLeft: 6 }}>
                    ({activeSubjData.semester}º Semestre · {activeSubjData.credits} cr ·{' '}
                    {BOX_CATEGORY_STYLES[activeSubjData.boxCategory]?.label})
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginTop: 2,
                    fontSize: 11,
                    flexWrap: 'wrap',
                  }}
                >
                  <span>
                    <strong>Pré-requisitos (Cadeia):</strong>{' '}
                    {transitiveIncomingCodes.size > 0 ? (
                      Array.from(transitiveIncomingCodes).map((pr) => (
                        <span
                          key={pr}
                          onClick={() => setHoveredCode(pr)}
                          style={{
                            marginRight: 6,
                            color: '#00796B',
                            fontWeight: directIncomingCodes.has(pr) ? 900 : 700,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {pr}
                        </span>
                      ))
                    ) : (
                      <em style={{ color: '#64748B' }}>Nenhum (Matéria base)</em>
                    )}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Dependentes em Cadeia ({transitiveOutgoingCodes.size}):</strong>{' '}
                    {transitiveOutgoingCodes.size > 0 ? (
                      Array.from(transitiveOutgoingCodes).map((dp, idx) => (
                        <span key={dp}>
                          <span
                            onClick={() => setHoveredCode(dp)}
                            style={{
                              color: subjectColorMap[activeSubjData.code]?.color || '#D84315',
                              fontWeight: directOutgoingCodes.has(dp) ? 900 : 700,
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                          >
                            {dp}
                          </span>
                          {idx < transitiveOutgoingCodes.size - 1 && (
                            <span style={{ color: '#94A3B8', margin: '0 4px' }}>→</span>
                          )}
                        </span>
                      ))
                    ) : (
                      <em style={{ color: '#64748B' }}>Fim de cadeia</em>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSubj(null);
                setHoveredCode(null);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                fontSize: 11,
                fontWeight: 800,
                cursor: 'pointer',
                color: '#334155',
              }}
            >
              Limpar Foco
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
      `}</style>
    </div>
  );
};
