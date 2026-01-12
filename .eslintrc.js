/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'n8n-nodes-base'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:n8n-nodes-base/community',
    'prettier',
  ],
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
    'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
    'n8n-nodes-base/node-param-description-missing-final-period': 'off',
    'n8n-nodes-base/node-param-description-excess-final-period': 'off',
    'n8n-nodes-base/node-param-placeholder-miscased-id': 'off',
    'n8n-nodes-base/node-param-description-wrong-for-dynamic-options': 'off',
    'n8n-nodes-base/node-param-description-wrong-for-return-all': 'off',
    'n8n-nodes-base/node-param-description-wrong-for-limit': 'off',
    'n8n-nodes-base/node-param-description-wrong-for-upsert': 'off',
    'n8n-nodes-base/node-param-description-unneeded-backticks': 'off',
  },
  ignorePatterns: ['dist/**/*', 'node_modules/**/*', '*.js'],
};
