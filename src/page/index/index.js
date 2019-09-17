/* 
* @Author: connie
* @Date:   2019-09-06 15:45:05
* @Last Modified by:   connie
* @Last Modified time: 2019-09-17 22:52:25
*/

'use strict';
var $ = require('jquery');
var _mm = require('util/mm.js');

require('page/common/nav-simple');
require('page/common/nav');
require('page/common/header');
var navSide = require('page/common/nav-side');
navSide.init({
	name: 'order-list'
});

// require('../module.js')


// require('./index.css')
// alert('123');
// console.log(_mm.getUrlParam('test'))
// var html = '<div>{{data}}</div>'
// var data = {
// 	data: 123
// }
// console.log(_mm.renderHtml(html, data))
// // console.log(_mm)
// // _mm.request({
// // 	url: '/product/list.do?keyword=1',
// // 	success: function(res){
// // 		console.log(res)
// // 	},
// // 	error: function(msg){
// // 		console.log(msg)
// // 	}
// // })