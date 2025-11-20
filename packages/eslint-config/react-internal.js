module.exports = {
  extends: ["./base.js"],
  plugins: ["react"],
  rules: {
    "react/jsx-key": "error",
    "react/jsx-no-target-blank": "error",
  },
  env: {
    browser: true,
  },
};

