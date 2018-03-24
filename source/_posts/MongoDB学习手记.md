---
title: MongoDB学习手记
date: 2017-05-18 22:27:26
tags: mongodb
---
## 下载

> http://www.mongodb.org/downloads

## 建立数据目录
```
D:\data\db
```

## 运行
cmd 进入mongoDB的bin目录
```
mongod.exe --dbpath d:\data\db
```

## 作为windows服务运行
管理员权限运行
```bash
mongod.exe 
--bind_ip yourIPadress #绑定服务IP，若绑定127.0.0.1，则只能本机访问，不指定默认本地所有IP
--logpath "D:\data\dbConf\mongodb.log" #定MongoDB日志文件，注意是指定文件不是目录
--logappend #使用追加的方式写日志
--dbpath "D:\data\db" #指定数据库路径
--port yourPortNumber #	指定服务端口号，默认端口27017
--serviceName "YourServiceName" #指定服务名称
--serviceDisplayName "YourServiceName" #指定服务名称，有多个mongodb服务时执行。
--install #指定作为一个Windows服务安装。
```
## MongoDB Shell
bin目录下的mongo.exe

```
> mongo
MongoDB shell version: 3.0.6
connecting to: test
……
```

> db命令用于查看当前操作的数据库

## 连接数据库

使用用户名fred，密码foobar登录localhost的baz数据库。

> mongodb://fred:foobar@localhost/baz

## 创建数据库/切换数据库

> use DATABASE_NAME
## 删除当期数据库

> db.dropDatabase()

## 插入文档

col为集合
```
db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```
可将数据定义为一个变量。

## 更新

> db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}}, upsert, multi)

{'title':'MongoDB 教程'} 为查询条件

可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。

可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。

## 删除
```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
query :（可选）删除的文档的条件。
justOne : （可选）如果设为 true 或 1，则只删除一个文档。
writeConcern :（可选）抛出异常的级别。

删除所有数据
> db.col.remove({})

## 查询
查询所有
> db.col.find().pretty()

条件

> db.col.find({"by":"菜鸟教程", "title":"MongoDB 教程"}).pretty()

## 条件操作符
```
(>) 大于 - $gt
(<) 小于 - $lt
(>=) 大于等于 - $gte
(<= ) 小于等于 - $lte
```

likes 大于100的数据

>db.col.find({"likes" : {$gt : 100}}) 

## $type 操作符
|类型	|数字|
|:----|:----|
|Double|	1|	 
|String|	2|	 
|Object|	3|	 
|Array	|4|	 
|Binary data	|5|	 