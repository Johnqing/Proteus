var express = require('express');
var router = express.Router();

//
var site = require('./controllers/views/home');

// home page
router.get('/', site.index);


module.exports = router;