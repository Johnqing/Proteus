/*!
 * Admin - common/render_helpers.js
 * Copyright(c) 2015 Charles <liuqing@liluo.me>
 * MIT Licensed
 */

"use strict";

var _ = require('lodash');
var jsxss = require('xss');


var myxss = new jsxss.FilterXSS({
    onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
        // 让 prettyprint 可以工作
        if (tag === 'pre' && name === 'class') {
            return name + '="' + jsxss.escapeAttrValue(value) + '"';
        }
    }
});

exports.xssFixed = function(text){
    return myxss.process(text || '');
}


exports._ = _;