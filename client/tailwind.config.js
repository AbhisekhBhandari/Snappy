/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        JosefinSans: ['Josefin Sans', 'sans-serif']
      },
      backgroundColor:{
        registerBg: '#131324',
        registerButton:'#4e0eff',
        buttonHover:'#4e0eff',
        registerForm: '#00000076',
        chatBg: '#131324',
        chatContainer: '#00000076'


      },
      borderColor:{
        registerInput:'#4e0eff',
        registerInputFocus: '#997af0',
      },
      borderWidth:{
        0.1: '0.1rem'
      },
      textColor:{
        darkBlue: '#4e0eff'
      }
    },
  },
  plugins: [],
}

