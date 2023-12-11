const babelOptions = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        reactRuntime: 'automatic',
      },
    ],
  ],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
