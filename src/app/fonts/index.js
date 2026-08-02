import localFont from 'next/font/local';

export const muller = localFont({
    src: [
        { path: './muller/MullerRegular.woff2', weight: '400', style: 'normal' },
        { path: './muller/MullerMedium.woff2', weight: '500', style: 'normal' },
        { path: './muller/MullerBold.woff2', weight: '700', style: 'normal' },
        { path: './muller/MullerExtraBold.woff2', weight: '800', style: 'normal' },
    ],
    variable: '--font-muller',
    display: 'swap',
});

export const helveticaNeue = localFont({
    src: [
        { path: './helvetica-neue-cyr/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal' },
        { path: './helvetica-neue-cyr/HelveticaNeueCyr-Medium.woff2', weight: '500', style: 'normal' },
        { path: './helvetica-neue-cyr/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal' },
    ],
    variable: '--font-helvetica-neue',
    display: 'swap',
});

export const helvetica = localFont({
    src: [
        { path: './helvetica/Helvetica-Regular.woff2', weight: '400', style: 'normal' },
        { path: './helvetica/Helvetica-Bold.woff2', weight: '700', style: 'normal' },
    ],
    variable: '--font-helvetica',
    display: 'swap',
});

export const roboto = localFont({
    src: [
        { path: './roboto/Roboto-Regular.woff2', weight: '400', style: 'normal' },
    ],
    variable: '--font-roboto',
    display: 'swap',
});

export const sfPro = localFont({
    src: [
        { path: './sf-pro/SF-Pro-Text-Regular.woff2', weight: '400', style: 'normal' },
    ],
    variable: '--font-sf-pro',
    display: 'swap',
});

export const neueHaas = localFont({
    src: [
        { path: './neue-haas/NeueHaasGroteskDisplayPro.woff2', weight: '400', style: 'normal' },
    ],
    variable: '--font-neue-haas',
    display: 'swap',
});
