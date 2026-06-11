import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    '/img/tamisee/39440031.webp',
    '/img/tamisee/IMG_8408-2.webp',
    '/img/tamisee/img8317.webp',
    '/img/tamisee/39450025.webp',
    '/img/tamisee/39450020.webp',
    '/img/tamisee/img8474.webp',
    '/img/tamisee/39440014.webp',
    '/img/tamisee/img8230.webp',
    'video:/img/tamisee/scan-leo.mp4',
];

const credits = [
    'artistic direction: @ash1999__ & @zero.to.death',
    'photography: @brutal.vizion & @ash1999__',
    'models: @kushinailz & @edwin.ksb',
    'merch design: @zero.to.death',
    '3D scan: @ash1999__',
    '<br/>',
    'Concert artists: 8ruki & rowjay',
    'hosted and conceived by @Tamisee__',
    'location: ferrailleur, nantes',
];

export default function TamiseeProject() {
    return (
        <ProjectShowcase
            backgroundVideo="/img/tamisee/bg-video.mp4"
            titleLines={['raised behind the scenes', 'merchandising']}
            credits={credits}
            images={images}
        />
    );
}
