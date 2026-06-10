import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/wandalange_maquette_v1%20(1080p).mp4',
    '/img/wandanlage/page-close-up-platine.webp',
    '/img/wandanlage/page-previsualisation.webp',
    '/img/wandanlage/page-404.webp',
    '/img/wandanlage/scroll-horizontal.webp',
    '/img/wandanlage/footer.webp',
];

const credits = [
    'web design tribute',
    'june 2024',
    'a tribute to the dieter rams wall unit for braun',
    'tags : web design',
];

export default function WandanlageProject() {
    return (
        <ProjectShowcase
            backgroundImage="/img/wandanlage/cover-landing-page.webp"
            titleLines={['wandanlage']}
            credits={credits}
            images={images}
        />
    );
}
