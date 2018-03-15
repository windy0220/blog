---
title: 使用纯css实现radio的美化
date: 2018-03-15 16:16:56
tags: [css, radio, input, 美化]
---

很多时候需要对单选和多选经行美化，因为原生太丑了，而且那么小，要是在手机上可不好点。
美化的话你当然可以使用js，但CSS就有简单的办法实现。就是使用“+”这个css选择器即可。
<!-- more -->
css 这个“+”选择器意思是选择同级对象。
比如 div + p 是指 div 后面所有同级的 p 元素，不包含父元素之外的。
相应的还有一个 “>” 选择器，div > p 就是选择div这个父元素里所有的p元素了。

演示链接 https://stackblitz.com/edit/radio-beautiful?file=style.css

index.html
```html
<h1>css input 美化</h1>
<div class="box">
  <input id="ra1" name="a" checked type="radio"><label for="ra1">选择1</label>
</div>
<div class="box">
  <input id="ra2" name="a" type="radio"><label for="ra2">选择2</label>
</div>
```

css
```css
h1, h2 {
  font-family: Lato;
}
body{
  color: #fff;
  font-size: 12px;
}
label{
  display: block;
  width: 50px;
  height: 20px;
  background: red;
  text-align: center;
}
input:checked+label{
  background: green;
}
.box{
  width: 60px;
  height: 40px;
  float: left;
}
```

用到项目中的效果
![](/images/radio.jpg)