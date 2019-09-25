/* 
* @Author: connie
* @Date:   2019-09-24 15:19:53
* @Last Modified by:   connie
* @Last Modified time: 2019-09-25 16:01:31
*/

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm  		= require('util/mm.js');
var _user		= require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var temp		= require('./index.string')

// 页面逻辑部分
var page = {
	init: function(){
		this.onLoad();

	},
	onLoad : function(){
		// 初始化左侧边菜单
		navSide.init({
			name: 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},

	loadUserInfo : function(){
		_user.getUserInfo(function(res){
			// 渲染右侧内容
			var userHtml = _mm.renderHtml(temp, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
			_mm.errorTips(errMsg);
		})
	},

};

$(function(){
	page.init();
})