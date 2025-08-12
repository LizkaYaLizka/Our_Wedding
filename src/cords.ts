import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (targetSelector: string, movingSelector: string) => {
    const [progress, setProgress] = useState(0);
    const targetRef = useRef<HTMLElement | null>(null);
    const movingRef = useRef<HTMLElement | null>(null);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        targetRef.current = document.querySelector(targetSelector);
        movingRef.current = document.querySelector(movingSelector);

        const calculateProgress = () => {
            if (!targetRef.current || !movingRef.current) return;

            const targetRect = targetRef.current.getBoundingClientRect();
            const startRect = movingRef.current.getBoundingClientRect();

            const targetPos = {
                x: targetRect.left - startRect.left + 1000,
                y: targetRect.top - startRect.top
            };

            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const newProgress = Math.min(scrollY / (maxScroll), 1); // Анимация завершится на половине прокрутки

            setProgress(newProgress);

            // Применяем трансформацию
            const easeProgress = easeInOutCubic(newProgress);
            const currentX = targetPos.x * easeProgress;
            const currentY = targetPos.y * easeProgress;

            movingRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
        };

        const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const handleScroll = () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            animationFrameId.current = requestAnimationFrame(calculateProgress);
        };

        window.addEventListener('scroll', handleScroll);
        calculateProgress(); // Инициализация

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [targetSelector, movingSelector]);

    return progress;
};