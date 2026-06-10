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
    "I did a two-month internship in Paris as part of ThaHomey’s team.<br>We worked on the redesign of their “Rare” clothing line, <br>focusing in particular on the logo, mockups, and the brand’s overall visual identity.",
    '<br>The analysis and conclusions drawn from my internship are presented in a 60-page report on the influence of visual identity in French rap in 2025.',
    'date: january to march 2025',
];

export default function PmfInternshipProject() {
    return (
        <ProjectShowcase
            backgroundImage="/img/rare-stage/back-cover.webp"
            titleLines={['Propulsion Music Family', "ThaHomey's independant rap label"]}
            credits={credits}
            images={images}
        />
    );
}
