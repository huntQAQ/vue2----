export function observer(data){
    // 判断data数据
    if(typeof data != 'object' || data == null){
        return data
    }
    return new Observer(data)
}
class Observer{
    constructor(value){
        this.walk(value)  // 遍历
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