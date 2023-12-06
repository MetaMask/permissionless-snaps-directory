const babelOptions = {
  presets: [
    'babel-preset-gatsby',
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
