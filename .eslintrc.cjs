module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-essential',
    './.eslintrc-auto-import.json'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // 强制使用单引号
    quotes: ['error', 'single', { avoidEscape: true }],
    // 强制使用分号
    semi: ['error', 'always'],
    // 强制在语句末尾使用分号
    'semi-style': ['error', 'last'],
    // 禁止不必要的分号
    'no-extra-semi': 'error',
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': ['error', { before: false, after: true }],
    // 强制使用一致的反勾号、双引号或单引号
    'quote-props': ['error', 'as-needed'],
    // 要求或禁止末尾逗号
    'comma-dangle': ['error', 'never'],
    // Vue 特定规则
    'vue/html-quotes': ['error', 'double'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': 'off'
  }
};
