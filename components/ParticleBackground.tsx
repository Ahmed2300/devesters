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
    this.density = (Math.random() * 30) + 1; // Weight of the particle
    // Mix of Studio Red and Soft Aqua with low opacity
    this.color = Math.random() > 0.8 ? 'rgba(56, 189, 248, 0.5)' : 'rgba(220, 38, 38, 0.4)'; 
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
      // Calculate distance between mouse and particle
      let dx = this.mouse.x - this.x;
      let dy = this.mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      // Antigravity repulse logic
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = this.mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;

      if (distance < this.mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        // Return to original position smoothly
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 20;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 20;
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
    
    // Set Canvas to Full Screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Mouse position tracker
    let mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 120 // How close the mouse needs to be to repel particles
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Initialize Particle Field
    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 8000; // Adjust density here
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, ctx, mouse));
      }
    };

    let currentOffsetX = 0;
    let currentOffsetY = 0;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth Parallax Grid
      const gridSize = 50;
      const targetOffsetX = mouse.x !== null ? (mouse.x - canvas.width / 2) * 0.05 : 0;
      const targetOffsetY = mouse.y !== null ? (mouse.y - canvas.height / 2) * 0.05 : 0;

      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.05;
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.05;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
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

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
