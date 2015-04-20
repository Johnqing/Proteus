## 项目结构

```
root
   |-controllers                    --controller 控制器文件夹
   |-core                           --该项后期抽离出去
   |-logs                           --日志都存放在这里
   |-libs                           --library 库文件夹
   |-node_modules                   --node modules集合
   |-proxy                          --proxy :隔离controllers中的数据访问
   |-static                         --静态资源文件夹
   |-views                          --视图文件夹
   |-app.js                         --http server的入口，项目主文件
   |-appConfig.js                   --应用配置
   |-package.json                   --项目描述文件
   |-README.md                      --readme file
   |-routes.js                      --url 路由配置
   |-docs                           --项目文档资源文件夹
   |-common                         --系统公用文件定义
   |-services                       --各种service集合（暂时没有）
   |-tools                          --工具集
   |-test                           --测试文件
```

## Proteus

### 依赖

+ express
+ ejs-mate

### 使用

app.js

```
var Proteus = require('./core/');
var proteus = new Proteus();

var routes = require('./routes');
var config = {
    debug: true || false, 
    port: '3000',
    hostname: '127.0.0.1',
    root: __dirname,
    view: {
        path: '模板文件路径', 
        engine: '模板引擎，可自己选择不同的传入',
        layout: '公共模板文件'
    },
    static: {
        path: '静态文件路径',
        showPath: '实际在展示出来的路径'
    },
    session: {
        secret: '',
        store: new Mongo()
    }    
};
proteus.init(config).initRoutes(routes).start();
```

routes.js

```
var express = require('express');
var router = express.Router();

//
var site = function (req, res, next) {
    res.render('index', {});
}

// home page
router.get('/', site.index);


module.exports = router;
```