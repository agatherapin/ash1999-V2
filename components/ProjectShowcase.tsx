'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { projects, type Project } from '@/data/projects';

interface ProjectShowcaseProps {
    backgroundVideo?: string;
    backgroundImage?: string;
    titleLines: string[];
    credits?: string[];
    scrollHint?: string;
    images: string[];
}

function SpeakerOnIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M4 9v6h3.5l5 4V5l-5 4H4Z" />
            <path d="M16 8.5a4.8 4.8 0 0 1 0 7" />
            <path d="M18.5 6a8 8 0 0 1 0 12" />
        </svg>
    );
}

function SpeakerOffIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M4 9v6h3.5l5 4V5l-5 4H4Z" />
            <path d="m16 9.5 4.5 5" />
            <path d="m20.5 9.5-4.5 5" />
        </svg>
    );
}

export default function ProjectShowcase({
    backgroundVideo,
    backgroundImage,
    titleLines,
    credits,
    scrollHint = 'scroll down to discover ↓',
    images,
}: ProjectShowcaseProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const creditsRef = useRef<HTMLParagraphElement>(null);
    const relatedRef = useRef<HTMLDivElement>(null);
    const relatedHeadingRef = useRef<HTMLParagraphElement>(null);
    const [muted, setMuted] = useState(true);
    const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
    const [hideCredits, setHideCredits] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [zoomed, setZoomed] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

    // Pick 3 random other projects to suggest at the bottom of the page.
    // Done on the client only to avoid a hydration mismatch from Math.random().
    useEffect(() => {
        const currentSlug = pathname.split('/').filter(Boolean).pop();
        const others = projects.filter((project) => project.slug !== currentSlug);
        const shuffled = [...others].sort(() => Math.random() - 0.5);
        setRelatedProjects(shuffled.slice(0, 3));
    }, [pathname]);

    // Hide the fixed, centered credits once the "discover more projects"
    // heading scrolls into view, so they don't overlap it.
    useEffect(() => {
        const heading = relatedHeadingRef.current;
        if (!heading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideCredits(entry.isIntersecting);
            },
            { rootMargin: '0px 0px -35% 0px' }
        );
        observer.observe(heading);

        return () => observer.disconnect();
    }, [relatedProjects]);

    // The credits block is fixed and centered on screen, while the title
    // sits in normal flow with a 30vh top padding. Depending on how tall the
    // credits are and the viewport height, the title can overlap the
    // centered credits. Reduce the title's top padding just enough to keep a
    // gap above the credits, without affecting the scroll-flow behavior.
    useEffect(() => {
        const hero = heroRef.current;
        const title = titleRef.current;
        const credits = creditsRef.current;
        const firstCreditLine = credits?.firstElementChild as HTMLElement | null;
        if (!hero || !title) return;

        const MIN_PADDING_TOP = 96;
        const GAP_ABOVE_CREDITS = 24;

        function updatePadding() {
            const viewportHeight = window.innerHeight;
            const defaultPaddingTop = 0.3 * viewportHeight;

            // Reset to the default padding before measuring, so the
            // calculation always starts from a known baseline.
            hero!.style.setProperty('--hero-padding-top', `${defaultPaddingTop}px`);

            const titleBottom = title!.getBoundingClientRect().bottom;
            const creditsTop = firstCreditLine
                ? firstCreditLine.getBoundingClientRect().top
                : viewportHeight;

            const overlap = titleBottom + GAP_ABOVE_CREDITS - creditsTop;
            const paddingTop = overlap > 0
                ? Math.max(MIN_PADDING_TOP, defaultPaddingTop - overlap)
                : defaultPaddingTop;

            hero!.style.setProperty('--hero-padding-top', `${paddingTop}px`);
        }

        updatePadding();

        const resizeObserver = new ResizeObserver(updatePadding);
        resizeObserver.observe(title);
        if (credits) resizeObserver.observe(credits);
        window.addEventListener('resize', updatePadding);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updatePadding);
        };
    }, []);

    // Lock body scroll while the lightbox is open and allow closing/navigating with the keyboard.
    useEffect(() => {
        setZoomed(false);
        if (lightboxIndex === null) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') setLightboxIndex((current) => current === null ? null : (current - 1 + images.length) % images.length);
            if (e.key === 'ArrowRight') setLightboxIndex((current) => current === null ? null : (current + 1) % images.length);
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxIndex, images.length]);

    // The home page locks html/body (overflow hidden, fixed position) to drive
    // its drag-to-scroll canvas. Showcase pages are a normal scrolling document,
    // so that lock needs to be lifted while this page is mounted.
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        const previous = {
            htmlOverflow: html.style.overflow,
            htmlTouchAction: html.style.touchAction,
            bodyOverflow: body.style.overflow,
            bodyPosition: body.style.position,
            bodyWidth: body.style.width,
            bodyHeight: body.style.height,
        };

        html.style.overflow = 'auto';
        html.style.touchAction = 'auto';
        body.style.overflow = 'auto';
        body.style.position = 'static';
        body.style.width = 'auto';
        body.style.height = 'auto';

        return () => {
            html.style.overflow = previous.htmlOverflow;
            html.style.touchAction = previous.htmlTouchAction;
            body.style.overflow = previous.bodyOverflow;
            body.style.position = previous.bodyPosition;
            body.style.width = previous.bodyWidth;
            body.style.height = previous.bodyHeight;
        };
    }, []);

    return (
        <section className="showcase">
            {backgroundVideo ? (
                <video
                    ref={videoRef}
                    className="showcase-bg"
                    src={backgroundVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : backgroundImage ? (
                <div className="showcase-bg showcase-bg-image" style={{ backgroundImage: `url(${backgroundImage})` }} />
            ) : null}
            <div className="showcase-overlay" />

            <Link href="/" className="showcase-back">
                ←
            </Link>

            {credits && credits.length > 0 && (
                <p className={`showcase-credits${hideCredits ? ' showcase-credits--hidden' : ''}`} ref={creditsRef}>
                    {credits.map((line) =>
                        line.includes('<') ? (
                            <span key={line} dangerouslySetInnerHTML={{ __html: line }} />
                        ) : (
                            <span key={line}>{line}</span>
                        )
                    )}
                </p>
            )}

            {backgroundVideo && (
                <button
                    type="button"
                    onClick={() => setMuted((current) => !current)}
                    aria-pressed={!muted}
                    aria-label={muted ? 'Activer le son de la vidéo' : 'Couper le son de la vidéo'}
                    className="showcase-mute"
                >
                    {muted ? <SpeakerOffIcon className="showcase-icon" /> : <SpeakerOnIcon className="showcase-icon" />}
                </button>
            )}

            <div className="showcase-content">
                <div className="showcase-hero" ref={heroRef}>
                    <h1 className="showcase-title" ref={titleRef}>
                        {titleLines.map((line, index) => (
                            <span key={line} className={index === 0 ? 'showcase-title-main' : 'showcase-title-sub'}>
                                {line}
                            </span>
                        ))}
                    </h1>
                    <p className="showcase-scroll-hint">{scrollHint}</p>
                </div>

                {images.map((src, index) => {
                    const isVideo = src.startsWith('video:');
                    const url = isVideo ? src.slice('video:'.length) : src;
                    const className = `showcase-image ${index % 2 === 0 ? 'showcase-image-front' : 'showcase-image-back'}`;

                    const openLightbox = () => setLightboxIndex(index);

                    return isVideo ? (
                        <video
                            key={src}
                            src={url}
                            className={className}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            onClick={openLightbox}
                        />
                    ) : (
                        <img
                            key={src}
                            src={url}
                            alt=""
                            loading="lazy"
                            className={className}
                            onClick={openLightbox}
                        />
                    );
                })}

                {relatedProjects.length > 0 && (
                    <div className="showcase-related" ref={relatedRef}>
                        <p className="showcase-related-heading" ref={relatedHeadingRef}>Discover more projects</p>
                        <div className="showcase-related-grid">
                            {relatedProjects.map((project) => {
                                const isVideo = project.image.endsWith('.mp4');

                                return (
                                    <Link key={project.slug} href={`/projects/${project.slug}`} className="showcase-related-card">
                                        <div className="showcase-related-media">
                                            {isVideo ? (
                                                <video src={project.image} autoPlay loop muted playsInline />
                                            ) : (
                                                <img src={project.image} alt="" loading="lazy" />
                                            )}
                                        </div>
                                        <span className="showcase-related-title">{project.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {lightboxIndex !== null && (() => {
                const src = images[lightboxIndex];
                const isVideo = src.startsWith('video:');
                const url = isVideo ? src.slice('video:'.length) : src;

                const goToAdjacent = (e: React.MouseEvent) => {
                    const half = window.innerWidth / 2;
                    setLightboxIndex((current) => {
                        if (current === null) return null;
                        const delta = e.clientX < half ? -1 : 1;
                        return (current + delta + images.length) % images.length;
                    });
                };

                return (
                    <div className="showcase-lightbox" onClick={goToAdjacent}>
                        <button
                            type="button"
                            className="showcase-lightbox-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxIndex(null);
                            }}
                            aria-label="Fermer"
                        >
                            ×
                        </button>
                        {isVideo ? (
                            <video
                                src={url}
                                className="showcase-lightbox-media"
                                controls
                                autoPlay
                                loop
                                playsInline
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={url}
                                alt=""
                                className={`showcase-lightbox-media${zoomed ? ' showcase-lightbox-media--zoomed' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setZoomed((current) => !current);
                                }}
                            />
                        )}
                    </div>
                );
            })()}
        </section>
    );
}
