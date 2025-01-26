export default [
    {
      languageOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
      env: {
        node: true,
        browser: true,
        es2024: true,
      },
      extends: [
        'eslint:recommended'
      ],
      rules: {},
      ignores: [
        'node_modules/**',
        'dist/**'
      ]
    }
  ];