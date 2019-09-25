/* 
* @Author: connie
* @Date:   2019-09-25 16:03:48
* @Last Modified by:   connie
* @Last Modified time: 2019-09-25 16:56:54
*/

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm  		= require('util/mm.js');
var _user		= require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var temp		= require('./index.string');

// 页面逻辑部分
var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 初始化左侧边菜单
		navSide.init({
			name: 'password-update'
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
		var _this =this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				passwordOld : $.trim($('#oldpass').val()),
				passwordNew : $.trim($('#newpass').val()),
				passwordConfirm : $.trim($('#newpass-confirm').val())
			}
			var vaildateResult = _this.validateForm(userInfo);

			if(vaildateResult.status){
				_user.updatePassword(userInfo, function(res){
					_mm.errorTips('密码重置成功')
					// 222333 怕忘记记一下我的新密码
				}, function(errMsg){
					_mm.errorTips(errMsg);
				})
			}else{
				_mm.errorTips(vaildateResult.msg);
			}
			
		});

	},

	validateForm : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		if(!_mm.validate(formData.passwordOld, 'require')){
				result.msg = '原密码不能为空';
				return result;
		};
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '新密码长度不能少于6位';
			return result;
		}; 
		if(formData.passwordNew !== formData.passwordConfirm){
				result.msg = '两次输入的新密码不一致';
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