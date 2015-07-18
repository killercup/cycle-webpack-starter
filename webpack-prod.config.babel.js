import merge from "webpack-merge";

import webpack from "webpack";
import CompressionPlugin from "compression-webpack-plugin";

export default merge(require('./webpack-common.config.js'), {
  debug: false,
  devtool: "source-map",
  profile: true,
  watch: false,

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: /\@license|\@preserv/gi,
    }),
    new CompressionPlugin({
      asset: "{file}.gz",
      algorithm: "gzip",
      regExp: new RegExp("\.(js|html|css)$"),
      threshold: 10240,
      minRatio: 0.8,
    }),
    function writeWebpackStats() {
      this.plugin("done", function writeStats(stats) {
        require("fs").writeFileSync(
          require('path').join(__dirname, "build", "webpack-stats.json"),
          JSON.stringify(stats.toJson())
        );
      });
    },
  ],
});
