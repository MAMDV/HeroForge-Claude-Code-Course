module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['dist', 'node_modules', 'coverage'],
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.test.*', 'src/test/**'],
      env: { node: true },
      globals: { global: 'readonly' },
    },
  ],
  rules: {
    'react/prop-types': 'off',
    'react/no-unknown-property': ['error', { ignore: ['cmdk-dialog', 'cmdk-overlay'] }],
  },
};
