---
title: webpack学习手记
date: 2017-06-28 22:22:11
tags: [webpack, 前端打包工具]
---

## 初始化
```
npm init -y
```

生成package.json 文件

注意package.json 中的name 不能为webpack 否则无法安装webpack

## 安装
```
npm install webpack --save-dev
```

## 使用
```
node_modules/.bin/webpack app.js build/index.js

```
将app.js 打包成build/index.js

## 快捷编译

在 package.json 的 scripts 中加入 ```"build": "webpack" ```

就可以使用 ```npm run build``` 命令进行编译了。

使用 ```npm run ``` 可以查看当前可用的命令。

安装 ```html-webpack-plugin``` 可以自动生成一个html并自动引用webpack生产的js文件

## 自动刷新

```javascript
npm install webpack-dev-server --save-dev
```

在package.json 得 script中加入以下脚本
```javascript
"start": "webpack-dev-server --env development",
"build": "webpack --env production"
```
使用 npm run start 可开启一个本地的服务 127.0.0.1:8080 监视文件修改并自动刷新

## 指定WDS的端口
webpack.config.js

```javascript
module.exports = {
    devServer: {
        port: 8081 //端口
    },
    ...
}
```

## eslint代码规范化 package.json
安装
```javascript
npm install eslint --save-dev
```

package.json - scripts
```javascript
"lintjs": "eslint app/ webpack.*.js --cache"
```

.eslintrc.js 配置文件
```javascript
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': 0,
  },
};
```

自动修正
```
npm run lintjs -- --fix
```

## eslint代码规范化 webpack.config.js

安装
```
npm install eslint-loader --save-dev
```

配置 [webpack.config.js - module.exports](https://github.com/ParryQiu/DevOpenClub-Tech-Webpack2/blob/master/009/webpack.config.js)

```javascript
module:{
    rules:[
      {
        test: /\.js$/,
        enforce: 'pre',

        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
    ],
  },
```

将错误抛到浏览器中 webpack.config.js - module.exports - devServer
```
overlay: {
      errors: true,
      warnings: true,
    },
```

## CSS 相关配置
### CSS-loader
处理css中的 @import 和 url()
如果 @import 加载的是外部文件则不会处理

### style-loader
处理 style 标签

### 安装
```
npm install css-loader style-loader --save-dev
```

### 配置 

webpack.config.js - module.exports - module - rules
 
```javascript
{
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                 modules: true,
            },
        },
    ],
},
```

将css导入到入口文件
```
import './style.css';
```

## css作用域
启用css-loader 的 modules 后，可将同样名称的css转为类似hash的得命名以避免冲突

代码可参考 https://github.com/ParryQiu/DevOpenClub-Tech-Webpack2/tree/master/011/app

## css js 分离

因为js在页尾加载，css如果嵌入到js里，会导致页面闪屏，所以要进行分离

### 安装
```
npm install extract-text-webpack-plugin --save-dev
```

### 配置
webpack.config.js
```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true,
});
```
webpack.config.js - module.exports - module - rules

```
{
    test: /\.css$/,
    exclude: /node_modules/,
    use: plugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          fallback : 'style-loader',
    }),
},
```

## loader

### loader顺序
从右到左，从下到上 
Enforcing Order 强制条件加载顺序

### loader配置

webpack.config.js - module.exports - module - rules

一个loader
```
loader: 'loader-name',
options: {},
```
多个loader
```
use: {
loader: 'loader-name',
options: {},
},{
loader: 'loader-name',
options: {},
},
...
```

## 文件压缩

### 检测文件大小

webpack.config.js - module.exports

```
performance: {
    hints: 'warning', // 'error'
    maxEntrypointSize: 100000, // bytes 文本资源超过100kb抛出警告
    maxAssetSize: 450000, // bytes 图像资源超过450kb抛出警告
},
```

### 使用插件压缩 babili-webpack-plugin

安装
```
npm install babili-webpack-plugin --save-dev
```
配置
webpack.config.js
```
const BabiliPlugin = require('babili-webpack-plugin');
```
webpack.config.js - module.exports - plugins
```
new BabiliPlugin(),
```

## SourceMaps 便于断点调试js

配置
webpack.config.js - module.exports
```
devtool: 'source-map',
```

更多devtool https://webpack.js.org/configuration/devtool/#devtool

## 分离打包项目代码与组件代码

配置
``` javascript
const webpack  = require('webpack');

// module.exports

entry: {
    app: PATHS.app,
    vendor: ['react'],
 },
 
// plugins
new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
}),
```

## 使用可视化图表进行统计分析打包过程

pakeage.json - scripts
```
"stats": "webpack --env production --profile --json > stats.json"
```

将目录下生成的stats.json 上传到 webpack.github.io/analyse/

## 配置多页面编译
module.exports
```
entry: {
    index: './app/index.js',
    about: './app/about.js',
    vendor: ['react'],
 },
 ```
 
 ## HMR Hot Module
 
 package.json - scripts
 ```
 "hmr": "webpack-dev-server"
 ```
 webpack.config.js - module.exports - devServer
 ```
 hotOnly: true, //HMR
 ```
 webpack.config.js - module.exports - plugins
 ```
 new webpack.HotModuleReplacementPlugin(), //HMR --hot
 ```
 
 ### HTR interfase
 ```
if(module.hot) {
  // Capture hot update
  module.hot.accept('./library', () => {
    console.log('Accepting the updated library module!');
    Library.log();
  });
}
 ```