---
title: Git常用命令
date: 2018-03-14 22:19:32
tags: Git

---
Git 一些常用命令，备忘录
<!-- more -->
#### 设置全局信息
```bash
git config --global user.name "name"
git config --global user.email "ex@mail.com"
```
#### 创建一个git仓库
```bash
git init
# 创建一个裸仓库
git init --bare 
```
#### 添加远程仓库
```bash
git remote add origin git@github.com:windy0220/vuePos.git
```


#### 克隆
```bash
$ git clone git@github.com:windy0220/vuePos.git
# 克隆到制定文件夹 localFolder
$ git clone git@github.com:windy0220/vuePos.git localFolder
```

#### 提交一个版本
```bash
# 添加到暂存
git add -A
# 提交版本
git commit -m "版本说明"
# 推送到仓库
git push
# 分支推送
git push [远程主机名] [本地分支]:[远程分支]
```

#### 获取状态
```bash
git status
# 简略状态
git status -s
# 暂存文件与未暂存文件对比
git diff
# 暂存文件与已提交的版本文件对比
git diff --staged
```

#### 查看历史记录
```bash
# 列出所有更新
git log
# -p显示每次提交的内容差异 -2显示最近两次提交
git log -p -2
# 显示简略统计
git log --stat
# 更好看的格式
git log --pretty=oneline/short/full/fuller
# 定制要显示的记录格式
git log --pretty=format:"%h - %an, %ar : %s"
# 展示分支合并历史
git log --pretty=format:"%h %s" --graph
```

#### 分支
```bash
#查看远程分支 
git branch -r
#查看本地分支
git branch
#创建本地分支 
git branch 分支名称
#分支推送        
git push origin 分支名称
#切换分支       
 git checkout 分支名称
#删除本地分支 强制删除用 -D
git branch -d 分支名称 
#合并分支 先要切换到主分支，然后合并
git merge 次分支名称
# 在本地新建分支，并自动切换到该本地分支，本地分支会和远程分支建立映射关系(可以使用 git pull)
git checkout -b 本地分支 origin/远程分支
# 本地新建分支，但是不会自动切换到该本地分支，需要手动checkout，本地分支不会和远程分支建立映射关系
git fetch origin 远程分支:本地分支
# 建立本地分支与远程分支的映射关系
git branch -u origin/addFile
# 取消本地分支与远程分支的映射关系
git branch --unset-upstream
# 查看映射关系
git branch -vv
```

#### 返回之前的版本
```bash
# HEAD为当前版本 上个版本为HEAD^ 上上个版本为HEAD^^ 上100个版本 HEAD~100 或使用 commit_id
git reset --hard HEAD/commit_id 
# 强制push到远程仓库 确保本地代码为最新且没有其他人在push 否则会丢失数据
git push <remote> HEAD --force
# --force可简写
git push -f origin master
```
#### 撤销操作
```bash
# 重新提交
git commit --amend
# 取消暂存
git reset HEAD filename
# 撤销修改，用初始文件覆盖工作目录中已修改的文件
git checkout --filename
# 取消某次提交，只取消commit记录
git reset --soft HEADID
```
#### 删除操作
```bash
# 从暂存区和工作目录移除文件
git rm filename
# 强制从暂存区删除文件
git rm -f filename
# 从git仓库删除文件 但保留在本地磁盘
git rm --cached README
# 从git仓库删除目录 但保留在本地磁盘
git rm -r --cached filePath
# /删除log/目录下的一.log结尾的文件
git rm log/\*.log
# 删除末尾带~的文件
git rm \*~
```

#### 移动改名
```bash
git mv file_from file_to
```

#### 忽略文件
https://github.com/github/gitignore

#### 一些会出现的问题
出现 “warning: LF will be replaced by CRLF in ……”
```bash
 # 设置后删除.git重新建立
git config --global core.autocrlf false
```
