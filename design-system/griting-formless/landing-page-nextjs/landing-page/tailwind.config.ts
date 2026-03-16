import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — griting primary & background (verbatim, hard constraint)
        'bg-hero': '#003620',
        'brand-primary': '#00693e',
        'brand-green-dark': '#00995e',
        'dark-green-bg': '#1e2623',
        // Formless ambient glow tokens (retuned to griting greens)
        'glow-base': '#001a0d',
        'glow-dark': '#002918',
        'glow-mid': '#0d4a35',
        'glow-bright': '#00693e',
        'code-highlight': '#4ade80',
        // Text colors
        'text-on-dark': '#ffffff',
        'text-heading': '#031f18',
        'text-body': '#455451',
        'text-ui': '#202b38',
        'text-meta': '#84848a',
        'text-muted': 'rgba(3,31,24,0.6)',
        'text-date': '#9f9fa9',
        // Surface colors
        'section-bg-light': '#f5f6f5',
        'card-bg': '#ffffff',
        'card-bg-dark': 'rgba(39,38,45,0.8)',
        'image-frame-bg': '#18181b',
        'image-frame-border': '#27272a',
        // UI colors
        'accent-blue': '#3960f9',
        'nav-border': '#f3f4f6',
        'logo-on-light': '#000000',
        'divider': '#d1d5db',
        'divider-dark': '#e9ebf1',
        'filter-pill-border': '#e4e4e7',
        'progress-track': '#c6c6c6',
        'share-btn-bg': '#f3f4f3',
        'content-panel-bg': '#d7e8d9',
        'content-panel-border': '#b8e7bc',
        // Avatar gradient
        'avatar-gradient-start': 'rgb(0,212,146)',
        'avatar-gradient-end': 'rgb(0,187,167)',
        // Shadow colors
        'shadow-near-black': '#1c1b20',
        'shadow-dark-grey': '#34323b',
        // Glass effects
        'glass-btn-bg': 'rgba(255,255,255,0.02)',
        'hero-btn-from': 'rgba(255,255,255,0.75)',
        'hero-btn-to': 'rgba(255,255,255,0.56)',
        // Btn outline
        'btn-outline-bg': 'rgba(0,105,62,0.06)',
        'btn-outline-border': '#00693e',
        // Dark mode text
        'text-primary-dark': '#f4f2f0',
        'text-secondary-dark': '#cccccc',
        'text-label-dark': '#e9ebf1',
        'page-bg-dark': '#000000',
        'icon-border': '#9f9fa9',
        'placeholder': '#d9d9d9',
        'search-placeholder': '#71717b',
      },
      fontFamily: {
        display: ['"Helvetica Neue"', 'sans-serif'],
        body: ['"Inter Variable"', 'Inter', 'sans-serif'],
        logo: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['80px', { lineHeight: '88.32px', letterSpacing: '-3.6px' }],
        'section-heading': ['49px', { lineHeight: '57.2px', letterSpacing: '-1.2px' }],
        'card-heading': ['30px', { lineHeight: 'normal', letterSpacing: '-0.2px' }],
        'section-body': ['22px', { lineHeight: '30.8px', letterSpacing: '-0.3px' }],
        'nav': ['16px', { lineHeight: 'normal', letterSpacing: 'normal' }],
        'logo': ['36px', { lineHeight: '76.8px', letterSpacing: '-1.61px' }],
        'btn': ['18px', { lineHeight: '24px', letterSpacing: '-0.18px' }],
        'meta': ['14px', { lineHeight: 'normal', letterSpacing: '-0.1504px' }],
        'eyebrow': ['13px', { lineHeight: 'normal', letterSpacing: '0.8px' }],
        'tab': ['32px', { lineHeight: 'normal', letterSpacing: '-0.2px' }],
        'partner-sub': ['24px', { lineHeight: 'normal', letterSpacing: '-0.2px' }],
        'feature-title': ['22px', { lineHeight: '28.8px', letterSpacing: '-0.26px' }],
        'body-dark': ['16px', { lineHeight: '23.8px', letterSpacing: '-0.09px' }],
        'label-small': ['14px', { lineHeight: 'normal', letterSpacing: '1px' }],
      },
      spacing: {
        // Griting spacing scale
        'spacing-3': '8px',
        'spacing-4': '12px',
        'nav-h': '72px',
        'nav-px': '26px',
        'nav-gap': '45px',
        'btn-py': '18px',
        'btn-px': '16px',
        'section-gap': '30px',
        // Formless layout scale
        'layout-section-pb': '200px',
        'layout-section-mx': '244px',
        'layout-section-row-gap': '164px',
        'layout-section-col-gap': '80px',
        'layout-container-pt': '268px',
        'layout-container-gap': '48px',
        'layout-grid-gap': '60px',
        'layout-row-mt': '306px',
        'layout-row-gap': '80px',
      },
      borderRadius: {
        'btn': '8px',
        'pill': '9999px',
        'search': '10px',
        'tab-bar': '20px',
        'content-panel': '10px',
        'use-case-card': '12px',
      },
      transitionTimingFunction: {
        'material': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'base': '300ms',
        'slow': '500ms',
      },
      maxWidth: {
        'container': '1440px',
        'mission': '925px',
        'body-copy': '785px',
      },
      gridTemplateColumns: {
        'features': 'repeat(3, 1fr)',
        'footer': 'repeat(5, 1fr)',
        'featured-post': '60fr 40fr',
        'gritme': '40fr 60fr',
        'partners': '33% 40%',
        'what-we-provide': 'repeat(2, 480px)',
      },
      backgroundImage: {
        'display-text': 'linear-gradient(to bottom, #ffffff, #f4f2f0)',
        'section-dark': 'linear-gradient(to bottom, #000000, #1e2623)',
        'hero-btn': 'linear-gradient(to bottom, rgba(255,255,255,0.75), rgba(255,255,255,0.56))',
        'hero-ambient': 'radial-gradient(ellipse at 50% 70%, #0d4a35 0%, #002918 40%, #003620 80%, #003620 100%)',
        'cta-ambient': 'radial-gradient(ellipse at 50% 60%, #002918 0%, #001a0d 50%, #003620 100%)',
        'glow-radial': 'radial-gradient(ellipse at center bottom, rgba(0,105,62,0.7) 0%, rgba(0,54,32,0.6) 60%, transparent 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
