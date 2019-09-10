/* 
* @Author: connie
* @Date:   2019-09-09 16:11:11
* @Last Modified by:   connie
* @Last Modified time: 2019-09-09 19:01:34
*/

'use strict';
var Hogan = require('hogan.js')
var conf = {
	serverHost: ''
}
var _mm = {
	request : function(param){
		var _this = this;
		$.ajax({
			type 			: param.method || 'get',
			url  			: param.url 	 || '',
			dataType 	: param.type 	 || 'json',
			data 			: param.data   || '',
			success 	: function(res){
				// 请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data, res.msg)
				}
				// 没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				// 请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.data, res.msg)
				}
			},
			error 		: function(err){
				typeof param.error === 'function' && param.error(err.statusText)
			}
		})
	},
	// 获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam: function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模版
	renderHtml : function(temp, data){
		var template = Hogan.compile(temp),
				result = template.render(data);
		return result;
	},
	// 统一登录处理
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);

	}
}

module.exports = _mm