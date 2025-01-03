const Dotenv = require('dotenv-webpack');
 
module.exports = {
  plugins: [
    new Dotenv({
        path: './some.other.env' // default is .env
    })
  ],
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: [/node_modules/], // Bỏ qua node_modules để tránh cảnh báo về source map
      },
    ],
  },
};