/* 
* @Author: connie
* @Date:   2019-09-17 23:08:08
* @Last Modified by:   connie
* @Last Modified time: 2019-09-20 11:17:17
*/

'use strict';
var _mm = require('util/mm.js');
require('./index.css');

require('page/common/nav-simple/index.js');

$(function(){
	var type     = _mm.getUrlParam('type') || 'default',
			$element = $('.' + type + '-success');
	// 显示对应结果提示
	$element.show();
})
