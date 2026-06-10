'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        if (videoRef.current) videoRef.current.muted = muted;
    }, [muted]);

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
                ← Back to portfolio
            </Link>

            {credits && credits.length > 0 && (
                <p className="showcase-credits">
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
                <div className="showcase-hero">
                    <h1 className="showcase-title">
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
                        />
                    ) : (
                        <img key={src} src={url} alt="" loading="lazy" className={className} />
                    );
                })}
            </div>
        </section>
    );
}
