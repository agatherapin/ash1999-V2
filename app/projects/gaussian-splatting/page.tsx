import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    'video:/img/interactive%20design/fridge-details-scan.mp4',
    '/img/interactive%20design/profile-scan-1.webp',
    '/img/interactive%20design/profile-scan.webp',
    'video:/img/interactive%20design/img-flowers.mp4',
    'video:/img/interactive%20design/shoes-scan.mp4',
    'video:/img/interactive%20design/media-pipe-exp.mp4',
];

const credits = [
    'interactive workshop',
    'february 2026',
    '3d scanning & audio-reactive experiments at stéréolux, nantes',
    'tags : interactive, motion design',
];

export default function GaussianSplattingProject() {
    return (
        <ProjectShowcase
            backgroundVideo="https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/GaussianSplat_Agathe.mp4"
            titleLines={['gaussian', 'splatting']}
            credits={credits}
            images={images}
        />
    );
}
