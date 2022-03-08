
#### 配置新的环境

**使用node 12 要不然生成的文件是空的**

```bash
npm install -g hexo-cli
git clone git@git.oschina.net:windy0220/bigma.cc.git
npm install
#npm install hexo-deployer-git
# 注意不需要hexo init
```


#### 写作

```bash
hexo new post_name #新建博文
hexo new page page_name #新建页面
```

#### 编译部署

```bash
hexo clean #清空public目录
hexo generate #生产静态文件
hexo server #创建本地服务器 
hexo deploy #部署网站
```
自动部署到服务器的原理
该项目有两个分支
- master分支是源码
- public 分支是部署文件

当执行 `hexo deploy` 的时候自动推送 public 分支到git平台，https://windy.pub https://windy0220.github.io

jenkins在配置低的服务器上总挂，现在手动上传 public 下的文件到主站的服务器上

<del>同过平台的webhooks访问服务器上的 pull.php 文件，该文件执行一个 pull.sh 脚本文件，该脚本会在，项目目录里执行 `git pull` 操作</del> 




