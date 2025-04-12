module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".flowbite-react/class-list.json"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#33a04f",
        light: "#F8F9FA",
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  }
}