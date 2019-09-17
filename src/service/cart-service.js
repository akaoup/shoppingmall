/* 
* @Author: connie
* @Date:   2019-09-17 15:08:43
* @Last Modified by:   connie
* @Last Modified time: 2019-09-17 15:34:13
*/

'use strict';


var _mm = require('util/mm.js');
var _cart = {
	
	getCartCount : function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error : reject
		})
	}

};

module.exports = _cart;