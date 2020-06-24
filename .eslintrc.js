module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    'comma-dangle': ['error', 'never']
  }
};
