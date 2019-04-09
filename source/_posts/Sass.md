---
title: sass 和 compass 安装使用
date: 2018-06-03 23:23:15
tags: [sass, compass]
---

# sass 和 compass 安装使用

#### 下载 Ruby 
https://rubyinstaller.org/downloads/
选择 WITHOUT DEVKIT X64 版本

#### 安装 Ruby
点击安装文件 全部默认项安装，安装完成后跳出一个命令行窗口，ctrl + C 结束即可。
在命令行下输入 ruby -v 检查是否安装成功。

#### 更换 gem 源
```bash
# 1.删除原gem源
gem sources --remove https://rubygems.org/

# 2.添加国内淘宝源
gem sources -a https://gems.ruby-china.com/

# 3.打印是否替换成功
gem sources -l

# 4.更换成功后打印如下
*** CURRENT SOURCES ***
https://ruby.taobao.org/
```

#### 安装 Sass 和 Compass
```bash
gem install sass
gem install compass
```
安装完成后 使用 -v 命令检查是否安装成功
```bash
sass -v
compass -v
​```bash
更新 sass
​```bash
gem update sass
```
#### 编译
```bash
# 单文件转换命令
sass input.scss output.css

# 单文件监听命令
sass --watch input.scss:output.css

# 如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
sass --watch app/sass:public/stylesheets

# 在末尾添加 --style compressed 可将生成的css压缩
sass --watch app/assets/scss/index.scss:app/assets/css/index.css --style compressed

# 其它参数请参考官方文档
```
#### compass 创建项目
```bash
 compass create youProjectName
```
config.rb 为配置文件
其中加入 sourcemap = true 可以生成 map 文件
```bash
#### 编译
compass watch
```
#### 一些问题
- 编译时提示 `Line 123: Invalid GBK character "\xE4"` 

  原因是有中文字符的注释，或是引用的 scss 文件中有中文 
  
  **解决办法：**
  打开  `C:\Ruby25-x64\lib\ruby\gems\2.5.0\gems\sass-3.5.6\lib\sass\engine.rb` 文件
```bash
# 在所有的 `require` 之后添加一句 
Encoding.default_external = Encoding.find('utf-8')

```
注意：路径中的 sass-3.5.6 可能有多个版本 必须都添加才可以


#### 官方文档
Sass http://sass-lang.com/documentation/file.SASS_REFERENCE.html
Compass http://compass-style.org/help/