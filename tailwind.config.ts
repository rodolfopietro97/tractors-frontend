import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Main
        main: '#fbfbfb',

        // Navbar
        navbar: '#28a7e0', // Facebook blue 3b5998, Previous: 1a4c65 , Alpego from 28a7e0 , Chiaro 10bef6
        navbarText: '#f2f1f1',

        // Header
        header: '#f2f1f1',
        headerText: '#144c8f', // Previous: #28a7e0

        // Article
        article: '#fbfbfb',

        // Footer
        footer: '#f2f1f1',

        // Border
        mainBorder: '#cbcbca',

        // Gradients
        buttonGradientFrom: '#FFFFFF',
        buttonGradientTo: '#F8F8F8',

        // Buttons
        buttonTextColor: '#144c8f', // Previous: #28a7e0
        buttonTextColorHover: '#404040',
        buttonBorderColor: '#cbcbca',
      },
    },
  },
  plugins: [],
};
export default config;
