import React, { useEffect, useState } from 'react';
import { ScreenId } from './types';
import { BookDefinition, CAMPUS_BOOKS_DATA, CampusCourseItem } from './campusCoursesData';
import { CourseFlowchartModal } from './CourseFlowchartModal';

function renderCoverArt(book: BookDefinition) {
  if (book.coverArtType === 'darcy-artes') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, #F5ECE0 0%, #E6D6C2 55%, #D4BEA2 100%)',
          position: 'relative',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          border: '1.5px solid rgba(139, 69, 19, 0.35)',
        }}
      >
        <svg viewBox="0 0 240 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
          <path d="M 15 80 Q 90 20 180 65 T 235 150 Q 170 210 60 230 T 210 300" fill="none" stroke="#8B4513" strokeWidth="2.8" />
          <path d="M 30 110 Q 120 70 210 115" fill="none" stroke="#C27D50" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="68" cy="175" r="32" fill="none" stroke="#8B4513" strokeWidth="2.2" />
          <path d="M 68 143 L 68 207 M 36 175 L 100 175" stroke="#8B4513" strokeWidth="1.8" />
          <polygon points="175,210 205,255 145,255" fill="none" stroke="#8B4513" strokeWidth="2.2" />
        </svg>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: '#8B4513' }}>
            UNB // ASA NORTE
          </span>
          <span style={{ background: '#8B4513', color: '#FDFBF7', fontWeight: 900, fontSize: 10, padding: '3px 8px', borderRadius: 99 }}>
            DARCY
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(253, 248, 242, 0.92)', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #8B4513', boxShadow: '0 6px 16px rgba(139, 69, 19, 0.18)' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#C27D50', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Artes, Letras &amp; Humanas
          </div>
          <div style={{ fontSize: 19, fontWeight: 900, color: '#4A250B', lineHeight: 1.1, marginTop: 2 }}>
            Darcy Ribeiro
          </div>
          <div style={{ fontSize: 10, color: '#6A452B', fontWeight: 600, marginTop: 4 }}>
            10 Cursos · FAU, IdA, IH, FAC, Letras &amp; Direito
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: '#4A250B', color: '#FDFBF7', padding: '6px 10px', borderRadius: 6, fontSize: 8.5, fontWeight: 800, textAlign: 'center', letterSpacing: '0.08em' }}>
          CAMPUS CENTRAL HISTÓRICO
        </div>
      </div>
    );
  }

  if (book.coverArtType === 'darcy-exatas') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, #E6EFF5 0%, #D0DFE8 55%, #BACED9 100%)',
          position: 'relative',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          border: '1.5px solid rgba(44, 62, 80, 0.35)',
        }}
      >
        <svg viewBox="0 0 240 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.65 }}>
          <circle cx="120" cy="140" r="75" fill="none" stroke="#2C3E50" strokeWidth="1.8" strokeDasharray="6 4" />
          <circle cx="120" cy="140" r="42" fill="none" stroke="#34495E" strokeWidth="2.2" />
          <circle cx="120" cy="140" r="7" fill="#2C3E50" />
          <line x1="20" y1="260" x2="220" y2="70" stroke="#2C3E50" strokeWidth="2.5" />
          <line x1="20" y1="180" x2="220" y2="180" stroke="#34495E" strokeWidth="1.5" strokeDasharray="4 4" />
          <polygon points="120,65 130,95 110,95" fill="#2C3E50" />
        </svg>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: '#2C3E50' }}>
            UNB // CIC &amp; EXATAS
          </span>
          <span style={{ background: '#2C3E50', color: '#FDFBF7', fontWeight: 900, fontSize: 10, padding: '3px 8px', borderRadius: 99 }}>
            EXATAS
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(247, 250, 252, 0.94)', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #2C3E50', boxShadow: '0 6px 16px rgba(44, 62, 80, 0.18)' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#34495E', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Computação, Exatas &amp; Engenharias
          </div>
          <div style={{ fontSize: 19, fontWeight: 900, color: '#1A252F', lineHeight: 1.1, marginTop: 2 }}>
            Darcy · Exatas
          </div>
          <div style={{ fontSize: 10, color: '#4A5B6B', fontWeight: 600, marginTop: 4 }}>
            10 Cursos · CIC, MAT, FIS, Elétrica, Mecânica &amp; Civil
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: '#1A252F', color: '#FDFBF7', padding: '6px 10px', borderRadius: 6, fontSize: 8.5, fontWeight: 800, textAlign: 'center', letterSpacing: '0.08em' }}>
          POLO DE CIÊNCIA FUNDAMENTAL
        </div>
      </div>
    );
  }

  if (book.coverArtType === 'gama-fcte') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, #F3DFD1 0%, #E6C5AF 55%, #D4A98F 100%)',
          position: 'relative',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          border: '1.5px solid rgba(140, 63, 43, 0.42)',
        }}
      >
        <svg viewBox="0 0 240 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.72 }}>
          <polygon points="120,40 185,150 55,150" fill="none" stroke="#8C3F2B" strokeWidth="2.8" />
          <circle cx="120" cy="113" r="28" fill="none" stroke="#8C3F2B" strokeWidth="2.2" strokeDasharray="5 4" />
          <path d="M 20 250 Q 80 190 140 230 T 225 190" fill="none" stroke="#A84F35" strokeWidth="3" />
          <path d="M 120 180 L 120 300 M 40 240 L 200 240" stroke="#8C3F2B" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx="120" cy="240" r="10" fill="#8C3F2B" />
        </svg>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: '#8C3F2B' }}>
            UNB // FCTE GAMA
          </span>
          <span style={{ background: '#8C3F2B', color: '#FDFBF7', fontWeight: 900, fontSize: 10, padding: '3px 8px', borderRadius: 99 }}>
            FGA
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(253, 248, 244, 0.94)', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #8C3F2B', boxShadow: '0 6px 16px rgba(140, 63, 43, 0.22)' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#A84F35', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            5 Engenharias Tecnológicas
          </div>
          <div style={{ fontSize: 19, fontWeight: 900, color: '#542013', lineHeight: 1.1, marginTop: 2 }}>
            Campus Gama
          </div>
          <div style={{ fontSize: 10, color: '#733522', fontWeight: 600, marginTop: 4 }}>
            Software · Aeroespacial · Automotiva · Eletrônica · Energia
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: '#542013', color: '#FDFBF7', padding: '6px 10px', borderRadius: 6, fontSize: 8.5, fontWeight: 800, textAlign: 'center', letterSpacing: '0.08em' }}>
          POLO TECNOLÓGICO FGA
        </div>
      </div>
    );
  }

  if (book.coverArtType === 'ceilandia-fce') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(160deg, #E2EEE5 0%, #CCDED1 55%, #B4CCBB 100%)',
          position: 'relative',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          border: '1.5px solid rgba(40, 80, 62, 0.38)',
        }}
      >
        <svg viewBox="0 0 240 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.65 }}>
          <path d="M 120 45 Q 150 90 120 135 T 120 225 Q 90 270 120 305" fill="none" stroke="#28503E" strokeWidth="2.8" />
          <path d="M 120 45 Q 90 90 120 135 T 120 225 Q 150 270 120 305" fill="none" stroke="#36604D" strokeWidth="2.8" />
          <rect x="75" y="115" width="90" height="40" rx="6" fill="none" stroke="#28503E" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="120" cy="135" r="14" fill="#28503E" opacity="0.35" />
        </svg>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: '#28503E' }}>
            UNB // FCE CEILÂNDIA
          </span>
          <span style={{ background: '#28503E', color: '#FDFBF7', fontWeight: 900, fontSize: 10, padding: '3px 8px', borderRadius: 99 }}>
            FCE
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(247, 252, 248, 0.94)', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #28503E', boxShadow: '0 6px 16px rgba(40, 80, 62, 0.18)' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#36604D', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Ciências da Saúde &amp; SUS
          </div>
          <div style={{ fontSize: 19, fontWeight: 900, color: '#163327', lineHeight: 1.1, marginTop: 2 }}>
            Campus Ceilândia
          </div>
          <div style={{ fontSize: 10, color: '#2C5441', fontWeight: 600, marginTop: 4 }}>
            6 Cursos · Enfermagem, Farmácia, Fisio, Fono, TO &amp; Saúde
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, background: '#163327', color: '#FDFBF7', padding: '6px 10px', borderRadius: 6, fontSize: 8.5, fontWeight: 800, textAlign: 'center', letterSpacing: '0.08em' }}>
          SAÚDE &amp; CUIDADO INTEGRAL
        </div>
      </div>
    );
  }

  // Campus Planaltina
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #F3ECD5 0%, #E8DDBE 55%, #D4C59A 100%)',
        position: 'relative',
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        border: '1.5px solid rgba(115, 94, 32, 0.38)',
      }}
    >
      <svg viewBox="0 0 240 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.65 }}>
        <path d="M 30 280 Q 90 140 180 90 T 210 20" fill="none" stroke="#735E20" strokeWidth="2.8" />
        <ellipse cx="120" cy="180" rx="75" ry="32" fill="none" stroke="#8C742D" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="120" cy="90" r="26" fill="none" stroke="#735E20" strokeWidth="2.2" />
        <line x1="120" y1="40" x2="120" y2="140" stroke="#735E20" strokeWidth="2" />
      </svg>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', color: '#735E20' }}>
          UNB // FUP PLANALTINA
        </span>
        <span style={{ background: '#735E20', color: '#FDFBF7', fontWeight: 900, fontSize: 10, padding: '3px 8px', borderRadius: 99 }}>
          FUP
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 2, background: 'rgba(253, 250, 242, 0.94)', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #735E20', boxShadow: '0 6px 16px rgba(115, 94, 32, 0.18)' }}>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: '#8C742D', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Agroecologia &amp; Meio Ambiente
        </div>
        <div style={{ fontSize: 19, fontWeight: 900, color: '#453711', lineHeight: 1.1, marginTop: 2 }}>
          Campus Planaltina
        </div>
        <div style={{ fontSize: 10, color: '#66531D', fontWeight: 600, marginTop: 4 }}>
          5 Cursos · Agronomia, Gestão Ambiental &amp; Campo
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, background: '#453711', color: '#FDFBF7', padding: '6px 10px', borderRadius: 6, fontSize: 8.5, fontWeight: 800, textAlign: 'center', letterSpacing: '0.08em' }}>
        SUSTENTABILIDADE &amp; CERRADO
      </div>
    </div>
  );
}

function renderCoursePage(
  courses: CampusCourseItem[],
  campusName: string,
  side: 'left' | 'right',
  accentColor: string,
  onSelectCourse: (c: CampusCourseItem) => void
) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#EBE6DC',
        backgroundImage: `
          radial-gradient(ellipse at ${side === 'left' ? '88% 50%' : '12% 50%'}, rgba(28, 22, 16, 0.14) 0%, transparent 68%),
          radial-gradient(circle at ${side === 'left' ? '22% 24%' : '78% 28%'}, rgba(255, 252, 245, 0.55) 0%, transparent 52%),
          repeating-radial-gradient(circle at 35% 45%, rgba(68, 56, 42, 0.045) 0px, rgba(68, 56, 42, 0.045) 1px, transparent 1px, transparent 3.5px),
          linear-gradient(${side === 'left' ? '90deg' : '270deg'}, rgba(18, 14, 10, 0.12) 0%, rgba(255, 253, 248, 0.22) 14%, rgba(235, 230, 220, 0.1) 74%, rgba(12, 9, 7, 0.42) 100%)
        `,
        color: '#18181B',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow:
          side === 'left'
            ? 'inset -20px 0 30px -10px rgba(15, 11, 8, 0.38), inset 0 0 16px rgba(45, 35, 24, 0.12)'
            : 'inset 20px 0 30px -10px rgba(15, 11, 8, 0.38), inset 0 0 16px rgba(45, 35, 24, 0.12)',
        borderRadius: side === 'left' ? '14px 3px 3px 14px' : '3px 14px 14px 3px',
        border: '1px solid rgba(40, 32, 24, 0.28)',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 8.5, fontWeight: 900, letterSpacing: '0.12em', color: accentColor, textTransform: 'uppercase' }}>
            {campusName}
          </span>
          <span style={{ fontSize: 9, fontWeight: 800, color: '#3A3025', background: 'rgba(24, 20, 15, 0.08)', padding: '2px 7px', borderRadius: 4 }}>
            {courses.length} Cursos
          </span>
        </div>

        <div style={{ fontSize: 13, fontWeight: 900, color: '#241A11', letterSpacing: '-0.01em', marginBottom: 10, borderBottom: '1.5px dashed rgba(60, 45, 30, 0.22)', paddingBottom: 6 }}>
          Catálogo Oficial · Selecione para ver o Fluxograma:
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {courses.map((course) => (
            <div
              key={course.code}
              onClick={(e) => {
                e.stopPropagation();
                onSelectCourse(course);
              }}
              style={{
                background: course.hasFullFluxo ? 'rgba(255, 249, 238, 0.94)' : 'rgba(244, 239, 230, 0.88)',
                border: course.hasFullFluxo ? `1.5px solid ${accentColor}` : '1px solid rgba(50, 40, 30, 0.22)',
                borderLeft: `4px solid ${course.hasFullFluxo ? '#A84A35' : accentColor}`,
                borderRadius: '4px 8px 8px 4px',
                padding: '7px 9px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                boxShadow: '0 2px 5px rgba(20, 15, 10, 0.08)',
                transition: 'all 0.18s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#1E1610' }}>
                  {course.name}
                </span>
                <span
                  style={{
                    fontSize: 7.5,
                    fontWeight: 800,
                    padding: '2px 5px',
                    borderRadius: 4,
                    background: course.hasFullFluxo ? '#A84A35' : '#322518',
                    color: '#FFF8F0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {course.hasFullFluxo ? 'FLUXO ATIVO' : 'VER GRADE'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 8.5, color: '#5C4A38' }}>
                <span>{course.unit} · {course.shifts}</span>
                <span style={{ fontWeight: 800, color: accentColor }}>{course.credits} créditos</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px dashed rgba(60, 45, 30, 0.22)', paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 8.5, color: '#6A5745', fontStyle: 'italic' }}>
        <span>Clique em qualquer curso para carregar o fluxograma</span>
        <span style={{ fontWeight: 800, fontStyle: 'normal', color: accentColor }}>
          {side === 'left' ? '← Voltar' : 'Virar →'}
        </span>
      </div>
    </div>
  );
}

export function BookStoreScreen({
  onNavigateScreen,
  onSelectCourseToast,
}: {
  onNavigateScreen: (s: ScreenId) => void;
  onSelectCourseToast: (msg: string) => void;
}) {
  // Começa no livro central: Gama FCTE (índice 2)
  const [activeBookIdx, setActiveBookIdx] = useState<number>(2);
  const [flippedSheet, setFlippedSheet] = useState<number>(0);
  const [hoveredBookIdx, setHoveredBookIdx] = useState<number | null>(null);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedCourseModal, setSelectedCourseModal] = useState<CampusCourseItem | null>(null);

  const activeBook = CAMPUS_BOOKS_DATA[activeBookIdx];
  const isBookOpen = flippedSheet > 0;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedCourseModal) {
          setSelectedCourseModal(null);
        } else if (isBookOpen) {
          setFlippedSheet(0);
        }
      } else if (e.key === 'ArrowRight') {
        if (isBookOpen) {
          setFlippedSheet((prev) => (prev < 2 ? prev + 1 : 0));
        } else {
          setActiveBookIdx((prev) => Math.min(CAMPUS_BOOKS_DATA.length - 1, prev + 1));
        }
      } else if (e.key === 'ArrowLeft') {
        if (isBookOpen) {
          setFlippedSheet((prev) => Math.max(0, prev - 1));
        } else {
          setActiveBookIdx((prev) => Math.max(0, prev - 1));
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isBookOpen, selectedCourseModal]);

  const selectOrOpenBook = (idx: number) => {
    if (idx !== activeBookIdx) {
      if (isBookOpen) {
        setFlippedSheet(0);
        setTimeout(() => setActiveBookIdx(idx), 260);
      } else {
        setActiveBookIdx(idx);
      }
      return;
    }
    if (flippedSheet === 0) {
      setFlippedSheet(1);
    }
  };

  const handleCourseClick = (course: CampusCourseItem) => {
    onSelectCourseToast(`Fluxograma de "${course.name}" com árvore de dependências aberto!`);
    setSelectedCourseModal(course);
  };

  // Separa os cursos do livro em 2 páginas: página 1 (esquerda) e página 2 (direita)
  const halfCourses = Math.ceil(activeBook.courses.length / 2);
  const leftPageCourses = activeBook.courses.slice(0, halfCourses);
  const rightPageCourses = activeBook.courses.slice(halfCourses);

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMouseTilt({ x: nx, y: ny });
      }}
      onMouseLeave={() => setMouseTilt({ x: 0, y: 0 })}
      style={{
        minHeight: 'calc(100vh - 30px)',
        backgroundColor: '#8A7E6A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 28px 20px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 18,
        boxShadow: 'inset 0 0 95px rgba(32, 26, 18, 0.45)',
      }}
    >
      {/* CAMADA 0: FUNDO GIOVANNI BOCCHI + JORNAL COM PARALLAX */}
      <div
        style={{
          position: 'absolute',
          inset: -28,
          backgroundImage: `
            radial-gradient(ellipse at 50% 48%, rgba(28, 18, 10, 0.04) 0%, rgba(20, 13, 7, 0.38) 100%),
            url('/bg/brasilis-bocchi-newspaper.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          transform: `translate3d(${-mouseTilt.x * 14}px, ${-mouseTilt.y * 10}px, 0) scale(1.045)`,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* CAMADA 1: DETALHES CARTOGRÁFICOS ANIMADOS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'hidden',
          transform: `translate3d(${-mouseTilt.x * 7}px, ${-mouseTilt.y * 5}px, 0)`,
          transition: 'transform 0.35s ease-out',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: '18%',
            width: 520,
            height: '140%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(253, 224, 138, 0.14) 48%, transparent 100%)',
            filter: 'blur(32px)',
            animation: 'sunbeamPulse 8s ease-in-out infinite alternate',
          }}
        />

        <svg viewBox="0 0 1400 860" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
          <path
            d="M 960 180 Q 1120 310 1040 490 T 880 760"
            fill="none"
            stroke="#92400E"
            strokeWidth="2.2"
            strokeDasharray="10 8"
            style={{ animation: 'routeDashFlow 14s linear infinite' }}
          />
          <g style={{ transformOrigin: '1075px 175px', animation: 'compassSpinSlow 38s linear infinite' }}>
            <circle cx="1075" cy="175" r="58" fill="none" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="1.5" strokeDasharray="4 4" />
            <polygon points="1075,112 1083,167 1075,158 1067,167" fill="rgba(185, 28, 28, 0.52)" />
            <polygon points="1075,238 1083,183 1075,192 1067,183" fill="rgba(120, 53, 15, 0.45)" />
            <polygon points="1012,175 1067,167 1058,175 1067,183" fill="rgba(120, 53, 15, 0.45)" />
            <polygon points="1138,175 1083,167 1092,175 1083,183" fill="rgba(120, 53, 15, 0.45)" />
          </g>
        </svg>
      </div>

      {/* ====================================================================
          TOP BAR + LEGENDA COMPACTA ELEVADA (NÃO ENCOBRE O LIVRO 3D!)
      ==================================================================== */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(28, 22, 16, 0.72)',
            backdropFilter: 'blur(12px)',
            padding: '4px 12px 4px 5px',
            borderRadius: 999,
            border: '1px solid rgba(255, 245, 225, 0.32)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.28)',
          }}
        >
          <button
            onClick={() => setFlippedSheet(0)}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255, 248, 235, 0.18)',
              border: '1px solid rgba(255, 248, 235, 0.35)',
              color: '#FFFBEB',
              fontWeight: 900,
              fontSize: 12,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
            title="Voltar à estante dos 5 Campi"
          >
            III
          </button>
          <span style={{ fontSize: 14, fontWeight: 900, color: '#FFFBEB', letterSpacing: '-0.01em' }}>
            Atlas dos Campi UnB
          </span>
        </div>

        {/* Legenda compacta central, elevada no topo */}
        <div
          style={{
            background: 'rgba(28, 22, 16, 0.76)',
            backdropFilter: 'blur(12px)',
            padding: '6px 20px',
            borderRadius: 14,
            border: '1px solid rgba(245, 230, 205, 0.35)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 900, color: '#FFFBEB', letterSpacing: '-0.01em' }}>
            {activeBook.title}
          </span>
          <span style={{ width: 1, height: 16, background: 'rgba(255, 255, 255, 0.25)' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FDE68A' }}>
            {activeBook.campusName} · {activeBook.courses.length} Cursos
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setFlippedSheet((prev) => (prev === 0 ? 1 : 0))}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(28, 22, 16, 0.72)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 245, 225, 0.32)',
              color: '#FFFBEB',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 800,
            }}
            title={isBookOpen ? 'Fechar livro' : 'Abrir livro e ver cursos'}
          >
            Aa
          </button>
          <button
            onClick={() => onNavigateScreen(1)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(28, 22, 16, 0.72)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 245, 225, 0.32)',
              color: '#FFFBEB',
              cursor: 'pointer',
              fontSize: 13,
            }}
            title="Ir para o Fluxograma Ativo"
          >
            ☰
          </button>
        </div>
      </header>

      {/* ====================================================================
          SETAS LATERAIS DE NAVEGAÇÃO ENTRE OS LIVROS COM CLIQUE DO MOUSE
      ==================================================================== */}
      <button
        onClick={() => {
          if (isBookOpen) {
            setFlippedSheet((prev) => Math.max(0, prev - 1));
          } else {
            setActiveBookIdx((prev) => Math.max(0, prev - 1));
          }
        }}
        disabled={activeBookIdx === 0 && !isBookOpen}
        style={{
          position: 'absolute',
          left: 20,
          top: '52%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(28, 20, 13, 0.76)',
          backdropFilter: 'blur(14px)',
          border: '1.5px solid rgba(212, 163, 89, 0.55)',
          color: '#FDE68A',
          fontSize: 22,
          fontWeight: 900,
          cursor: activeBookIdx === 0 && !isBookOpen ? 'not-allowed' : 'pointer',
          opacity: activeBookIdx === 0 && !isBookOpen ? 0.3 : 0.92,
          zIndex: 60,
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
        title="Campus anterior"
      >
        ‹
      </button>

      <button
        onClick={() => {
          if (isBookOpen) {
            setFlippedSheet((prev) => (prev < 1 ? prev + 1 : 0));
          } else {
            setActiveBookIdx((prev) => Math.min(CAMPUS_BOOKS_DATA.length - 1, prev + 1));
          }
        }}
        disabled={activeBookIdx === CAMPUS_BOOKS_DATA.length - 1 && !isBookOpen}
        style={{
          position: 'absolute',
          right: 20,
          top: '52%',
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(28, 20, 13, 0.76)',
          backdropFilter: 'blur(14px)',
          border: '1.5px solid rgba(212, 163, 89, 0.55)',
          color: '#FDE68A',
          fontSize: 22,
          fontWeight: 900,
          cursor: activeBookIdx === CAMPUS_BOOKS_DATA.length - 1 && !isBookOpen ? 'not-allowed' : 'pointer',
          opacity: activeBookIdx === CAMPUS_BOOKS_DATA.length - 1 && !isBookOpen ? 0.3 : 0.92,
          zIndex: 60,
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
        title="Próximo campus"
      >
        ›
      </button>

      {/* ====================================================================
          PALCO 3D COM ESPAÇO AMPLO VERTICAL
      ==================================================================== */}
      <div
        style={{
          position: 'relative',
          height: 470,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '2200px',
          marginTop: 6,
        }}
      >
        {isBookOpen && (
          <div
            onClick={() => setFlippedSheet(0)}
            style={{
              position: 'absolute',
              inset: -80,
              zIndex: 1,
              cursor: 'zoom-out',
            }}
            title="Clique fora do livro para fechar"
          />
        )}

        {/* CAMADA 2D DE CLIQUE DOS LIVROS FECHADOS */}
        {!isBookOpen && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 55,
            }}
          >
            {CAMPUS_BOOKS_DATA.map((book, idx) => {
              const offset = idx - activeBookIdx;
              const isSelected = offset === 0;
              const translateX = offset * 285;
              const translateY = isSelected ? -6 : 6;
              const scale = isSelected ? 1.02 : 0.88;

              return (
                <div
                  key={`hit-closed-${book.id}`}
                  onMouseEnter={() => setHoveredBookIdx(idx)}
                  onMouseLeave={() => setHoveredBookIdx(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOrOpenBook(idx);
                  }}
                  title={
                    isSelected
                      ? `Clique para abrir o livro de "${book.title}"`
                      : `Clique para selecionar "${book.title}"`
                  }
                  style={{
                    position: 'absolute',
                    width: 280,
                    height: 386,
                    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    zIndex: isSelected ? 50 : 30 - Math.abs(offset),
                  }}
                />
              );
            })}
          </div>
        )}

        {/* ESTRUTURA 3D REAL DOS 5 LIVROS */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {CAMPUS_BOOKS_DATA.map((book, idx) => {
            const offset = idx - activeBookIdx;
            const absOff = Math.abs(offset);
            const isSelected = offset === 0;
            const isThisOpen = isSelected && flippedSheet > 0;
            const isHovered = hoveredBookIdx === idx;

            const baseSpacing = isBookOpen ? 370 : 285;
            const extraPushWhenOpen = isBookOpen && offset !== 0 ? (offset < 0 ? -235 : 235) : 0;
            const centerShiftWhenOpen = isThisOpen ? 185 : 0;

            const translateX = offset * baseSpacing + extraPushWhenOpen + centerShiftWhenOpen;
            const translateY = isSelected ? (isThisOpen ? 0 : isHovered ? -10 : -4) : isHovered ? -12 : 6;
            const translateZ = isSelected
              ? isThisOpen
                ? 240
                : isHovered
                ? 215
                : 195
              : Math.max(65, 175 - absOff * 52) + (isHovered ? 28 : 0);

            const rotateY = isThisOpen ? 0 : isSelected ? (isHovered ? -4 : -8) : offset < 0 ? 20 : -20;
            const scale = isThisOpen ? 1 : isSelected ? (isHovered ? 1.05 : 1.02) : isHovered ? 0.93 : Math.max(0.78, 0.89 - (absOff - 1) * 0.08);
            const opacity = isBookOpen && absOff > 1 ? 0.22 : isBookOpen && offset !== 0 ? 0.52 : 1;

            const bookW = isThisOpen ? 370 : 268;
            const bookH = isThisOpen ? 412 : 374;

            const tiltX = isSelected ? -mouseTilt.y * 4 : -mouseTilt.y * 2;
            const tiltY = isSelected ? mouseTilt.x * 5 : mouseTilt.x * 2;

            return (
              <div
                key={book.id}
                style={{
                  position: 'absolute',
                  width: bookW,
                  height: bookH,
                  transformStyle: 'preserve-3d',
                  transition:
                    'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), width 0.78s cubic-bezier(0.16, 1, 0.3, 1), height 0.78s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease',
                  transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${tiltX}deg) rotateY(${
                    rotateY + tiltY
                  }deg) scale(${scale})`,
                  animation: `bookGentleFloat ${4.2 + idx * 0.45}s ease-in-out infinite`,
                  zIndex: isSelected ? 40 : 25 - absOff,
                  opacity,
                  pointerEvents: 'none',
                }}
              >
                {/* SOMBRA VERTICAL DE FUNDO (IGUAL AO VÍDEO) */}
                <div
                  style={{
                    position: 'absolute',
                    left: isThisOpen ? -bookW + 20 : 22,
                    width: isThisOpen ? bookW * 2 : bookW + 8,
                    top: isThisOpen ? 34 : 26,
                    height: isThisOpen ? bookH + 85 : bookH + 56,
                    borderRadius: isThisOpen ? '28px 28px 36px 36px' : '18px',
                    background: isSelected
                      ? 'linear-gradient(180deg, rgba(8, 11, 26, 0.55) 0%, rgba(6, 9, 22, 0.42) 65%, rgba(6, 9, 22, 0.08) 100%)'
                      : 'rgba(6, 9, 22, 0.38)',
                    filter: isSelected ? 'blur(20px)' : 'blur(14px)',
                    transform: 'translateZ(-42px)',
                    transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: 'none',
                  }}
                />

                {/* ESPESSURA DAS FOLHAS NO LIVRO FECHADO */}
                {!isThisOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: -10,
                      top: 5,
                      bottom: 5,
                      width: 14,
                      borderRadius: '0 12px 12px 0',
                      background:
                        'repeating-linear-gradient(90deg, #EFECE6 0px, #EFECE6 2px, #CBD5E1 2px, #CBD5E1 3px, #E5E0D5 3px, #E5E0D5 5px)',
                      border: '1px solid rgba(15, 23, 42, 0.35)',
                      boxShadow: `3px 0 0 ${book.spineColor}, 6px 8px 18px rgba(0,0,0,0.45)`,
                      transform: 'translateZ(-2px)',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* BASE DIREITA: PÁGINA DIREITA COM OS CURSOS */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'translateZ(0px)',
                    pointerEvents: isThisOpen ? 'auto' : 'none',
                  }}
                >
                  {renderCoursePage(rightPageCourses, book.campusName, 'right', book.coverAccent, handleCourseClick)}
                </div>

                {/* FOLHA 0: CAPA DO LIVRO (FRENTE: CAPA | VERSO: PÁGINA ESQUERDA COM OS CURSOS) */}
                {(() => {
                  const turned = isThisOpen && flippedSheet >= 1;
                  return (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        transformOrigin: 'left center',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.92s cubic-bezier(0.22, 1, 0.36, 1)',
                        transform: `translate3d(0px, 0px, 10px) rotateY(${turned ? -180 : 0}deg)`,
                        pointerEvents: 'none',
                      }}
                    >
                      {/* FRENTE DA CAPA */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          borderRadius: '6px 18px 18px 6px',
                          overflow: 'hidden',
                          boxShadow: isSelected
                            ? '0 28px 55px -12px rgba(0, 0, 0, 0.72), 0 0 0 1.5px rgba(255,255,255,0.45)'
                            : '0 20px 40px -12px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.18)',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 16,
                            background: book.spineColor,
                            boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.35)',
                            zIndex: 5,
                          }}
                        />
                        <div style={{ position: 'absolute', inset: 0, marginLeft: 14 }}>
                          {renderCoverArt(book)}
                        </div>
                      </div>

                      {/* VERSO DA CAPA: PÁGINA ESQUERDA COM OS CURSOS */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          pointerEvents: isThisOpen ? 'auto' : 'none',
                        }}
                      >
                        {renderCoursePage(leftPageCourses, book.campusName, 'left', book.coverAccent, handleCourseClick)}
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          BARRA INFERIOR EM PERGAMINHO & BRONZE (•••  |  ↑  |  ⊞  |  +)
      ==================================================================== */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          zIndex: 30,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(180deg, #F5EFE2 0%, #E6D8BE 100%)',
            padding: '6px 14px',
            borderRadius: 999,
            border: '1.5px solid rgba(120, 82, 38, 0.55)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 16px 36px rgba(10, 6, 3, 0.55), inset 0 1px 0 rgba(255, 252, 245, 0.85)',
          }}
        >
          <button
            onClick={() => {
              if (isBookOpen) {
                setFlippedSheet((prev) => Math.max(0, prev - 1));
              } else {
                setActiveBookIdx((prev) => (prev - 1 + CAMPUS_BOOKS_DATA.length) % CAMPUS_BOOKS_DATA.length);
              }
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1.5px solid rgba(120, 82, 38, 0.45)',
              background: '#FDFBF7',
              color: '#291D12',
              fontWeight: 900,
              fontSize: 13,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
            title={isBookOpen ? 'Fechar Livro' : 'Campus à Esquerda'}
          >
            •••
          </button>

          <button
            onClick={() => {
              onSelectCourseToast(`Curso de Engenharia de Software FGA aplicado no simulador!`);
              onNavigateScreen(1);
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1.5px solid rgba(120, 82, 38, 0.45)',
              background: '#FDFBF7',
              color: '#991B1B',
              fontWeight: 900,
              fontSize: 15,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
            title="Abrir Fluxograma no Kepler"
          >
            ↑
          </button>

          <button
            onClick={() => setFlippedSheet((prev) => (prev === 0 ? 1 : 0))}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1.5px solid #291D12',
              background: isBookOpen ? '#291D12' : '#FDFBF7',
              color: isBookOpen ? '#FDE68A' : '#291D12',
              fontWeight: 900,
              fontSize: 15,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
            title={isBookOpen ? 'Fechar livro' : 'Abrir e ver cursos'}
          >
            ⊞
          </button>

          <button
            onClick={() => {
              if (isBookOpen) {
                setFlippedSheet(0);
              } else {
                setFlippedSheet(1);
              }
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1.5px solid rgba(120, 82, 38, 0.45)',
              background: '#FDFBF7',
              color: '#291D12',
              fontWeight: 900,
              fontSize: 18,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
            title={isBookOpen ? 'Fechar livro' : 'Abrir livro'}
          >
            +
          </button>
        </div>
      </div>

      {/* ====================================================================
          MODAL INTERATIVO DO FLUXOGRAMA COM SETAS E DEPENDÊNCIAS
      ==================================================================== */}
      {selectedCourseModal && (
        <CourseFlowchartModal
          course={{
            code: selectedCourseModal.code,
            name: selectedCourseModal.name,
            campus: activeBook.campusName,
            unit: selectedCourseModal.unit,
          }}
          onClose={() => setSelectedCourseModal(null)}
          onOpenKeplerPlan={() => {
            onSelectCourseToast(`Curso "${selectedCourseModal.name}" ativo no Planejador Kepler!`);
            setSelectedCourseModal(null);
            onNavigateScreen(1);
          }}
        />
      )}
    </div>
  );
}
