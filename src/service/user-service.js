/* 
* @Author: connie
* @Date:   2019-09-17 11:45:11
* @Last Modified by:   connie
* @Last Modified time: 2019-09-25 16:34:17
*/

'use strict';
var _mm = require('util/mm.js');
var _user = {
	
	// 用户登录
	login : function(userInfo, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/login.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		})
	},
	// 用户名验证
	checkUsername : function(username, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/check_valid.do'),
			data : {
				type : 'username',
				str  : username
			},
			method : 'POST',
			success : resolve,
			error : reject
		})
	},
	// 用户注册
	register : function(userInfo, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/register.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

	// 检查用户登录状态
	checkLogin: function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

	// 登出
	logout : function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

	// 获取密码提示问题
	getQuestion : function(username, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_get_question.do'),
			data : {
				username : username
			},
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

	// 检查密保问题答案
	checkAnswer : function(userInfo, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_check_answer.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

	// 忘记-找回新密码
	resetPassword : function(userInfo, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/forget_reset_password.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

	// 获取用户信息
	getUserInfo : function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	},
	// 更新个人信息
	updateUserInfo : function(userInfo, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/update_information.do'),
			data: userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

	// 更新密码
	updatePassword : function(userInfo, resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/reset_password.do'),
			data: userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		})
	},

};

module.exports = _user;