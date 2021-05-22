const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.tsx',],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { //extends 무조건 쓰기(교체가 아니라 확장이기 때문)
      colors:{
        lime: colors.lime,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
