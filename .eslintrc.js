module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    'prettier/prettier': 0,  
    'vue/multi-word-component-names': 'off',  
  },
};
