'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { projects } from '@/data/projects';

function optimizedSrc(src: string, width: number = 640): string {
    if (src.endsWith('.gif')) return src;
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

export default function Portfolio() {
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const filterContainerRef = useRef<HTMLDivElement>(null);
    const filterToggleRef = useRef<HTMLButtonElement>(null);
    const profileToggleRef = useRef<HTMLButtonElement>(null);
    const profileModalRef = useRef<HTMLDivElement>(null);
    const profileModalCloseRef = useRef<HTMLButtonElement>(null);
    const instructionsRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current!;
        const canvas = canvasRef.current!;
        const filterContainer = filterContainerRef.current!;
        const filterToggle = filterToggleRef.current!;
        const profileToggle = profileToggleRef.current!;
        const profileModal = profileModalRef.current!;
        const profileModalClose = profileModalCloseRef.current!;
        const loader = loaderRef.current;

        // =============================================
        // STATE
        // =============================================
        let isDragging = false;
        let hasMoved = false;
        let startX = 0;
        let startY = 0;
        let scrollLeftVal = 0;
        let scrollTopVal = 0;
        let velocityX = 0;
        let velocityY = 0;
        let lastX = 0;
        let lastY = 0;
        let lastTime = 0;
        let animationId: number | null = null;
        let mouseX = 0;
        let mouseY = 0;
        let currentMouseX = 0;
        let currentMouseY = 0;
        const activeFilters = new Set(['all']);
        const itemsCache: HTMLElement[] = [];
        let dragRafPending = false;
        let parallaxX = 0;
        let parallaxY = 0;
        let parallaxRafId: number | null = null;
        let alive = true;
        let loaderHidden = false;

        function updateCanvasTransform() {
            canvas.style.transform = `translate3d(${scrollLeftVal + parallaxX}px, ${scrollTopVal + parallaxY}px, 0)`;
        }

        function getCardScale() {
            const w = window.innerWidth;
            if (w <= 480) return 0.85;
            if (w <= 768) return 0.85;
            return 1;
        }

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        function getCanvasScale() {
            const w = window.innerWidth;
            if (w <= 480) return 1.45;
            if (w <= 768) return 1.45;
            return 0.88;
        }

        const canvasScale = getCanvasScale();
        const TILE_WIDTH = (window.innerWidth + 300) * canvasScale;
        const TILE_HEIGHT = (window.innerHeight + 300) * canvasScale;

        // Center the initial view on the main project cluster (Wandanlage, Skyjo, etc.)
        scrollLeftVal = -(0.60 * TILE_WIDTH - window.innerWidth / 2);
        scrollTopVal = -(0.99 * TILE_HEIGHT - window.innerHeight / 2);

        // =============================================
        // FILTERS
        // =============================================
        function handleFilterToggleClick() {
            filterContainer.classList.toggle('open');
            filterToggle.classList.toggle('active');
        }
        filterToggle.addEventListener('click', handleFilterToggleClick);

        function handleDocumentClickForFilter(e: MouseEvent) {
            if (!(e.target as Element).closest('.filter-wrapper')) {
                filterContainer.classList.remove('open');
                filterToggle.classList.remove('active');
            }
        }
        document.addEventListener('click', handleDocumentClickForFilter);

        function createFilterButtons() {
            const allTags = new Set<string>();
            projects.forEach(project => {
                project.tags.forEach(tag => allTags.add(tag));
            });

            const sortedTags = Array.from(allTags).sort();

            sortedTags.forEach(tag => {
                const btn = document.createElement('button');
                btn.className = 'filter-btn';
                btn.textContent = tag;
                btn.dataset.filter = tag;
                btn.addEventListener('click', () => toggleFilter(tag));
                filterContainer.appendChild(btn);
            });
        }

        function toggleFilter(filter: string) {
            if (filter === 'all') {
                activeFilters.clear();
                activeFilters.add('all');
            } else {
                activeFilters.delete('all');
                if (activeFilters.has(filter)) {
                    activeFilters.delete(filter);
                } else {
                    activeFilters.add(filter);
                }
                if (activeFilters.size === 0) {
                    activeFilters.add('all');
                }
            }

            updateFilterButtons();
            filterItems();
        }

        function updateFilterButtons() {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                const filter = (btn as HTMLElement).dataset.filter;
                btn.classList.toggle('active', activeFilters.has(filter!));
            });
        }

        function filterItems() {
            itemsCache.forEach((item, index) => {
                const project = projects[index % projects.length];
                const shouldShow = activeFilters.has('all') ||
                                  project.tags.some(tag => activeFilters.has(tag));
                item.classList.toggle('hidden', !shouldShow);
            });
        }

        // =============================================
        // CANVAS ITEMS
        // =============================================
        function createItems() {
            const scale = getCardScale();
            const fragment = document.createDocumentFragment();

            for (let tileY = -1; tileY <= 1; tileY++) {
                for (let tileX = -1; tileX <= 1; tileX++) {
                    projects.forEach((project) => {
                        const item = document.createElement('div');
                        item.className = 'item';
                        const isFeatured = ['La Pampa introduction', 'Gaussian Splatting'].includes(project.title);

                        const scaledWidth = project.width * scale;
                        const itemHeight = scaledWidth / project.aspectRatio;
                        item.style.width = scaledWidth + 'px';
                        item.style.height = itemHeight + 'px';

                        const baseTop = (project.top / 100) * TILE_HEIGHT;
                        const baseLeft = (project.left / 100) * TILE_WIDTH;
                        const finalTop = baseTop + (tileY * TILE_HEIGHT);
                        const finalLeft = baseLeft + (tileX * TILE_WIDTH);

                        item.style.top = finalTop + 'px';
                        item.style.left = finalLeft + 'px';
                        item.style.transform = 'translate(-50%, -50%)';

                        const coverHTML = project.video
                            ? `<video muted loop playsinline preload="metadata" class="img-fade-in" src="${project.video}"></video>`
                            : `<div class="img-placeholder" data-src="${project.image}" data-alt="${project.title}"></div>`;

                        item.innerHTML = `
                            <div class="item-card" style="aspect-ratio: ${project.aspectRatio};">
                                <div class="item-image">
                                    ${coverHTML}
                                    ${isFeatured ? '<span class="featured-badge">NEW</span>' : ''}
                                </div>
                                <div class="card-hover-glass">
                                    <div class="card-hover-text">
                                        <h3 class="card-hover-title">${project.title}</h3>
                                        <p class="card-hover-description">${project.description}</p>
                                    </div>
                                    <span class="card-hover-hint">click to discover</span>
                                </div>
                            </div>
                        `;

                        item.addEventListener('click', () => {
                            if (!hasMoved) {
                                router.push(`/projects/${project.slug}`);
                            }
                        });

                        fragment.appendChild(item);
                        itemsCache.push(item);
                    });
                }
            }

            canvas.appendChild(fragment);

            if (!isTouchDevice) {
                canvas.querySelectorAll('video').forEach(v => {
                    (v as HTMLVideoElement).play().catch(() => {});
                });
            }
        }

        // =============================================
        // DRAG & SCROLL
        // =============================================
        function handleMouseDown(e: MouseEvent) {
            isDragging = true;
            hasMoved = false;
            scrollContainer.classList.add('dragging');
            window.dispatchEvent(new Event('cursor:hide'));
            startX = e.pageX - scrollLeftVal;
            startY = e.pageY - scrollTopVal;
            lastX = e.pageX;
            lastY = e.pageY;
            lastTime = performance.now();
            velocityX = 0;
            velocityY = 0;

            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
        scrollContainer.addEventListener('mousedown', handleMouseDown);

        function _applyDragTransform() {
            updateCanvasTransform();
            dragRafPending = false;
        }

        const MAX_VELOCITY = 60;

        function handleMouseMove(e: MouseEvent) {
            if (!isDragging) return;
            e.preventDefault();

            const now = performance.now();
            const dt = now - lastTime;

            const x = e.pageX - startX;
            const y = e.pageY - startY;

            const moveDistance = Math.abs(e.pageX - lastX) + Math.abs(e.pageY - lastY);
            if (moveDistance > 5 && !hasMoved) {
                hasMoved = true;
                canvas.style.pointerEvents = 'none';
            }

            if (dt > 0) {
                velocityX = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, (e.pageX - lastX) / dt * 16));
                velocityY = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, (e.pageY - lastY) / dt * 16));
            }

            scrollLeftVal = x;
            scrollTopVal = y;
            wrapPosition();

            lastX = e.pageX;
            lastY = e.pageY;
            lastTime = now;

            if (!dragRafPending) {
                dragRafPending = true;
                requestAnimationFrame(_applyDragTransform);
            }
        }
        document.addEventListener('mousemove', handleMouseMove);

        function handleMouseUp() {
            if (!isDragging) return;
            isDragging = false;
            scrollContainer.classList.remove('dragging');
            canvas.style.pointerEvents = '';
            window.dispatchEvent(new Event('cursor:show'));
            applyMomentum();
        }
        document.addEventListener('mouseup', handleMouseUp);

        function handleWheel(e: WheelEvent) {
            if ((e.target as Element).closest('.modal-content')) return;
            e.preventDefault();

            scrollLeftVal -= e.deltaX;
            scrollTopVal -= e.deltaY;

            velocityX = -e.deltaX * 0.5;
            velocityY = -e.deltaY * 0.5;

            wrapPosition();
            updateCanvasTransform();

            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            applyMomentum();
        }
        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

        // =============================================
        // TOUCH EVENTS (mobile/tablet)
        // =============================================
        function handleTouchStart(e: TouchEvent) {
            const touch = e.touches[0];
            isDragging = true;
            hasMoved = false;
            scrollContainer.classList.add('dragging');
            startX = touch.pageX - scrollLeftVal;
            startY = touch.pageY - scrollTopVal;
            lastX = touch.pageX;
            lastY = touch.pageY;
            lastTime = performance.now();
            velocityX = 0;
            velocityY = 0;

            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
        scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });

        function handleTouchMove(e: TouchEvent) {
            if (!isDragging) return;
            e.preventDefault();

            const touch = e.touches[0];
            const now = performance.now();
            const dt = now - lastTime;

            const x = touch.pageX - startX;
            const y = touch.pageY - startY;

            const moveDistance = Math.abs(touch.pageX - lastX) + Math.abs(touch.pageY - lastY);
            if (moveDistance > 5 && !hasMoved) {
                hasMoved = true;
                canvas.style.pointerEvents = 'none';
            }

            if (dt > 0) {
                velocityX = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, (touch.pageX - lastX) / dt * 16));
                velocityY = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, (touch.pageY - lastY) / dt * 16));
            }

            scrollLeftVal = x;
            scrollTopVal = y;
            wrapPosition();

            lastX = touch.pageX;
            lastY = touch.pageY;
            lastTime = now;

            if (!dragRafPending) {
                dragRafPending = true;
                requestAnimationFrame(_applyDragTransform);
            }
        }
        scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });

        function handleTouchEnd() {
            if (!isDragging) return;
            isDragging = false;
            scrollContainer.classList.remove('dragging');
            canvas.style.pointerEvents = '';
            applyMomentum();
        }
        scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

        function wrapPosition() {
            while (scrollLeftVal > TILE_WIDTH / 2) {
                scrollLeftVal -= TILE_WIDTH;
                startX -= TILE_WIDTH;
            }
            while (scrollLeftVal < -TILE_WIDTH / 2) {
                scrollLeftVal += TILE_WIDTH;
                startX += TILE_WIDTH;
            }

            while (scrollTopVal > TILE_HEIGHT / 2) {
                scrollTopVal -= TILE_HEIGHT;
                startY -= TILE_HEIGHT;
            }
            while (scrollTopVal < -TILE_HEIGHT / 2) {
                scrollTopVal += TILE_HEIGHT;
                startY += TILE_HEIGHT;
            }
        }

        function applyMomentum() {
            const friction = 0.95;
            const threshold = 0.5;

            function animate() {
                if (!alive) return;
                if (Math.abs(velocityX) > threshold || Math.abs(velocityY) > threshold) {
                    velocityX *= friction;
                    velocityY *= friction;

                    scrollLeftVal += velocityX;
                    scrollTopVal += velocityY;

                    wrapPosition();
                    updateCanvasTransform();

                    animationId = requestAnimationFrame(animate);
                } else {
                    animationId = null;
                }
            }

            animate();
        }

        // =============================================
        // PARALLAX (desktop only)
        // =============================================
        const PARALLAX_STRENGTH = 20;

        function animateParallax() {
            if (!alive) return;
            if (isDragging) {
                parallaxRafId = null;
                return;
            }

            currentMouseX += (mouseX - currentMouseX) * 0.08;
            currentMouseY += (mouseY - currentMouseY) * 0.08;

            parallaxX = currentMouseX * PARALLAX_STRENGTH;
            parallaxY = currentMouseY * PARALLAX_STRENGTH;
            updateCanvasTransform();

            const settled = Math.abs(mouseX - currentMouseX) < 0.001 && Math.abs(mouseY - currentMouseY) < 0.001;
            if (!settled) {
                parallaxRafId = requestAnimationFrame(animateParallax);
            } else {
                parallaxRafId = null;
            }
        }

        function handleDesktopMouseMove(e: MouseEvent) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            if (!isDragging && !parallaxRafId) {
                parallaxRafId = requestAnimationFrame(animateParallax);
            }
        }

        if (!isTouchDevice) {
            document.addEventListener('mousemove', handleDesktopMouseMove);
        }

        // =============================================
        // PROFILE MODAL
        // =============================================
        function openProfileModal() {
            filterContainer.classList.remove('open');
            filterToggle.classList.remove('active');
            profileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeProfileModal() {
            profileModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function handleProfileToggleClick() {
            openProfileModal();
        }
        profileToggle.addEventListener('click', handleProfileToggleClick);

        function handleProfileModalCloseClick() {
            closeProfileModal();
        }
        profileModalClose.addEventListener('click', handleProfileModalCloseClick);

        function handleProfileModalBackdropClick(e: MouseEvent) {
            if (e.target === profileModal) closeProfileModal();
        }
        profileModal.addEventListener('click', handleProfileModalBackdropClick);

        function handleKeyDown(e: KeyboardEvent) {
            if (profileModal.classList.contains('active')) {
                if (e.key === 'Escape') closeProfileModal();
                return;
            }
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                navigateByArrow(e.key);
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        // =============================================
        // ASYNC IMAGE LOADING WITH PLACEHOLDERS
        // =============================================
        function swapPlaceholders(src: string) {
            const displaySrc = optimizedSrc(src);
            itemsCache.forEach(item => {
                const placeholder = item.querySelector(`.img-placeholder[data-src="${CSS.escape(src)}"]`);
                if (!placeholder) return;
                const el = placeholder as HTMLElement;
                const img = document.createElement('img');
                img.src = displaySrc;
                img.setAttribute('alt', el.dataset.alt || '');
                img.decoding = 'async';
                img.classList.add('img-fade-in');
                placeholder.replaceWith(img);
            });
        }

        function loadImagesAsync() {
            const staticProjects = projects.filter(p => !p.video);
            const allUrls = new Set(staticProjects.map(p => p.image));
            const webpUrls: string[] = [];
            const gifUrls: string[] = [];

            allUrls.forEach(src => {
                if (src.endsWith('.gif')) {
                    gifUrls.push(src);
                } else {
                    webpUrls.push(src);
                }
            });

            let webpDone = 0;
            const totalWebp = webpUrls.length;

            function tryLoadGifs() {
                gifUrls.forEach(src => {
                    const img = new window.Image();
                    img.onload = () => swapPlaceholders(src);
                    img.onerror = () => swapPlaceholders(src);
                    img.src = src;
                });
            }

            webpUrls.forEach(src => {
                const img = new window.Image();
                img.src = optimizedSrc(src);
                img.decode()
                    .then(() => {
                        swapPlaceholders(src);
                        if (webpDone >= 2) hideLoader();
                        if (++webpDone >= totalWebp) tryLoadGifs();
                    })
                    .catch(() => {
                        swapPlaceholders(src);
                        if (webpDone >= 2) hideLoader();
                        if (++webpDone >= totalWebp) tryLoadGifs();
                    });
            });

            if (totalWebp === 0) tryLoadGifs();
        }

        // =============================================
        // RESET VIEW
        // =============================================
        function animateScrollTo(targetX: number, targetY: number) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            const sX = scrollLeftVal;
            const sY = scrollTopVal;
            const startTime = performance.now();
            const duration = 400;
            function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
            function step() {
                if (!alive) return;
                const progress = Math.min((performance.now() - startTime) / duration, 1);
                const e = easeOutCubic(progress);
                scrollLeftVal = sX + (targetX - sX) * e;
                scrollTopVal = sY + (targetY - sY) * e;
                updateCanvasTransform();
                if (progress < 1) {
                    animationId = requestAnimationFrame(step);
                } else {
                    wrapPosition();
                    updateCanvasTransform();
                    animationId = null;
                }
            }
            step();
        }

        // =============================================
        // ARROW KEY NAVIGATION
        // =============================================
        function navigateByArrow(key: string) {
            const stepX = window.innerWidth * 0.35;
            const stepY = window.innerHeight * 0.35;
            let targetX = scrollLeftVal;
            let targetY = scrollTopVal;
            switch (key) {
                case 'ArrowRight': targetX -= stepX; break;
                case 'ArrowLeft':  targetX += stepX; break;
                case 'ArrowDown':  targetY -= stepY; break;
                case 'ArrowUp':    targetY += stepY; break;
            }
            animateScrollTo(targetX, targetY);
        }

        // =============================================
        // LOADER
        // =============================================
        function hideLoader() {
            if (loaderHidden || !loader) return;
            loaderHidden = true;
            loader.classList.add('loaded');
            setTimeout(() => { loader.style.display = 'none'; }, 700);
        }

        const loaderTimeout = setTimeout(hideLoader, 3000);

        // =============================================
        // INIT
        // =============================================
        createFilterButtons();
        createItems();
        loadImagesAsync();

        let videoObserver: IntersectionObserver | null = null;

        if (isTouchDevice) {
            const instructions = instructionsRef.current;
            if (instructions) {
                instructions.textContent = 'SWIPE TO MOVE · TAP TO DISCOVER';
            }
        }

        videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target as HTMLVideoElement;
                const item = video.closest('.item') as HTMLElement | null;
                if (entry.isIntersecting && item) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { rootMargin: '100px', threshold: 0 });

        canvas.querySelectorAll('video').forEach(v => {
            videoObserver!.observe(v);
        });

        // =============================================
        // CLEANUP
        // =============================================
        return () => {
            alive = false;
            clearTimeout(loaderTimeout);

            if (animationId) cancelAnimationFrame(animationId);
            if (parallaxRafId) cancelAnimationFrame(parallaxRafId);


            filterToggle.removeEventListener('click', handleFilterToggleClick);
            document.removeEventListener('click', handleDocumentClickForFilter);
            scrollContainer.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            scrollContainer.removeEventListener('wheel', handleWheel);

            scrollContainer.removeEventListener('touchstart', handleTouchStart);
            scrollContainer.removeEventListener('touchmove', handleTouchMove);
            scrollContainer.removeEventListener('touchend', handleTouchEnd);

            if (!isTouchDevice) {
                document.removeEventListener('mousemove', handleDesktopMouseMove);
            }

            profileToggle.removeEventListener('click', handleProfileToggleClick);
            profileModalClose.removeEventListener('click', handleProfileModalCloseClick);
            profileModal.removeEventListener('click', handleProfileModalBackdropClick);
            document.removeEventListener('keydown', handleKeyDown);

            if (videoObserver) videoObserver.disconnect();
            canvas.innerHTML = '';
        };
    }, []);

    return (
        <>
            {/* LOADER */}
            <div className="loader-overlay" ref={loaderRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/etoile-logo.webp" alt="" className="loader-logo" />
                <div className="loader-bar"><div className="loader-bar-inner" /></div>
            </div>

            {/* HEADER */}
            <div className="header">
                <div className="logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={optimizedSrc('/img/etoile-logo.webp', 256)} alt="ash1999" width={80} height={80} />
                </div>

                {/* RIGHT CONTROLS */}
                <div className="header-right">
                    <button className="profile-toggle" ref={profileToggleRef} aria-label="À propos">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M3 14.5c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </button>
                    {/* FILTER MENU */}
                    <div className="filter-wrapper">
                        <button className="filter-toggle" ref={filterToggleRef}>Filters</button>
                        <div className="filter-container" ref={filterContainerRef}>
                            <button className="filter-btn active" data-filter="all">All</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="instructions" ref={instructionsRef}>
                SCROLL/DRAG TO MOVE · CLICK TO DISCOVER
            </div>

            {/* MAIN CANVAS */}
            <div className="main-container">
                <div className="scroll-container" ref={scrollContainerRef}>
                    <div className="canvas" ref={canvasRef}></div>
                </div>
            </div>

            {/* PROFILE MODAL */}
            <div className="modal" ref={profileModalRef}>
                <div className="modal-content profile-modal-content">
                    <button className="modal-close" ref={profileModalCloseRef}>×</button>
                    <div className="modal-body">
                        <p className="profile-bio">
Hello! <br />
My name is Agathe and I&apos;m a French junior graphic designer. I like to explore multiple mediums and techniques. I&apos;ve been particularly drawn to interactive design, motion design &amp; web design lately. I love working with various media and blending traditional and digital approaches. Feel free to reach out if you're interested in collaborating. I love meeting new creatives!<br />
                        </p>

                        <div className="profile-experience">
                            <p className="profile-exp-label">Experiences</p>

                            <div className="profile-exp-item">
                                <div className="profile-exp-header">
                                    <span className="profile-exp-title">Graphic &amp; web designer</span>
                                    <span className="profile-exp-badge">★ INTERNSHIP</span>
                                </div>
                                <p className="profile-exp-desc">Tamisée, an association for the promotion of local underground culture and music.</p>
                                <p className="profile-exp-date">April 2026 – June 2026</p>
                            </div>

                            <div className="profile-exp-item">
                                <div className="profile-exp-header">
                                    <span className="profile-exp-title">Graphic &amp; branding designer</span>
                                    <span className="profile-exp-badge">★ INTERNSHIP</span>
                                </div>
                                <p className="profile-exp-desc">Propulsion Music Family, an independent rap label with ThaHomey as main artist. Merch rebranding, logo creation and mockups.</p>
                                <p className="profile-exp-date">February 2025 – March 2025</p>
                            </div>
                        </div>

                        <p className="profile-contact">
                            <a href="https://www.instagram.com/ash1999__/" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>follow me on Instagram: @ash1999__</a> <br />
                            <a href="https://www.linkedin.com/in/agathe-rapin/" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>find me on LinkedIn: Agathe Rapin</a> <br />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
