import merge from "webpack-merge";

export default merge(require('./webpack-common.config.js'), {
  debug: true,
  devtool: "cheap-module-inline-source-map",
  profile: false,

  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },

  devServer: {
    contentBase: "./public",
    port: 3000,

    hot: false,
    inline: true,

    colors: true,
    noInfo: true,
    historyApiFallback: true,
  },
});
