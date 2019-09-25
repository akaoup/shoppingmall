
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
+ [webpack-dev-server原理分析与HMR实现](http://www.voidcn.com/article/p-sfoxvjwp-bbs.html)

2.font-awesome



### 衍生了解

+ hogan
+ font-awesome
+ 模块化开发



## 2. 基础布局 + 通用模块

### 2.1 通用方法

+ [详情见链接](https://github.com/akaoup/shoppingmall/blob/master/src/util/mm.js)

|          通用模块           |                   util/mm.js                    |
| :-------------------------: | :---------------------------------------------: |
|        请求方法封装         |                request（param）                 |
|     获取服务器地址方法      |              getServerUrl（path）               |
|       获取url参数方法       |               getUrlParam（name）               |
|    渲染html方法（Hogan）    |            renderHtml（temp, data）             |
|      成功/错误提示方法      |      successTips（msg） / errorTips（msg）      |
| 字段验证 （非空/手机/邮箱） | validate（value, [require \| phone \| email ]） |
|          登录跳转           |                    doLogin()                    |
|          跳转首页           |                    goHome()                     |

### 2.2 基础布局

+ 通用css样式（common.css）
+ 通用头尾（header/footer）
+ 登录信息条：登录/登出，购物车，个人中心入口
+ 搜索条：搜索产品
+ 侧边信息导航：点击切换查看个人信息，订单信息等。
+ 操作提示页：提示登录成功/下单成功等结果提示页

## 3. 用户模块

### 3.1 登录

登录这块主要做登录的验证，伪表单的提交，提示信息方法封装。先验证两个字段非空，再将字段进行提交到后台验证，验证成功跳转首页，验证失败提示验证失败原因（用户不存在 or 密码错误）。

|  功能点  |     接口     |
| :------: | :----------: |
| 提交登录 | 提交登录接口 |

### 3.2 注册

注册这块布局跟登录差不多。不同的是字段的验证增加了，加入了手机号，邮箱账户，密保问题与答案等字段的需求。用户名需要确认能不能用，得先做异步验证，用户名有效后才能接下去填别的注册信息。字段有效验证通过后，提交后端的注册接口，接口返回状态通知注册结果成功与否，成功跳转注册成功提示页。

|          功能点          |           接口           |
| :----------------------: | :----------------------: |
|     对用户名异步验证     | 判断用户名是否存在的接口 |
| 字段验证，通过后提交端口 |       提交注册接口       |
|     接口成功失败处理     |                          |

### 3.3 找回密码

找回密码分步骤，当前步骤才会在页面display，其他步骤隐藏。每一个步骤下的按钮会提交信息到接口，接口请求成功后，会display下一个步骤。第一个步骤需要提交用户名到接口拿到返回的该用户的密保问题，第二个步骤需要提交到用户名，问题，及该步骤下回答的答案到接口，接口对答案验证通过后返回token，第三个步骤，提交用户名，有效token和该步骤下填的新密码到接口，接口请求成功后跳转到重置密码成功结果提示页。

需要用到的字段（用户名，问题，答案，新密码），先存储到一个对象里，在步骤操作过程中无非就是这几个字段的访问和更新。

|             功能点             |                  接口                   |
| :----------------------------: | :-------------------------------------: |
|   输入账号，获取密码提示问题   |     根据用户名获取密码提示问题接口      |
| 输入密码提示问题的答案进行验证 | 根据用户名、问题和答案获取认证token接口 |
|        提交修改后的密码        |    根据用户名和认证token重置密码接口    |

### 3.4 个人中心

|    功能点    |       接口       |
| :----------: | :--------------: |
| 显示个人信息 | 获取用户信息接口 |
| 修改个人信息 | 修改用户信息接口 |

### 3.5 修改密码

|              功能点              |      接口      |
| :------------------------------: | :------------: |
| 根据原密码和新密码来更新用户密码 | 更新密码的接口 |



## 4. 商品模块开发

## 5. 购物车模块开发

## 6.订单模块开发

## 7.支付模块开发

## 8.数据统计和SEO优化

## 9. 线上环境配置 和 自动化发布

## 10. 服务端了解

