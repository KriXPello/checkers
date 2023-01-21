const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV } = process.env;

const isDevelopment = NODE_ENV === 'development';

const mode = isDevelopment ? 'development' : 'production';
/** https://webpack.js.org/configuration/devtool/ */
const devtool = isDevelopment ? 'source-map' : false;

console.log('NODE_ENV:', NODE_ENV);
console.log('webpack mode:', mode);

const sharedPath = path.join(__dirname, '..', 'shared');

/** @type {import('webpack').Configuration} */
const config = {
  mode,
  devtool,
  optimization: {
    usedExports: true,
  },
  resolve: {
    alias: {
      '#constants': path.resolve(sharedPath, 'constants'),
      '#entities': path.resolve(sharedPath, 'entities'),
      '#interfaces': path.resolve(sharedPath, 'interfaces'),
      '#schemas': path.resolve(sharedPath, 'schemas'),
      '#utils': path.resolve(sharedPath, 'utils'),
    },
    extensions: ['.ts', '.js'],
  },
  entry: {
    main: path.resolve(__dirname, 'index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'backend.js',
  },
  target: 'node',
  externalsPresets: {
    node: true,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
    ],
  },
};

module.exports = config;
