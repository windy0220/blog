---
title: Git常用命令
date: 2018-03-14 22:19:32
tags: Git

---
Git 一些常用命令，备忘录
<!-- more -->

#### 生成SSH key

```bash
# 这个指令会要求你提供一个位置和文件名去存放键值对和密码，你可以点击3次Enter键去使用默认值
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"

# 输出公钥 也可以判断本地是否有公钥
cat ~/.ssh/id_rsa.pub

# 复制公钥到剪切板，如果不起作用使用上面的命令复制即可
clip < ~/.ssh/id_rsa.pub              #windows
pbcopy < ~/.ssh/id_rsa.pub            #mac
xclip -sel clip < ~/.ssh/id_rsa.pub   #linux

# 测试链接
ssh -T git@gitee.com   #码云
ssh -T git@github.com  #github
# 首次使用需要确认并添加主机到本机SSH可信列表
# Hi XXX! You've successfully authenticated, but Gitee.com does not provide shell access. 表示添加成功

```

#### 设置全局信息

```bash
# 这里的名字会出现在提交记录里，团队合作是最好写真实的名字，方便找人
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

#### stash 操作

使用场景：如果正在进行功能开发，做到一半，这时候需要在别的分支上修改bug又不想提交，可以使用stash将当前的修改的内容隐藏起来。

```bash
# 将修改的内容隐藏
git stash
# 显示隐藏的列表
git stash list
# 恢复最后隐藏的那些内容并在saash列表中删除
git stash pop

# 恢复stash 只有一个时可以省略 stash@{0}
git stash apply stash@{0}
# 删除stash
git stash drop stash@{1}
```



#### 忽略文件

https://github.com/github/gitignore

#### 一些会出现的问题
出现 “warning: LF will be replaced by CRLF in ……”
```bash
 # 设置后删除.git重新建立
git config --global core.autocrlf false
```
