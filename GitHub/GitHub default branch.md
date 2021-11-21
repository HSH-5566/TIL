# 로컬저장소와 원격저장소의 브랜치가 달라 Compare&pull request 필요한 문제

#### 2020/10/01 부로 GitHub 기본 브랜치가 master에서 main으로 변경

#### whitelist/blacklist, master/slave 와 같은 인종차별적인 용어라 판단해서 변경함

#### 신규 저장소의 브랜치를 main 으로 설정

#### Git 의 config 설정에서 defaultBranch를 main으로 설정해야함!
<hr>

# 기존 저장소의 브랜치 main으로 변경하는 방법

## 1번 방법) Git 2.28Version부터 가능
### git config --global init.defaultBranch main

~/.gitconfig

[init]
  defaultBranch = main

<hr>

## 2번 방법)
## 1.master 브랜치로 checkout

### git checkout master
<br>

## 2.main 브랜치로 브랜치명 변경

### git branch -m master main

<br>

## 3.github 의 default 브랜치를 rename

### repository 의 setting > Branches 에서 Default Branch 에서 main 으로 변경

<br>

## 4.원격 Repoitory 에서 commit 가져오기

### git fetch origin

<br>

## 5."origin/main" 로 연결된 정보 변경

### git branch -u origin/main main

<br>

## 6."origin/main" 으로 HEAD 연결정보 수정

### git remote set-head origin -a

<br>

## 7.origin/main 으로 push

### git push -u origin main

<br>

## 8.remote 에서 없어진 origin/master 를 local 에서 삭제

### git pull --prune

참고자료 : https://skyksit.com/git/git-rename-master-to-main/
