import { initState } from "./initState"

// 初始化的文件放这
export function initMixin(Vue){
    Vue.prototype._init = function(options){
        console.log(options)
        let vm = this
        vm.$options = options  // 给vm实例的options属性赋值options
        // 初始化状态1
        initState(vm)
    }
}