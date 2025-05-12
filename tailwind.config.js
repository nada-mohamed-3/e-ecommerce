/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{jsx,js}'
  ],
  theme: {
    extend: {
      colors:{
        active:'#0aad0a',
        main:'#0aad0a'
      },
  //     screens:{
  //       'custom': '841px',
  //       'customs' :"877px",
  //       'customss' : "935px", 
  //  }
    },
  },
  darkMode:'selector',
  plugins: [
  ],
}

