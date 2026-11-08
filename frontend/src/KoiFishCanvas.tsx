import React, { useEffect, useRef } from 'react';

interface KoiFishCanvasProps {
  interactive?: boolean;
}

export const KoiFishCanvas: React.FC<KoiFishCanvasProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Carrega o fundo de arte de jornal com mapa histórico (mesmo da tela de livros)
    const newspaperImg = new Image();
    newspaperImg.src = '/bg/brasilis-bocchi-newspaper.jpg';
    let mapLoaded = false;
    newspaperImg.onload = () => {
      mapLoaded = true;
    };
    newspaperImg.onerror = () => {
      newspaperImg.src = '/bg/kepler-atlas-newspaper.webp';
    };

    // Rampa de caracteres ASCII de tipos móveis / prensa rotativa de jornal
    const ASCII_RAMP = [' ', '·', ':', '•', '+', 'x', '*', '%', '#', '■', '█'];
    const FIN_CHARS = ['~', '·', ':', '│', '╱', '╲', '∿', '(', ')', '›'];

    // Mouse tracker
    const mouse = { x: width / 2, y: height / 2, active: false, rippleTimer: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.rippleTimer++;
      if (mouse.rippleTimer % 12 === 0) {
        addRipple(e.clientX, e.clientY, 0.42, 1.2, 'rgba(184, 50, 24,'); // Vermelho carimbo de jornal
      }
    };
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Ondulações na água estilo gravura de jornal (nanquim suave e carimbo vermelho)
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
      speed: number;
    }
    const ripples: Ripple[] = [];
    const addRipple = (x: number, y: number, alpha = 0.35, speed = 1.0, color = 'rgba(28, 23, 18,') => {
      if (ripples.length > 30) ripples.shift();
      ripples.push({
        x,
        y,
        radius: 6,
        maxRadius: 130 + Math.random() * 80,
        alpha,
        color,
        speed,
      });
    };

    // Partículas de fragmentos de papel e poeira tipográfica
    interface Sparkle {
      x: number;
      y: number;
      char: string;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }
    const sparkles: Sparkle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      char: ['·', '°', '¤', '•', '⋆', '§', '¶'][Math.floor(Math.random() * 7)],
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: 0.25 + Math.random() * 0.5,
      color: Math.random() > 0.4 ? 'rgba(184, 50, 24, 0.7)' : 'rgba(40, 32, 24, 0.6)',
    }));

    // =========================================================================
    // CLASSE DA CARPA KOI EM ARTE JORNAL (XILOGRAVURA / NANQUIM / CARIMBO)
    // =========================================================================
    class NewspaperKoiFish {
      segmentsCount = 20;
      segmentLength = 9.5;
      segments: { x: number; y: number; angle: number }[] = [];
      orbitAngle: number;
      orbitSpeed: number;
      orbitRadiusX: number;
      orbitRadiusY: number;
      centerOffsetX: number;
      centerOffsetY: number;
      swimSpeed = 0.036;
      swimTime = 0;
      finCycle = 0;
      type: 'ink-woodcut' | 'carmine-stamp'; // ink-woodcut = nanquim puro de jornal; carmine-stamp = carimbo vermelho de imprensa

      constructor(
        initialOrbitAngle: number,
        orbitRadiusX: number,
        orbitRadiusY: number,
        type: 'ink-woodcut' | 'carmine-stamp',
        centerOffsetX = 0,
        centerOffsetY = 0
      ) {
        this.orbitAngle = initialOrbitAngle;
        this.orbitSpeed = 0.0065 + (type === 'ink-woodcut' ? 0.0003 : -0.0003);
        this.orbitRadiusX = orbitRadiusX;
        this.orbitRadiusY = orbitRadiusY;
        this.centerOffsetX = centerOffsetX;
        this.centerOffsetY = centerOffsetY;
        this.type = type;

        const startX = width / 2 + Math.cos(this.orbitAngle) * this.orbitRadiusX;
        const startY = height / 2 + Math.sin(this.orbitAngle) * this.orbitRadiusY;

        for (let i = 0; i < this.segmentsCount; i++) {
          this.segments.push({
            x: startX - i * this.segmentLength,
            y: startY,
            angle: 0,
          });
        }
      }

      update(time: number) {
        this.swimTime += this.swimSpeed;
        this.finCycle += 0.068;
        this.orbitAngle += this.orbitSpeed;

        const centerX = width / 2 + this.centerOffsetX;
        const centerY = height / 2 + this.centerOffsetY;

        let targetX = centerX + Math.cos(this.orbitAngle) * this.orbitRadiusX;
        let targetY = centerY + Math.sin(this.orbitAngle) * this.orbitRadiusY;

        if (mouse.active) {
          const dxM = targetX - mouse.x;
          const dyM = targetY - mouse.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 190 && distM > 1) {
            const push = (190 - distM) * 0.17;
            targetX += (dxM / distM) * push;
            targetY += (dyM / distM) * push;
          }
        }

        const head = this.segments[0];
        const dx = targetX - head.x;
        const dy = targetY - head.y;
        head.angle = Math.atan2(dy, dx);
        head.x += dx * 0.075;
        head.y += dy * 0.075;

        for (let i = 1; i < this.segmentsCount; i++) {
          const prev = this.segments[i - 1];
          const curr = this.segments[i];

          const segDx = curr.x - prev.x;
          const segDy = curr.y - prev.y;
          curr.angle = Math.atan2(segDy, segDx);

          const waveAmp = (i / this.segmentsCount) * 5.4;
          const waveOffset = Math.sin(this.swimTime - i * 0.4) * waveAmp;

          const normalAngle = curr.angle + Math.PI / 2;
          const offsetX = Math.cos(normalAngle) * waveOffset;
          const offsetY = Math.sin(normalAngle) * waveOffset;

          curr.x = prev.x + Math.cos(curr.angle) * this.segmentLength + offsetX * 0.2;
          curr.y = prev.y + Math.sin(curr.angle) * this.segmentLength + offsetY * 0.2;
        }

        if (Math.sin(this.swimTime) > 0.95) {
          const tail = this.segments[this.segmentsCount - 1];
          addRipple(
            tail.x,
            tail.y,
            0.24,
            0.9,
            this.type === 'carmine-stamp' ? 'rgba(184, 50, 24,' : 'rgba(40, 32, 24,'
          );
        }
      }

      getBodyHalfWidth(i: number): number {
        const t = i / this.segmentsCount;
        if (t < 0.16) return 9 + t * 44;
        if (t < 0.46) return 17 - (t - 0.16) * 11;
        return 13 * Math.max(0.12, 1 - (t - 0.4) * 1.55);
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();

        // 1. Sombra de nanquim impressa no papel jornal
        this.drawNewspaperShadow(c);

        // 2. Nadadeiras peitorais em bico de pena / gravura
        this.drawNewspaperPectoralFins(c);

        // 3. Corpo principal em tipos móveis e retícula de meio-tom
        this.drawNewspaperBody(c);

        // 4. Cauda leque em xilogravura
        this.drawNewspaperFanTail(c);

        // 5. Cabeça, olhos e barbilhões de pena
        this.drawNewspaperHead(c);

        c.restore();
      }

      drawNewspaperShadow(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(10, 14);
        c.font = 'bold 8px monospace';
        c.fillStyle = 'rgba(25, 18, 12, 0.45)';
        for (let i = 0; i < this.segmentsCount; i += 2) {
          const seg = this.segments[i];
          const halfW = this.getBodyHalfWidth(i);
          const norm = seg.angle + Math.PI / 2;
          for (let s = -halfW; s <= halfW; s += 6) {
            const px = seg.x + Math.cos(norm) * s;
            const py = seg.y + Math.sin(norm) * s;
            c.fillText('·', px, py);
          }
        }
        c.restore();
      }

      drawNewspaperBody(c: CanvasRenderingContext2D) {
        c.save();
        c.font = 'bold 8.5px "JetBrains Mono", monospace';
        c.textAlign = 'center';
        c.textBaseline = 'middle';

        const stepX = 5.2;
        for (let i = 0; i < this.segmentsCount; i++) {
          const seg = this.segments[i];
          const halfW = this.getBodyHalfWidth(i);
          const norm = seg.angle + Math.PI / 2;

          for (let s = -halfW; s <= halfW; s += stepX) {
            const px = seg.x + Math.cos(norm) * s;
            const py = seg.y + Math.sin(norm) * s;

            const distRatio = Math.abs(s) / (halfW + 0.1);
            const brightness = Math.max(0.18, 1 - distRatio * 0.75);

            const { color, char } = this.getNewspaperColorAndChar(i, s, distRatio, brightness);

            c.fillStyle = color;
            c.fillText(char, px, py);
          }
        }
        c.restore();
      }

      getNewspaperColorAndChar(segIdx: number, lateralOffset: number, distRatio: number, brightness: number) {
        const rampIdx = Math.floor(brightness * (ASCII_RAMP.length - 1));
        const char = ASCII_RAMP[Math.min(ASCII_RAMP.length - 1, Math.max(1, rampIdx))];

        if (this.type === 'carmine-stamp') {
          // Carpa 1: Gravura em Tinta Vermelha de Carimbo de Jornal & Sépia
          const isRedStamp =
            (segIdx >= 1 && segIdx <= 5 && Math.abs(lateralOffset) < 13) ||
            (segIdx >= 7 && segIdx <= 11 && Math.abs(lateralOffset) < 14) ||
            (segIdx >= 13 && segIdx <= 16 && Math.abs(lateralOffset) < 8);

          if (isRedStamp) {
            // Vermelho carmim de carimbo editorial
            const r = Math.floor(195 * brightness + 20);
            const g = Math.floor(40 * brightness + 10);
            const b = Math.floor(30 * brightness + 5);
            return { color: `rgb(${r}, ${g}, ${b})`, char: distRatio < 0.35 ? '#' : '%' };
          }

          // Papel de jornal envelhecido / sépia impresso
          const sepR = Math.floor(238 * brightness);
          const sepG = Math.floor(226 * brightness);
          const sepB = Math.floor(205 * brightness);
          return { color: `rgba(${sepR}, ${sepG}, ${sepB}, 0.95)`, char };
        } else {
          // Carpa 2: Nanquim Preto Puro & Tipografia de Jornal de Época
          const isDarkInk =
            (segIdx >= 2 && segIdx <= 6 && lateralOffset > -4 && lateralOffset < 12) ||
            (segIdx >= 9 && segIdx <= 13 && lateralOffset < 6);

          if (isDarkInk) {
            // Tinta de nanquim preto denso
            const k = Math.floor(20 * brightness + 5);
            return { color: `rgb(${k}, ${k - 2}, ${k - 4})`, char: '@' };
          }

          const isCarmineTouch =
            (segIdx >= 1 && segIdx <= 4 && lateralOffset < 3) ||
            (segIdx >= 7 && segIdx <= 9 && lateralOffset > -3);

          if (isCarmineTouch) {
            return { color: '#B83218', char: '#' };
          }

          // Linhas de gravura em carvão / cinza chumbo de jornal
          const lead = Math.floor(55 * brightness + 35);
          return { color: `rgb(${lead}, ${lead - 5}, ${lead - 10})`, char: distRatio < 0.4 ? '█' : '▒' };
        }
      }

      drawNewspaperPectoralFins(c: CanvasRenderingContext2D) {
        const seg = this.segments[3];
        const flap = Math.sin(this.finCycle) * 0.35;

        this.renderNewspaperFin(c, seg.x, seg.y, seg.angle + 1.25 + flap, 34, 16, true);
        this.renderNewspaperFin(c, seg.x, seg.y, seg.angle - 1.25 - flap, 34, 16, false);
      }

      renderNewspaperFin(
        c: CanvasRenderingContext2D,
        x: number,
        y: number,
        angle: number,
        length: number,
        width: number,
        isLeft: boolean
      ) {
        c.save();
        c.translate(x, y);
        c.rotate(angle);
        c.font = 'bold 8px monospace';
        c.textAlign = 'center';
        c.textBaseline = 'middle';

        const rays = 5;
        for (let r = 0; r < rays; r++) {
          const rAngle = ((r - (rays - 1) / 2) / rays) * 0.65;
          const rayLen = length * (1 - Math.abs(r - (rays - 1) / 2) * 0.15);

          for (let step = 6; step <= rayLen; step += 5.5) {
            const fx = Math.cos(rAngle) * step;
            const fy = Math.sin(rAngle) * step;
            const t = step / rayLen;

            const alpha = (0.95 - t * 0.5).toFixed(2);
            c.fillStyle =
              this.type === 'carmine-stamp'
                ? `rgba(184, 50, 24, ${alpha})`
                : `rgba(45, 36, 28, ${alpha})`;

            const char = FIN_CHARS[(r + Math.floor(step)) % FIN_CHARS.length];
            c.fillText(char, fx, fy);
          }
        }
        c.restore();
      }

      drawNewspaperFanTail(c: CanvasRenderingContext2D) {
        const last = this.segments[this.segmentsCount - 1];
        const prev = this.segments[this.segmentsCount - 3];
        const tailAngle = Math.atan2(last.y - prev.y, last.x - prev.x);
        const wave = Math.sin(this.swimTime - 2.4) * 0.35;

        c.save();
        c.translate(last.x, last.y);
        c.rotate(tailAngle + wave);
        c.font = 'bold 8.5px monospace';
        c.textAlign = 'center';
        c.textBaseline = 'middle';

        const tailLength = 54;
        const rays = 9;

        for (let r = 0; r < rays; r++) {
          const spreadRatio = (r - (rays - 1) / 2) / (rays / 2);
          const rAngle = spreadRatio * 0.72;
          const currentLen = tailLength * (1 - Math.abs(spreadRatio) * 0.2);

          for (let step = 6; step <= currentLen; step += 5.2) {
            const tx = Math.cos(rAngle) * step;
            const ty = Math.sin(rAngle) * step;
            const t = step / currentLen;

            const alpha = (0.95 - t * 0.55).toFixed(2);
            c.fillStyle =
              this.type === 'carmine-stamp'
                ? `rgba(184, 50, 24, ${alpha})`
                : `rgba(40, 32, 24, ${alpha})`;

            const char = FIN_CHARS[(r + Math.floor(step)) % FIN_CHARS.length];
            c.fillText(char, tx, ty);
          }
        }
        c.restore();
      }

      drawNewspaperHead(c: CanvasRenderingContext2D) {
        const head = this.segments[0];
        const norm = head.angle + Math.PI / 2;

        c.save();
        c.font = 'bold 9px monospace';
        c.textAlign = 'center';
        c.textBaseline = 'middle';

        const eyeDist = 8;
        const eye1X = head.x + Math.cos(norm) * eyeDist;
        const eye1Y = head.y + Math.sin(norm) * eyeDist;
        const eye2X = head.x - Math.cos(norm) * eyeDist;
        const eye2Y = head.y - Math.sin(norm) * eyeDist;

        c.fillStyle = '#110D09';
        c.fillText('●', eye1X, eye1Y);
        c.fillText('●', eye2X, eye2Y);

        c.fillStyle = '#F4EBD9';
        c.fillText('·', eye1X - 1, eye1Y - 1);
        c.fillText('·', eye2X - 1, eye2Y - 1);

        const barbLag = Math.sin(this.swimTime * 1.6) * 0.3;
        c.fillStyle = this.type === 'carmine-stamp' ? 'rgba(184, 50, 24, 0.85)' : 'rgba(40, 32, 24, 0.85)';
        for (let b = 1; b <= 4; b++) {
          const bDist = 4 + b * 4.5;
          const b1X = head.x + Math.cos(norm + 0.8 + barbLag) * bDist;
          const b1Y = head.y + Math.sin(norm + 0.8 + barbLag) * bDist;
          const b2X = head.x - Math.cos(norm - 0.8 - barbLag) * bDist;
          const b2Y = head.y - Math.sin(norm - 0.8 - barbLag) * bDist;

          c.fillText('~', b1X, b1Y);
          c.fillText('~', b2X, b2Y);
        }

        c.restore();
      }
    }

    // Instancia as duas carpas em arte jornal
    const fish1 = new NewspaperKoiFish(0, Math.min(width, height) * 0.31, Math.min(width, height) * 0.27, 'carmine-stamp');
    const fish2 = new NewspaperKoiFish(Math.PI, Math.min(width, height) * 0.31, Math.min(width, height) * 0.27, 'ink-woodcut');

    // =========================================================================
    // LOOP PRINCIPAL (ESTILO ARTE JORNAL HISTÓRICA & MAPA)
    // =========================================================================
    let time = 0;
    const render = () => {
      time += 0.016;

      // 1. Renderiza o mapa com arte de jornal de fundo (mesmo da tela de livros)
      if (mapLoaded && newspaperImg.width > 0) {
        ctx.drawImage(newspaperImg, 0, 0, width, height);

        // Pátina sépia de jornal envelhecido suave
        ctx.fillStyle = 'rgba(38, 28, 18, 0.42)';
        ctx.fillRect(0, 0, width, height);
      } else {
        // Fallback no tom de pergaminho de jornal
        ctx.fillStyle = '#EFE5D2';
        ctx.fillRect(0, 0, width, height);
      }

      // Linhas de colunas de jornal e grade náutica
      ctx.save();
      ctx.strokeStyle = 'rgba(60, 45, 30, 0.18)';
      ctx.lineWidth = 1;

      // Linhas pontilhadas náuticas no Pacífico
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(0, height * 0.38);
      ctx.bezierCurveTo(width * 0.35, height * 0.2, width * 0.65, height * 0.6, width, height * 0.45);
      ctx.stroke();

      for (let y = 90; y < height; y += 130) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Inscrição editorial no estilo imprensa de época
      ctx.font = '600 11px "Playfair Display", Georgia, serif';
      ctx.fillStyle = 'rgba(45, 35, 25, 0.45)';
      ctx.letterSpacing = '0.22em';
      ctx.fillText('GAZETA ACADÊMICA · OCEANO PACÍFICO · SEÇÃO CARTOGRÁFICA UNB', 40, height - 34);

      // Selo de Carimbo Editorial de Jornal no canto
      thisDrawNewspaperStamp(ctx, width - 110, 110);
      ctx.restore();

      // Vinheta suave de leitura nas bordas
      const paperGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        60,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72
      );
      paperGlow.addColorStop(0, 'rgba(255, 248, 235, 0.05)');
      paperGlow.addColorStop(0.65, 'rgba(35, 25, 15, 0.45)');
      paperGlow.addColorStop(1, 'rgba(20, 14, 8, 0.85)');
      ctx.fillStyle = paperGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Partículas tipográficas de imprensa
      ctx.font = '8.5px monospace';
      for (let i = 0; i < sparkles.length; i++) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        if (sp.x < 0) sp.x = width;
        if (sp.x > width) sp.x = 0;
        if (sp.y < 0) sp.y = height;
        if (sp.y > height) sp.y = 0;

        ctx.fillStyle = sp.color;
        ctx.fillText(sp.char, sp.x, sp.y);
      }

      // 3. Ripples estilo gravura de nanquim e carimbo
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed * 1.3;
        r.alpha -= 0.005;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `${r.color} ${r.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (r.radius > 20) {
          ctx.strokeStyle = `rgba(184, 50, 24, ${r.alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 15, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 4. Renderiza as carpas em arte jornal
      fish1.update(time);
      fish2.update(time);

      fish1.draw(ctx);
      fish2.draw(ctx);

      animId = requestAnimationFrame(render);
    };

    function thisDrawNewspaperStamp(c: CanvasRenderingContext2D, cx: number, cy: number) {
      c.save();
      c.translate(cx, cy);
      c.rotate(-0.15); // Efeito de carimbo levemente inclinado

      c.strokeStyle = 'rgba(184, 50, 24, 0.35)';
      c.fillStyle = 'rgba(184, 50, 24, 0.35)';
      c.lineWidth = 1.5;

      // Caixa com borda dupla típica de carimbo de jornal
      c.strokeRect(-42, -22, 84, 44);
      c.strokeRect(-38, -18, 76, 36);

      c.font = '700 8.5px "Playfair Display", Georgia, serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('EDIÇÃO EXTRA', 0, -6);

      c.font = '600 7.5px "JetBrains Mono", monospace';
      c.fillText('FGA · 2026', 0, 7);

      c.restore();
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
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
    />
  );
};
