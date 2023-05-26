// 打包的配置文件
import bable from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input:'./src/index.js', // 打包的入口文件
    output:{  // 打包的出口文件
        file:'dist/vue.js',
        format:'umd', // umd打包模块，用umd打包会给window添加一个Vue
        name:'Vue', // 定义一个Vue的全局变量
        sourcemap:true // 为true时前后端代码映射
    },
    plugin:[
        bable({  // babel将高级语法转成低级语法
            exclude:'node_modules/**'  // 将node_modules目录下的文件排除
        }),
        serve({  // 开启一个服务
            port:3000,
            contentBase:'', // 当contentBase为空字符串时以当前目录为基准
            openPage:'/index.html' // 打开的文件
        })
    ]
}