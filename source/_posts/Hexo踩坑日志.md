---
title: Hexo 踩坑日志
date: 2017-08-09 09:19:32
tags: Hexo
banner: /images/banner_20170809.jpg
thumbnail: /images/banner_20170809.jpg

---
这里记录在使用Hexo中踩到的坑。
<!-- more -->
#### 1
今天在发布文章的时候发现发不出来，明明在source\_posts里有md文件，hexo g 生成后，首页却不显示。
仔细翻阅发布时显示的日志发现一处错误
```bash
ERROR Process failed: _posts/Homestead.md
YAMLException: can not read a block mapping entry; 
a multiline key may not be an implicit key at line 4, column 7:
```
原来在 tags 的冒号后边需要有空格才行，没有空格就会出错。加上空格，发布成功！

#### 2
```bash
$ hexo g
INFO  Start processing
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/do
cs/troubleshooting.html
Template render error: Error: Unable to call `asset`, which is undefined or falsey
```
我在文章中找到了 一个用双大括号括着的   ```asset("css.css")```  去掉之后就好了。
