/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    es2021: true,
    jquery: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-js-in-vue',
  ],
  parserOptions: {},
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 'off',
    'import/no-named-as-default': 0,
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/no-autofocus': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    // disable rule only compatible with vue 3
    // https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/no-v-for-template-key': 'error',
    // disable to accomplish vue recommended component code organisation
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        variables: false,
      },
    ],
    // disable rewrites for jsx
    // https://github.com/vuejs/eslint-config-airbnb/blob/79a12743cd676ac2b16ce8d8923826dab9010840/packages/eslint-config-airbnb/rules/template.js
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
      },
    ],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
      },
    }],
  },
  globals: {
    NodeJS: true,
    CONSOLIDATED_AIRLINES: true,
  },
};
