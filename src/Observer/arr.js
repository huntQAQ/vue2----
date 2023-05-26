// arr.js文件是用于实现对data中数组使用方法函数进行劫持
// 该文件用于对数据中的数组进行方法拦截和重写。
// 重写数组

// (1)获取原来的数组方法
let oldArrayProtoMethods = Array.prototype

// (2)继承
let ArrayMethods = Object.create(oldArrayProtoMethods)

// 劫持
let methods = [
	"push",
	"pop",
	"unshift",
	"shift",
	"splice"
]
methods.forEach(item => {
	ArrayMethods[item] = function(...args){
		console.log('劫持数组')
		// 如果没有劫持的数据，这段代码执行了一个对于数组操作的旧方法并返回其结果
		let result = oldArrayProtoMethods[item].apply(this,args)
		return result
	}
})

export default ArrayMethods