// observer方法传入的参数是一个对象，这个对象就是需要进行数据劫持的对象。
export function observer(data){
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
			console.log('数组')
		} else {
			this.walk(value)  // 遍历
		}
    }
    walk(data){
        // Object.keys() 是 JavaScript 内置的一个方法，
        // 用于返回一个对象的可枚举属性（不包括原型链上的属性）列表。其作用是将一个对象的属性转化成由属性名组成的数组。
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            // 对对象中的每个属性进行劫持
            let key = keys[i]
            let value = data[keys]
            defineReactive(data, key, value)
        }
    }
}
// 对对象中的属性进行劫持
// Object.defineProperty 方法会给当前属性添加 getter 和 setter。
// getter 主要用来收集依赖，
// setter 主要用来在属性发生变化时自动触发更新，从而实现响应式的特性。
function defineReactive(data, key, value){
    observer(value) // 深度代理
    Object.defineProperty(data, key, {
        get(){
            console.log('获取')
            return value
        },
        set(newValue){
            console.log('设置')
            if(newValue == value) return;
            observer(newValue) // 如果用户设置的值是对象
            value = newValue
        }
    })
}

