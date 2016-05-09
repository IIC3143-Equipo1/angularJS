var models = require("../models");

exports.index = function(req, res) {
    res.render('index', {
        title : 'Express'
    });
};
exports.login = function(req, res) {
    res.render('login', {
        title : 'Login'
    });
};
