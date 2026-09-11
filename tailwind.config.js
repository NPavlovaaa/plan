module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        washi:  '#F6F1E7',
        ink:    '#17150F',
        momiji: '#B23A17',
        amber:  '#D9762B',
        moss:   '#3E5B3B',
        ginkgo: '#C08A1E',
        indigo: '#2E5A6B',
      },
      fontFamily: {
        display: ['Cormorant', 'serif'],
        sans:    ['Onest', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
