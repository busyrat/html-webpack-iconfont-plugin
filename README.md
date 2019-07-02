# html-webpack-iconfont-plugin

## install

```
yarn add html-webpack-plugin html-webpack-iconfont-plugin -D
```

## use

```
// webpack.config.js
const HtmlWebpackIconfontPlugin = require('html-webpack-iconfont-plugin')

{
  plugins: [
    // 放在 htmlWebpackPlugins 后
    new HtmlWebpackIconfontPlugin({
      key: 'font_870903_6l5zwj5rwq6',
      // 是否使用 CDN，默认 true
      useCDN: process.env.NODE_ENV === 'development',
      // 是否使用彩色图标，默认 true
      colour: true,
      // 资源存放地址
      output: './iconfont'
    })
  ]
}
```

**因为是依赖 htmlWebpackPlugins，所以一定要放在它的后面**