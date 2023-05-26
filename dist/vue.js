(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function observer(data){
        // 判断data数据
        if(typeof data != 'object' || data == null){
            return data
        }
        return new Observer(data)
    }
    class Observer{
        constructor(value){
            this.walk(value);  // 遍历
        }
        walk(data){
            // Object.keys() 是 JavaScript 内置的一个方法，
            // 用于返回一个对象的可枚举属性（不包括原型链上的属性）列表。其作用是将一个对象的属性转化成由属性名组成的数组。
            let keys = Object.keys(data);
            for(let i = 0; i < keys.length; i++){
                // 对对象中的每个属性进行劫持
                let key = keys[i];
                let value = data[keys];
                defineReactive(data, key, value);
            }
        }
    }
    // 对对象中的属性进行劫持
    function defineReactive(data, key, value){
        observer(value); // 深度代理
        Object.defineProperty(data, key, {
            get(){
                console.log('获取');
                return value
            },
            set(newValue){
                console.log('设置');
                if(newValue == value) return;
                observer(newValue); // 如果用户设置的值是对象
                value = newValue;
            }
        });
    }

    function initState(vm){
        let opts = vm.$options;
        console.log(opts);
        // 判断
        if(opts.data){
            initData(vm);
        }
    }
    // vue2对data初始化
    function initData(vm){
        let data = vm.$options.data;
        data = vm._data = typeof data === "function" ? data.call(vm) : data;  // 改this指向到vm
        console.log(data);
        // data数据进行劫持
        observer(data);
    }

    // data{}中数据    (1)对象    (2)数组     { a:{b:1}, list:[1,2,3], arr:[{}] }

    // 初始化的文件放这
    function initMixin(Vue){
        Vue.prototype._init = function(options){
            console.log(options);
            let vm = this;
            vm.$options = options;  // 给vm实例的options属性赋值options
            // 初始化状态
            initState(vm);
        };
    }

    // 入口文件
    function Vue(options){
        // 初始化
        this._init(options);
    }

    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
