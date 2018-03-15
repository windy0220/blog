---
title: Vue-Cli学习手记
date: 2018-02-24 23:23:15
tags: [前端, Vue, VueCli]
---

vueCli 学习笔记
github https://github.com/windy0220/vueStudy
<!--more-->
# 目录
- [VueCli](#安装VueCli)
  -  [安装](#安装VueCli)
  -  [目录结构](#目录结构)
  -  [重要文件解读](#重要文件解读)
- [vue-router](#vue-router)
  -  [增加一个Hi的路由和页面](#增加一个Hi的路由和页面)
  -  [router-link制作导航](#router-link制作导航)
  -  [配置子路由](#配置子路由)
  -  [传参](#传参)
  - [单页面多路由区域操作](#单页面多路由区域操作)
  - [通过 url 传参](#通过url传参)
  - [重定向](#重定向)
  - [别名](#别名)
  - [路由过渡动画](#路由过渡动画)
  - [404页面](#404)
  - [URL Mode](#URL Mode)
  - [路由配置文件中的钩子](#路由配置文件中的钩子)
  - [组件中的钩子函数](#组件中的钩子函数)
  - [编程式导航](#编程式导航)
- [Vuex](#vuex)
 - [安装vuex](#安装vuex )
 - [简化state的调用](#简化state的调用)
 - [getters过滤器](#getters过滤器)
 - [actions异步修改状态](#actions异步修改状态)
 - [modue模块组](#module模块组)

# 安装VueCli
安装cnpm
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装 vue-cli
```bash
cnpm i vue-cli -g
```

查看 vue-cli 版本
```bash
vue -V
```

初始化项目
```bash
vue init webpack <项目名称>
```
- Project name :项目名称 ，如果不需要更改直接回车就可以了。注意：这里不能使用大写
- Project description:项目描述
- Author：作者
- Install  vue-router? 是否安装vue的路由插件，我们这里需要安装，所以选择Y
- Use ESLint to lint your code? 是否用ESLint来限制你的代码错误和风格。输入n，
- setup unit tests with  Karma + Mocha? 是否需要安装单元测试工具Karma+Mocha，输入n。
- Setup e2e tests with Nightwatch?是否安装e2e来进行用户行为模拟测试，输入n。

进入项目执行 `cnpm i` 安装依赖包

运行 `npm run dev` 启动服务环境

运行 `npm run build` 打包文件 将 dist 文件夹下的内容上传到服务器即可。
> 将 config/index.js 中的 build 下的 assetsPublicPath: '/' 修改为 assetsPublicPath: './'

# 目录结构
```bash
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置 *
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                   // vue公共组件
|   |-- store                        // vuex的状态管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                         // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置 *
|-- .editorconfig                    // 定义代码格式 *
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
```
## 重要文件解读
## main.js文件解读
main.js是整个项目的入口文件,在src文件夹下：
```js
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false   //生产环境提示，这里设置成了false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```
通过代码可以看出这里引进了App的组件和<App/>的模板，它是通过 import App from ‘./App’这句代码引入的。  我们找到App.vue文件，打开查看。

## App.vue文件解读
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

app.vue文件我们可以分成三部分解读，

- <template></template>标签包裹的内容：这是模板的HTMLDom结构，里边引入了一张图片和<router-view></router-view>标签，<router-view>标签说明使用了路由机制。我们会在以后专门拿出一篇文章讲Vue-router。

- <script></script>标签包括的js内容：你可以在这里些一些页面的动态效果和Vue的逻辑代码。

- <style></style>标签包裹的css内容：这里就是你平时写的CSS样式，对页面样子进行装饰用的，需要特别说明的是你可以用<style scoped></style>来声明这些css样式只在本模板中起作用。

## router/index.js 路由文件
```js
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
```
我们可以看到 import Hello from ‘@/components/Hello’这句话， 文件引入了/components/Hello.vue文件。这个文件里就配置了一个路由，就是当我们访问网站时给我们显示Hello.vue的内容。

## Hello.vue文件解读
同样分为  `<template><script><style>`  三个部分，以后我们大部分的工作都是写这些.vue结尾的文件。现在我们可以试着改一些内容，然后预览一下。

```
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
```
# vue-router

安装 如果安装 vue-cli 的时候安装了 router 则不用再单独安装
```bash
cnpm i vue-router --save-dev
```

### 解读router/index.js文件
我们用vue-cli生产了我们的项目结构，你可以在src/router/index.js文件，这个文件就是路由的核心文件

```js
import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件

Vue.use(Router)  //Vue全局使用Router

export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    }
  ]
})
```

这个路由文件里只配置了一个功能，就是在进入项目时，显示Hello.vue里边的内容代码

### 增加一个Hi的路由和页面

- 在src/components目录下，新建 Hi.vue 文件。
- 编写文件内容，和我们之前讲过的一样，文件要包括三个部分 `<template><script>` 和 `<style>` 。文件很简单，只是打印一句话。

``` bash
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am JSPang'
    }
  }
}
</script>

<style scoped>

</style>
```

- 引入 Hi组件：我们在router/index.js文件的上边引入Hi组件

``` js
import Hi from '@/components/Hi'
```

- 增加路由配置：在router/index.js文件的routes[]数组中，新增加一个对象，代码如下。

``` js
{
  path:'/hi',
  name:'Hi',
  component:Hi
}
```

路由配置文件

``` js
import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件
import Hi from '@/components/Hi'

Vue.use(Router)  //Vue全局使用Router

export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    },{
      path:'/hi',
      name:'Hi',
      component:Hi
    }
  ]
})
```

### router-link制作导航

``` js
<router-link to="/">[显示字段]</router-link>
```

- to：是我们的导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成  to=”/”  ，
- [显示字段] ：就是我们要显示给用户的导航名称，比如首页  新闻页。

在 src/App.vue文件中的template里加入下面代码，实现导航。

``` js
<p>导航 ：
   <router-link to="/">首页</router-link>
   <router-link to="/hi">Hi页面</router-link>
</p>
```

## vue-router配置子路由
用 `<router-link>` 标签增加了两个新的导航链接。
```js
<p>导航 ：
      <router-link to="/">首页</router-link> |
      <router-link to="/hi">Hi页面</router-link> |
      <router-link to="/hi/hi1">-Hi页面1</router-link> |
      <router-link to="/hi/hi2">-Hi页面2</router-link>
</p>
```

把Hi.vue改成一个通用的模板，加入 `<router-view>` 标签，给子模板提供插入位置
“Hi页面1”   和 “Hi页面2”  都相当于“Hi页面”的子页面
** 坑 vue模板只能有一个根对象 需要用 div 包裹住 router-view **

```bash
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <router-view class="aaa"></router-view>
  </div>
</template>

<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am JSPang'
    }
  }
}
</script>
<style scoped>

</style>
```
在components目录下新建两个组件模板 Hi1.vue 和 Hi2.vue

新建的模板和Hi.vue没有太多的差别，知识改变了data中message的值，也就是输出的结果不太一样了。


```bash
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am Hi1!'
    }
  }
}
</script>
<style scoped>

</style>
```

修改router/index.js代码
改变我们的路由配置文件就可以了。子路由的写法是在原有的路由配置下加入children字段。
```js
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path:'/hi',
      component:Hi,
      children:[
        {path:'/',component:Hi},
        {path:'hi1',component:Hi1},
        {path:'hi2',component:Hi2},
      ]
    }
  ]
})
```
需要注意的是，在配置路由文件前，需要先用import引入Hi1和Hi2。
小坑注意，子路由 不用带 `/`

## 传参
用name传递参数

1. 在路由文件src/router/index.js里配置name属性。
```js
routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
 ]
```

2. 模板里(src/App.vue)用$router.name的形势接收，比如直接在模板中显示：
注意这里是 `route` 不是 `router`
```js
<p>{{ $route.name}}</p>
```

通过<router-link> 标签中的to传参
> 多数传参是不用name进行传参的，我们用 `<router-link>` 标签中的 `to` 属性进行传参，需要您注意的是这里的to要进行一个绑定，写成 `:to`

```js
<router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
```
这里的to前边是带冒号的，然后后边跟的是一个对象形势的字符串.

- name：就是我们在路由配置文件中起的name值。
- params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。

修改 src/App.vue 里的 `<router-link>` 标签
```js
<router-link :to="{name:'hi1',params:{username:'windy'}}">Hi页面1</router-link>
```

把src/reouter/index.js文件里给hi1配置的路由起个name,就叫hi1.
```js
 {path:'/hi1',name:'hi1',component:Hi1},
```
最后在模板里(src/components/Hi1.vue)用$route.params.username进行接收.
```js
{{$route.params.username}}
```
## 单页面多路由区域操作
在一个页面上调用多个 `<router-view></router-view>` 并控制所显示的内容。使用 `name` 来区分。

src/App.vue
```js
<router-view></router-view>
<router-view name="left" class="leftbox"></router-view>
<router-view name="right" class="rightbox"></router-view>
```
新建所需的组件 left.vue right1.vue right2.vue 并在 router/index.js 中导入

`components` 中定义各 `router-view` 的显示内容 `routerViewName:componentName`

> 坑 component  注意加

src/router/index.js

```js
export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    components: {
      left:Left,
      right:Right1
    }
  },
  {
    path: '/r1',
    name: 'HelloWorld',
    components: {
      left:Left,
      right:Right2
    }
  }
]
})
```
## 通过url传参
在 src/router/index.js 中的 path 上添加参数绑定 `path: '/路径/:参数1/:参数2',`

```js
{
    path: '/r1/:newsTit/:newsContent',
    name: 'r1',
    components: {
      left:Left,
      right:Right2
    }
}
```
在 App.vue router-link 中加入要传递的参数

```
<router-link to="/r1/新闻标题/新闻内容">page1</router-link>
```

在组件中 使用 {{ $route.params.参数 }} 接收

```
<div class="tit">{{ $route.params.newsTit }}</div>
<div class="content">{{ $route.params.newsContent }}</div>
```

使用正则来限制出入参数的形式。若参数不符则页面不会显示

```
path:'/params/:newsId(\\d+)/:newsTitle',
```

## 重定向
src/router/index.js
```
{
    path: '/redi',
    redirect:'/'
}
```
带参数的重定向
```
 {
    path: '/redip/:newsTit/:newsContent',
    redirect:'/r1/:newsTit/:newsContent'
 }
```

## 别名
`alias:'path'` 别名的路径可以显示到 url 上，但重定向只是显示重定向后的源地址

src/router/index.js

```
{
    path: '/r1/:newsTit/:newsContent',
    name: 'r1',
    alias:'/aliaslink/:newsTit/:newsContent',
    components: {
      left:Left,
      right:Right2
    }
  },
```

## 路由过渡动画
给要添加动画的 router-view 包裹一个 transition 标签
```
<transition name="ani" mode="out-in">
        <router-view name="right" class="rightbox"></router-view>
</transition>

```

添加 css 样式

```
.ani-enter{
  opacity:0;
}
.ani-leave{
  opacity: 1;
}
.ani-enter-active{
  transition: opacity .5s;
}
.ani-leave-active{
  opacity: 0;
  transition:opacity .5s;
}
```

- name: 过渡动画的css前缀
  - ani-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。
  - ani-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。
  - ani-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。
  - ani-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。
- mode: 过度模式
  - in-out:新元素先进入过渡，完成之后当前元素过渡离开。
  - out-in:当前元素先进行过渡离开，离开完成后新元素过渡进入。

> 别名或重定向的 view 切换无法触发动画，另外 transition 只能包含一个组 router-view

# 404
如果用户输入的路径在 router 中没有定义，展示该页面

在 src/componets 下新建 Error.vue 组件

在 src/router/index.js 中导入 routes 中定义

src/router/index.js
```
{
    path: '*',
    component: Error
}
```

# URL Mode
在 src/router/index.js 中定义
- mode: 'hash' : url 中带 #
- mode: 'hhistory' : url 中不带＃ 默认值

src/router/index.js
```
export default new Router({
  mode: 'history',
  routes: [{
    ....
```

## 路由配置文件中的钩子

src/router/index.js
```
 {
    path:'/hook',
    name:'hook',
    component:Hook,
    beforeEnter:(to, from,  next)=>{
      console.log(to)
      console.log(from)
      next()
    }
  },
```
- to:路由将要跳转的路径信息，信息是包含在对像里边的。
- from:路径跳转前的路径信息，也是一个对象的形式。
- next:路由的控制参数，常用的有next(true)和next(false)。注意：不写 next() 将导致页面不加载

## 组件中的钩子函数

组件中可以使用两个钩子函数
- beforeRouteEnter：在路由进入前的钩子函数。
- beforeRouteLeave：在路由离开前的钩子函数。

src/components/Com_Hook.vue
```
export default {
  name: "Com_Hook",
  data() {
    return {
      msg: "This is my vue Hook 请查看控制台"
    };
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("准备进入模板")
    next()
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开模板")
    next()
  }
};
```

## 编程式导航
- this.$router.go(-1) 后退
- this.$router.go(1) 前进
- this.$router.push('/') 跳转的相应的路径

src/App.vue

```
...
<template>
<div>
        <button @click="goBack">后退</button>
        <button @click="goNext">前进</button>
        <button @click="goHome">首页</button>
</div>
</template>

...
<script>
export default {
  name: "App",
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    goNext(){
      this.$router.go(1)
    },
    goHome(){
      this.$router.push('/')
    }
  }
};
</script>
...
```

# vuex
## 安装vuex
```
cnpm i vuex --save
```
--save 是因为vuex是要在生产环境调用的

在 src 下新建数据仓库 src/vuex/store.js

src/vuex/store.js
```js
//引入 vue 和 vuex
import Vue from "vue"
import Vuex from "vuex"

//使用 vuex
Vue.use(Vuex)

//state
const state={
    count: 3
}

//mutations
const mutations = {
    add(state){
        state.count ++
    },
    cut(state){
        state.count --
    }
}

//导出 state 和 mutations
export default new Vuex.Store({
    state,mutations
})

```

在 组件中使用
src/component/count.vue
``` html
<template>
    <div>
        <h3>{{ msg }}</h3>
        <div>{{ $store.state.count }}</div>
        <button @click="$store.commit('add')">加</button>
        <button @click="$store.commit('cut')">减</button>
    </div>
</template>

<script>
    import store from '@/vuex/store'
    export default {
        data() {
            return {
                msg: 'Hello Vuex'
            }
        },
        store
    }
</script>
```
使用需先导入  `import store from '@/vuex/store'`

并写入到 export default 中

调用
- 数据 ` $store.state.count`
- 方法 `$store.commit('add')` 注意括号中要加引号

## 简化state的调用
src/component/count

1. 方法一
```js
computed: {
    count() {
      return this.$store.state.count;
    }
  }
```
computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值。

2. 方法二
> 注意这里 要带{ }
```js
import {mapState} from 'vuex'

computed:mapState({
        count:state=>state.count
 })
```

3. 方法三 这种方法最简单
```js
import {mapState} from 'vuex'
computed:mapState(["count"])
```

使用以上三种方法就可以在 template 中直接调用 {{count}} 了

## mutations 修改状态
1. 传参

store.js
```js
const mutations={
    add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count--;
    }
}
```
count.vue
```js
<button @click="$store.commit('add',10)">+</button>
```

2. 简化调用方式

count.vue
```html
import { mapState,mapMutations } from 'vuex';

<button @click="reduce">-</button>
<button @click="add(10)">-</button>

<script>
 methods:mapMutations([
        'add','reduce'
]),
</script>
```
## getters过滤器

src/vuex/store.js
```js
const getters = {
    count:(state)=> state.count +=100
}

export default new Vuex.Store({
    state,mutations,getters
})
```

src/component/count.vue
```js
  computed: {
      ...mapState(["count"]),
      ...mapGetters(['count'])
  },

```
> ...为 es6 的扩展运算符

## actions异步修改状态
actions和之前讲的Mutations功能基本一样，不同点是，actions是异步的改变state状态，而Mutations是同步改变状态。

在store.js中声明actions
actions是可以调用Mutations里的方法的，我们还是继续在上节课的代码基础上进行学习，在actions里调用add和reduce两个方法。

```js
const actions ={
    addAction(context){
        context.commit('add',10)
    },
    reduceAction({commit}){
        commit('reduce')
    }
```
在actions里写了两个方法addAction和reduceAction，在方法体里，我们都用commit调用了Mutations里边的方法。细心的小伙伴会发现这两个方法传递的参数也不一样。

context：上下文对象，这里你可以理解称store本身。
{commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。
模板中的使用
我们需要在count.vue模板中编写代码，让actions生效。我们先复制两个以前有的按钮，并改成我们的actions里的方法名，分别是：addAction和reduceAction。

```html
<p>
  <button @click="addAction">+</button>
  <button @click="cutAction">-</button>
</p>
```
改造一下我们的methods方法，首先还是用扩展运算符把mapMutations和mapActions加入。

```js
methods:{
    ...mapMutations([
        'add','cut'
    ]),
    ...mapActions(['addAction','cutAction'])
},
```
你还要记得用import把我们的mapActions引入才可以使用。

增加异步检验
我们现在看的效果和我们用Mutations作的一模一样，肯定有的小伙伴会好奇，那actions有什么用，我们为了演示actions的异步功能，我们增加一个计时器（setTimeOut）延迟执行。在addAction里使用setTimeOut进行延迟执行。

```js
setTimeOut(()=>{context.commit(cut)},3000);
console.log('我比reduce提前执行');
```
我们可以看到在控制台先打印出了‘我比reduce提前执行’这句话。

## modue模块组
声明模块组：
在vuex/store.js中声明模块组，我们还是用我们的const常量的方法声明模块组。代码如下：

```js
const moduleA={
    state,mutations,getters,actions
}
```

声明好后，我们需要修改原来 Vuex.Stroe里的值：

```js
export default new Vuex.Store({
    modules:{a:moduleA}
})
```
在模板中使用
现在我们要在模板中使用count状态，要用插值的形式写入。

```html
<h3>{{$store.state.a.count}}</h3>
```
如果想用简单的方法引入，还是要在我们的计算属性中rutrun我们的状态。写法如下：

```js
computed:{
    count(){
        return this.$store.state.a.count;
    }
},
```
