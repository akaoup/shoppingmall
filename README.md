
## 1. 项目初始化-webpack项目搭建

比较需要注意的问题有：

**问题一 ： jquery是怎么引入的**



**问题二：提取公共模块配置**

```javascript
// 提取公共模块打包
  optimization: {
    splitChunks: { 		// 分割代码块
      cacheGroups: { // 缓存组
        base: {    	//公共模块  
        	//name: "base"    // 只有公共模块 base.bundle.js
          name: "common",   // 把entry的name放这打包 公共模块+common模块 common.bundle.js
          chunks: "all",
          minChunks: 2,//用过1次以上
         	minSize: 0  //大于的字节
        }
      }
    }
  }
```



**问题三：样式处理用什么loader**

```
npm i css-loader style-loader --save
```
在module里更改配置rules，css的文件就有效了：

```javascript
{
	test: /.css$/,
	use:[
		'style-loader',
		'css-loader'
	]
}
```



**问题四：单独打包css文件（从打包js里分离出来）**

+ 方法一 ： 用 `extract-text-webpack-plugin`

`extract-text-webpack-plugin` 还不能支持webpack4.0.0以上的版 [说明](https://www.jianshu.com/p/3395112d643e)

解决办法 安装高级版本：
``` 
npm install extract-text-webpack-plugin@next --save
```

配置：
```javascript
# 引入
const ExtractTextPlugin = require('extract-text-webpack-plugin')
# 添加module-rules
module.exports = {
  module: {
    rules: [
    	// css抽离配置loader
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
 #添加plugins
  plugins: [
    new ExtractTextPlugin('styles/[name].css'),
  ]
}

```
+ 方法二 用` mini-css-extract-plugin`

```javascript
# 引入
var miniCssExtractPlugin = require('mini-css-extract-plugin');
...
# 添加module-rules
module: {
    rules: [
    	{
				test: /\.css$/,
				use: [
		          miniCssExtractPlugin.loader,
		          'css-loader',   
		        ]
		]
	}
...
# 添加plugins
plugins: [
  	new miniCssExtractPlugin({
   	   filename: 'styles/[name].css',
   	 })
  ]
```


**问题五：webpack处理html文件**

[npm说明](https://www.npmjs.com/package/html-webpack-plugin)

如果直接将 `html` 文件置于 `./src` 目录中，用 `Webpack` 打包时是不会编译到生产环境中的。所以`html-webpack-plugin` 插件是用于编译项目中的 html 类型的文件，Webpack基于这个插件配置编译打包到生产环境。

```bash
npm install --save-dev html-webpack-plugin
```

打包到`dist/view/index.html`，配置：

```javascript
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
		template: './src/view/'+ name+ '.html',
 		filename: 'view/'+ name+ '.html',
 		inject: true,
 		hash: true,
 		chunks: ['common', name]
	}
}
var module.exports = {
entry: {
  'common': ['./src/page/common/index.js'],
  'index': ['./src/page/index/index.js'],
  'login': ['./src/page/login/index.js']
},
output: {
  path: path.join(__dirname, 'dist'),
  publicPath: '/dist',
  filename: 'js/[name].bundle.js'
},
plugins: [
  new HtmlWebpackPlugin(getHtmlConfig('index'))
]
}
```

+ 补充：[webpack4升级说明](https://juejin.im/post/5b4ca3a5e51d4519596b7a06)

