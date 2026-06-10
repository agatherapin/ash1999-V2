import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    '/img/rare-stage/front-cover.webp',
    '/img/rare-stage/rapport-front-back.webp',
    '/img/rare-stage/planche-logo-finale.webp',
    '/img/rare-stage/mockup-tee-stretch.webp',
    '/img/rare-stage/mockup-tee-outline.webp',
    '/img/rare-stage/planche-logo-test.webp',
    '/img/rare-stage/rapport-moodboard.webp',
    '/img/rare-stage/rapport-problematique.webp',
    '/img/rare-stage/rapport-1.webp',
    '/img/rare-stage/rapport-2.webp',
    '/img/rare-stage/rapport-3.webp',
    '/img/rare-stage/rapport-4.webp',
    '/img/rare-stage/rapport-5.webp',
    '/img/rare-stage/rapport-6.webp',
    '/img/rare-stage/rapport-7.webp',
    '/img/rare-stage/rapport-8.webp',
    '/img/rare-stage/rapport-9.webp',
];

const credits = [
    'internship : pmf music label',
    'jan – march 2025',
    'logo & mockups for rare',
    'tags : branding',
];

export default function PmfInternshipProject() {
    return (
        <ProjectShowcase
            backgroundImage="/img/rare-stage/back-cover.webp"
            titleLines={['internship with', 'pmf music label']}
            credits={credits}
            images={images}
        />
    );
}
