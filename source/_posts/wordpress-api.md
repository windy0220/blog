---
title: wordpress Rest API 接口
date: 2020-05-04 14:29:03
tags:
---
#### 获取分类
```bash
http://ex.wordpress.com/wp-json/wp/v2/categories/分类id
http://ex.wordpress.com/wp-json/wp/v2/categories?parent=父级分类id
```

#### 获取文章列表
```bash
# 默认10篇
http://ex.wordpress.com/wp-json/wp/v2/posts

# 指定分类
categories=分类id

# 带特色图片和作者信息
_embed=true

# 页码
page=2

# 设置每页返回数量(1~100)
per_page=2

# 偏移
offset=1

```
返回说明
```
# 集合中的记录总数
X-WP-Total

# 包含所有可用记录的总页数
X-WP-TotalPages
```

#### 获取文章
```
http://ex.wordpress.com/wp-json/wp/v2/posts/文章id
```

#### 根据标签获取文章
```
http://ex.wordpress.com/wp-json/wp/v2/posts?tags=标签id
```

#### filter
```
# 指定标签的文章
http://ex.wordpress.com/wp-json/wp/v2/posts?filter[tag]=library

# 指定日期的文章
http://ex.wordpress.com/wp-json/wp/v2/posts?filter[year]=2016&filter[monthnum]=03

# 指定作者的文章
http://ex.wordpress.com/wp-json/wp/v2/posts?filter[author_name]=jinyun

# 随机文章
http://ex.wordpress.com/wp-json/wp/v2/posts?filter[orderby]=rand
```

#### 标签
```
http://ex.wordpress.com/wp-json/wp/v2/tags
http://ex.wordpress.com/wp-json/wp/v2/tags/3
```

#### 媒体
```
http://ex.wordpress.com/wp-json/wp/v2/media
http://ex.wordpress.com/wp-json/wp/v2/media/3
```

#### 页面
```
http://ex.wordpress.com/wp-json/wp/v2/pages
http://ex.wordpress.com/wp-json/wp/v2/pages/3
```

#### 类型
```
http://ex.wordpress.com/wp-json/wp/v2/types
http://ex.wordpress.com/wp-json/wp/v2/types/post
```

#### 评论
```
http://ex.wordpress.com/wp-json/wp/v2/comments
http://ex.wordpress.com/wp-json/wp/v2/comments/2
```

#### 用户
```
http://ex.wordpress.com/wp-json/wp/v2/users
http://ex.wordpress.com/wp-json/wp/v2/users/2
```