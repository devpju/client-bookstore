/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import { dark, themes } from 'daisyui/src/theming/themes';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          ...themes['light'],
          primary: '#1A1A1A',
          secondary: '#FAFAFA'
        }
      },
      dark
    ]
  },
  plugins: [daisyui]
};
