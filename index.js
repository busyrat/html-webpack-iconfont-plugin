const request = require('request')

const requestPromise = _url => {
  return new Promise((resolve, reject) => {
    request(_url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        throw new Error('gen Icon error')
      }
    })
  })
}

const downloadIconfont = async iconUrl => {
  let data = await requestPromise('https:' + iconUrl)
  const reg = new RegExp(/url\('\/\/.*?\)/g)
  const reg2 = new RegExp(/url\('(\/\/(.*)(\.\w+?\?.*?))\)/)

  let dependencies = await Promise.all(
    data.match(reg).map(async dep => {
      const [t, path, fileName, ext] = dep.match(reg2)
      const content = await requestPromise('https:' + path)
      data = data.replace('//' + fileName, './iconfont')
      return {
        fileName: 'iconfont' + ext,
        content
      }
    })
  )

  return dependencies.concat({
    fileName: 'iconfont.css',
    content: data
  })
}

const downloadIconfontJS = async url => {
  let content = await requestPromise('https:' + url)
  return [
    {
      fileName: 'iconfont.js',
      content
    }
  ]
}

class HtmlWebpackIconfontPlugin {
  constructor(options) {
    const defaultOpt = {
      key: '',
      useCDN: true,
      output: './iconfont',
      colour: true // 彩色
    }
    this.options = Object.assign(defaultOpt, options)
  }

  // 处理方法
  apply(compiler) {
    const { key, useCDN, output, colour } = this.options

    let url = `//at.alicdn.com/t/${key}`
    if (!useCDN) {
      url = `${output}/iconfont`
    }

    compiler.hooks.compilation.tap('compilation', compilation =>
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('processing', (htmlPluginData, cb) => {
        htmlPluginData.assets.css.push(url + '.css')
        if (colour) {
          htmlPluginData.assets.js.push(url + '.js')
        }
        cb(null, htmlPluginData)
      })
    )

    if (!useCDN) {
      compiler.hooks.emit.tapAsync('HtmlWebpackIconfontPlugin', async (compilation, cb) => {
        let assets = compilation.assets

        let iconfontData = await downloadIconfont(`//at.alicdn.com/t/${key}.css`)

        let iconfontJS = []
        if (colour) {
          iconfontJS = await downloadIconfontJS(`//at.alicdn.com/t/${key}.js`)
        }

        iconfontData.concat(iconfontJS).forEach(({ fileName, content }) => {
          assets[`${output}/${fileName}`] = {
            source() {
              return content
            },
            size() {
              return content.length
            }
          }
        })
        cb()
      })
    }
  }
}
module.exports = HtmlWebpackIconfontPlugin
