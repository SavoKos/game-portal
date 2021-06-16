module.exports = {
  mode: 'jit',
  loader: 'cloudinary',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#070426',
        primaryLight: '#201e3c',
        primaryLighter: '#090526',
        seaBlue: '#35bfff',
      },
      inset: {
        '60%': '60%',
      },
      spacing: {
        '60%': '60%',
      },
      width: { '32rem': '32rem' },
      fontFamily: {
        poppins: [
          'Poppins',
          'Raleway',
          ' -apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        raleway: [
          'Raleway',
          'Poppins',
          ' -apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      scale: { 101: '1.01' },
      fontSize: { '21rem': '21rem', '12rem': '12rem' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
