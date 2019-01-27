const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // JS 执行入口文件
  entry: {
    // 把相关模块的放到一个单独的动态链接库
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-apollo', 'apollo-boost', 'apollo-link-context', 'graphql']
  },

  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 vendor
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下
    path: path.resolve(__dirname, '..' ,'dist'),
    // 存放动态链接库的全局变量名称，例如对应 vendor 来说就是 _dll_vendor
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, '..', 'dist', '[name].manifest.json'),
    }),
    // new BundleAnalyzerPlugin()
  ]
};