module.exports = {
  content: [
    "./src/*.{js,ts,jsx,tsx}",
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'red': '#c0392b',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#218c74 ',
      'yellow': '#ffc82c',
      'gray': '#2c3e50',
      'gray-light': '#f2f4f8',
      'gray-dark': '#3c6382',
      'white': '#ffffff',
      'black': '#000000',
      'light': '#ffffff',
      'dark': '#000000',
      'primary': '#e67e22',
      'accent': '#2980b9',
      'accent-1': '#1a6ba1',
      'transparent': '#00000000'
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    maxWidth: {
      'card': '224px',
      'card-2': '208px'
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      spacing: {
        '300': '300px'
      }
    },
  },
  plugins: [
  ],
}