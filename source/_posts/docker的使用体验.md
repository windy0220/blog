---
title: docker 的使用体验
date: 2018-04-06 22:39:09
tags: docker
---

基于 windows 10 操作系统

#### 下载
> https://www.docker-cn.com/community-edition#/download
 
windows 系统下载 Docker CE for Windows(stable)

安装后可能需要重启。

#### 修改为国内镜像

- windows C:\Users\你的用户名\.docker\daemon.json
- Linux /etc/docker/daemon.json

```js
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

修改后重启 docker 右键通知托盘里的 Docker 图标 选择 Restart 即可

#### 容器介绍
- 一个 image 文件可生成多个 容器实例文件
- image 可继承其他的 image 文件，一般都是继承 image 再添加自己的内容形成自己的 image
- 容器运行后可自动停止，也可持续运行
- 容器停止后容器文件不会被删除
- 容器在各系统上是通用的


#### 常用命令
```bash
# 验证安装
$ docker version
# 或
$ docker info

# 列出本机 image 文件
$ docker image ls

# 删除 image
$ docker image rm [imageName]

# 从仓库抓取 image 以下命令中 library 为组名称，library 为官方默认组，可忽略。
$ docker image pull library/hello-world

# 运行 image 文件 以下命令中 container run 如果本地没有该 image 会自动 pull 该 image 
$ docker container run hello-world

# 列出当前正在运行的容器
$ docker container ls
# 或
$ docker ps

# 列出所有容器，包括已停止运行的容器
$ docker container ls -all
# 或
$ docker ps -a

# 手动终止容器
$ docker container kill [containerID]

# 停止容器
$ docker container stop [containerNAME]

# 删除容器文件
$ docker container rm [containerID]

# 拷贝文件 注意最后的 . 是拷贝到当前目录
$ docker container cp [containerNAME]:/etc/nginx .
```
#### 批量操作命令
```bash
# 停用全部容器
$ docker stop $(docker ps -q)

# 删除全部容器
$ docker rm $(docker ps -aq)

# 停用并删除容器
$ cker stop $(docker ps -q) & docker rm $(docker ps -aq)

# 批量删除名字为 none 的 image
$ docker images|grep none|awk '{print $3 }'|xargs docker rmi

```
####发布 image 命令
```bash
# 登陆 docker
docker login

# 给 image 打上 Tag
docker tag <image> username/repository:tag

# 上传到 Docker Hub
docker push username/repository:tag

# 运行在线的 image
docker run username/repository:tag
```


#### 创建定制的 image
.dockerignore 忽略文件
```bash
.git
node_modules
npm-debug.log
```
Dockerfile
```bash
# 继承官网 node image 版本 8.4
FROM node:8.4

# 当前目录所有文件 拷贝到 image 文件的 /app 目录
COPY . /app

# 指定工作路径为 /app
WORKDIR /app

# 在 /app 目录下，运行 npm install 命令。安装后的依赖将打包进  image 文件
# RUN命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件
RUN npm install --registry=https://registry.npm.taobao.org

# 开放 3000 端口，允许外部连接该端口
EXPOSE 3000

# 容器运行后自动执行的命令
# 指定了CMD命令以后，docker container run命令就不能附加命令了
CMD node demos/01.js
```
创建image
```bash
$ docker image build -t test-demo:0.0.1 .
# -t imageName
# :Tag 标签一般用来表示版本号
# . 路径 . 代表当前路径
```
生成容器
```bash
$ docker container run -p 8000:3000 -it koa-demo /bin/bash
# -p 8000:3000 容器的 3000 端口映射到本机 8000 端口
# -it 容器的 Shell 映射到当前 Shell
# koa-demo image 名字
# /bin/bash 容器启动后，内部第一个执行的命令。这里是启动 Bash
```
#### 创建 Nginx 服务器

```bash
$ docker container run \
  --rm \
  --name mynginx \
  --volume "$PWD/html":/usr/share/nginx/html \
  --volume "$PWD/conf":/etc/nginx \
  -p 127.0.0.2:8080:80 \
  -p 127.0.0.2:8081:443 \
  -d \
  nginx

$ docker container run \
  --rm \
  --name mynginx \
  --volume d:/code/dockerHello:/usr/share/nginx/html \
  -p 127.0.0.2:8080:80 \
  -d \
  nginx

# -d：在后台运行
# -p ：容器的80端口映射到127.0.0.2:8080
# --rm：容器停止运行后，自动删除容器文件
# --name：容器的名字为mynginx
# --volume 目录html，映射到容器的网页文件目录/usr/share/nginx/html 需要在 docker 里设置共享磁盘
```
> 一般容器里的内容不能持久化，需要映射到本地的目录

#### 填坑
- 推荐使用 PowerShell git的Shell 在执行 -ti 命令时会有问题。
- 在 windows 下 容器内的 webpack gulp等构建工具是监测不到文件变化的，Linux 可以，windows下是先虚拟了个 docker 然后 container 是再虚拟一层。

#### docker 的 image 文件在哪？
image 很空间，随便搞搞几个G就出去了。
在 windows 下其实是用 Hyper-V 虚拟的，所以只有一个文件，在以下目录中。
> C:\Users\Public\Documents\Hyper-V\Virtual hard disks


#### 参考文章
http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html