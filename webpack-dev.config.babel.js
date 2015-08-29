import merge from 'webpack-merge';

import commonConfig from './webpack-common.config.js';

export default merge(commonConfig, {
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
    historyApiFallback: true,

    colors: true,
    stats: 'normal',
  },
});
