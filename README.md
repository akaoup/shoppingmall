# shoppingmall

## webpack

### webpack对脚本和样式的处理
+ webpack.config.js 
+ js用什么loader加载
+ entry添加多个js
+ output分文件夹存放目标文件
+ jquery的引入

+ 提取公共模块


+ 样式处理用什么loader
```
npm i css-loader style-loader --save
```
在module里更改配置rules，css的文件就有效了：

```
{
	test: /.css$/,
	use:[
		'style-loader',
		'css-loader'
	]
}
```

+ 单独打包css文件（从打包js里分离出来）
**方法一 用extract-text-webpack-plugin**

`extract-text-webpack-plugin` 还不能支持webpack4.0.0以上的版 [说明](https://www.jianshu.com/p/3395112d643e)

解决办法 安装高级版本：
``` 
npm install extract-text-webpack-plugin@next --save

```

配置：
```
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
  plugins: [
    new ExtractTextPlugin('styles/[name].css'),
  ]
}

```
**方法二 用 mini-css-extract-plugin**

```
var miniCssExtractPlugin = require('mini-css-extract-plugin');
...
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
plugins: [
  	new miniCssExtractPlugin({
   	   filename: 'styles/[name].css',
   	 })
  ]
```
+ webpack处理html

+ 补充：[webpack4升级说明](https://juejin.im/post/5b4ca3a5e51d4519596b7a06)

