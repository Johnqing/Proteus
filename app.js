var _ = require('lodash');


/**
 * Config
 */
var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    // 站点配置
    name: 'AdminLTE', // name
    description: '蓝色电商', //
    keywords: '',

    // 添加到 html head 中的信息
    site_headers: [],

    site_logo: '/static/img/logo.png', // default is `name`
    site_icon: '/static/img/icon_32.png', // 默认没有 favicon, 这里填写网址

    // 域名
    hostname: 'localhost',

    session_secret: 'admin_lte_secret', // 务必修改
    auth_cookie_name: 'admin_lte',

    // 程序运行的端口
    port: 3000,

    // 文件上传配置
    upload: {
        path: path.join(__dirname, 'static/upload/'),
        url: '/static/upload/'
    },

    //
    root: __dirname,
    static: {
        showPath: '/public',
        path: path.join(__dirname, 'static')
    },
    session: {
        secret: 'admin_lte_secret',
        store: null
    }

};


var Proteus = require('./core/');
var proteus = new Proteus();

var routes = require('./routes');

proteus.init(config).initRoutes(routes).start();