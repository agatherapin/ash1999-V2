import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    '/img/interferences/affiche-la-cale.webp',
    '/img/interferences/affiche-final.webp',
    'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/interference-video-1.mp4',
    '/img/interferences/flyer-face.webp',
    '/img/interferences/flyer-verso.webp',
    'video:/img/interferences/motion-interferences.mp4',
];

const credits = [
    'exhibition about mapping and motion design',
    'branding & artistic direction: @ash1999__ & @art_by_apolline',
    'title design: @art_by_apolline',
    'motion design: @ash1999__',
    'mapping: third-year students at e-artsup ',
    'date: november 2024',
    'location: La cale 2 créateurs, Nantes',
    

];

export default function InterferencesProject() {
    return (
        <ProjectShowcase
            backgroundVideo="/img/interferences/motion-interferences.mp4"
            titleLines={['interférences exhibition', 'the new wave of motion design']}
            credits={credits}
            images={images}
        />
    );
}
