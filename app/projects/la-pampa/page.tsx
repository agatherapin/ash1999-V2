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
    'La Pampa is an independent media dedicated to local artists and cultural events. It was born from the desire to give visibility to emerging creatives who operate outside mainstream circuits.',
    '<br><br>The project combines editorial content, motion design and visual identity into a coherent whole. The whole project has been imagined, created, written and developped by me @ash1999__',
    '<br>featured artists: @juliedoriath, @luciepng, @kuro_222, Aiman Khalid,',
    '<a href="https://lapampamedia.vercel.app/" target="_blank" rel="noopener noreferrer">visit the website ↗</a>',
];

export default function LaPampaProject() {
    return (
        <ProjectShowcase
            backgroundVideo="https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/motion-la-pampa.mp4"
            titleLines={['la pampa', 'le média des scènes hors-radar']}
            credits={credits}
            images={images}
        />
    );
}
