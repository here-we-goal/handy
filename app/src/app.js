/* App.js */
define(function(require, exports, module) {
    "use strict";
    var $ = require('$');
    var AppBase = require('app');
    var App = AppBase.extend({
        options:{
        },
        initialize:function(options){
            var that = this;
            console.log('app base');
        }
    });
    module.exports = App;
});