module.exports = {
  purge: {
    content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
    options: {
      whitelistPatterns: [/bg-.*-100/, /border-.*-400/],
    }
  },
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Verdana'],
    },
  },
  variants: {},
  plugins: [],
}
