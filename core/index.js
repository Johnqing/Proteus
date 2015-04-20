var path = require('path');
var express = require('express');
var session = require('express-session');
var csurf = require('csurf');
var compress = require('compression');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var _ = require('lodash');
var ejs = require('ejs-mate');

var Proteus = function(){
    this.express = express();

};

Proteus.prototype.init = function(options){
    var app = this.express;
    options.view = options.view || {};

    this.options = options;

    _.extend(app.locals, {
        config: options
    });

    // configuration in all env
    app.set('views', path.join(options.view.path || options.root, 'views'));
    app.set('view engine', 'html');
    app.engine('html', options.view.engine || ejs);

    // 添加母版
    app.locals._layoutFile = options.view.layout || 'layout.html';
    app.enable('trust proxy');

    // 静态资源
    app.use(options.static.showPath, express.static(options.static.path));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(require('method-override')());
    app.use(require('cookie-parser')(options.session.secret));
    app.use(compress());
    app.use(session({
        secret: options.session.secret,
        store: options.session.store || null,
        resave: true,
        saveUninitialized: true
    }));


    if (!options.debug) {
        app.use(function (req, res, next) {
            if (req.path.indexOf('/api') === -1) {
                csurf()(req, res, next);
                return;
            }
            next();
        });
        app.set('view cache', true);
    }


    _.extend(app.locals, require('./libs/render_helper'));
    app.use(function (req, res, next) {
        res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
        next();
    });

    return this;
};

Proteus.prototype.initRoutes = function(webRouter){
    var app = this.express;
    app.use('/', webRouter);
    return this;
};

Proteus.prototype.start = function(){
    var app = this.express;
    var options = this.options;
    // error handler
    if (options.debug) {
        app.use(errorhandler());
    } else {
        app.use(function (err, req, res, next) {
            console.error('server 500 error:', err);
            return res.status(500).send('500 status');
        });
    }

    app.listen(options.port, function () {
        console.log("listening on port %d", options.port);
        console.log("God bless love....");
        console.log("You can debug your app with http://" + options.hostname + ':' + options.port);
    });
    return this;
};

module.exports = Proteus;