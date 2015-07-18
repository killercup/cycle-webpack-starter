import webpack from "webpack";

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
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
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
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor.js', Infinity
    ),
  ],
};
