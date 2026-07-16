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
      const numberOfParticles = (canvas.width * canvas.height) / 20000; // Adjust density here
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, ctx, mouse));
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#050509]">
      {/* Islamic Geometric Line Pattern */}
      <div 
        className="absolute inset-0 opacity-40 bg-repeat bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='60' x2='120' y2='60' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Cline x1='60' y1='0' x2='60' y2='120' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Cline x1='0' y1='0' x2='120' y2='120' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Cline x1='120' y1='0' x2='0' y2='120' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Crect x='0.5' y='0.5' width='119' height='119' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Cpolygon points='60,15 105,60 60,105 15,60' stroke='rgba(220, 38, 38, 0.025)' stroke-width='0.75' /%3E%3Crect x='37.5' y='37.5' width='45' height='45' stroke='rgba(220, 38, 38, 0.025)' stroke-width='0.75' /%3E%3Ccircle cx='60' cy='60' r='15' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Ccircle cx='60' cy='60' r='30' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Ccircle cx='0' cy='0' r='15' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Ccircle cx='120' cy='0' r='15' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Ccircle cx='0' cy='120' r='15' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3Ccircle cx='120' cy='120' r='15' stroke='rgba(255, 255, 255, 0.012)' stroke-width='0.5' /%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;
