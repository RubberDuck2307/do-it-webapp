/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'notes': ['Summary Notes Regular', 'Roboto'],
        'roboto':['Dosis']
      },
      gridTemplateColumns: {
        '17': 'repeat(17, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridColumn:{
        'span-13': 'span 14 / span 14',
      },
      gridTemplateRows: {
        'month': 'auto repeat(6, minmax(0, 1fr))',
      },
      borderWidth: { '6':'6px', 
    '5':'5px', },

    }
  },
  plugins: [
    require('tailwind-scrollbar')
    
  ],
  variants: {
    scrollbar: ['rounded']
}
}