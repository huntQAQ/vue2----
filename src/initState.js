import { observer } from "./Observer/index"

// initState方法实现对vue实例状态的初始化
export function initState(vm){
    let opts = vm.$options
    // 判断
    if(opts.data){
		// 调用initData方法初始化data属性
        initData(vm)
    }
}
// vue2对data初始化
function initData(vm){
    let data = vm.$options.data
    data = vm._data = typeof data === "function" ? data.call(vm) : data  // 改this指向到vm
    // data数据进行劫持
    observer(data)
}

// data{}中数据    (1)对象    (2)数组     { a:{b:1}, list:[1,2,3], arr:[{}] }

// 这段代码给Vue实例对象初始化数据，如果实例对象的选项中有data属性，就调用initData方法对数据进行初始化。
// initData方法将data赋值给Vue实例对象中的一个名为_data的属性，并对_data数据进行劫持，实现数据的响应式更新。
// 其中，引入了Observer文件夹下的一个名为observer的方法，用于劫持数据。