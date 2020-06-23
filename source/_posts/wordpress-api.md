---
title: 使用wordpress RESTfull API 制作网站的内容管理系统
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

---
## 必备插件
#### WP-China-Yes
安装后可以解除更新和商店的封锁，可以正常更新和安装插件
作者站点 https://www.ibadboy.net/archives/3204.html
git地址 https://github.com/sunxiyuan/wp-china-yes
点击 clone or download 按钮，点击 Download ZIP 既可下载
在wordpress 后台的安装插件处 上传安装。

#### 高级自定义字段
可以给文章扩展自定义字段，可根据条件显示不同的字段

#### Simple Custom Post Order && Post Types Order
文章和栏目拖拽排序，这两个插件必须都安装，才可以实现拖拽排序

#### Admin Menu Editor
自定义后台的菜单目录

#### WP文件管理器
可以管理网站的目录

#### REST API Helper
可以让rest api 显示出 封面图片，作者，类别，和自定义字段

#### OSS Upload
上传图片到阿里云oss

#### forminator
强大的自定义表单插件

#### forminator
强大的自定义表单插件

#### Contact Form 7
表单插件，可支持 REST API
http://www.yourdomain.com[你的域名]/wp-json/contact-form-7/v1/contact-forms/358[表单ID]/feedback

插件只支持发送到邮件，但可以通过 Flamingo 插件保存信息
说明 https://contactform7.com/save-submitted-messages-with-flamingo/
在额外的设置标签下添加 [the-email-field] 为配置中的字段 
```
skip_mail: on
flamingo_email: "[the-email-field]"
flamingo_name: "[the-name-field]"
flamingo_subject: "[the-subject-field]"
```
`skip_mail: on` 为跳过邮件发送
启用插件后，可在目录中找到Flamingo 点击进入收件箱
数据保存在 `wp_postmeta` 表中


#### aliyun-cdn-helper
刷新阿里云的cdn服务
https://github.com/0xJacky/aliyun-cdn-helper
