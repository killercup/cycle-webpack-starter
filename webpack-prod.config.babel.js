import merge from 'webpack-merge';

import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';

import commonConfig from './webpack-common.config.js';

export default merge(commonConfig, {
  debug: false,
  devtool: "source-map",
  profile: true,
  watch: false,

  plugins: [
    new CleanPlugin(["build"]),
    new webpack.NoErrorsPlugin(),
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
      regExp: new RegExp("\.(js|html|css|svg)$"),
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
