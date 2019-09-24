/* 
* @Author: connie
* @Date:   2019-09-23 17:10:36
* @Last Modified by:   connie
* @Last Modified time: 2019-09-24 11:38:27
*/

'use strict';
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
require('./index.css');
require('page/common/nav-simple/index.js');

var  formError ={
	show : function(errmsg){
		$('.error-item').show().find('.err-msg').text(errmsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}

};

var page = {
	data : {
		username : '',
		question : '',
		answer   : '',
		token    : ''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepName();
	},
	bindEvent: function(){
		var _this = this;
		// 第一步按钮点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if(username){
				_user.getQuestion(username, function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();

				}, function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入用户名');
			}
		});

		// 第二步按钮点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if(answer){
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				}, function(res){
					_this.data.answer   = answer;
					_this.data.token    = res;
					_this.loadStepPassword();

				}, function(errMsg){
					formError.show(errMsg);
				})
			}else{
				formError.show('请输入密保问题答案');
			}
		});

		// 第三步按钮提交 username,passwordNew,forgetToken
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if(password && password.length >= 6){
				_user.resetPassword({
					username    : _this.data.username,
					forgetToken : _this.data.token,
					passwordNew : password
				}, function(res){
					window.location.href = './result.html?type=pass-reset'
				}, function(errMsg){
					formError.show(errMsg);
				})
			}else{
				formError.show('请输入不少于6位数的新密码');
			}
		})



	},

	//加载找回密码第一步 - 输入用户名
	loadStepName: function(){
			$('.step-username').show()
		},

	//加载找回密码第二步 - 输入密保问题答案
	loadStepQuestion: function(){
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},

	//加载找回密码第三步 - 输入新密码
	loadStepPassword: function(){
		formError.hide();
		$('.step-question').hide().siblings('.step-password').show();
	},

}

$(function(){
	page.init();
})