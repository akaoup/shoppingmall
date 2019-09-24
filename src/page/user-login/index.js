/* 
* @Author: connie
* @Date:   2019-09-06 15:46:02
* @Last Modified by:   connie
* @Last Modified time: 2019-09-23 11:45:44
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
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		},
		validateResult = this.fromValidate(formData);
		if(validateResult.status){
			// 验证成功提交
			_user.login(formData, function(res){
				// 请求成功
				console.log(window.location.href)
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
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
			}
			if(!_mm.validate(formData.password, 'require')){
				result.msg = '密码不能为空';
				return result;
			}
			// 通过验证 status为true
			result.status = true;
			result.msg = '验证通过';
			return result;
	}
}

$(function(){
	page.init();
})