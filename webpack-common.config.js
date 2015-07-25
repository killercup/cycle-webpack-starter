import webpack from "webpack";

let vendorModules = /(node_modules|bower_components)/;

export default {
  target: "web",
  entry: {
    app: "./app/index.js",
    vendor: require("./app/vendor.js"),
  },

  output: {
    path: "./build",
    filename: "[name].js",
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
          ],
          env: {
            development: {
              plugins: [
                "typecheck",
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
      'vendor', 'vendor.js', Infinity
    ),
  ],
};
