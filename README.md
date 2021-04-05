# yarn prettier

基于 prettier 的格式化规则，使用该脚本可以将整个项目格式

# useEffect 用方法

useEffect Hook 如果不传第二个参数(数组)的话，所有模型数据变化 useEffect 都会执行
如果 useEffect 只需要执行一次的话，第二个参数需要传一个空数组[]
如果需要监听某个参数变化，然后执行的话，需要在第二参数的数组中添加对应的参数，可监听多个[参数 1，参数 2...]
useEffect Hookh'中返回的的函数在组件销毁时执行
useEffect 是无阻塞的，就算里面的业务逻辑出错，也不会影响组件的挂载
