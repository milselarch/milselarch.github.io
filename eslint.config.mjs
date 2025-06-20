// eslint.config.mjs
import { ESLint } from 'eslint';

const eslint = new ESLint({
  baseConfig: {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        alias: {
          map: [
            ['@', './src']
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        node: {
          paths: ['src']
        }
      }
    }
  }
});

export default eslint;
