---
title: iis导出导入站点的方法
date: 2018-09-3 22:25:10
tags: iis
---
公司的前端开发需要配置很多的iis站点，还要配置站点的各种虚拟路径，要是换电脑就悲剧了。所以找到了，导出导入站点的办法，减少工作量。
<!-- more -->
使用系统管理员运行cmd

#### 应用池

```bash
# 导出处所有应用池
%windir%\system32\inetsrv\appcmd list apppool /config /xml > c:\apppools.xml
```
```bash
# 导入处所有应用池
%windir%\system32\inetsrv\appcmd add apppool /in < c:\apppools.xml
```

> 这里要注意如果有重名的应用池就会导入失败，所以导入前要先删掉 默认的应用池 比如 DefaultAppPool

#### 站点

```bash
# 导出处所有站点
%windir%\system32\inetsrv\appcmd list site /config /xml > c:\sites.xml
```

```bash
# 导入处所有站点
%windir%\system32\inetsrv\appcmd add site /in < c:\sites.xml
```

> 同样要删掉重名的站点 比如 Default Website

#### 单独导入导出

```bash
# 导出单独应用程序池:
%windir%\system32\inetsrv\appcmd list apppool “应用程序池名称” /config /xml > c:\myapppool.xml

# 导入单独应用程序池:
%windir%\system32\inetsrv\appcmd add apppool /in < c:\myapppool.xml
 
# 导出单独站点:
%windir%\system32\inetsrv\appcmd list site “站点名称” /config /xml > c:\mywebsite.xml 

# 导入单独站点:
%windir%\system32\inetsrv\appcmd add site /in < c:\mywebsite.xml
```

