---
title: GitHug 通关指南
date: 2018-06-18 11:44:46
tags:
  - Git
category: 工程师素养
---

# 前言
GitHug是一个帮助Git用户提升Git使用技能的工具。Git初学者可以通过GitHug提升自己的技能。
> 说明：使用GitHug时，每完成一步，执行一次`githug`命令，GitHug会自动检测上一步是否被正确完成。如果正确完成，就会提示通过并自动跳到下一步；如果错误完成，将会显示报错信息。如果你不懂如何正确完成这一步，执行`githug hint`使GitHug显示提示信息。必要时可以参阅下文中的附加链接。

# 通关指南

#### 1. init
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
No githug directory found, do you wish to create one? [yn]  y
Welcome to Githug!

Name: init
Level: 1
Difficulty: *

A new directory, `git_hug`, has been created; initialize an empty repository in it.
```
在建立一个Git空仓库时，我们要做的第一步就是初始化这个仓库。在Git中初始化仓库使用的是`git init`命令。GitHug将会在执行目录下新建一个名为`git_hug`的目录：
```bash
cd git_hug
git init
```

#### 2. config
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: config
Level: 2
Difficulty: *

Set up your git name and email, this is important so that your commits can be identified.
```
初始化仓库之后，我们就应该对Git的一些基本信息进行一些配置，这样可以使日后commit的信息更具体。因此这么做更有利于维护操作的规范性和团队协作的便捷性。我们最常用的两个config选项是`user.email`和`user.name`
```bash
git config user.email i@lenconda.top
git config user.name lenconda
```
执行完上述命令后，执行一次`githug`，将你刚才设置的用户名和邮件地址按照提示作答即可。

**「请参阅」**
> 1. [.5 起步 - 初次运行 Git前的配置](https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)
> 2. [git config命令](https://www.yiibai.com/git/git_config.html)

**如果需要进行全局配置而不是项目内的配置，请使用`--global`选项。**

#### 3. add
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
What is your name? foo
What is your email? foo@foo.foo
Your config has the following name: foo
Your config has the following email: foo@foo.foo
Congratulations, you have solved the level!

Name: add
Level: 3
Difficulty: *

There is a file in your folder called `README`, you should add it to your staging area
Note: You start each level with a new repo. Don't look for files from the previous one.
```
Git是一种版本控制的文件系统，所以文件操作是不可避免的。通常，我们需要将项目中未跟踪的文件添加进来，并使其进入commit状态时，需要使用`git add`命令。
```bash
git add README
```
但这仅仅只是跟踪了一个文件，我们通常使用`git add .`或`git add -A`（更推荐后者）来跟踪当前项目中所有未跟踪的文件。

**「请参阅」**
> 1. [git add详解](http://hubingforever.blog.163.com/blog/static/171040579201231110371044/)
> 2. [git add -A 和 git add .的区别](https://www.cnblogs.com/skura23/p/5859243.html)
> 3. [git add命令添加所有改动内容](http://outofmemory.cn/code-snippet/37444/git-add-all-modified-files-folders)

#### 4. commit
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: commit
Level: 4
Difficulty: *

The `README` file has been added to your staging area, now commit it.
```
当我们跟踪了所有文件之后，我们就要在合适的时机将这些文件中的改变提交给Git仓库。这被称为一个`commit`。我们将使用`git commit`命令提交commit。
```bash
git commit -m 'commit README'
```
这便是我们常规的做法。`-m`选项用于给这个commit附上commit信息，**这是必需的**。如果不使用这个选项，Git将会打开一个Vim编辑器，你需要在编辑器中填写相关的commit信息，保存退出即可。
通常来说，commit信息在团队协作中是十分重要的，因此原则上**严禁提交无意义的commit**。关于如何提交有意义的commit，以及相关的原则，可以参阅本节参阅列表。

**「请参阅」**
> 1. [2.2 Git 基础 - 记录每次更新到仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)
> 2. [Commit message 和 Change log编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
> 3. [Git commit message和工作流规范](https://ivweb.io/topic/58ba702bdb35a9135d42f83d)
> 4. [如何写好 Git commit log?](https://www.zhihu.com/question/21209619)

#### 5. clone
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: clone
Level: 5
Difficulty: *

Clone the repository at https://github.com/Gazler/cloneme.
```
我们不可能同时在远程仓库中进行开发（这也不是Git的设计理念），因此，当我们想要加入一个项目的开发时，应该将远程仓库clone到本地进行开发。
```bash
git clone https://github.com/Gazler/cloneme
```

#### 6. clone_to_folder
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: clone_to_folder
Level: 6
Difficulty: *

Clone the repository at https://github.com/Gazler/cloneme to `my_cloned_repo`.
```
克隆项目到指定的目录。
```bash
git clone https://github.com/Gazler/cloneme my_cloned_repo
```

#### 7. ignore
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: ignore
Level: 7
Difficulty: **

The text editor 'vim' creates files ending in `.swp` (swap files) for all files that are currently open.  We don't want them creeping into the repository.  Make this repository ignore those swap files which are ending in `.swp`.
```
并不是所有到文件都应该被提交到仓库中，例如VSCode、JetBrains之类的编辑器会生成个人配置文件，macOS也会生成.DS_Store的文件，NodeJS会在项目根目录中的node_modules保存依赖。我们并不希望这些文件被提交到远程仓库中。因此，Git提供了一个.gitignore文件，通过将不想提交的文件和目录写入该文件中可以避免这些文件被提交的远程仓库中。
.gitignore文件中可以使用正则表达式匹配。
```
# .gitignore 中的内容应该是这样的
.profile.yml
.gitignore
*.swp
```

**「请参阅」**
> 1. [忽略特殊文件](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758404317281e54b6f5375640abbb11e67be4cd49e0000)

#### 8. include
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: include
Level: 8
Difficulty: **

Notice a few files with the '.a' extension.  We want git to ignore all but the 'lib.a' file.
```
这一步承接上一步，既然有排除，就有可能有例外的情况。例如整个项目里除了`README.md`之外，其他的`*.md`都应该被忽略，我们就应该使用这种方法将README.md文件添加进白名单中。
```
.profile.yml
.gitignore
*.a
!lib.a
```

**「请参阅」**
> 1. [Git - Include and Exclude by .gitignore](https://www.drupal8.ovh/en/tutoriels/112/git-include-and-exclude-by-gitignore)
> 2. [.gitignore 规则写法 - 在已忽略文件夹中不忽略指定文件、文件夹【注意项】](https://my.oschina.net/longyuan/blog/521098)

#### 9. status
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: status
Level: 9
Difficulty: *

There are some files in this repository, one of the files is untracked, which file is it?
```
当我们想要知道自己的Workspace中有哪些文件或目录未被跟踪、被修改、被删除、新增等，使用`git status`命令可以清楚地看见。
```bash
➜  git_hug git:(master) ✗ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   Guardfile
	new file:   README
	new file:   config.rb
	new file:   deploy.rb
	new file:   setup.rb

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	database.yml
```
再执行`githug`，按照提示填写答案即可。

#### 10. number_of_files_committed
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
What is the full file name of the untracked file? database.yml
Congratulations, you have solved the level!

Name: number_of_files_committed
Level: 10
Difficulty: *

There are some files in this repository, how many of the files will be committed?
```
这一步几乎没什么难度，使用`git status`命令列出需要commit的文件，然后数出来就行了。
```bash
➜  git_hug git:(master) ✗ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   rubyfile1.rb
	modified:   rubyfile4.rb

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   rubyfile5.rb

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	rubyfile6.rb
	rubyfile7.rb
```
输入标绿项目个数即可通关。

#### 11. rm
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
How many changes are going to be committed? 2
Congratulations, you have solved the level!

Name: rm
Level: 11
Difficulty: **

A file has been removed from the working tree, however the file was not removed from the repository.  Find out what this file was and remove it.
```
这一步将从仓库中删除文件。
```bash
# 从git status命令得到将要删除的文件名
git rm deleteme.rb
```

**「请参阅」**
> 1. [git rm命令 - 删除文件-廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758392816224cafd33c44b4451887cc941e6716805c000)
> 2. ["git rm" 和"rm" 的区别-yang3wei的专栏](http://yang3wei.github.io/blog/2013/02/03/git-rm-he-rm-de-qu-bie/)

#### 12. rm_cached
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: rm_cached
Level: 12
Difficulty: **

A file has accidentally been added to your staging area, find out which file and remove it from the staging area.  *NOTE* Do not remove the file from the file system, only from git.
```
如果我们希望只删除仓库中的文件，而不将操作映射到文件系统中，那么我们应该在上一关的基础上加一个`--cached`选项。
```bash
git rm deleteme.rb --cached
```

**「请参阅」**
> 1. [git rm与git rm --cached - 简书](https://www.jianshu.com/p/337aeafc2f40)
> 2. [git rm --cache忽略已经提交的文件和如何恢复-CSDN博客](https://blog.csdn.net/u013066244/article/details/78793937)

#### 13. stash
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: stash
Level: 13
Difficulty: **

You've made some changes and want to work on them later. You should save them, but don't commit them.
```
当我们在某个分支中进行了一些修改，又想在这个时候签出（checkout）到另一个分支中。但是，git并不允许这么操作——除非你强行签出——但这将会放弃你在原来的分支中做的一切更改。为了避免这一情况我们应该使用`git stash`命令来暂时保存这些修改。
```bash
➜  git_hug git:(master) ✗ git stash
Saved working directory and index state WIP on master: 0206059 Add some lyrics
```

**「请参阅」**
> 1. [.3 Git 工具 - 储藏（Stashing）](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%82%A8%E8%97%8F%EF%BC%88Stashing%EF%BC%89)
> 2. [使用git stash命令保存和恢复进度-CSDN博客](https://blog.csdn.net/daguanjia11/article/details/73810577)

#### 14. rename
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: rename
Level: 14
Difficulty: ***

We have a file called `oldfile.txt`. We want to rename it to `newfile.txt` and stage this change.
```
这一步是重命名仓库中文件。
```bash
git mv oldfile.txt newfile.txt
```

**「请参阅」**
> 1. [Git：Git文件删除、恢复、重命名（rm/git rm，mv/git mv - CSDN博客](https://blog.csdn.net/p106786860/article/details/52023885)
> 2. [git-重命名文件和文件夹-CSDN博客](https://blog.csdn.net/shenwanjiang111/article/details/78776191)
> 3. [git重命名文件和文件夹- 看风景就-博客园](http://www.cnblogs.com/mengff/p/6365812.html)

#### 15. restructure
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: restructure
Level: 15
Difficulty: ***

You added some files to your repository, but now realize that your project needs to be restructured.  Make a new folder named `src` and using Git move all of the .html files into this folder.
```
重新组织仓库中的某些文件。这一步用到了上一步的知识点，通过`git mv`命令重新组织源文件结构。
```bash
mkdir src
git mv *.html src
```
到这里为止，使用Git管理Git文件系统已经差不多掌握了。我们能发现，其实Git处理文件系统操作的命令几乎和EXT3/EXT4等文件系统的操作方式一模一样。了解这些操作有利于掌握Linux文件系统的操作。

#### 16. log
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: log
Level: 16
Difficulty: **

You will be asked for the hash of most recent commit.  You will need to investigate the logs of the repository for this.
```
`git log`是一个常用的命令。它能帮助我们定位某一个commit，并告诉我们每条commit对应的hash。
```bash
git log
```
Git将会显示出一个commit，复制这个commit的hash，即为答案。

**「请参阅」**
> 1. [Git 查看提交历史\| 菜鸟教程](http://www.runoob.com/git/git-commit-history.html)
> 2. [git log命令全解析，打log还能这么随心所欲！ - 赛艇队长-博客园](https://www.cnblogs.com/bellkosmos/p/5923439.html)

#### 17. tag
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
What is the hash of the most recent commit? ceaaa51ad379466a167ea00d9aa426adc6f453c8
Congratulations, you have solved the level!

Name: tag
Level: 17
Difficulty: **

We have a git repo and we want to tag the current commit with `new_tag`.
```
tag用于针对某个commit之后的时间点所在的版本添加相应的标签。tag经常用于版本发布。
```bash
git tag 'new_tag'
```
**「请参阅」**

> 1. [Git 中tag的用法（打tag、删除tag等）](https://blog.csdn.net/ShorewB/article/details/52447215)
> 2. [git命令之git tag给当前分支打标签](https://blog.csdn.net/wangjia55/article/details/8793577)

#### 18. push_tags
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: push_tags
Level: 18
Difficulty: **

There are tags in the repository that aren't pushed into remote repository. Push them now.


From /var/folders/_w/2d1v6tdn2md_1p8h0271w3q80000gn/T/d20180601-12051-1kxh5hq/
 * [new branch]      master     -> origin/master
```
既然打好了tag，自然要push到远程仓库中。
```bash
git push origin master
```

#### 19. commit_amend
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: commit_amend
Level: 19
Difficulty: **

The `README` file has been committed, but it looks like the file `forgotten_file.rb` was missing from the commit.  Add the file and amend your previous commit to include it.
```
当我们在某次commit中遗漏了某些文件或目录，就可以通过`--amend`选项将遗漏的文件或目录合并到同一次commit中。
```bash
git add forgotten_file.rb
git commit --amend
```

#### 20. commit_in_future
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: commit_in_future
Level: 20
Difficulty: **

Commit your changes with the future date (e.g. tomorrow).
```
题目要求控制时间。
```bash
git commit --date='2018-06-02 00:00:00' -m 'commit on tomorrow'
```
到这里，commit有关的知识点基本上已经结束了。commit操作是Git操作中最重要的组成部分之一。学好commit直接影响到团队协作的质量与安全性。所以学会commit是精通Git的必经之路。

**「请参阅」**
> 1. [1. commit --amend【教程3 改写提交！】](https://backlog.com/git-tutorial/cn/stepup/stepup7_1.html)
> 2. [git commit中输入message的几种方式- 简书](https://www.jianshu.com/p/ad461b99e860)
> 3. [git commit -a 命令困惑· Ruby China](https://ruby-china.org/topics/4030)
> 4. [Git 命令参数及用法详解- CSDN博客](https://blog.csdn.net/bigtree_3721/article/details/51840240)

#### 21. reset
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: reset
Level: 21
Difficulty: **

There are two files to be committed.  The goal was to add each file as a separate commit, however both were added by accident.  Unstage the file `to_commit_second.rb` using the reset command (don't commit anything).
```
如果我们不小心弄错了commit的内容，或者想修改某个commit，那我们就应该使用`git reset`命令来重置commit中的某些内容。值得注意的是，我们需要获取想重置代码文件对应的`HEAD`。
```bash
git reset HEAD to_commit_second.rb
```

**「请参阅」**

> 1. [5.2 代码回滚：Reset、Checkout、Revert的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%EF%BC%9AReset%E3%80%81Checkout%E3%80%81Revert-%E7%9A%84%E9%80%89%E6%8B%A9)
> 2. [Git - 重置揭密](https://git-scm.com/book/zh/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86)
> 3. [版本回退- 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000)
> 4. [Git Book 中文版- Git的撤消操作- 重置,签出和撤消](http://gitbook.liuhui998.com/4_9.html)

#### 22. reset_soft
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: reset_soft
Level: 22
Difficulty: **

You committed too soon. Now you want to undo the last commit, while keeping the index.
```
回退到上一次commit。
**方法一**
```bash
git reset --soft ^HEAD
```
**方法二**
```bash
# 查处上一次提交到commit ID
git log
git reset --soft b3ae865ce692d647ad6938a4273753ccc6923a96
```

`git reset`参数表

> `--soft` : 保留所有更改，只是回退到commit之前的状态
> `--mixed` : 保留所有更改，但是会回退到变更被add之前
> `--hard` : 回退所有更改，更改的内容不会被保存，即本地副本也回退到指定的版本
> `--merge` : 只回退HEAD到指定版本，忽略未被add的变更，存在unstaged修改则中止
> `--keep` : 回退HEAD到指定版本，如果存在本地修改则中止

#### 23. checkout_file
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: checkout_file
Level: 23
Difficulty: ***

A file has been modified, but you don't want to keep the modification.  Checkout the `config.rb` file from the last commit.
```
checkout将会导致丢失指定文件的所有修改，并覆盖本地修改，保持指定文件在commit之前的状态。
```bash
git checkout -- config.rb
```

**「请参阅」**

> 1. [git checkout 命令详解- 胡涛儿-博客园](http://www.cnblogs.com/hutaoer/archive/2013/05/07/git_checkout.html)
> 2. [git checkout命令- Git教程™ -易百教程](https://www.yiibai.com/git/git_checkout.html)
> 3. [【Git】checkout用法总结- 简书](https://www.jianshu.com/p/cad4d2ec4da5)

#### 24. remote
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: remote
Level: 24
Difficulty: **

This project has a remote repository.  Identify it.
```
查看本地仓库的远程分支。
**方法一**
```bash
➜  git_hug git:(master) cat .git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "my_remote_repo"]
	url = https://github.com/Gazler/githug
	fetch = +refs/heads/*:refs/remotes/my_remote_repo/*
```
**方法二**
```bash
➜  git_hug git:(master) git remote -v
my_remote_repo	https://github.com/Gazler/githug (fetch)
my_remote_repo	https://github.com/Gazler/githug (push)
```

#### 25. remote_url
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
What is the name of the remote repository? my_remote_repo
Congratulations, you have solved the level!

Name: remote_url
Level: 25
Difficulty: **

The remote repositories have a url associated to them.  Please enter the url of remote_location.
```
和上一步一样，将remote分支的URL填写上即可通关。
```bash
➜  git_hug git:(master) git remote -v
my_remote_repo	https://github.com/Gazler/githug (fetch)
my_remote_repo	https://github.com/Gazler/githug (push)
remote_location	https://github.com/githug/not_a_repo (fetch)
remote_location	https://github.com/githug/not_a_repo (push)
```

#### 26. pull
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
What is the url of the remote repository? https://github.com/githug/not_a_repo
Congratulations, you have solved the level!

Name: pull
Level: 26
Difficulty: **

You need to pull changes from your origin repository.
```
在团队协作时，远程仓库会发生变更。如果这时我们强行将本地更改push到远程仓库中，则很有可能引起冲突。为了避免这个情况，**我们在每次`push`之前必须执行一次`pull`**。
```bash
➜  git_hug git:(master) git pull origin master
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 3
Unpacking objects: 100% (3/3), done.
From https://github.com/pull-this/thing-to-pull
 * branch            master     -> FETCH_HEAD
```

**「请参阅」**

> 1. [git pull 详解-CSDN博客](https://blog.csdn.net/liuhaomatou/article/details/65935558)

#### 27. remote_add
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: remote_add
Level: 27
Difficulty: **

Add a remote repository called `origin` with the url https://github.com/githug/githug
```

添加一个远程分支，将本地目录关联到remote分支。这通常发生于在本地目录中直接执行`git init`然后需要“绑定”到远程仓库中时。
```bash
git remote add origin https://github.com/githug/githug.git
```

**「请参阅」**

> 1. [git命令之git remote的用法](https://blog.csdn.net/wangjia55/article/details/8802490)
> 2. [Git远程操作详解-阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)

#### 28. push
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: push
Level: 28
Difficulty: ***

Your local master branch has diverged from the remote origin/master branch. Rebase your commit onto origin/master and push it to remote.


warning: no common commits
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (3/3), done.
From /var/folders/6g/6vz3_qrs2kn998mvx03p837w0000gn/T/d20160527-20512-1vbud0e/
 * [new branch]      master     -> origin/master
```
当我们需要将本地的commit同步到remote分支上时，则需要使用`git push`命令。
```bash
git rebase
git push
```

**「请参阅」**

> 1. [Git - 远程仓库的使用](https://git-scm.com/book/zh/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8)
> 2. [git push命令 - Git教程™ - 易百教程](https://www.yiibai.com/git/git_push.html)
> 3. [Push 上傳到GitHub 為你自己學Git](https://gitbook.tw/chapters/github/push-to-github.html)

#### 29. diff
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: diff
Level: 29
Difficulty: **

There have been modifications to the `app.rb` file since your last commit.  Find out which line has changed.
```
当我们希望知道某个文件或目录在任意两个commit之间的差异时，我们就应该使用`git diff`来获取两次commit之间的差异。

`git diff`用法

> `git diff`: 查看 working directory 与 staging area 之间的差异 > `git diff --cached`: 查看 repository 与 staging area之间的差异
> `git diff HEAD`: 查看 working directory 与 repository 之间的差异

```bash
➜  git_hug git:(master) ✗ git diff app.rb
diff --git a/app.rb b/app.rb
index 4f703ca..3bfa839 100644
--- a/app.rb
+++ b/app.rb
@@ -23,7 +23,7 @@ get '/yet_another' do
   erb :success
 end
 get '/another_page' do
-  @message = get_response('data.json')
+  @message = get_response('server.json')
   erb :another
 end

(END)
```
从以上的信息可以看出，`erb :success`处在第23行，所以顺数向下，可以算出发生改变的行所在第26行。

**「请参阅」**

> 1. [Git：git diff 命令详解-简书](https://www.jianshu.com/p/80542dc3164e)
> 2. [用diff 检查改动-Git Tower](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/diffs)
> 3. [git diff命令-Git教程™-易百教程](https://www.yiibai.com/git/git_diff.html)

#### 30. blame
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
What is the number of the line which has changed? 26
Congratulations, you have solved the level!

Name: blame
Level: 30
Difficulty: **

Someone has put a password inside the file `config.rb` find out who it was.
```
顾名思义，`git blame`用于责问某个文件的修改人。当我们将某些不应该出现在仓库中的信息（例如：密码、私钥等）时，可以通过这个命令找出提交这些敏感信息的人，用于后续的问责以及取证。
```bash
➜  git_hug git:(master) ✗ git blame config.rb
^5e8863d (Gary Rennie       2012-03-08 23:05:24 +0000  1) class Config
70d00535 (Bruce Banner      2012-03-08 23:07:41 +0000  2)   attr_accessor :name, :password
97bdd0cc (Spider Man        2012-03-08 23:08:15 +0000  3)   def initialize(name, password = nil, options = {})
^5e8863d (Gary Rennie       2012-03-08 23:05:24 +0000  4)     @name = name
97bdd0cc (Spider Man        2012-03-08 23:08:15 +0000  5)     @password = password || "i<3evil"
00000000 (Not Committed Yet 2018-06-08 17:01:25 +0800  6)
09409480 (Spider Man        2012-03-08 23:06:18 +0000  7)     if options[:downcase]
09409480 (Spider Man        2012-03-08 23:06:18 +0000  8)       @name.downcase!
09409480 (Spider Man        2012-03-08 23:06:18 +0000  9)     end
70d00535 (Bruce Banner      2012-03-08 23:07:41 +0000 10)
ffd39c2d (Gary Rennie       2012-03-08 23:08:58 +0000 11)     if options[:upcase]
ffd39c2d (Gary Rennie       2012-03-08 23:08:58 +0000 12)       @name.upcase!
ffd39c2d (Gary Rennie       2012-03-08 23:08:58 +0000 13)     end
ffd39c2d (Gary Rennie       2012-03-08 23:08:58 +0000 14)
^5e8863d (Gary Rennie       2012-03-08 23:05:24 +0000 15)   end
^5e8863d (Gary Rennie       2012-03-08 23:05:24 +0000 16) end
(END)
```
明显看出在`97bdd0cc`中，“Spider Man”将代码上传到仓库中。

**「请参阅」**

> 1. [git blame 小记- 常伟佳- SegmentFault 思否](https://segmentfault.com/a/1190000004446181)
> 2. [Git Book 中文版 查找问题的利器- Git Blame](http://gitbook.liuhui998.com/5_5.html)

#### 31. branch
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Who made the commit with the password? Spider Man
Congratulations, you have solved the level!

Name: branch
Level: 31
Difficulty: *

You want to work on a piece of code that has the potential to break things, create the branch test_code.
```
在使用Git进行多人协作时，通常需要基于某个大分支创建自己的分支进行开发，那么`git branch`命令可以帮助我们达到这个目的。
```bash
git branch test_code
```
执行完成之后，Git就会基于当前所在的分支新建一个名为`test_code`的新分支。

**「请参阅」**

> 1. [git 的branch(分支) 命令行总结- 简书](https://www.jianshu.com/p/9d5a5ea3283a)

#### 32. checkout
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: checkout
Level: 32
Difficulty: **

Create and switch to a new branch called my_branch.  You will need to create a branch like you did in the previous level.
```
和上一步类似，只是这一步需要既新建分支，还要签出到这个分支。这一步需要用到`git checkout -b`选项。
```bash
git checkout -b my_branch
```

#### 33. checkout_tag
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: checkout_tag
Level: 33
Difficulty: **

You need to fix a bug in the version 1.2 of your app. Checkout the tag `v1.2`.
```
这一步和上一步类似，只是签出到tag上。
```bash
➜  git_hug git:(master) git tag
v1.0
v1.2
v1.5
➜  git_hug git:(master) git checkout v1.2
Note: checking out 'v1.2'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at d46b40b Some more changes
```

#### 34. checkout_tag_over_branch
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: checkout_tag_over_branch
Level: 34
Difficulty: **

You need to fix a bug in the version 1.2 of your app. Checkout the tag `v1.2` (Note: There is also a branch named `v1.2`).
```
当我们需要签出到某个特定的分支，但是分支（branch）名和标签（tag）名重合。
```bash
git checkout tags/v1.2
```

#### 35. branch_at
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: branch_at
Level: 35
Difficulty: ***

You forgot to branch at the previous commit and made a commit on top of it. Create branch test_branch at the commit before the last.
```
有的时候我们并不希望基于某个分支的当前commit上创建一个分支。这时候，我们可以在命令中指定commit的ID号，并基于这个commit建立新的分支（本题中指出使用“previous commit”， 于是我们直接指定`HEAD^1`来代替ID号）。
```bash
git branch test_branch HEAD^1
```

#### 36. delete_branch
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: delete_branch
Level: 36
Difficulty: **

You have created too many branches for your project. There is an old branch in your repo called 'delete_me', you should delete it.
```
删除分支是一个危险的动作，但是我们有时候不得不做。我们一般会在合并分支后将这个源分支删除。
```bash
git branch -d delete_me
```
**💥删除分支前，请三思而后行**

**「请参阅」**

> 1. [git 删除不需要的本地分支・远程分支 - Qiita](https://qiita.com/hudichao/items/d665cd769ed1d2ce832a)
> 2. [git 删除本地分支记录-简书](https://www.jianshu.com/p/bd284c760e61)
> 3. [Git-命令行-删除本地和远程分支-CSDN博客](https://blog.csdn.net/qq_32452623/article/details/54340749)
> 4. [git branch用法总结，查看、新建、删除、重命名-CSDN博客](https://blog.csdn.net/afei__/article/details/51567155)
> 5. [Git查看、删除、重命名远程分支和tag \| ZRONG's Blog](https://blog.zengrong.net/post/1746.html)

#### 37. push_branch
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: push_branch
Level: 37
Difficulty: **

You've made some changes to a local branch and want to share it, but aren't yet ready to merge it with the 'master' branch.  Push only 'test_branch' to the remote repository
```
这一步是直接将本地分支推送到远程。
```bash
git push origin test_branch:test_branch
```

#### 38. merge
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: merge
Level: 38
Difficulty: **

We have a file in the branch 'feature'; Let's merge it to the master branch.
```
Merge操作是团队协作中合并分支最常用的方式。但是这种方式现在被认为不是那么妥当。正规的大团队中，合并分支一般采用Rebase的方式。关于二者的区别，请访问本题参阅中的相关链接。
```bash
git merge feature
```

**「请参阅」**

> 1. [Git - 分支的新建与合并](https://git-scm.com/book/zh/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)
> 2. [git-merge完全解析-简书](https://www.jianshu.com/p/58a166f24c81)
> 3. [git rebase 和git merge 的区别-简书](https://www.jianshu.com/p/f23f72251abc)
> 4. [git merge 和git rebase 小结-CSDN博客](https://blog.csdn.net/wh_19910525/article/details/7554489)
> 5. [在开发过程中使用git rebase还是git merge，优缺点分别是什么？- 知乎](https://www.zhihu.com/question/36509119)

#### 39. fetch
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: fetch
Level: 39
Difficulty: **

Looks like a new branch was pushed into our remote repository. Get the changes without merging them with the local repository
```
在多人协作的项目中，远程代码不可能和所有人的本地版本保持一致。于是我们需要手动将远程的更新同步到本地。
```bash
git fetch origin
```

**「题外话」**
我们还可以通过`git pull`实现相同的需求。但是`git pull`相当于执行了`git fetch`和`git merge`，它将会从远程获取最新版本并merge到本地。因此，我们发现其实通行的`git pull`并不特别安全。因此，在我们的开发过程中，**推荐使用`git fetch`，原则上不使用`git pull`**。

**「请参阅」**

> 1. [更新本地所有分支-CSDN博客](https://blog.csdn.net/lynn_kun/article/details/77673046)
> 2. [git fetch 的简单用法:更新远程代码到本地仓库-CSDN博客](https://blog.csdn.net/u012150179/article/details/17172211)
> 3. [git怎么更新本地所有分支？ - SegmentFault 思否](https://segmentfault.com/q/1010000005984100)
> 4. [真正理解git fetch, git pull 以及 FETCH_HEAD · Ruby China](https://ruby-china.org/topics/4768)

#### 40. rebase
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: rebase
Level: 40
Difficulty: **

We are using a git rebase workflow and the feature branch is ready to go into master. Let's rebase the feature branch onto our master branch.
```
大概意思是从某个提交分化出两个分支，然后其中一个分支需要将另一个分支的修改合并过来，但是又不想在提交记录上留下两个分支合并的痕迹，只留下一个分支以前后顺序记录两边的修改。

`git rebase` 一个分支的所有修改在另一个分支上重新应用一遍，所以在提交记录上看，会发现一个分支的所有提交在另一个分支之前或者之后。然后删除另一个被合并的分支，保持分支简洁。

`git rebase master feature` 表示将feature上的修改在master上重新应用一遍。

**💥本段解释参考：[https://www.jianshu.com/p/482b32716bbe](https://www.jianshu.com/p/482b32716bbe)**

```bash
git rebase master feature
```
本题的参阅可以参考第38题。

#### 41. rebase_onto
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: rebase_onto
Level: 41
Difficulty: **

You have created your branch from `wrong_branch` and already made some commits, and you realise that you needed to create your branch from `master`. Rebase your commits onto `master` branch so that you don't have `wrong_branch` commits.
```
`git rebase --onto A B C A`代表的是你实际想要将切片放到哪个分支，B代表切片开始分支（一定要注意的问题是B的开闭问题，这里`rebase --onto`的机制是左开右闭）。

`git rebase --onto A B~1 temp`如果想要保留A和C的历史，就需要先在切片的末尾建立一个分支temp。这就代表把B到c之间的历史移到了A上，并且当前temp分支的历史状态就是我们想要的。

**💥本段解释参考：[https://www.jianshu.com/p/e8e6358e81e0](https://www.jianshu.com/p/e8e6358e81e0)**

```bash
git rebase wrong_branch --onto master
```

**「请参阅」**

> 1. [妙用git rebase --onto指令 - Ricky.K](https://link.jianshu.com/?t=http://www.tuicool.com/articles/FB3Ine)

#### 42. repack
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: repack
Level: 42
Difficulty: **

Optimise how your repository is packaged ensuring that redundant packs are removed.
```
这是一个并不常见的指令，目的在于将版本库未打包的松散对象打包。
```bash
git repack
git repack -d
```

**「请参阅」**

> 1. [git命令之git fsck, git prune 和 git repack](http://loveky2012.blogspot.com/2012/08/git-command-git-fsck-git-prune-git-repack.html)

#### 43. cherry-pick
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: cherry-pick
Level: 43
Difficulty: ***

Your new feature isn't worth the time and you're going to delete it. But it has one commit that fills in `README` file, and you want this commit to be on the master as well.
```
在协作开发的过程中，假如我们有一个叫做`v0.1`的稳定版本分支，还有一个叫做`0.9-beta`的不稳定分支。我们希望在`v0.1`中添加一个`v0.9-beta`的一个新功能，但是直接合并会导致冲突的发生。那么，这个时候我们就应该考虑`git cherry-pick`。
我们执行一次`git log -all`，得到期望的那次commit的ID：
```bash
git cherry-pick ca32a6dac7b6f97975edbe19a4296c2ee7682f68
```

**「请参阅」**

> 1. [git cherry-pick 使用指南-简书](https://www.jianshu.com/p/08c3f1804b36)
> 2. [git cherry-pick 小结-CSDN博客](https://blog.csdn.net/wh_19910525/article/details/7554430)
> 3. [【狀況題】如果你只想要某個分支的某幾個Commit？為你自己學Git](https://gitbook.tw/chapters/faq/cherry-pick.html)

#### 44. grep
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: grep
Level: 44
Difficulty: **

Your project's deadline approaches, you should evaluate how many TODOs are left in your code
```
一个类似于Linux文本处理的指令。熟悉Linux文本三剑客（grep、awk、sed）的同学应该很容易理解。
```bash
➜  git_hug git:(master) git grep TODO
app.rb:# TODO Make site url variable.
app.rb:# TODO Make API version variable.
app.rb:# TODO Redirecting queries could be useful.
config.rb:    # TODO Move password to a configuration file.
```
数出数目为4个，填写4即可通关。

#### 45. rename_commit
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
How many items are there in your todolist? 4
Congratulations, you have solved the level!

Name: rename_commit
Level: 45
Difficulty: ***

Correct the typo in the message of your first (non-root) commit.
```
对于手残党来说，commit出现笔误是常有的事。幸好我们可以使用下面的方法补救：

> 1. 先通过`git log`找出错误信息在第几次提交；
> ![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/1.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/1.png)
> 2. 通过`git rebase -i HEAD~2`；
> 3. 后有个编辑界面，将错误信息所在的那个提交中的pick修改为edit，保存并退出；
![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/2.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/2.png)
> 4. 之后执行`git commit –amend`修改提交的错误信息；
> 5. 然后再执行`git rebase –continue`完成修改。
> ![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/3.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/3.png)

#### 46. squash
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: squash
Level: 46
Difficulty: ****

You have committed several times but would like all those changes to be one commit.
```
这个指令可以将多个commit合并为一个。

> 1. 找到第一次提交的commit ID，使用`git rebase`处理这个ID：
> 2. 将希望并入的commit前的`pick`改为`squash`：
> ![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/4.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/4.png)
> 3. 两次输入`:wq`保存并退出编辑。
> ![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/5.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/6.png)

**「请参阅」**

> 1. [如何合併多個commits - 李嘉玲的技術筆記](http://zerodie.github.io/blog/2012/01/19/git-rebase-i/)

#### 47. merge_squash
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: merge_squash
Level: 47
Difficulty: ***

Merge all commits from the long-feature-branch as a single commit.
```
当我们从其他分支merge到主分支时，通常会带来大量的commit，如果我们不希望一个Merge Request产生这么多的commit，那么就需要考虑在merge时带上`--squash`选项。
```bash
git merge --squash long-feature-branch
```

**「请参阅」**

> 1. [git merge –squash介绍- LookPHP - 博客园](https://www.cnblogs.com/lookphp/p/5799533.html)
> 1. [聊下git merge --squash - 王清培- 博客园](https://www.cnblogs.com/wangiqngpei557/p/6026007.html)

#### 48. reorder
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: reorder
Level: 48
Difficulty: ****

You have committed several times but in the wrong order. Please reorder your commits.
```
这道题是重新排列commit的顺序。为确保commit的上下文一致性和逻辑性，可以在必要的时候进行重排。

> 1. 通过`git log`找出重排开始的commit ID；
> 2. 使用`git rebase -i`进入commit编辑器：
![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/6.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/6.png)

#### 49. bisect
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: bisect
Level: 49
Difficulty: ***

A bug was introduced somewhere along the way.  You know that running `ruby prog.rb 5` should output 15.  You can also run `make test`.  What are the first 7 chars of the hash of the commit that introduced the bug.
```
这是Git的调试功能。顾名思义，这种调试是二分法调试。首先需要确定起始位置的commit ID，然后使用`git bisect start`传入ID，然后执行`git bisect run make test`，会自动逐个测试所有commit状态下的文件。最后定位到错误，填写定位到错误的commit ID前7位即可通关。
![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/8.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/8.png)

#### 50. stage_lines
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
What are the first 7 characters of the hash of the commit that introduced the bug? 18ed2ac
Congratulations, you have solved the level!

Name: stage_lines
Level: 50
Difficulty: ****

You've made changes within a single file that belong to two different features, but neither of the changes are yet staged. Stage only the changes belonging to the first feature.
```
这是对文件的部分修改进行提交的操作。平时的开发中也容易遇到此类需求，需要稍加留心。

> 1. 使用`git add -p FILE`；
> ![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/9.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/9.png)
> 2. 输入`e`回车，进入stage编辑页面，将属于第二次commit的内容注释或者删去。
> ![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/10.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/10.png)

#### 51. find_old_branch
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: find_old_branch
Level: 51
Difficulty: ****

You have been working on a branch but got distracted by a major issue and forgot the name of it. Switch back to that branch.
```
如果我们希望查询提交历史，光靠`git log`是不行的。`git reflog`可以查看所有分支的提交记录，给我们带来很大的便利。
```bash
git reflog
```
根据题意可知，我们要找的是`solve_world_hunger`，于是签出：
![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/11.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/11.png)

**「请参阅」**

> 1. [Git - 维护及数据恢复](https://git-scm.com/book/zh/v1/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-%E7%BB%B4%E6%8A%A4%E5%8F%8A%E6%95%B0%E6%8D%AE%E6%81%A2%E5%A4%8D)
> 2. [git reflog命令- CSDN博客](https://blog.csdn.net/shichaosong/article/details/22067529)
> 3. [脱线道士维克多- git reflog 和git log 的区别，外加git cherry-pick 的一种](http://wjp2013.github.io/tool/git-reflog-git-log-git-cherry-pick/)

#### 52. revert
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: revert
Level: 52
Difficulty: ****

You have committed several times but want to undo the middle commit.
All commits have been pushed, so you can't change existing history.
```
如果我们发现错误的代码并且不想提交的文件add之后，希望想回退取消，则可以使用命令：`git reset`，同时git add完毕之后，git也会做相应的提示。
```bash
git revert HEAD^1
```

**「请参阅」**

> 1. [GIT使用场景-CSDN博客](https://blog.csdn.net/alexander_phper/article/details/70176009)
> 2. [Git的各种Undo技巧\| TonyDeng's Blog](http://tonydeng.github.io/2015/07/08/how-to-undo-almost-anything-with-git/)
> 3. [git revert .vs. git reset .vs. git rebase - 世有因果知因索果-博客园](http://www.cnblogs.com/kidsitcn/p/5364102.html)

#### 53. restore
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: restore
Level: 53
Difficulty: ****

You decided to delete your latest commit by running `git reset --hard HEAD^`.  (Not a smart thing to do.)  You then change your mind, and want that commit back.  Restore the deleted commit.
```
一个典型的撤销方式。还是使用`git reflog`的操作。
```bash
git reflog
git checkout fabb740
```

到此为止，我们已经熟悉了各种Git处理撤回commit的基本操作。这些操作在实战中往往能起到很大的作用。

#### 54. conflict
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: conflict
Level: 54
Difficulty: ****

You need to merge mybranch into the current branch (master). But there may be some incorrect changes in mybranch which may cause conflicts. Solve any merge-conflicts you come across and finish the merge.
```
冲突是一件很让人头大的问题，但是在多人协作开发的过程中经常遇见。其实一般的冲突基本上是由于**同时更改了同一个文件**导致的。为了解决这个问题，Git提供了专门的工具。
我们首先引发这个冲突。之后Git会在存在冲突的文件中打上HEAD信息：
![https://lenconda.oss-cn-beijing.aliyuncs.com/180608/13.png](https://lenconda.oss-cn-beijing.aliyuncs.com/180608/13.png)
我们只要将以这条线为分割的某一个我们不希望出现的部分删去，并删去剩下部分的HEAD信息，保存，再次commit即可。

**「请参阅」**

> 1. [解决冲突- 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840202368c74be33fbd884e71b570f2cc3c0d1dcf000)
> 2. [Git下的冲突解决- sinojelly - 博客园](http://www.cnblogs.com/sinojelly/archive/2011/08/07/2130172.html)

#### 55. submodule
```
********************************************************************************
*                                    Githug                                    *
********************************************************************************
Congratulations, you have solved the level!

Name: submodule
Level: 55
Difficulty: **

You want to include the files from the following repo: `https://github.com/jackmaney/githug-include-me` into a the folder `./githug-include-me`. Do this without manually cloning the repo or copying the files from the repo into this repo.
```
Git子模块，说白了就是Git仓库套一个Git仓库。Submodule在初级开发中并不常见，因为维护起来门槛较高。
```bash
git submodule add https://github.com/jackmaney/githug-include-me ./githug-include-me
```

#### 56. contribute
> This is the final level, the goal is to contribute to this repository by making a pull request on GitHub.  Please note that this level is designed to encourage you to add a valid contribution to Githug, not testing your ability to create a pull request.  Contributions that are likely to be accepted are levels, bug fixes and improved documentation.

# 后记
GitHug是一个很好的练习Git实战技能的工具。学完GitHug只能说初步掌握Git。要真正熟练Git的各种操作，并将其熟练运用到实战中，并没有想象中的那么容易。但罗马毕竟不是一天建成的。
虽然GitHug提供了很多技巧方面的训练，但是它不能提供多人协作中的问题的解决方案。因此，要真正学会Git，我们至少还要了解一下几点：

- Git工作流（推荐GitFLow）
- Git解决冲突（更复杂的情况）
- Git中的社交礼仪
