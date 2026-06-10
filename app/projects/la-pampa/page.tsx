import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/motion-la-pampa.mp4',
    '/img/la_pampa/page_1.webp',
    '/img/la_pampa/page_2.webp',
    '/img/la_pampa/page_3.webp',
    '/img/la_pampa/page_4.webp',
    '/img/la_pampa/page_5.webp',
    'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/demo_pampa.mp4',
];

const credits = [
    'media for local artists & events',
    'march 2026',
    'motion design, print & web design',
    '<a href="https://lapampamedia.vercel.app/" target="_blank" rel="noopener noreferrer">visit the website ↗</a>',
];

export default function LaPampaProject() {
    return (
        <ProjectShowcase
            backgroundVideo="https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/motion-la-pampa.mp4"
            titleLines={['la pampa', 'design']}
            credits={credits}
            images={images}
        />
    );
}
