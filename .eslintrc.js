module.exports = {
  extends: ['airbnb-base', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['import', 'prettier'],
  rules: {
    // Allow mutating object params
    'no-param-reassign': ['error', { props: false }],

    // So we can use for..in loop
    'no-restricted-syntax': 'off',
  },
  overrides: [
    {
      files: ['**/features/**/*.js'],
      rules: {
        // Step definition callbacks need to be in the form function() {...} as
        // they are bound to the context object (via this)
        'func-names': 'off',
        'prefer-arrow-callback': 'off',

        // Allow expect(row).to.exist
        'no-unused-expressions': 'off',

        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/rollup.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
