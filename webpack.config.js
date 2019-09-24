/* 
* @Author: connie
* @Date:   2019-09-06 15:40:31
* @Last Modified by:   connie
* @Last Modified time: 2019-09-24 23:39:49
*/

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

// 环境变量的配置 development / production
const isDev = process.env.NODE_ENV === 'development'


// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
	return {
		template: './src/view/'+ name+ '.html',
 		filename: 'view/'+ name+ '.html',
    title: title,
 		inject: true,
 		hash: true,
 		chunks: ['common', name]
	}
}

var config = {
	
	// 关闭性能提示
	performance: {
	  hints: false
	},
  entry: {
  	'common'                  : ['./src/page/common/index.js'],
  	'index'                   : ['./src/page/index/index.js'],
  	'user-login'              : ['./src/page/user-login/index.js'],
    'user-register'           : ['./src/page/user-register/index.js'],
    'user-pass-reset'         : ['./src/page/user-pass-reset/index.js'],
    'user-center'             : ['./src/page/user-center/index.js'],
    'user-center-update'      : ['./src/page/user-center-update/index.js'],
    'result'                  : ['./src/page/result/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'js/[name].bundle.js'
  },
  resolve: {
  	alias: {
      node_modules : __dirname + '/node_modules',
  		util: __dirname + '/src/util',
  		page: __dirname + '/src/page',
  		images: __dirname + '/src/images',
      service: __dirname + '/src/service'
  	}
  },
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
  },
  module: {
    rules: [
    	{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.string$/,
        use: [{
          loader: 'html-loader'
        }]
      },
			{
				test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/,
				use: [
					{
						loader:'url-loader',
						options: {
							name: 'resource/[name].[ext]'
						}
					}
				]
			},
    	//暴露$和jQuery到全局
      {
			   test: require.resolve('jquery'),
			   use: [{
			      loader: 'expose-loader',
			      options: 'jQuery'
			   },{
			      loader: 'expose-loader',
			      options: '$'
			   }]
			}

    ]
  },
  
  plugins: [
  	// css单独抽离打包
   	new ExtractTextPlugin('styles/[name].css'),

   	// html模板的处理
   	new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '个人信息修改'))

 		// 旧版公共模块打包：
  	// new webpack.optimize.CommonsChunkPlugin({names: 'commoms', filename: 'js/base.js'})
    
  ]
};

	if(isDev){
		//config.entry.common.unshift('webpack-dev-server/client?http://0.0.0.0:8088/'),
		config.devServer = {
			inline:true,
			port: '8088',
			host: '0.0.0.0',
			proxy : {
          '**/*.do' : {
              target: 'http://test.happymmall.com/',
              changeOrigin : true
          }   
        }
	}
}
module.exports = config;
