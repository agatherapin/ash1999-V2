import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    '/img/suburban/exterieur-mockup-suburban.webp',
    '/img/suburban/interieur-mockup-suburban.webp',
    '/img/suburban/logo.webp',
];

const credits = [
    'trifold brochure',
    'jan 2024',
    'fictional festival around rap music & urban culture',
    'tags : branding, print, typography',
];

export default function SuburbanProject() {
    return (
        <ProjectShowcase
            backgroundVideo="/img/suburban/titre-motion.mp4"
            titleLines={['suburban']}
            credits={credits}
            images={images}
        />
    );
}
