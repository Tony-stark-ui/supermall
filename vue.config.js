module.exports = {
  // 基本路径
  // publicPath: './',
  // // 输出文件目录
  // outputDir: 'dist',
  // configureWebpack: {
  //   externals: {
  //   }
  // },
  configureWebpack: {
    // 配置路径别名
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': '@/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    },

  }
}