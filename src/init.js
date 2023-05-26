import { initState } from "./initState"

// 初始化的文件放这
export function initMixin(Vue){
    Vue.prototype._init = function(options){
        console.log(options)
        let vm = this
        vm.$options = options  // 给vm实例的options属性赋值options
        // 初始化状态
        initState(vm)
    }
}

// 这段代码是一个Vue的初始化函数，通过Vue的原型链给Vue实例添加了_init方法。
// 该方法会接收一个options对象参数，并将其赋值给Vue实例的$options属性。
// 同时，该方法还调用了initState函数，用于初始化Vue实例的状态。