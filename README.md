# html-webpack-iconfont-plugin

基于 html-webpack-plugins 快速引入 iconfont 图标库到 html 模板中

## install

```
yarn add html-webpack-plugin html-webpack-iconfont-plugin -D
```

## usage

```
// webpack.config.js
const HtmlWebpackIconfontPlugin = require('html-webpack-iconfont-plugin')

{
  plugins: [
    // 放在 htmlWebpackPlugins 后
    new HtmlWebpackIconfontPlugin({
      key: 'font_xxxxxx_xxxxx',
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

- useCDN: true

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://at.alicdn.com/t/font_xxxxxx_xxxxx.js"></script>
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_xxxxxx_xxxxx.css" />
  </head>
  <body></body>
</html>
```

- useCDN: false

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="./iconfont/iconfont.js"></script>
    <link rel="stylesheet" href="./iconfont/iconfont.css" />
  </head>
  <body></body>
</html>
```

- colour: true

会引入 iconfont 中 `symbol 引用` 提到的 JS，➡️ [传送门](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code)
