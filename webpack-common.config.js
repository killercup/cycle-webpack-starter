import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

let name = 'Cycle!';

let vendorModules = /(node_modules|bower_components)/;

export default {
  target: "web",
  entry: {
    app: "./app/index.js",
    vendor: require("./app/vendor.js"),
  },

  output: {
    path: "./build",
    filename: "[name]-[chunkhash].js",
    pathinfo: true,
    publicPath: "",
  },

  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: "eslint-loader", exclude: vendorModules},
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: vendorModules,
        loader: "babel",
        query: {
          optional: [
            "runtime",
            "validation.undeclaredVariableCheck",
            "optimisation.react.constantElements",
          ],
          env: {
            development: {
              plugins: [
                "typecheck",
                "closure-elimination",
              ],
            },
          },
          jsxPragma: "hJSX",
          stage: 0,
        },
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor-[chunkhash].js', Infinity
    ),
    new HtmlWebpackPlugin({
      title: name,
      minify: process.env.NODE_ENV === 'production' ? {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        preventAttributesEscaping: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      } : false,
      template: './app/index.html',
    }),
  ],
};
