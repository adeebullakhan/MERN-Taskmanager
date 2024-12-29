module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#24ab8f",
        "primary-dark": "#268d77",
        "secondary":"#ff5454",
        "light-skyblue": "#87CEEB",
        "light-pink": "#FFB6C1",
        "light-yellow": "#FFF9C4",
        "light-green": "#DFFFD6",
        "light-purple": "#E6E6FA",
        "light-orange": "#FFE4B5",
        "light-gray": "#F5F5F5",
        "light-teal": "#B2DFDB",
        "light-red": "#FFCCCB",
        "light-blue": "#ADD8E6",
           // Dark colors
           "dark-skyblue": "#4682B4",
           "dark-pink": "#C71585",
           "dark-yellow": "#FFD700",
           "dark-green": "#006400",
           "dark-purple": "#800080",
           "dark-orange": "#FF8C00",
           "dark-gray": "#A9A9A9",
           "dark-teal": "#008080",
           "dark-red": "#8B0000",
           "dark-blue": "#00008B",

           //Light Dark Colours
           "dark-light-skyblue": "#7B9EB3",
"dark-light-pink": "#E66E9A",
"dark-light-yellow": "#EEC900",
"dark-light-green": "#4C9141",
"dark-light-purple": "#9B30FF",
"dark-light-orange": "#FF7F50",
"dark-light-gray": "#A9A9A9",
"dark-light-teal": "#008B8B",
"dark-light-red": "#B22222",
"dark-light-blue": "#4682B4",

      },
      animation: {
        "loader": "loader 1s linear infinite",
      },
      backgroundImage: {
        "sky-pink-gradient": "linear-gradient(to right, #87CEEB, #FFB6C1)",
        "dark-gradient": "linear-gradient(to right, #607D8B, #4682B4, #8E44AD, #5C6BC0)",
        "yellow-green-gradient": "linear-gradient(to right, #FFF9C4, #DFFFD6)",
     
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.5)" },
          "100%": { transform: "rotate(360deg) scale(1)" }
        }
      }
    },
  },
  plugins: [],
}
