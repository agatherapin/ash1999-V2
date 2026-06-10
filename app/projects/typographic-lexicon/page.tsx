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
    'glossary of essential typographic terms, concepts & history.',
    'date: october 2023',
];

export default function TypographicLexiconProject() {
    return (
        <ProjectShowcase
            backgroundImage="/img/lexique-typographique/cover.webp"
            titleLines={['typographic lexicon', 'all you need to know about type']}
            credits={credits}
            images={images}
        />
    );
}
