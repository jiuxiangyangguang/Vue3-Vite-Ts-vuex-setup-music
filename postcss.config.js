import postcssPresetEnv from 'postcss-preset-env'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'

export default {
  plugins: [
    postcssPresetEnv({
      stage: 0, // 默认值是2，0表示启用所有新特性
      autoprefixer: { grid: true }, // 启用CSS Grid Layout的autoprefixer
      browsers: ['>1%', 'last 2 versions', 'Firefox ESR', 'not dead'] // 浏览器的选择范围
    })
    postcssPxToViewport({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false // 允许在媒体查询中转换`px`
    })
  ]
}
