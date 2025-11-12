// components/effects/CursorTrail.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let mouseX = 0, mouseY = 0;
        let trails: any[] = [];

        const handleMouse = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            trails.push({
                x: mouseX,
                y: mouseY,
                age: 0,
                color: Math.random() > 0.5 ? '#00FF9D' : '#FFD700',
            });
        };

        window.addEventListener('mousemove', handleMouse);

        const animate = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            trails.forEach((t, i) => {
                t.age++;
                if (t.age > 30) {
                    trails.splice(i, 1);
                    return;
                }

                const size = 20 * (1 - t.age / 30);
                ctx.fillStyle = t.color;
                ctx.shadowBlur = 30;
                ctx.shadowColor = t.color;
                ctx.globalAlpha = 1 - t.age / 30;
                ctx.fillRect(t.x - size / 2, t.y - size / 2, size, size);
            });

            requestAnimationFrame(animate);
        };
        animate();

        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
        />
    );
}