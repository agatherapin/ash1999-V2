import type { Metadata } from 'next';
import localFont from 'next/font/local';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const neueHaas = localFont({
    src: [
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-XXThin.ttf', weight: '100', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-XXThinItalic.ttf', weight: '100', style: 'italic' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-XThin.ttf', weight: '200', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-XThinItalic.ttf', weight: '200', style: 'italic' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-Thin.ttf', weight: '300', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-ThinItalic.ttf', weight: '300', style: 'italic' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-Light.ttf', weight: '350', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-LightItalic.ttf', weight: '350', style: 'italic' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-Roman.ttf', weight: '400', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-RomanItalic.ttf', weight: '400', style: 'italic' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-Mediu.ttf', weight: '500', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-MediumItalic.ttf', weight: '500', style: 'italic' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-Bold.ttf', weight: '700', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-BoldItalic.ttf', weight: '700', style: 'italic' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-Black.ttf', weight: '900', style: 'normal' },
        { path: '../public/fonts/neuehaasgrotesk/NeueHaasDisplay-BlackItalic.ttf', weight: '900', style: 'italic' },
    ],
    variable: '--font-neue-haas',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://ash1999.vercel.app'),
    icons: {
        icon: '/img/mini logo.webp',
        apple: '/apple-touch-icon.png',
    },
    title: 'ash1999 - Portfolio',
    description: 'Portfolio of ash1999 — branding, typography, print, web design, motion design, illustration and mixed media projects.',
    openGraph: {
        title: 'ash1999 - Portfolio',
        description: 'Branding, typography, print, web design, motion design, illustration and mixed media projects.',
        images: [
            {
                url: '/img/social-share.webp',
                width: 1200,
                height: 630,
                alt: 'ash1999 logo',
                type: 'image/png',
            },
        ],
        type: 'website',
        locale: 'fr_FR',
    },
    twitter: {
        card: 'summary',
        title: 'ash1999 - Portfolio',
        description: 'Branding, typography, print, web design, motion design, illustration and mixed media projects.',
        images: [
            {
                url: '/img/social-share.webp',
                width: 1200,
                height: 630,
                alt: 'ash1999 logo',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className={neueHaas.variable}>
            <body>
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
