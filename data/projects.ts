export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    image: string;
    video?: string;
    gallery: string[];
    width: number;
    aspectRatio: number;
    top: number;
    left: number;
}

export const projects: Project[] = [
    {
        slug: 'pmf-internship',
        title: 'Internship with PMF music label',
        subtitle: 'Jan to March 2025',
        description: 'I worked on the logo and mockups for Rare, a brand created by ThaHomey\'s music label.',
        tags: ['Branding'],
        image: '/img/rare-stage/back-cover.webp',
        gallery: [
            '/img/rare-stage/front-cover.webp', '/img/rare-stage/rapport-front-back.webp',
            '/img/rare-stage/planche-logo-finale.webp', '/img/rare-stage/mockup-tee-stretch.webp',
            '/img/rare-stage/mockup-tee-outline.webp', '/img/rare-stage/planche-logo-test.webp',
            '/img/rare-stage/rapport-moodboard.webp', '/img/rare-stage/rapport-problematique.webp',
            '/img/rare-stage/rapport-1.webp', '/img/rare-stage/rapport-2.webp',
            '/img/rare-stage/rapport-3.webp', '/img/rare-stage/rapport-4.webp',
            '/img/rare-stage/rapport-5.webp', '/img/rare-stage/rapport-6.webp',
            '/img/rare-stage/rapport-7.webp', '/img/rare-stage/rapport-8.webp',
            '/img/rare-stage/rapport-9.webp'
        ],
        width: 240,
        aspectRatio: 3 / 4,
        top: 47,
        left: 47
    },
    {
        slug: 'suburban',
        title: 'Suburban',
        subtitle: 'Jan 2024',
        description: 'Trifold brochure to promote a fictional festival around rap music. Suburban is the name of a fictitious organization about urban culture, streetwear & rap music.',
        tags: ['Branding', 'Print', 'Typography'],
        image: '/img/suburban/titre-motion.mp4',
        video: '/img/suburban/titre-motion.mp4',
        gallery: ['/img/suburban/exterieur-mockup-suburban.webp', '/img/suburban/interieur-mockup-suburban.webp', '/img/suburban/logo.webp'],
        width: 240,
        aspectRatio: 3 / 4,
        top: 12,
        left: 53
    },
    {
        slug: 'la-pampa',
        title: 'La Pampa',
        subtitle: 'March 2026',
        description: 'Video for my project La Pampa, a media for local artists and events.',
        tags: ['Motion Design', 'Print', 'Webdesign', 'Interactive'],
        image: 'https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/motion-la-pampa.mp4',
        video: 'https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/motion-la-pampa.mp4',
        gallery: [
            'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/motion-la-pampa.mp4',
            '/img/la_pampa/page_1.webp', '/img/la_pampa/page_2.webp',
            '/img/la_pampa/page_3.webp', '/img/la_pampa/page_4.webp',
            '/img/la_pampa/page_5.webp', 'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/demo_pampa.mp4'
        ],
        width: 320,
        aspectRatio: 4 / 3,
        top: 82,
        left: 53
    },
    {
        slug: 'wandanlage',
        title: 'Wandanlage',
        subtitle: 'June 2024',
        description: 'As a great fan of Dieter Rams work, I decided to dedicate this web design project to the wall unit he designed for Braun in the 60s.',
        tags: ['Web Design'],
        image: '/img/wandanlage/cover-landing-page.webp',
        gallery: ['video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/wandalange_maquette_v1%20(1080p).mp4', '/img/wandanlage/page-close-up-platine.webp', '/img/wandanlage/page-previsualisation.webp', '/img/wandanlage/page-404.webp', '/img/wandanlage/scroll-horizontal.webp', '/img/wandanlage/footer.webp'],
        width: 320,
        aspectRatio: 4 / 3,
        top: 40,
        left: 82,
    },
    {
        slug: 'interferences',
        title: 'Interférences exhibition',
        subtitle: 'November 2024',
        description: 'The Interférences exhibition revolves around mapping and motion design, and showcases the work of third-year motion design students at E-artsup.',
        tags: ['Branding', 'Print', 'Motion Design'],
        image: '/img/interferences/motion-interferences.mp4',
        video: '/img/interferences/motion-interferences.mp4',
        gallery: ['/img/interferences/affiche-la-cale.webp','/img/interferences/affiche-final.webp', 
            'video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/interference-video-1.mp4',
            '/img/interferences/flyer-face.webp', '/img/interferences/flyer-verso.webp', 'video:/img/interferences/motion-interferences.mp4'],
        width: 240,
        aspectRatio: 3 / 4,
        top: 18,
        left: 12
    },
    {
        slug: 'typographic-lexicon',
        title: 'Typographic Lexicon',
        subtitle: 'October 2023',
        description: 'This lexicon is designed to help students learn about typography. It covers the essentials of typographic vocabulary and technical terms, and traces the history of typefaces.',
        tags: ['Typography', 'Print'],
        image: '/img/lexique-typographique/cover.webp',
        gallery: [
            '/img/lexique-typographique/cover.webp', '/img/lexique-typographique/sommaire.webp',
            '/img/lexique-typographique/lexique-typo-1.webp', '/img/lexique-typographique/lexique-typo-2.webp',
            '/img/lexique-typographique/lexique-typo-3.webp', '/img/lexique-typographique/lexique-typo-4.webp',
            '/img/lexique-typographique/lexique-typo-5.webp', '/img/lexique-typographique/lexique-typo-6.webp',
            '/img/lexique-typographique/lexique-typo-7.webp', '/img/lexique-typographique/lexique-typo-8.webp',
            '/img/lexique-typographique/lexique-typo-9.webp', '/img/lexique-typographique/lexique-typo-10.webp',
            '/img/lexique-typographique/lexique-typo-12.webp', '/img/lexique-typographique/lexique-typo-15.webp',
        ],
        width: 320,
        aspectRatio: 4 / 3,
        top: 81,
        left: 3,
    },
    {
        slug: 'motion-for-muji',
        title: 'Motion for Muji',
        subtitle: 'December 2025',
        description: 'Short video to promote the Wall Mounted CD Player from Muji.',
        tags: ['Motion Design'],
        image: 'https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/RAPIN_AGATHE_MOTION.mp4',
        video: 'https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/RAPIN_AGATHE_MOTION.mp4',
        gallery: ['video:https://pub-4640cb8748ff42a1bb9564c86066b471.r2.dev/RAPIN_AGATHE_MOTION.mp4'],
        width: 320,
        aspectRatio: 4 / 3,
        top: 87,
        left: 80,
    },
    {
        slug: 'tamisee',
        title: 'Tamisée',
        subtitle: 'May 2026',
        description: 'Merchandising design and creation for Tamisée.',
        tags: ['Branding'],
        image: '/img/tamisee/scan-leo.mp4',
        video: '/img/tamisee/scan-leo.mp4',
        gallery: [
            '/img/tamisee/img8474.webp', '/img/tamisee/img8412.webp',
            '/img/tamisee/img8408.webp', '/img/tamisee/img8310.webp',
            '/img/tamisee/img8317.webp', '/img/tamisee/img8344.webp',
            '/img/tamisee/img8245.webp', '/img/tamisee/img8399.webp',
            '/img/tamisee/img8230.webp'
        ],
        width: 240,
        aspectRatio: 3 / 4,
        top: 58,
        left: 25
    }
];
