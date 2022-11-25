const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.njk',
    './src/**/*.md',
    './src/**/*.11ty.js'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      customRed: '#BB2637',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: '#98795e',
      green: '#517039',
      blue: '#48788a',
      indigo: colors.indigo,
      orange: '#CE731F',
      pink:'#BA1C49',
      darkblue:'#0e2633f7',

    },
    backgroundImage: {
      'hero-lg': "url('../img/gem_city_dark_banner.png')",
      'hero-sm': "url('../img/gem_city_dark.png')",
    },
    extend: {},
  },
  plugins: [],
} 