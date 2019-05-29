import baseConfig from '.';
import merge from 'webpack-merge';
import { configs, inputs, outputs, loaders, plugins } from 'webpack-lib-kits';

export default merge(baseConfig, {
  entry: inputs.docs(),
  output: outputs.dev(),
  devServer: configs.devServer(),
  devtool: configs.devtool(),
  plugins: [plugins.html()]
});
