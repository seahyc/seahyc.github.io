const { join } = require("path");
const { createGlobPatternsForDependencies } = require("@nrwl/next/tailwind");

module.exports = {
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  presets: [require("../../tailwind-workspace-preset.js")],
  purge: [
    join(__dirname, "pages/**/*.{js,ts,jsx,tsx}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
