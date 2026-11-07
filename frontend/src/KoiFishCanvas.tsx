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

    // Mouse tracker para interação suave
    const mouse = { x: width / 2, y: height / 2, active: false, rippleTimer: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.rippleTimer++;
      if (mouse.rippleTimer % 12 === 0) {
        addRipple(e.clientX, e.clientY, 0.45, 1.2);
      }
    };
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // =========================================================================
    // RIPPLES (ONDAS NA ÁGUA)
    // =========================================================================
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
    const addRipple = (x: number, y: number, alpha = 0.35, speed = 1.0, color = 'rgba(56, 214, 252,') => {
      if (ripples.length > 35) ripples.shift();
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: 100 + Math.random() * 80,
        alpha,
        color,
        speed,
      });
    };

    // =========================================================================
    // PARTÍCULAS DE LUZ SUBAQUÁTICA
    // =========================================================================
    interface Sparkle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      fadeSpeed: number;
      color: string;
    }
    const sparkles: Sparkle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6,
      fadeSpeed: 0.005 + Math.random() * 0.01,
      color: Math.random() > 0.4 ? 'rgba(56, 214, 252,' : 'rgba(255, 180, 67,',
    }));

    // =========================================================================
    // CLASSE DE CARPA KOI PROCEDURAL
    // =========================================================================
    class KoiFish {
      segmentsCount = 20;
      segmentLength = 9;
      segments: { x: number; y: number; angle: number }[] = [];
      orbitAngle: number;
      orbitSpeed: number;
      orbitRadiusX: number;
      orbitRadiusY: number;
      centerOffsetX: number;
      centerOffsetY: number;
      swimSpeed = 0.04;
      swimTime = 0;
      finCycle = 0;
      type: 'kohaku' | 'sanke'; // kohaku = branca c/ vermelho; sanke = dourada/laranja c/ preto

      constructor(
        initialOrbitAngle: number,
        orbitRadiusX: number,
        orbitRadiusY: number,
        type: 'kohaku' | 'sanke',
        centerOffsetX = 0,
        centerOffsetY = 0
      ) {
        this.orbitAngle = initialOrbitAngle;
        this.orbitSpeed = 0.0075 + (type === 'kohaku' ? 0.0003 : -0.0003);
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
        this.finCycle += 0.07;
        this.orbitAngle += this.orbitSpeed;

        const centerX = width / 2 + this.centerOffsetX;
        const centerY = height / 2 + this.centerOffsetY;

        // Trajetória orbital elíptica com leve perturbação senoidal
        let targetX = centerX + Math.cos(this.orbitAngle) * this.orbitRadiusX;
        let targetY = centerY + Math.sin(this.orbitAngle) * this.orbitRadiusY;

        // Se o mouse estiver por perto, o peixe se afasta suavemente
        if (mouse.active) {
          const dxM = targetX - mouse.x;
          const dyM = targetY - mouse.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 160 && distM > 1) {
            const push = (160 - distM) * 0.15;
            targetX += (dxM / distM) * push;
            targetY += (dyM / distM) * push;
          }
        }

        // Cabeça se desloca em direção ao alvo orbital
        const head = this.segments[0];
        const dx = targetX - head.x;
        const dy = targetY - head.y;
        head.angle = Math.atan2(dy, dx);
        head.x += dx * 0.08;
        head.y += dy * 0.08;

        // Propagação da cinemática inversa da coluna com ondulação lateral
        for (let i = 1; i < this.segmentsCount; i++) {
          const prev = this.segments[i - 1];
          const curr = this.segments[i];

          // Distância física fixa
          const segDx = curr.x - prev.x;
          const segDy = curr.y - prev.y;
          curr.angle = Math.atan2(segDy, segDx);

          // Onda senoidal de nado (amplitude cresce do meio para a cauda)
          const waveAmp = (i / this.segmentsCount) * 4.8;
          const waveOffset = Math.sin(this.swimTime - i * 0.38) * waveAmp;

          const normalAngle = curr.angle + Math.PI / 2;
          const offsetX = Math.cos(normalAngle) * waveOffset;
          const offsetY = Math.sin(normalAngle) * waveOffset;

          curr.x = prev.x + Math.cos(curr.angle) * this.segmentLength + offsetX * 0.18;
          curr.y = prev.y + Math.sin(curr.angle) * this.segmentLength + offsetY * 0.18;
        }

        // Emite ondas na água a partir da cauda periodicamente
        if (Math.sin(this.swimTime) > 0.94) {
          const tail = this.segments[this.segmentsCount - 1];
          addRipple(
            tail.x,
            tail.y,
            0.2,
            0.8,
            this.type === 'kohaku' ? 'rgba(56, 214, 252,' : 'rgba(255, 180, 67,'
          );
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();

        // 1. Sombra projetada do peixe no fundo do lago
        this.drawBodyShape(c, 18, 22, 'rgba(0, 4, 12, 0.45)');

        // 2. Nadadeiras peitorais (abaixo do corpo)
        this.drawPectoralFins(c);

        // 3. Nadadeira ventral e dorsal
        this.drawVentralFins(c);

        // 4. Corpo e escamas
        this.drawBodyWithScales(c);

        // 5. Cauda em leque fluida
        this.drawFanTail(c);

        // 6. Cabeça, olhos e barbilhões (bigodes)
        this.drawHeadDetails(c);

        c.restore();
      }

      // Largura do corpo em função do índice vertebral
      getBodyWidth(i: number): number {
        const t = i / this.segmentsCount;
        if (t < 0.18) return 11 + t * 40; // Cabeça alarga
        if (t < 0.5) return 18 - (t - 0.18) * 12; // Tronco
        return 14 * Math.max(0.15, 1 - (t - 0.4) * 1.5); // Afila até a cauda
      }

      drawBodyShape(c: CanvasRenderingContext2D, offX: number, offY: number, fillStyle: string) {
        c.save();
        c.translate(offX, offY);
        c.beginPath();

        const leftPts: { x: number; y: number }[] = [];
        const rightPts: { x: number; y: number }[] = [];

        for (let i = 0; i < this.segmentsCount; i++) {
          const seg = this.segments[i];
          const w = this.getBodyWidth(i);
          const norm = seg.angle + Math.PI / 2;
          leftPts.push({ x: seg.x + Math.cos(norm) * w, y: seg.y + Math.sin(norm) * w });
          rightPts.push({ x: seg.x - Math.cos(norm) * w, y: seg.y - Math.sin(norm) * w });
        }

        // Cabeça arredondada
        const head = this.segments[0];
        const headNorm = head.angle;
        c.moveTo(leftPts[0].x, leftPts[0].y);
        c.arc(head.x, head.y, 11, headNorm + Math.PI / 2, headNorm - Math.PI / 2, false);

        // Lado direito
        for (let i = 0; i < rightPts.length; i++) {
          c.lineTo(rightPts[i].x, rightPts[i].y);
        }

        // Cauda
        const tail = this.segments[this.segmentsCount - 1];
        c.lineTo(tail.x, tail.y);

        // Lado esquerdo de volta
        for (let i = leftPts.length - 1; i >= 0; i--) {
          c.lineTo(leftPts[i].x, leftPts[i].y);
        }

        c.closePath();
        c.fillStyle = fillStyle;
        c.fill();
        c.restore();
      }

      drawBodyWithScales(c: CanvasRenderingContext2D) {
        const head = this.segments[0];
        const tail = this.segments[this.segmentsCount - 1];

        // Gradiente principal de pele
        const grad = c.createLinearGradient(head.x, head.y, tail.x, tail.y);
        if (this.type === 'kohaku') {
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.3, '#FFFBF5');
          grad.addColorStop(0.7, '#F2E8DC');
          grad.addColorStop(1, '#FFFFFF');
        } else {
          grad.addColorStop(0, '#FFA834');
          grad.addColorStop(0.3, '#FF8A18');
          grad.addColorStop(0.7, '#D4680A');
          grad.addColorStop(1, '#FFA52A');
        }

        // Desenha o corpo base
        this.drawBodyShape(c, 0, 0, grad as any);

        // Manchas de Koi autênticas
        c.save();
        this.clipBody(c);

        if (this.type === 'kohaku') {
          // Manchas vermelhas (Hi)
          c.fillStyle = '#E8381A';
          const hi1 = this.segments[2];
          c.beginPath();
          c.ellipse(hi1.x, hi1.y, 18, 14, hi1.angle, 0, Math.PI * 2);
          c.fill();

          c.fillStyle = '#C92A10';
          const hi2 = this.segments[7];
          c.beginPath();
          c.ellipse(hi2.x, hi2.y, 22, 13, hi2.angle + 0.2, 0, Math.PI * 2);
          c.fill();

          c.fillStyle = '#D83214';
          const hi3 = this.segments[13];
          c.beginPath();
          c.ellipse(hi3.x, hi3.y, 14, 9, hi3.angle - 0.2, 0, Math.PI * 2);
          c.fill();
        } else {
          // Sanke/Utsuri: Manchas pretas profundas (Sumi) e vermelhas
          c.fillStyle = '#E63D18';
          const red1 = this.segments[3];
          c.beginPath();
          c.ellipse(red1.x, red1.y, 18, 13, red1.angle, 0, Math.PI * 2);
          c.fill();

          c.fillStyle = '#111319';
          const sumi1 = this.segments[5];
          c.beginPath();
          c.ellipse(sumi1.x, sumi1.y, 19, 12, sumi1.angle - 0.3, 0, Math.PI * 2);
          c.fill();

          const sumi2 = this.segments[11];
          c.beginPath();
          c.ellipse(sumi2.x, sumi2.y, 15, 9, sumi2.angle + 0.2, 0, Math.PI * 2);
          c.fill();
        }

        // Efeito de escamas sutis brilhantes
        for (let i = 2; i < this.segmentsCount - 4; i += 2) {
          const seg = this.segments[i];
          c.strokeStyle = this.type === 'kohaku' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 215, 0, 0.35)';
          c.lineWidth = 1;
          c.beginPath();
          c.arc(seg.x, seg.y, 6, seg.angle - 1, seg.angle + 1, false);
          c.stroke();
        }

        // Brilho dorsal 3D (highlight no dorso)
        c.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        c.lineWidth = 2.5;
        c.beginPath();
        c.moveTo(this.segments[1].x, this.segments[1].y);
        for (let i = 2; i < 14; i++) {
          c.lineTo(this.segments[i].x, this.segments[i].y);
        }
        c.stroke();

        c.restore();
      }

      clipBody(c: CanvasRenderingContext2D) {
        c.beginPath();
        const leftPts: { x: number; y: number }[] = [];
        const rightPts: { x: number; y: number }[] = [];

        for (let i = 0; i < this.segmentsCount; i++) {
          const seg = this.segments[i];
          const w = this.getBodyWidth(i);
          const norm = seg.angle + Math.PI / 2;
          leftPts.push({ x: seg.x + Math.cos(norm) * w, y: seg.y + Math.sin(norm) * w });
          rightPts.push({ x: seg.x - Math.cos(norm) * w, y: seg.y - Math.sin(norm) * w });
        }

        const head = this.segments[0];
        const headNorm = head.angle;
        c.moveTo(leftPts[0].x, leftPts[0].y);
        c.arc(head.x, head.y, 11, headNorm + Math.PI / 2, headNorm - Math.PI / 2, false);

        for (let i = 0; i < rightPts.length; i++) c.lineTo(rightPts[i].x, rightPts[i].y);
        const tail = this.segments[this.segmentsCount - 1];
        c.lineTo(tail.x, tail.y);
        for (let i = leftPts.length - 1; i >= 0; i--) c.lineTo(leftPts[i].x, leftPts[i].y);
        c.closePath();
        c.clip();
      }

      // Nadadeiras peitorais orgânicas com movimento fluido
      drawPectoralFins(c: CanvasRenderingContext2D) {
        const seg = this.segments[3];
        const flap = Math.sin(this.finCycle) * 0.35;

        // Nadadeira esquerda
        this.renderSingleFin(c, seg.x, seg.y, seg.angle + 1.2 + flap, 34, 18, true);
        // Nadadeira direita
        this.renderSingleFin(c, seg.x, seg.y, seg.angle - 1.2 - flap, 34, 18, false);
      }

      drawVentralFins(c: CanvasRenderingContext2D) {
        const seg = this.segments[9];
        const flap = Math.sin(this.finCycle + 1.5) * 0.2;
        this.renderSingleFin(c, seg.x, seg.y, seg.angle + 1.4 + flap, 20, 10, true);
        this.renderSingleFin(c, seg.x, seg.y, seg.angle - 1.4 - flap, 20, 10, false);
      }

      renderSingleFin(
        c: CanvasRenderingContext2D,
        x: number,
        y: number,
        angle: number,
        length: number,
        width: number,
        _isLeft: boolean
      ) {
        c.save();
        c.translate(x, y);
        c.rotate(angle);

        // Gradiente translúcido estilo seda
        const finGrad = c.createLinearGradient(0, 0, length, 0);
        finGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        finGrad.addColorStop(0.5, this.type === 'kohaku' ? 'rgba(255, 245, 235, 0.65)' : 'rgba(255, 190, 80, 0.65)');
        finGrad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');

        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(length * 0.4, -width * 0.5, length * 0.9, -width * 0.3, length, 0);
        c.bezierCurveTo(length * 0.8, width * 0.6, length * 0.3, width * 0.4, 0, 0);
        c.closePath();
        c.fillStyle = finGrad;
        c.fill();

        // Raios da nadadeira
        c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        c.lineWidth = 0.8;
        for (let r = 0.2; r <= 0.8; r += 0.2) {
          c.beginPath();
          c.moveTo(0, 0);
          c.quadraticCurveTo(length * 0.5, (r - 0.5) * width * 0.7, length * 0.9, (r - 0.5) * width * 0.5);
          c.stroke();
        }

        c.restore();
      }

      // Cauda majestosa em leque com atraso de arrasto na água
      drawFanTail(c: CanvasRenderingContext2D) {
        const last = this.segments[this.segmentsCount - 1];
        const prev = this.segments[this.segmentsCount - 3];
        const tailAngle = Math.atan2(last.y - prev.y, last.x - prev.x);
        const wave = Math.sin(this.swimTime - 2.5) * 0.35;

        c.save();
        c.translate(last.x, last.y);
        c.rotate(tailAngle + wave);

        const tailLength = 54;
        const tailSpread = 32;

        const tailGrad = c.createRadialGradient(0, 0, 2, 0, 0, tailLength);
        tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        tailGrad.addColorStop(0.4, this.type === 'kohaku' ? 'rgba(255, 240, 230, 0.75)' : 'rgba(255, 175, 50, 0.75)');
        tailGrad.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(tailLength * 0.5, -tailSpread * 0.8, tailLength * 0.8, -tailSpread, tailLength, -tailSpread * 0.6);
        c.bezierCurveTo(tailLength * 0.85, 0, tailLength * 0.85, 0, tailLength, tailSpread * 0.6);
        c.bezierCurveTo(tailLength * 0.8, tailSpread, tailLength * 0.5, tailSpread * 0.8, 0, 0);
        c.closePath();
        c.fillStyle = tailGrad;
        c.fill();

        // Filamentos finos na cauda (leque)
        c.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        c.lineWidth = 0.8;
        for (let i = -4; i <= 4; i++) {
          const ratio = i / 4;
          c.beginPath();
          c.moveTo(0, 0);
          c.quadraticCurveTo(tailLength * 0.6, ratio * tailSpread * 0.7, tailLength * 0.95, ratio * tailSpread * 0.55);
          c.stroke();
        }

        c.restore();
      }

      drawHeadDetails(c: CanvasRenderingContext2D) {
        const head = this.segments[0];
        const norm = head.angle + Math.PI / 2;

        // Olhos expressivos
        const eyeDist = 7;
        const eye1X = head.x + Math.cos(norm) * eyeDist - Math.cos(head.angle) * 3;
        const eye1Y = head.y + Math.sin(norm) * eyeDist - Math.sin(head.angle) * 3;
        const eye2X = head.x - Math.cos(norm) * eyeDist - Math.cos(head.angle) * 3;
        const eye2Y = head.y - Math.sin(norm) * eyeDist - Math.sin(head.angle) * 3;

        c.fillStyle = '#0F121C';
        c.beginPath();
        c.arc(eye1X, eye1Y, 2.2, 0, Math.PI * 2);
        c.arc(eye2X, eye2Y, 2.2, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = '#FFFFFF';
        c.beginPath();
        c.arc(eye1X + 0.6, eye1Y - 0.6, 0.9, 0, Math.PI * 2);
        c.arc(eye2X + 0.6, eye2Y - 0.6, 0.9, 0, Math.PI * 2);
        c.fill();

        // Barbilhões (bigodes de carpa) ondulando na água
        const barbLen = 14;
        const barbLag = Math.sin(this.swimTime * 1.5) * 0.25;

        c.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        c.lineWidth = 0.9;

        // Barbilhão esquerdo
        c.beginPath();
        c.moveTo(head.x + Math.cos(norm) * 5, head.y + Math.sin(norm) * 5);
        c.quadraticCurveTo(
          head.x + Math.cos(norm + 0.8 + barbLag) * (barbLen * 0.6),
          head.y + Math.sin(norm + 0.8 + barbLag) * (barbLen * 0.6),
          head.x + Math.cos(norm + 1.2 + barbLag) * barbLen,
          head.y + Math.sin(norm + 1.2 + barbLag) * barbLen
        );
        c.stroke();

        // Barbilhão direito
        c.beginPath();
        c.moveTo(head.x - Math.cos(norm) * 5, head.y - Math.sin(norm) * 5);
        c.quadraticCurveTo(
          head.x - Math.cos(norm - 0.8 - barbLag) * (barbLen * 0.6),
          head.y - Math.sin(norm - 0.8 - barbLag) * (barbLen * 0.6),
          head.x - Math.cos(norm - 1.2 - barbLag) * barbLen,
          head.y - Math.sin(norm - 1.2 - barbLag) * barbLen
        );
        c.stroke();
      }
    }

    // Instancia as duas carpas em órbita Yin Yang equilibrada
    const fish1 = new KoiFish(0, Math.min(width, height) * 0.32, Math.min(width, height) * 0.28, 'kohaku', 0, 0);
    const fish2 = new KoiFish(Math.PI, Math.min(width, height) * 0.32, Math.min(width, height) * 0.28, 'sanke', 0, 0);

    // =========================================================================
    // LOOP PRINCIPAL DE RENDERIZAÇÃO (60 FPS)
    // =========================================================================
    let time = 0;
    const render = () => {
      time += 0.016;

      // 1. Limpa o fundo com o escuro profundo do lago cósmico
      ctx.fillStyle = '#060B14';
      ctx.fillRect(0, 0, width, height);

      // Gradiente suave de iluminação central no lago
      const centerGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.65
      );
      centerGrad.addColorStop(0, 'rgba(10, 24, 48, 0.45)');
      centerGrad.addColorStop(0.5, 'rgba(8, 16, 32, 0.6)');
      centerGrad.addColorStop(1, 'rgba(4, 7, 14, 0.95)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Renderiza as partículas bioluminescentes
      for (let i = 0; i < sparkles.length; i++) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha += sp.fadeSpeed;
        if (sp.alpha > 0.8 || sp.alpha < 0.1) sp.fadeSpeed = -sp.fadeSpeed;

        if (sp.x < 0) sp.x = width;
        if (sp.x > width) sp.x = 0;
        if (sp.y < 0) sp.y = height;
        if (sp.y > height) sp.y = 0;

        ctx.fillStyle = `${sp.color} ${Math.max(0, sp.alpha)})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Renderiza e atualiza os ripples (ondas na água)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed * 1.4;
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

        // Segunda onda sutil concêntrica
        if (r.radius > 16) {
          ctx.strokeStyle = `${r.color} ${r.alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 4. Atualiza e desenha as carpas Koi
      fish1.update(time);
      fish2.update(time);

      fish1.draw(ctx);
      fish2.draw(ctx);

      animId = requestAnimationFrame(render);
    };

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
