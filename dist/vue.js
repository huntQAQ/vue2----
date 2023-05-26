(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

	// arr.js文件是用于实现对data中数组使用方法函数进行劫持
	// 该文件用于对数据中的数组进行方法拦截和重写。
	// 重写数组

	// (1)获取原来的数组方法
	let oldArrayProtoMethods = Array.prototype;

	// (2)继承
	let ArrayMethods = Object.create(oldArrayProtoMethods);

	// 劫持
	let methods = [
		"push",
		"pop",
		"unshift",
		"shift",
		"splice"
	];
	methods.forEach(item => {
		ArrayMethods[item] = function(...args){
			console.log('劫持数组');
			// 如果没有劫持的数据，这段代码执行了一个对于数组操作的旧方法并返回其结果
			let result = oldArrayProtoMethods[item].apply(this,args);
			return result
		};
	});

	// observer方法传入的参数是一个对象，这个对象就是需要进行数据劫持的对象。
	function observer(data){
	    // 判断data数据
	    if(typeof data != 'object' || data == null){
	        return data
	    }
		// observe 方法内部实现了一个 Observer 类，这个类实现了对数组以及对象进行劫持的方法。
	    return new Observer(data)
	}
	// Observer 类会首先判断被劫持的对象是否为数组或者对象，
	// 如果是对象就调用 walk 方法，遍历对象的所有属性，对每个属性进行劫持；
	// 如果是数组，就调用 observeArray 方法对数组进行劫持。
	class Observer{
	    constructor(value){
			// 数组遍历的话，就把数组的小标当成属性进行劫持了
			// 判断是否为数组
			// console.log(value)
			if(Array.isArray(value)){
				// 这段代码给一个名为value的对象设置了一个名为__proto__的属性，将其指向了一个名为ArrayMethods的对象。
				// 这意味着当在value上调用数组方法时，它会先在value上查找是否有这个方法，
				// 如果没有，就会到ArrayMethods上查找并执行相应的方法。
				// 这样做可以实现从一个普通的对象继承数组的方法，使其看起来像一个数组对象。
				value.__proto__ = ArrayMethods;
				// 如果value是数组对象
				this.observerArray(value);
			} else {
				this.walk(value);  // 遍历
			}
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
		observerArray(value){
			for(let i = 0; i < value.length; i++){
				observer(value[i]);
			}
		}
	}
	// 对对象中的属性进行劫持
	// Object.defineProperty 方法会给当前属性添加 getter 和 setter。
	// getter 主要用来收集依赖，
	// setter 主要用来在属性发生变化时自动触发更新，从而实现响应式的特性。
	// Object.defineProperty 有一个缺点只能对对象中的一个属性进行劫持
	function defineReactive(data, key, value){
	    observer(value); // 深度代理，递归
	    Object.defineProperty(data, key, {
	        get(){
	            console.log('获取');
	            return value
	        },
	        set(newValue){
	            console.log('设置');
	            if(newValue == value) return;
	            observer(newValue); // 如果用户设置的值是对象，又进行一次递归
	            value = newValue;
	        }
	    });
	}

	// initState方法实现对vue实例状态的初始化
	function initState(vm){
	    let opts = vm.$options;
	    // 判断
	    if(opts.data){
			// 调用initData方法初始化data属性
	        initData(vm);
	    }
	}
	// vue2对data初始化
	function initData(vm){
	    let data = vm.$options.data;
	    data = vm._data = typeof data === "function" ? data.call(vm) : data;  // 改this指向到vm
	    // data数据进行劫持
	    observer(data);
	}

	// data{}中数据    (1)对象    (2)数组     { a:{b:1}, list:[1,2,3], arr:[{}] }

	// 这段代码给Vue实例对象初始化数据，如果实例对象的选项中有data属性，就调用initData方法对数据进行初始化。
	// initData方法将data赋值给Vue实例对象中的一个名为_data的属性，并对_data数据进行劫持，实现数据的响应式更新。
	// 其中，引入了Observer文件夹下的一个名为observer的方法，用于劫持数据。

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

	// 这段代码是一个Vue的初始化函数，通过Vue的原型链给Vue实例添加了_init方法。
	// 该方法会接收一个options对象参数，并将其赋值给Vue实例的$options属性。
	// 同时，该方法还调用了initState函数，用于初始化Vue实例的状态。

	// 入口文件
	function Vue(options){
	    // 初始化
	    this._init(options);
	}

	initMixin(Vue);

	return Vue;

}));
//# sourceMappingURL=vue.js.map
