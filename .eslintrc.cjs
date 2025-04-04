module.exports = {
    root: true,
    env: {
      es6: true,
      browser: true,
      jest: true,
    },
    ignorePatterns: [
      'node_modules/',
      '.pnp.cjs',
      '.pnp.loader.cjs',
      'public/',
    ],
    extends: [
      'airbnb',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:react/jsx-runtime',
      'plugin:@next/next/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: [
      'simple-import-sort',
      'unused-imports',
      'prettier'
      // set your plugins
    ],
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.js', '.tsx', '.json'],
        },
      },
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        extends: [
          'airbnb-typescript',
          'plugin:@typescript-eslint/recommended',
        ],
        plugins: [
          '@typescript-eslint',
        ],
        rules: {
          // set your typescript rules
        },
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 12,
          sourceType: 'module',
          project: ['./tsconfig.json'],
        },
      },
      {
        files: ['src/hooks/**/**/*.test.ts?(x)'],
        rules: {
          'react-hooks/rules-of-hooks': 'off',
        },
      },
      {
        files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
        extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
        rules: {
          // set your test eslint rules
        },
      },
      {
        extends: ['plugin:cypress/recommended'],
        files: ['cypress/**/*.ts'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: ['./cypress/tsconfig.json'],
        },
      },
    ],
    rules: {
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // set your rules
    },
  };