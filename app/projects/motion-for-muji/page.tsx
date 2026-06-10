import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/RAPIN_AGATHE_MOTION.mp4',
];

const credits = [
    'motion design',
    'december 2025',
    'promo video for the muji wall mounted cd player',
];

export default function MotionForMujiProject() {
    return (
        <ProjectShowcase
            backgroundVideo="https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/RAPIN_AGATHE_MOTION.mp4"
            titleLines={['motion for', 'muji']}
            credits={credits}
            images={images}
        />
    );
}
