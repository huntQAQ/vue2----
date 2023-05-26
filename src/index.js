import { initMixin } from "./init"

// 入口文件
function Vue(options){
    // 初始化
    this._init(options)
}

initMixin(Vue)
// 暴露出去
export default Vue