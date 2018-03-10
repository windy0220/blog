---
title: Hexo 踩坑日志
date: 2017-08-09 09:19:32
tags: Hexo
banner: /images/banner_20170809.jpg
thumbnail: /images/banner_20170809.jpg

---
这里记录在使用Hexo中踩到的坑。
今天在发布文章的时候发现发不出来，明明在source\_posts里有md文件，hexo g 生成后，首页却不显示。
<!-- more -->
仔细翻阅发布时显示的日志发现一处错误
```bash
ERROR Process failed: _posts/Homestead.md
YAMLException: can not read a block mapping entry; 
a multiline key may not be an implicit key at line 4, column 7:
```
原来在 tags 的冒号后边需要有空格才行，没有空格就会出错。加上空格，发布成功！
