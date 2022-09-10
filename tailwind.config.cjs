module.exports = {
  darkMode: 'class',
  content: ['index.html', 'src/**/*.tsx'],
  important: true,
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        primary: '#45975a'
      }
    }
  }
};
