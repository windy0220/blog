---
title: javascript高级程序设计-阅读笔记
date: 2018-03-28 22:39:09
tags: js
---

仅记录个人认为的重点内容 持续更新
<!-- more -->

#### 第一章 javascript 简介
javascript 由以下三部分组成
- ECMAScript
- DOM
- BOM 

ECMAScript 由以下组成
- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 对象

DOM
- 视图，事件，样式，遍历和范围 

BOM
- 弹出新浏览器窗口
- 移动、缩放、关闭浏览器窗口
- 提供浏览器详细信息的 navigator 对象
- 提供浏览器所加载页面的详细信息的 location 对象
- 提供用户显示器分辨率详细信息的 screen 对象
- 对 cookies 的支持
- 像 XMLHttpReqquest 和 IE 的 ActiveXobject 这样的自定义对象 

#### 第二章 HTML中使用 javascript
\<script\> 属性
- async 异步加载 `<script async  src="exampel.js"></script>`
- defer 延迟加载 `<script defer="defer"  src="exampel.js"></script>`
- type `text/javascript`

\<noscript\> 元素
如果浏览器不支持脚本或被禁用将显示其中的内容
```
<noscript>
 <p>需要浏览器支持 javascript </p>
</noscript>
```

#### 第三章 基本概念
- 区分大小写
- 标识符
    - 第一个字符 字母 下划线 美元符号
    - 字母 下划线 美元符号 和 数字
- 语句
    - 一般不建议省略分号
    - if 语句中建议使用 代码块 \{\}
- 变量
    - 声明一个变量 若未赋值，那么该变量会有一个特殊的值 undefined
    - 不推荐通过赋值改变变量的数据类型，但这是有效的
    - 在函数内 var 一个变量，退出函数后会被销毁。如果不使用 var 那么将是一个全局变量
    - 一次声明多个变量 `var message="hi", age`
- 数据类型
    - 基本数据类型 Undefined Null Boolean Number String
    - 复杂数据类型 Object
- typeof 操作符
    - 使用 typeof(message) 或 typeof message 可返回 message 的数据类型
    - undefined 如果值未定义
    - boolean 如果是布尔值
    - string 如果是字符串
    - number 如果是数值
    - object 如果是对象或 null *注意 null也是个对象*
    - function 如果值为一个函数 
- Undefined
    - 如果声明了一个变量未赋值那么是 undefined ，如果没有声明就调用 会报错
    - 未初始化的变量和声明未赋值的变量执行 typeof 操作符都会返回 undefined
- Null
    - null 值表示一个空对象指针 所以null 在执行 typeof 的时候会返回 object
    - 要定义 对象 可以初始化为 null
    - undefined 派生自 null 所以 undefined == null 但 undefined === null 为 false
- Boolean
    - String 非空字符串 为 true; ""空字符串 为 false
    - Number 任何非零数值包括无穷大 为 true; 0 和 NaN 为 false
    - Object 任何对象 为 true ; null 为 false
    - Undefined 为 false
- Number
    - 可使用 十进制 八进制 十六进制
    - 无效的八进制将会去掉 第一位的 0 并被当作 十进制
    - 浮点 .1 有效但不推荐
    - 会舍弃小数点后无意义的值 如1.0 为 1
    - 浮点计算精度问题 0.1+0.2 = 0.30000000000000004 (IEEE754 数值浮点计算通病)
    - 最大值 Number.MAX_VALUE 最小值 Number.MIN_VALUE
    - 超过最大值 为Infinity 正无穷；超过最小值 为  -Infinity 负无穷； ifFinite() 若为 true 则说明数值在范围之内
    - NaN == Nan 为 false ; 与NaN计算都为 NaN 如 NaN/10 为 NaN
    - isNaN() 尝试将参数转会数值再判断 “10” 可转换为 10； “blue” 不能转换为数值 ； true 可转换为 1；false 转换为 0
    - 数值转换 