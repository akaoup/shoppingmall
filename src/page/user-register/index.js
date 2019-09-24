/* 
* @Author: connie
* @Date:   2019-09-23 11:48:53
* @Last Modified by:   connie
* @Last Modified time: 2019-09-23 16:58:51
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
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		// 检查用户名是否有效
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			// 如果用户名为空，不作验证
			if(!username){
				return;
			}
			_user.checkUsername(username, function(res){
				formError.hide()
			}, function(errMsg){
				formError.show(errMsg)
			})
		})
		// 提交
		$('#submit').click(function(){
			_this.submit();
		})
		$('.user-info').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		})
	},

	submit : function(){
		var formData = {
			username 				: $.trim($('#username').val()),
			password 				: $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			phone 					: $.trim($('#userphone').val()),
			email 					: $.trim($('#useremail').val()),
			question 				: $.trim($('#userquestion').val()),
			answer 					: $.trim($('#useranswer').val()),
		},

		validateResult = this.fromValidate(formData);
		if(validateResult.status){
			// 验证成功提交
			_user.register(formData, function(res){
				// 请求成功
				window.location.href = './result.html?type=register';
			}, function(errMsg){
				// 请求失败
				formError.show(errMsg)
			})
		}else{
			// 验证失败提示
			formError.show(validateResult.msg)
		}

	},

	fromValidate : function(formData){
			var result = {
				status : false,
				msg : ''
			};
			if(!_mm.validate(formData.username, 'require')){
				result.msg = '用户名不能为空';
				return result;
			};
			if(!_mm.validate(formData.password, 'require')){
				result.msg = '密码不能为空';
				return result;
			};
			if(formData.password.length < 6){
				result.msg = '密码长度不能少于6位';
				return result;
			}; 
			if(formData.password !== formData.passwordConfirm){
				result.msg = '两次输入的密码不一致';
				return result;
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
}

$(function(){
	page.init();
})