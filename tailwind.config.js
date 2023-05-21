/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  important: true,
  purge: {
    // enabled: false,
    content: ['./src/**/*.html*', './src/**/*.{vue, js, ts}', './src/*.{vue, js, ts}']
  },
  theme: {
    screens: {
      xxl: '1920px',
      xl: {
        max: '1439px'
      },
      lg: {
        max: '1279px'
      },
      md: {
        max: '1023px'
      },
      sm: {
        max: '767px'
      }
    },
    inset: {
      0: 0,
      '1/2': '50%',
      '-05': '-1rem'
    },
    height: {
      screenContent: 'calc(100vh - 6rem)'
    },
    minHeight: {
      screenContent: 'calc(100vh - 6rem)'
    },
    maxWidth: {
      32: '8rem',
      40: '10rem'
    },
    minWidth: {
      20: '5rem',
      32: '8rem',
      40: '10rem'
    },
    backgroundOpacity: {
      10: '0.1',
      20: '0.2',
      95: '0.95'
    }
  }
}
