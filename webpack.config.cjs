const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/game.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "crypto": false,
    }
  },
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
