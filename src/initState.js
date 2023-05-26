import { observer } from "./Observer/index"

export function initState(vm){
    let opts = vm.$options
    console.log(opts)
    // 判断
    if(opts.data){
        initData(vm)
    }
}
// vue2对data初始化
function initData(vm){
    let data = vm.$options.data
    data = vm._data = typeof data === "function" ? data.call(vm) : data  // 改this指向到vm
    console.log(data)
    // data数据进行劫持
    observer(data)
}

// data{}中数据    (1)对象    (2)数组     { a:{b:1}, list:[1,2,3], arr:[{}] }