/* 
* @Author: connie
* @Date:   2019-09-17 11:45:11
* @Last Modified by:   connie
* @Last Modified time: 2019-09-17 15:34:12
*/

'use strict';
var _mm = require('util/mm.js');
var _user = {
	// 检查登录状态
	checkLogin : function(){

	},
	// 登出
	logout : function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	}

};

module.exports = _user;