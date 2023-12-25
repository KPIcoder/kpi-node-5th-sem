module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["sonarjs"],
  extends: ["plugin:sonarjs/recommended", "eslint:recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
