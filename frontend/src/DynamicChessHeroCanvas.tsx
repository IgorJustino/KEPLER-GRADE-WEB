import React, { useEffect, useRef } from 'react';

interface DynamicChessHeroCanvasProps {
  opacity?: number;
  interactive?: boolean;
  className?: string;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const DynamicChessHeroCanvas: React.FC<DynamicChessHeroCanvasProps> = ({
  opacity = 0.95,
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Carrega a pintura vitoriana da peça de xadrez e manuscritos de Kepler
    const chessImg = new Image();
    chessImg.src = '/bg/bureau-mathematical-sidework.png';
    let imgLoaded = false;
    chessImg.onload = () => {
      imgLoaded = true;
    };

    // Física de Parallax com inércia suave
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      tiltX: 0,
      tiltY: 0,
      active: false,
    };

    const ripples: ClickRipple[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a'))
      ) {
        return;
      }
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      ripples.push({
        x: clickX,
        y: clickY,
        radius: 12,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.9,
      });
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('click', handleClick);
    }

    // Partículas de poeira dourada iluminadas por lamparina (Floating dust motes)
    interface DustMote {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
      color: string;
    }

    const dustMotes: DustMote[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      size: 1 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -0.15 - Math.random() * 0.32,
      alpha: 0.1,
      maxAlpha: 0.3 + Math.random() * 0.5,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      pulseOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.35 ? 'rgba(224, 182, 94,' : 'rgba(255, 245, 220,',
    }));

    // Órbitas Elípticas de Kepler com planetas vivos
    interface KeplerOrbit {
      cx: number;
      cy: number;
      semiMajor: number;
      eccentricity: number;
      rotation: number;
      meanAnomaly: number;
      speed: number;
      color: string;
      bodySize: number;
      name: string;
    }

    const orbits: KeplerOrbit[] = [
      // Órbita no quadrante superior direito (Harmonices Mundi)
      {
        cx: 0.82,
        cy: 0.26,
        semiMajor: 125,
        eccentricity: 0.52,
        rotation: -0.35,
        meanAnomaly: 0,
        speed: 0.011,
        color: '#D4AF37',
        bodySize: 4.8,
        name: 'Mars',
      },
      {
        cx: 0.82,
        cy: 0.26,
        semiMajor: 78,
        eccentricity: 0.36,
        rotation: 0.42,
        meanAnomaly: Math.PI * 0.75,
        speed: 0.02,
        color: '#FFB84D',
        bodySize: 3.4,
        name: 'Earth',
      },
      // Órbita no quadrante inferior esquerdo (Astronomia Nova)
      {
        cx: 0.18,
        cy: 0.68,
        semiMajor: 115,
        eccentricity: 0.64,
        rotation: 0.28,
        meanAnomaly: 1.8,
        speed: 0.013,
        color: '#E8C582',
        bodySize: 4.2,
        name: 'Jupiter',
      },
    ];

    let time = 0;
    let running = true;

    const render = () => {
      if (!running) return;
      time += 0.016;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Inércia elástica do mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;
      mouse.tiltX = ((mouse.x / Math.max(1, width)) - 0.5) * 2;
      mouse.tiltY = ((mouse.y / Math.max(1, height)) - 0.5) * 2;

      ctx.clearRect(0, 0, width, height);

      // =======================================================================
      // 1. PINTURA DA PEÇA DE XADREZ COM PARALLAX E ZOOM DINÂMICO
      // =======================================================================
      ctx.save();
      const parallaxShiftX = -mouse.tiltX * 16;
      const parallaxShiftY = -mouse.tiltY * 10;
      const breathScale = 1.02 + Math.sin(time * 0.45) * 0.007;

      ctx.translate(width / 2 + parallaxShiftX, height / 2 + parallaxShiftY);
      ctx.scale(breathScale, breathScale);
      ctx.translate(-width / 2, -height / 2);

      if (imgLoaded && chessImg.naturalWidth > 0) {
        const imgRatio = chessImg.naturalWidth / chessImg.naturalHeight;
        const screenRatio = width / height;
        let drawW = width;
        let drawH = height;
        let drawX = 0;
        let drawY = 0;

        if (screenRatio > imgRatio) {
          drawW = width;
          drawH = width / imgRatio;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgRatio;
          drawX = (width - drawW) / 2;
        }

        ctx.globalAlpha = opacity;
        ctx.drawImage(chessImg, drawX, drawY, drawW, drawH);
      } else {
        ctx.fillStyle = '#050D0B';
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      // =======================================================================
      // 2. LUZ DE LAMPARINA A ÓLEO OSCILANTE (CANDLELIGHT FLICKER NA PEÇA)
      // =======================================================================
      ctx.save();
      // Posição central do Rei de xadrez na composição (~48.5% X, ~52% Y)
      const kingX = width * 0.485 + parallaxShiftX * 0.75;
      const kingY = height * 0.52 + parallaxShiftY * 0.75;

      const flicker = Math.sin(time * 2.1) * 0.05 + Math.sin(time * 5.3) * 0.025;
      const lampGlowRadius = Math.min(width, height) * (0.44 + flicker);

      const lampGlow = ctx.createRadialGradient(
        kingX + mouse.tiltX * 15,
        kingY - 35 + mouse.tiltY * 10,
        18,
        kingX,
        kingY,
        lampGlowRadius
      );
      lampGlow.addColorStop(0, 'rgba(255, 238, 195, 0.32)');
      lampGlow.addColorStop(0.32, 'rgba(224, 172, 80, 0.14)');
      lampGlow.addColorStop(0.68, 'rgba(15, 34, 28, 0.05)');
      lampGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = lampGlow;
      ctx.fillRect(0, 0, width, height);

      // Pulso áureo na coroa do Rei de xadrez (aura de sabedoria / intelecto)
      const crownX = kingX;
      const crownY = kingY - Math.min(height * 0.16, 120);
      const crownPulse = Math.sin(time * 2.4) * 0.5 + 0.5;

      const crownGlow = ctx.createRadialGradient(crownX, crownY, 2, crownX, crownY, 36);
      crownGlow.addColorStop(0, `rgba(255, 248, 225, ${(0.48 * crownPulse).toFixed(3)})`);
      crownGlow.addColorStop(0.45, `rgba(224, 180, 90, ${(0.22 * crownPulse).toFixed(3)})`);
      crownGlow.addColorStop(1, 'rgba(224, 180, 90, 0)');

      ctx.fillStyle = crownGlow;
      ctx.beginPath();
      ctx.arc(crownX, crownY, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // =======================================================================
      // 3. ÓRBITAS ELÍPTICAS DE KEPLER COM PLANETAS VIVOS (LEIS ORBITAIS)
      // =======================================================================
      ctx.save();
      for (const orbit of orbits) {
        const ox = width * orbit.cx + parallaxShiftX * 0.45;
        const oy = height * orbit.cy + parallaxShiftY * 0.45;

        orbit.meanAnomaly += orbit.speed;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(orbit.rotation);

        const a = orbit.semiMajor * (width < 900 ? 0.75 : 1);
        const b = a * Math.sqrt(1 - orbit.eccentricity * orbit.eccentricity);
        const focusOffset = a * orbit.eccentricity;

        // Linha orbital pontilhada cartográfica
        ctx.strokeStyle = `${orbit.color}40`;
        ctx.lineWidth = 1.1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.ellipse(-focusOffset, 0, a, b, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Posição orbital com 2ª Lei de Kepler (mais veloz no periélio)
        const E = orbit.meanAnomaly;
        const planetX = -focusOffset + a * Math.cos(E);
        const planetY = b * Math.sin(E);

        // Brilho do planeta
        const trailGrad = ctx.createRadialGradient(planetX, planetY, 0, planetX, planetY, orbit.bodySize * 3);
        trailGrad.addColorStop(0, `${orbit.color}ee`);
        trailGrad.addColorStop(0.4, `${orbit.color}55`);
        trailGrad.addColorStop(1, `${orbit.color}00`);

        ctx.fillStyle = trailGrad;
        ctx.beginPath();
        ctx.arc(planetX, planetY, orbit.bodySize * 3, 0, Math.PI * 2);
        ctx.fill();

        // O astro
        ctx.fillStyle = '#FFF8EE';
        ctx.beginPath();
        ctx.arc(planetX, planetY, orbit.bodySize * 0.85, 0, Math.PI * 2);
        ctx.fill();

        // Linha vetorial até o foco da elipse
        ctx.strokeStyle = `${orbit.color}25`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(planetX, planetY);
        ctx.stroke();

        ctx.restore();
      }
      ctx.restore();

      // =======================================================================
      // 4. RESSONÂNCIAS DE ONDAS MATEMÁTICAS AO CLICAR NA PEÇA/TELA
      // =======================================================================
      if (ripples.length > 0) {
        ctx.save();
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += 2.8;
          rip.alpha *= 0.96;

          if (rip.alpha <= 0.02 || rip.radius >= rip.maxRadius) {
            ripples.splice(r, 1);
            continue;
          }

          ctx.strokeStyle = `rgba(224, 185, 95, ${rip.alpha.toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Anel secundário concêntrico
          if (rip.radius > 25) {
            ctx.strokeStyle = `rgba(184, 50, 24, ${(rip.alpha * 0.6).toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.setLineDash([2, 5]);
            ctx.beginPath();
            ctx.arc(rip.x, rip.y, rip.radius * 0.7, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
        ctx.restore();
      }

      // =======================================================================
      // 5. POEIRA DOURADA EM SUSPENSÃO (FLOATING DUST MOTES)
      // =======================================================================
      ctx.save();
      for (let i = 0; i < dustMotes.length; i++) {
        const m = dustMotes[i];
        m.x += m.vx;
        m.y += m.vy;

        const pulse = Math.sin(time * 3 + m.pulseOffset) * 0.5 + 0.5;
        const currentAlpha = m.alpha + pulse * (m.maxAlpha - m.alpha);

        if (m.y < -20) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -20) m.x = width + 10;
        if (m.x > width + 20) m.x = -10;

        ctx.fillStyle = `${m.color} ${currentAlpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(m.x + parallaxShiftX * 0.3, m.y + parallaxShiftY * 0.3, m.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // =======================================================================
      // 6. VINHETA SUAVE DE BORDA
      // =======================================================================
      ctx.save();
      const edgeVignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.38,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      edgeVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      edgeVignette.addColorStop(0.65, 'rgba(3, 10, 8, 0.42)');
      edgeVignette.addColorStop(1, 'rgba(2, 6, 5, 0.85)');

      ctx.fillStyle = edgeVignette;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
      }
    };
  }, [opacity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`dynamic-chess-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      title="Peça de Xadrez de Kepler · Clique para emitir ondas matemáticas"
    />
  );
};
