/* 
* @Author: connie
* @Date:   2019-09-24 15:19:53
* @Last Modified by:   connie
* @Last Modified time: 2019-09-25 00:30:19
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
		this.bindEvent();
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

	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				phone 		: $.trim($('#phone').val()),
				email 		: $.trim($('#email').val()),
				question 	: $.trim($('#question').val()),
				answer 		: $.trim($('#answer').val())
			},
			vaildateResult = _this.validateForm(userInfo);
			if(vaildateResult.status){
				_user.updateUserInfo(userInfo, function(res, msg){
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function(errMsg){
				});
			}else{
				_mm.errorTips(vaildateResult.msg);
			}
		})
	},

	// 验证字段信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg : ''
		};
				
		// 验证手机号
		if(!_mm.validate(formData.phone, 'phone')){
			result.msg = '手机号码格式不正确';
			return result;
		}

		if(!_mm.validate(formData.email, 'email')){
			result.msg = '邮箱账户格式不正确';
			return result;
		}

		if(!_mm.validate(formData.question, 'require')){
			result.msg = '密保问题不能为空';
			return result;
		};

		if(!_mm.validate(formData.answer, 'require')){
			result.msg = '密保问题答案不能为空';
			return result;
		};

		// 通过验证 status为true
		result.status = true;
		result.msg = '验证通过';
		return result;
	}



};

$(function(){
	page.init();
})