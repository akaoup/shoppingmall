/* 
* @Author: connie
* @Date:   2019-09-17 16:04:59
* @Last Modified by:   connie
* @Last Modified time: 2019-09-17 17:49:09
*/

'use strict';
require('./index.css')
var _mm = require('util/mm.js');


var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad: function(){
		var keyword = _mm.getUrlParam('keyword');
		// 如果keyword存在，则回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		})
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		})
	},
	
	// 搜索提交
	searchSubmit: function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			_mm.goHome();
		}
	}
};

header.init();