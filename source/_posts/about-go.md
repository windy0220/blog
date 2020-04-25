---
title: go/beego 从入门到部署
date: 2020-04-25 00:57:02
tags:
---

#### go get 失败的问题
使用七牛云的中国代理 https://goproxy.cn/
```
$ go env -w GO111MODULE=on
$ go env -w GOPROXY=https://goproxy.cn,direct

# macOs
$ export GO111MODULE=on
$ export GOPROXY=https://goproxy.cn

# windows
C:\> $env:GO111MODULE = "on"
C:\> $env:GOPROXY = "https://goproxy.cn"

```

#### 安装Go
https://golang.google.cn/dl/

```
# 查看版本号
go version

# 查看环境变量
go env
```
vscode 开发可以安装 go的插件

#### 一个Demo

main.go
```golang
package main

import "fmt"

func main() {
	fmt.Println("你好")
}

```

运行
```
go run main.go
```

#### 基本语法
变量定义
```bash
# 变量名称由数字、字母、下划线组成，首个字符不能为数字
var 变量名称 类型 = 值 

# 类型推导
var 变量名称 := 值 

# 一次声明多个变量
var 变量名称,变量名称 类型 //类型一致
var ( //类型不一致
    变量名称 类型
    变量名称 类型
    变量名称 类型
)

# 短变量声明法 只能在函数内部使用，不是全局变量
变量名称 := 值 

# 短变量一次声明多个
变量名称,变量名称,变量名称 := value1, value2, value3

# 匿名变量 用来忽略某些值 ,如果一个函数返回两个值，但只需要一个值的时候可以使用匿名变量 _



```
> 变量定义后必须使用，声明后不赋值则为空

常量
```golang
const pi = 3.14

pi = 2 //error 常量不可改变

// n1 n2 n3 n4 都是100
const (
    n1 = 100
    n2
    n3
    n4
)

// iota
const (
    n1 = iota //0
    n2 //1
    n3 //2
    n4 //3
    _ //跳过
    n5 //5
)

const (
    n1, n2 = iota+1, iota+2 //1 2
    n3, n4 // 3 4
)
```
> go fmt fileName.go 可以格式化代码

数据类型
```golang
// 1 int int8 int16 int32 int64
var num int = 10

// 类型转换 int8 转换成 int16
var num1 int8 = 10
int16(num1)

```

#### 内置函数

打印方法
fmt 包
```
ftm.Println("") //换行打印 
fmt.Print("")      //不换行打印 
fmt.Printf("类型:%T, 值1:%v, 值2:%v", 变量1, 变量2, 变量3) 
// %v 原样输出；%d 10进制输出； %b 2进制输出；%o 8进制 %x 16进制

```

unsafe.Sizeof 可以查看不同长度的整型，在内存中的存储空间
```golang
var a int8 = 99
fmt.Println(unsafe.Sizeof(a))

```


#### 安装beego 及 bee 工具
```
go get -u github.com/astaxie/beego

$ go get -u github.com/beego/bee
```

#### 创建一个API项目

```
bee api projectName
```

正在施工...