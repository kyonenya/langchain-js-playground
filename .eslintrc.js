module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
};
