import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    '/img/tamisee/img8474.webp',
    '/img/tamisee/img8412.webp',
    '/img/tamisee/img8408.webp',
    '/img/tamisee/img8310.webp',
    '/img/tamisee/img8317.webp',
    '/img/tamisee/img8344.webp',
    '/img/tamisee/img8245.webp',
    '/img/tamisee/img8399.webp',
    '/img/tamisee/img8230.webp',
];

const credits = [
    'artistic direction : @ash1999__ & @zero.to.death',
    'photography : @brutalvizion & @ash1999__',
    'models : @juliette & @edwin',
    'merch : @tamisée & @zero.to.death',
    'scenography : @girl',
    'location : ferrailleur, nantes',
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
