import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/RAPIN_AGATHE_MOTION.mp4',
];

const credits = [
    'motion design video to promote one of my favorite muji product.',
    'designed by the japanese designer Naoto Fukasawa.',
    'date: december 2025',
];

export default function MotionForMujiProject() {
    return (
        <ProjectShowcase
            backgroundVideo="https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/RAPIN_AGATHE_MOTION.mp4"
            titleLines={['Muji', 'cd wall mounted player']}
            credits={credits}
            images={images}
        />
    );
}
