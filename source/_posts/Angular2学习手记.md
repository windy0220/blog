---
title: Angular2学习手记
date: 2017-03-08 23:23:15
tags: [前端, Angular]
---


#### 安装angular-cli
```bash
npm install -g @angular/cli
```

#### 创建工程
```bash
ng new project
```

#### 启动项目
```bash
ng serve
```

> 打开浏览器访问 http://localhost:4200/ app works!
自动创建了一个模块 项目名称/src/app 修改app.component.ts中的title可自动编译

#### 创建模块
```bash
ng generate component User
#简化
ng g c user
```

#### 目录说明

app/app.component.*
根组件

assets/*
图片等资源

styles.css
全局样式

#### 压缩/预编译
```bash
ng serve --prod --aot
```

#### 编译
```bash
ng build --prod --aot
```

#### 自动化测试
```bash
# 可参照Angularjs1.0版本
ng test
```

#### 模版语法
```bash
<script> 是无效的
<html><body><base>也没有意义
插值 {{}}
```

#### NG2 组件关系
![NG2 组件关系](/images/ng2img1.jpg)

#### 组件数据传递
![组件数据传递](/images/ng2img2.jpg)