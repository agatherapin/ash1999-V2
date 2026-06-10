import ProjectShowcase from '@/components/ProjectShowcase';

const images = [
    '/img/lexique-typographique/sommaire.webp',
    '/img/lexique-typographique/lexique-typo-1.webp',
    '/img/lexique-typographique/lexique-typo-2.webp',
    '/img/lexique-typographique/lexique-typo-3.webp',
    '/img/lexique-typographique/lexique-typo-4.webp',
    '/img/lexique-typographique/lexique-typo-5.webp',
    '/img/lexique-typographique/lexique-typo-6.webp',
    '/img/lexique-typographique/lexique-typo-7.webp',
    '/img/lexique-typographique/lexique-typo-8.webp',
    '/img/lexique-typographique/lexique-typo-9.webp',
    '/img/lexique-typographique/lexique-typo-10.webp',
    '/img/lexique-typographique/lexique-typo-12.webp',
    '/img/lexique-typographique/lexique-typo-15.webp',
];

const credits = [
    'editorial design',
    'october 2023',
    'typographic vocabulary, technical terms & history of typefaces',
    'tags : typography, print',
];

export default function TypographicLexiconProject() {
    return (
        <ProjectShowcase
            backgroundImage="/img/lexique-typographique/cover.webp"
            titleLines={['typographic', 'lexicon']}
            credits={credits}
            images={images}
        />
    );
}
