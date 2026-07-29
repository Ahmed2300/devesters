"use client";

import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
  ctx: CanvasRenderingContext2D | null;
  mouse: { x: number | null; y: number | null; radius: number };

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D | null, mouse: { x: number | null; y: number | null; radius: number }) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 2 + 1; // Size between 1px and 3px
    this.density = (Math.random() * 25) + 5; // Weight of the particle
    this.color = Math.random() > 0.85 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 59, 48, 0.5)'; 
    this.ctx = ctx;
    this.mouse = mouse;
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update() {
    if (this.mouse.x !== null && this.mouse.y !== null) {
      let dx = this.mouse.x - this.x;
      let dy = this.mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouse.radius) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = this.mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 15;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 15;
        }
      }
    }
    this.draw();
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 140
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, ctx, mouse));
      }
    };

    let currentOffsetX = 0;
    let currentOffsetY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth Mouse Parallax for Grid
      const gridSize = 48;
      const targetOffsetX = mouse.x !== null ? (mouse.x - canvas.width / 2) * 0.04 : 0;
      const targetOffsetY = mouse.y !== null ? (mouse.y - canvas.height / 2) * 0.04 : 0;

      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.06;
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.06;

      // Draw Cursor Radial Glow on Grid
      if (mouse.x !== null && mouse.y !== null) {
        const glow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 320
        );
        glow.addColorStop(0, 'rgba(255, 59, 48, 0.09)');
        glow.addColorStop(0.5, 'rgba(56, 189, 248, 0.03)');
        glow.addColorStop(1, 'transparent');

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw Interactive Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = (currentOffsetX % gridSize) - gridSize; x < canvas.width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = (currentOffsetY % gridSize) - gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Update & Render Micro-Particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#050509]"
    />
  );
};

export default ParticleBackground;
