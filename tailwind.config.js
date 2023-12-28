/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px' , // mobile breakpoint
        's' : '1000px', // tablet & small screen breakpoint
      }
    },
  },
  plugins: [],
}

/*

module.exports = {
  theme: {
      maxWidth: {
       '1/2': '50%',
       '1/3': '33.333333%',
       '1/4': '25%',
       '1/6': '16.666667%',
      },

      screens: {
       '4xs': '280px', //galaxie fold
       '3xs': '360px',
       '2xs': '375px', //iphone SE
       '1xs': '390px', //iphone 12
        'xs': '450px', //mobile breakpoint
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
       '2xl': '1536px',
      }

    }
};

*/

