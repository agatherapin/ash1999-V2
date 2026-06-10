'use client';

import { useEffect, useRef } from 'react';

const HOVER_SELECTOR = '.item, button, a, .modal-gallery-item';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        if (!dot) return;

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        dot.style.transform = `translate(calc(${window.innerWidth / 2}px - 50%), calc(${window.innerHeight / 2}px - 50%))`;

        function handleMouseMove(e: MouseEvent) {
            dot!.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
        }

        function handleCursorOver(e: MouseEvent) {
            const target = (e.target as Element).closest(HOVER_SELECTOR);
            if (target) dot!.classList.add('hover');
        }

        function handleCursorOut(e: MouseEvent) {
            const target = (e.target as Element).closest(HOVER_SELECTOR);
            if (target) dot!.classList.remove('hover');
        }

        function handleHide() {
            dot!.style.visibility = 'hidden';
            dot!.classList.remove('hover');
        }

        function handleShow() {
            dot!.style.visibility = '';
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleCursorOver);
        document.addEventListener('mouseout', handleCursorOut);
        window.addEventListener('cursor:hide', handleHide);
        window.addEventListener('cursor:show', handleShow);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleCursorOver);
            document.removeEventListener('mouseout', handleCursorOut);
            window.removeEventListener('cursor:hide', handleHide);
            window.removeEventListener('cursor:show', handleShow);
        };
    }, []);

    return <div className="cursor-dot" ref={dotRef} />;
}
