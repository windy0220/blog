---
title: 关于javascript中 ++i 与 i++ 的理解
date: 2018-04-11 21:34:21
tags:
---
`++i` 与  `i++` 单独出现的时候并没有什么区别 都是在 i 的基础上 自增 1
如下
```js
let i=1;
i++;
console.log(i);
//i 为 2
let j=1;
++j;
console.log(j)
//j 也为 2
```
在有表达式的情况下
-  `++i` 会先自增1再计算表达式
- `i++` 会先计算表达式的值再自增1
```js
let j=1;
let b = ++j;
console.log(b); //2
console.log(j); //2

let i=1;
let a = i++;
console.log(a); //1
console.log(i); //2
```
可以这么理解
```js
let j=1;
let b = ++j;
//相当于
b = j+1;

let i=1;
let a = i++;
//相当于
a = i;
i = i+1;
```