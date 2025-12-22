import js from '@eslint/js'
import checkFile from 'eslint-plugin-check-file'
import import_ from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import typescript from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      eqeqeq: ['error', 'always', { null: 'never' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
    },
  },

  ...typescript.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowString: false, allowNumber: false, allowNullableObject: false },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['**/*.js'],
    ...typescript.configs.disableTypeChecked,
  },

  {
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': ['error', { '**/*.{js,ts}': '[0-9a-z-.]+' }],
    },
  },

  {
    plugins: {
      import: import_,
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: [],
        },
      ],
    },
  },

  prettier,

  {
    ignores: [
      'dist',
      'node_modules',
      'eslint.config.mjs',
      'prettier.config.mjs',
      'commitlint.config.cjs',
      'lint-staged.config.js',
      // * The Refer directory may contain other projects, intended for AI usage.
      'refer',
    ],
  },
]
