/**
 * payment.js
 * 用于组织wapCashier支付相关业务
 */
define(function(require, exports, module) {
    "use strict";
    var $ = require('$');
    var Base = require('base');
    var Json = require('json');
    var CouponPayment = require('./couponPayment');
    var JfbPayment = require('./jfbPayment');
    var BalancePayment = require('./balancePayment');
    var YltPayment = require('./yltPayment');
    var ExpressPayment = require('./expressPayment');
    var Payment = Base.extend({
    	options:{
            payments:{
                couponPayment:{//红包支付
                    options:{name:'红包支付'},
                    constructor:function(domContext, options) {
                        return new CouponPayment(domContext, options);
                    }
                },
	            jfbPayment:{//集分宝支付
                    options:{name:'集分宝支付'},
                    constructor:function(domContext, options) {
                        return new JfbPayment(domContext, options);
                    }
                },
	            balancePayment:{//余额付款
                    options:{name:'余额支付'},
                    constructor:function(domContext, options) {
                        return new BalancePayment(domContext, options);
                    }
                },
	            yltPayment:{//盈利通付款
                    options:{name:'盈利通支付'},
                    constructor:function(domContext, options){
                        return new YltPayment(domContext, options);
                    }
                },
	            expressPayment:{//快捷支付含其他付款方式(网银、话费卡)、添加新卡等
                    options:{name:'快捷支付'},
                    constructor:function(domContext, options) {
                        return new ExpressPayment(domContext, options);
                    }
                }
            },
            onInit:function(){
                var that = this;

                that.payments = {};
                $.each($('input.payment'),function(index,item){
                    var dataConf = $(item).data('conf').replace(/\'/g,'"');
                    dataConf = Json.parse(dataConf);
                    !!dataConf.model && (function(){
                        that.options.payments[dataConf.model] 
                        && 'object' == _.$type(that.options.payments[dataConf.model])
                        && (function(){
                            var paymentOptions = that.options.payments[dataConf.model]['options'] || {};
                            that.payments[dataConf.model] = that.options.payments[dataConf.model]['constructor'](item,paymentOptions);
                        })();
                    })();
                });
                console.log(that.payments,'that.payments');
            },
            onPreInit:function(){
            }
    	},
        initialize:function(options){
            var that = this;
            Payment.superclass.initialize.apply(that,[ options ]);
        }
    });
    module.exports = Payment;
});
