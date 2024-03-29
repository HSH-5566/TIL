# Git & GitHub

일시: 2021년 11월 18일
태그: 공부, 프로그램

<aside>
📌 2021.11 Git & Github 공부 / 참고링크 :  [https://victorydntmd.tistory.com/53?category=682764](https://victorydntmd.tistory.com/53?category=682764)

</aside>

![Untitled](https://user-images.githubusercontent.com/80798580/142413341-dbe4c3eb-a704-46f2-ac4e-b1598a73ca7d.png)

---

### Git & Github

: Git / GitHub 정확한 방법알기 위해 공부 & 원하는 대로 깃허브 사용하는 것이 목표

- Git
    - 버전관리를 위한 프로그램( Version Control System ) → **버전 관리, 협업 목적**
    - 영역
        - **working directory** : 현재 작업하고 있는 공간로 Git이 관리하고 있지만, 아직 추적하고 있지 않은 상태
        - **index (stage, staging area) :** 준비 공간으로 Git이 추적하고 있으며, 버전으로 등록되기 전 상태
        - **repository : 저장소**
            - **local repository :** 본인 PC에 존재하는 저장소
            - **remote repository :** Github, Gitlab 같은 원격 저장소
    - 흐름
        - **git init : .git** 폴더를 생성 == 새로운 local repository 생성→ 파일을 추적 & Git과 관련된 작업 가능
        - **git add :** working directory의 변경된 작업 파일을 staging area로 추가
        - **git commit :** staging area의 내용을 local repository에 확정
        - **git push :** local repository의 내용을 remote repository로 업로드
        - **git pull :** remote repository로 부터 local repository로 내용을 가져옴
        - **git clone :** .git을 포함한 remote repository의 파일들을 local repository에 복사
            
            ![Untitled 1](https://user-images.githubusercontent.com/80798580/142413422-acd95303-5da3-4085-a9ac-a3d9d51f6165.png)
            
    - 협업
        - **git branch :** 독립된 working directory으로 프로젝트 참여자마다 브랜치를 가져서 독립된 작업 공간 가능, 테스트 및 백업 등의 용도 가능
        - **head :** 포인터를 의미, 지금 작업하고 있는 branch
        - **merge :** 2개의 branch에서 작업한 다른 내용을 하나로 합치는 것, 현재 브랜치를 기준으로 병합, 만약 두 branch가 같은 파일의 같은 곳을 수정했다면, 충돌( merge conflict )이 발생
    - 명령어
        - local storage : git init, git add, git commit
            - **git init**
                
                ![Untitled 2](https://user-images.githubusercontent.com/80798580/142413441-c92a3811-e470-4506-b212-fd68a51eadab.png)
                
                - working directory : .git 폴더의 상위폴더 → redux-study
                - .git 폴더 : working directory 에 존재하는 파일들의 버전을 관리
            - **git status**
                
                ![Untitled 3](https://user-images.githubusercontent.com/80798580/142413457-cb90a09f-e632-44af-8d52-1d93dd691867.png)
                
                - "추적되지 않은 파일(**Untracked files**) 목록"  출력
                - 최근에 등록( commit )된 버전과 비교하여 working directory에 새로운 파일
                    - Git은 처음 보는 파일이므로 추적하고 있지 않은 파일
            - **git add .**
                
                ![Untitled 4](https://user-images.githubusercontent.com/80798580/142413467-41fba2bb-ff29-4f42-b793-7e3927dbdf98.png)
                
                - 점(.)은 모든 것(all), 즉 working directory 전체를 의미
                    - 비권장 ~> 중요한 설정 파일과 IDE에서 제공하는 파일들까지 모두 add할 필요는 없기 때문 그런 파일들은 .gitignore로 관리 필요
                - -update 옵션으로 현재 Git이 추적하고 있는 파일들만 add 가능
            - **git rm —cached {add제외파일}**
                - 어떤 파일을 add 하면 안되는데 add한 경우, 파일을 add하기 전 상태인 **unstage** 상태로 변경
                - Staging area에서만 제거하고 working directory는 유지하는 명령어
            - **git commit -m "msg"**
                
                ![Untitled 5](https://user-images.githubusercontent.com/80798580/142413480-0b6f4687-db36-4f68-9e50-9e5950708b07.png)
                
                - m 옵션을 사용해서 commit 메시지를 간단하게 작성
                - commit을 하면 현재 staging area의 내용을 local repository에 저장하고, **하나의 버전으로 등록**
                - add를 한 상태에서 파일의 내용을 수정해도 add된 것만 버전으로 등록
                - 커밋 메시지를 잘못 작성했을 경우, --amend 옵션으로 다시 커밋하여 메시지를 수정 → `git commit --amend -m "수정된 메시지"`
            - **git checkout --**
                - git checkout -- {파일} 명령어를 실행하면 "그 파일은 실수로 삭제된 것이니 다시 되돌려 놓아라"는 의미
                - 파일을 삭제했던 것을 없던일로 만들어 버리는 것으로 해당 폴더에 삭제한 내용 다시 생성됨
                - working directory에 작업했던 것을 버리는 명령어
        - remote storage : git clone, git remote, git push, git pull
            - remote storage : Github( 또는 Bitbucket, Gitlab )에 존재하는 repository
            - **git remote**
                - `git remote`
                    - local repository에 연결된 remote repository를 확인
                    - 연결된 remote repository가 없다면, 아무것도 출력이 되지 않을 것
                - `git remote add {별칭} {remote repository URL 주소}`
                    - local repository에 remote repository를 등록
                    - {별칭}은 일반적으로 origin
                - `git remote show <원격 저장소명>`
                    - 원격 저장소의 세부 정보
            - **git push**
                - `git push { 원격 저장소명 } { 원격 브랜치명 }`
                    
                    ![Untitled 6](https://user-images.githubusercontent.com/80798580/142413492-bec73d34-0231-496e-b920-dd0d1182611a.png)
                    
                    - local repository의 파일들을 remote repository에 업로드
                    - git init 명령어를 실행하면 default 브랜치로 **master** 브랜치를 생성
                    - 100%가 채워지면, 성공적으로 push
                    
                    ✅처음 push 시, 계정 정보 확인을 위해 Github 이메일과 비밀번호를 입력
                    
                - `git push -u { 원격 저장소 별명 } { 로컬 브랜치명 }`
                    
                    `git push --set-upstream { 원격 저장소 별명 } { 로컬 브랜치명 }`
                    
                    - 위 두 명령어는 같은 일
                    - 브랜치를 추적하도록 해서, 이후에 git push 명령어만 입력해도 원격 저장소로 push ⇒ `git push { 원격 저장소명 } { 브랜치명 }` → `git push`
                - `git push --delete { 원격 브랜치명 }`
                    - emote repository에 있는 브랜치를 삭제
            - **원격 저장소에서 파일 가져오기**
                - **zip 파일**
                    - .git 폴더가 없는 채로 소스만 받을 수 있으므로, local에서 Git을 새롭게 꾸려나가야 함
                - **clone**
                    - .git 폴더까지 포함해서 소스를 받을 수 있음
                    - `git clone { 원격 저장소 URL }`
                    - `git clone -b { 브랜치명 } { 원격 저장소 URL }`
                        - 특정 브랜치 clone
                        - clone 명령어는 처음 프로젝트에 투입되거나, 책에서 제공하는 예제 소스를 가져올 때, 중간에 git이 꼬였을 때 사용
                - **pull**
                    - remote repository에 저장된 파일을 가져와 local repository의 내용을 갱신
                        - 병합( merge ) 과정이 발생
                        - 해당 remote repository에 권한이 있어야 pull 명령어를 실행
                    - `git pull { 원격 저장소 별명 } { 브랜치명 }`
                        - git pull = git fetch + git merge
                    - `git pull --rebase { 원격 저장소 별명 } { 브랜치명 }`
                        - merge가 아닌 rebase 방식으로 병합
                            - rebase 명령어는 merge 명령어보다 히스토리( log )가 깔끔
                        - git pull --rebase = git fetch + git rebase
                - **clone과 pull 차이**
                    - git clone :  Github의 모든 파일들을 가져오기만 함
                    - git pull :  local repository와 비교하여 병합을 하고, local repository에 저장( add )까지 수행
                        - git pull = git fetch + git merge
                            - git fetch : local에 연결된 remote repository의 브랜치 목록과 그 파일 내용을 최신으로 업데이트, local과 remote의 싱크를 맞추는 새로고침 역할
                            - git merge : 두 개의 branch를 병합
                
                ✅ 협업 시 push를 할 때 주의할 점은 push 하기 전에 local repository는 항상 remote repository의 최신 버전을 유지.
                
                ✅ remote repository에 존재하는 커밋이 local 저장소에 없으면 에러가 발생
                
        - branch : **독립적인 작업 공간을 생성**
            - 장점
                - 원격 저장소( Github )에 여러 브랜치를 만들면 팀원들이 각각 독립적인 원격 저장소
                - 통합이 필요하면 특정 브랜치에 merge
                - 독립적인 공간을 제공하므로 테스트, 통합 등으로 활용
            - **master 브랜치**
                - git init 할 때 자동으로 생성해주는 기본 브랜치
                - 동료들의 작업 내용을 하나로 합칠 때 사용하는 뼈대 브랜치로 사용가능
            - **git branch**
                - `git branch { 브랜치명 }`
                    - 브랜치 생성
                    - 새로운 브랜치를 생성하면, 기반이 되는 브랜치( 부모 브랜치)의 버전을 그대로 복사, 커밋 내역( log )도 부모 브랜치와 같음
                - `git checkout { 브랜치명 }`
                    - 브랜치 이동
                - `git checkout -b { 브랜치명 }`
                    - 브랜치를 생성함과 동시에 이동
                - `git branch`
                    - local repository에 있는 브랜치의 목록과 현재 사용하고 있는 브랜치를 확인
                - `git branch -r`
                    - 원격 브랜치 목록만
                - `git branch -a`
                    - 로컬/원격 모든 브랜치 목록
                - **새로운 브랜치에서 작업하는 내용은 master에 반영되지 않음!**
                    - `git add .` // foo 브랜치에서 작업 내용 add
                    - `git commimt -m " 새로운 브랜치에서 업로드 "` //foo브랜치 add내용 commit
                    - `git push origin foo` // master가 아닌 foo 브랜치에 push
                    - `git checkout master` // master 브랜치로 이동
                    - `git pull origin foo` // master 브랜치에 foo 브랜치 내용 pull하여 반영
                    - `git push origin master` // master브랜치에 push
                - `git branch -D {삭제할브랜치}`
                    - 브랜치 삭제
                    - 기능 구현이 끝난 브랜치는 local repository에서 삭제하는 것이 브랜치 관리면에서 편하므로 브랜치를 삭제
                    - 필요하면 다시 remote repository에서 가져올 수 있음
                    - remote repository에서 삭제 필요시?
                        
                        ![Untitled 7](https://user-images.githubusercontent.com/80798580/142413532-43eb6cdc-4f4c-4f63-a398-fecca49aac04.png)
                        
                        ![Untitled 8](https://user-images.githubusercontent.com/80798580/142413545-ba9ccbec-5a6f-41f9-aedf-6cf57fd53192.png)
                        
                - `git branch {새브랜치명} {원격브랜치}/{원격브랜치명}`
                    - remote repository의 특정 브랜치를 가져와서 새로운 브랜치
        - merge, conflict
            - merge
                - local repository에서 branch를 생성하여 작업을 한 후, 두 브랜치를 통합
                - 도중에 **충돌**( conflicts )이 발생 가능
                - **Fast-forward 방식으로 병합**
                    - **master 브랜치 작업**
                        - **`git checkout master` → `git add .` → `git commit -m "메시지"`**
                    - **새로운 브랜치 생성해서 작업**
                        - `git checkout -b test1` → `git branch` → 파일내용 수정 → **`git add .` → `git commit -m "test1 메시지"`**
                    - **git merge**
                        - test1 브랜치가 master 브랜치보다 한 번 더 commit & 변경사항 존재
                        - master 브랜치에 test1 브랜치를 merge
                            - `git checkout master` → `git merge test1`
                            - Fast-forward 메시지 출력
                                - merge 할 브랜치( 대상 브랜치, test1 브랜치 )의 commit이 현재 branch( 기준 브랜치, master 브랜치 )의 commit 보다 앞서가 있기 때문에, 기준 브랜치의 커밋을 대상 브랜치 commit으로 이동
                                    
                                    ![Untitled 9](https://user-images.githubusercontent.com/80798580/142413559-a392da38-6376-422c-aa07-51d1311aed17.png)
                                    
                                - `master 브랜치의 HEAD를 test1 브랜치의 HEAD로 이동하겠다`
                - **충돌이 발생하는 병합**
                    - 기준 브랜치와 대상 브랜치가 **같은 파일의 같은 부분을 수정하면 충돌 발생**
                    - **master 브랜치 작업**
                        - **`git checkout master`** → 파일내용 수정 **→ `git add .` → `git commit -m "메시지"`**
                    - **새로운 브랜치 생성해서 작업**
                        - `git checkout -b test1` → `git branch` → **master 브랜치**에서 수정한 내용 수정 → **`git add .` → `git commit -m "test1 메시지"`**
                    
                    ⇒master 브랜치와 test1 브랜치의 **commit 수 동일**
                    
                    === fast-forward 방식으로 병합이 되지 않을 것
                    
                    - **git merge**
                        - `git checkout master` → `git merge test1`
                            - merge 명령어를 실행하면 충돌이 발생했다면서, merge를 진행X
                                
                                ![Untitled 10](https://user-images.githubusercontent.com/80798580/142413570-dc72a29f-365d-4e07-bd48-254c7ddecebb.png)
                                
                                - master 브랜치와 test1 브랜치의 커밋횟수가 같고,
                                - master 브랜치와 test1 브랜치는 <div> 요소의 class 속성 값을 각각 다른 값으로 동시에 수정
                                
                                ⇒Git은 사용자에게 어떤 branch의 내용을 선택할 것인지 제시
                                
                                merge를 진행했던 기준 브랜치는 master 이므로 <<<< HEAD 영역이 master 브랜치의 내용
                                
                                - 충돌이 발생한 후, 해결이 됐으면 commit
                - **merge와 관련된 옵션들**
                    - **-squash**
                        - 대상 브랜치의 모든 커밋을 하나의 커밋으로 합쳐서 merge
                        - 대상 브랜치에서 작업했던 히스토리를 하나의 메시지로 압축
                        - ex) master 브랜치가 있고, 이를 그대로 복사한 child 브랜치에서 커밋을 5번수행, master branch보다 커밋 수가 앞서있음, 이 때 master 브랜치에서 --squash 옵션을 이용해서 child 브랜치를 병합하면, child 브랜치의 5번의 커밋 내역은 무시되고 파일 수정 이력만 받게됨 → 깔끔한 히스토리와 함께 merge
                    - **-no-ff**
                        - fast-forward 관계에서 merge를 하면 merge 커밋이 생략되는데, --no-ff 옵션을 주면 merge할 때 커밋을 생성
                            
                            ![Untitled 11](https://user-images.githubusercontent.com/80798580/142413577-4f0a7b62-2bfd-40c3-915a-abf9ba8127ca.png)
                            
        - reset, revert
            - git reset : 특정 커밋으로 되돌아갈 수 있는데, 되돌린 버전 이후의 버전들은 **히스토리에서 삭제**
            - git revert : reset처럼 특정 버전으로 되돌아갈 수 있지만, 되돌린 버전 이후의 버전들의 **히스토리 유지**
            - **되돌리기 - working directory 내용 비우기**
                - add 명령어를 하지 않은 상태에서 작업했던 내용을 모두 되돌리고 싶은 경우
                - HEAD가 가장 최근에 커밋된 버전으로 이동
                - `git checkcout -- { file }`
                    - 수정한 파일을 수정한 적이 없던 것처럼 함
                - `git checkcout .`
                    - **모든 파일**을 working directory에서 되돌리고 싶을 때
                - `git checkcout { 폴더명 }`
                    - 폴더를 되돌리고 싶을 때
                - `git commit -m "msg"` → 수정 → `git status` : 수정한 것 add하라고 나옴 → `git checkcout -- { file }` → `git status` : 수정할 것 없다고 나옴
            - **reset으로 되돌리기 - add를 무효화**
                - git add를 한 상태에서, 변경된 staging area를 무효화해서 가장 최근 버전으로 되돌아가는 방법
                - `git reset {파일명}`
                    - working directory 상태로 돌아가게 됨
                    - **수정된 내용은 유지한 채로 add 이전 상태로 되돌린 것**
                        
                        ![Untitled 12](https://user-images.githubusercontent.com/80798580/142413592-a4f6513c-db6d-499b-8b90-379c63e39487.png)
                        
                    
            - **reset으로 되돌리기 - 다양한 옵션으로 버전 되돌리기**
                - 커밋된 4개의 msg
                    
                    ![Untitled 13](https://user-images.githubusercontent.com/80798580/142413600-c98ec086-f805-4f9c-a0d8-caa37bd46558.png)
                    
                - **-hard 옵션**
                    - `git reset --hard {버전명}`
                        
                        ![Untitled 14](https://user-images.githubusercontent.com/80798580/142413607-7b6ac4c7-bef2-4e9e-876a-44266dd9e115.png)
                        
                        - 커밋이력 삭제 & working directory 깔끔
                - **옵션 없이**
                    - `git reset {버전명}`
                        
                        ![Untitled 15](https://user-images.githubusercontent.com/80798580/142413617-84951e6f-ee4e-4b4c-88e1-5a1eafe63eb3.png)
                        
                        - 커밋이력 삭제 & working directory 내역 남음
                - **--soft 옵션**
                    - `git reset --soft {버전명}`
                        
                        ![Untitled 16](https://user-images.githubusercontent.com/80798580/142413636-3556ab86-ddba-4df1-984a-4e10a556247d.png)
                        
                        - 커밋이력 삭제 & add까지 되어 있음
                    
            - **revert로 되돌리기**
                - `git revert {버전명}`
                    
                    ![Untitled 17](https://user-images.githubusercontent.com/80798580/142413655-be751f99-4564-47f6-81ea-107e3d86b12c.png)
                    
                    - evert 명령을 실행할 때, 충돌이 발생
                        - reset의 경우는 커밋이력이 사라지기 때문에 충돌이 발생하지 않음
                        - revert의 경우 커밋이력이 남아 같은 곳을 수정했다면 충돌이 발생
                    - 커밋이력 유지 & working directory 유지
                        
                        ⇒ 그대로 유지하려다 보니 충돌이 발생한 것
                        
            - **reset으로 병합 취소하기**
                - 병합은 위험한 작업이기 때문에 Git은 병합을 하기 전에, 최신 커밋에 포인터를 지정( **ORIG_HEAD** )
                - `git reset –merge ORIG_HEAD`
                    - **방금 병합한 것을 되돌리려면** -merge 옵션과 ORIG_HEAD 포인터를 지정하여 reset 명령어
            - **revert로 병합 취소하기**
                - reset은 방금 병합한 것을 취소할 때 사용
                - 조금 시간이 지난 병합을 취소하고 싶다면 revert 명령어로 병합을 취소
                - rebase로 병합을 했다면 merge에 대한 커밋 이력이 남지 않기 때문에 불가능
                - `git revert --mainline 1 {취소할 병합 커밋ID(===병합이 완료된 커밋ID)}`
                    - **mainline**이란 병합을 취소한 후에, 어느 라인을 기준으로 되돌아 갈 것인지 기준을 정하는 것
                - 병합이 merge로 이루어진 것이 아니라 rebase를 통해 이뤄졌다면, 병합된 커밋을 찾기가 힘듦 → 해당 커밋 찾아 `git checkout { 커밋ID }`
            - **reset과 revert의 차이점**
                - git reset : remote repository까지 컨트롤할 수 없음
                    - 커밋 이력이 삭제되므로, remote와 싱크가 안맞아서 결국 push 할 수 없음
                - **이미 원격 저장소에 push를 한 상태에서 되돌리고 싶다면 git revert를 사용**
                - 병합 과정에서는 revert 명령어가 더 먼 과거의 버전으로 돌아갈 수 있다는 점
        - rebase
            - merge처럼 병합하는 작업이지만, 커밋 이력을 다룰 수 있다는 점에서 차이
                - 불필요한 merge 이력을 남기지 않아 Git은 rebase를 통해 병합할 것을 권장
                - 충돌이 발생하더라도 **fast-forward 방식의 병합이 이루어지기 때문에 히스토리가 깔끔하게 관리된다는 장점**
                - **-interactive** 옵션을 사용하면 local에서 **히스토리를 조작가능**
            - **rebase 병합 방식 ( Merge vs Rebase )**
                
                ![Untitled 18](https://user-images.githubusercontent.com/80798580/142413691-a760e426-f473-4571-bffc-78284792cd5d.png)
                
                - merge방식 : 총 4개의 커밋이력
                
                ![Untitled 19](https://user-images.githubusercontent.com/80798580/142413699-89638e2c-de20-48a7-9123-d6174f993a4c.png)
                
                - rebase방식 : 총 3개의 커밋이력
                    - **자신의 마지막 커밋 기록을 없앤 후, 병합 후에 작성한 커밋 기록을 남김**
            - **--interactive 옵션**
                - 불필요한 커밋 이력을 제거해서 필요한 커밋들만 남길 수 있음 & 커밋에서 작업했던 내용들은 그대로 유지
                - **초기 커밋이력 히스토리**
                    
                    ![Untitled 20](https://user-images.githubusercontent.com/80798580/142413711-38548de0-ed6f-485b-9b2f-d15249f3bcc2.png)
                    
                - **rebase --interactive {커밋ID}**
                    - `git rebase --interactive 2462291`
                        
                        ![Untitled 21](https://user-images.githubusercontent.com/80798580/142413756-aa6f3ba2-efc4-4b4a-b4c8-12a3de1cd150.png)
                        
                        - vi 편집기 열림
                        
                        ![Untitled 22](https://user-images.githubusercontent.com/80798580/142413812-18509aae-f84d-437a-af8b-7d5bba52664f.png)
                        
                        - **squash : 이전 커밋과 합쳐서 커밋을 하도록 실행**
                        - 6837557와 94af9ac를 병합할 때, 6837557의 커밋 내용을 유지 & 94af9ac와 두번째 커밋( 90b3dc4 )를 병합할 때, 94af9ac의 커밋 내용을 유지
                        - 90b3dc4는 squash를 사용할 수 없는데, 그 이유는 명령어를 실행할 때 대상 커밋인 2462291와 rebase하도록 했기 때문
                        - pick : 그냥 그 커밋을 그대로 사용한다는 것
                        - drop : 그 커밋을 버린다는 의미
                - **커밋 메시지 작성**
                    - 수정한 후 편집기를 저장하고 종료 ( **esc** + **:wq!** + **enter** )
                        
                        ![Untitled 23](https://user-images.githubusercontent.com/80798580/142413823-02702ca7-7c16-4eeb-9601-f6a8edadb07b.png)
                        
                        - vi편집기 열림 : 커밋 메시지를 어떻게 남길 것인지를 명시
                            
                            ![Untitled 24](https://user-images.githubusercontent.com/80798580/142413839-93e0f15f-b64e-49b2-8e05-a367434109a6.png)
                            
                        - 주석 처리(#)가 되어 있지 않은 메시지들이 커밋 메시지에 기록
                        - 메시지를 안지워도 local repository에서 log를 확인시 메시지가 보이지X →github에 push를 해보면, 메시지들이 남음
                - **히스토리 확인**
                    
                    ![Untitled 25](https://user-images.githubusercontent.com/80798580/142413851-386d251e-b994-45fd-81c0-4a24a6e9bef5.png)
                    
                    - 히스토리가 잘 지워졌는지 로그를 확인
        - log, checkout, stash, cherry-pick
            - **log**
                - `git log --oneline` : 로그를 한줄씩 간단하게 표현
                - `git log --oneline --graph` : 로그를 그래프로 표현
                    
                    ![Untitled 26](https://user-images.githubusercontent.com/80798580/142413860-b14496a6-ccca-4ed1-abb3-705ae9dcceef.png)
                    
                - `git log --merges` : merge된 log만 필터링
                - `git reflog` : 실행한 모든 명령어의 로그 목록
                - `git log 브랜치1..브랜치2` : 브랜치2에만 있는 히스토리를 보고 싶은 경우
                    - master 브랜치에는 start , master1 , master2 총 3개의 커밋
                    - child 브랜치에는 start , child1 , child2 총 3개의 커밋
                    - git log child..master 명령어를 실행하면 master1, master2 두 브랜치만 조회
                - `git log --grep 검색어` : 커밋 메시지에 특정 단어가 포함된 로그만 조회
                    - `git log --grep Merge` :  커밋 메시지에 "Merge"가 있는 히스토리만 조회
            - **checkout**
                - `git checkout –track { 원격브랜치 }` : 원격 브랜치로부터 로컬 사본을 생성
                - `git checkout -b { 새로운 브랜치명 } { 대상 브랜치 } || git checkout -b { 새로운 브랜치명 } { 원격 저장소명 }/{ 대상 브랜치 }` : 대상 브랜치를 기반으로 새로운 브랜치를 생성한 후, 체크아웃
                - `git checkout { 커밋 ID }` : 히스토리 전부 삭제한채로 해당 버전으로 되돌아감
                    - 이 때 detached from ~~ 의 이름으로 새로운 브랜치가 생성
                    - 이름을 바꾸기 위해서는 `git checkout -b { 브랜치명 }`
                        
                        ![Untitled 27](https://user-images.githubusercontent.com/80798580/142413877-d85f9c68-633d-4ef2-a973-1b95ef9fb883.png)
                        
            - **stash**
                - `git stash` : 현재 작업 내용을 일시적으로 저장, 최근 커밋 상태로 환경 변경
                - `git stash list` : 일시 정지된 stash 목록
                - `git stash stash@{ 번호 }` : 해당 stash의 상세정보
                - `git stash save "메시지"` : stash를 저장할 때 메시지를 작성
                - `git stash apply stash@{ 번호 }` : 급한 작업을 마친 후, 해당 stash로 되돌아감
                - `git stash drop stash@{ 번호 }` : stash를 삭제
            - **cherry-pick**
                - `git cherry-pick { 커밋 ID }` : 다른 브랜치의 커밋 하나를 골라서 현재 브랜치의 커밋으로 추가
    - 그외
        - **.gitignore**
            - Git이 무시할 파일들, 즉 **추적하지 않을 파일들을 정의한 파일**
            - **pycache** 같은 cache 파일, 로그 파일, DB 및 API 키 같은 설정 파일 등은 Github에 공유되서는 안됨
            - **.gitignore 파일 생성**
                - .git 폴더가 존재하는 같은 레벨의 폴더에 생성
                - 버전 관리를 하지 않을 파일 목록들을 작성
                    - **.gitignore 파일에 작성한 파일이 이미 버전 관리가 되고 있으면 git은 이 파일을 원래대로 추적**
                    - 이미 버전 관리가 되고 있는 파일들은 수동으로 삭제
                        - `git rm --cached 파일명` , `git rm --cached 폴더명\ -r`
                        - `git rm --cache` : Staging Area에서 파일을 제거하고 working directory에서는 파일을 유지
                        - 명령어를 실행한 후 꼭 commit
            - **.gitignore 내용 작성**
                - 설정파일, 캐시파일, 로그파일 같이 버전관리가 필요없는 파일들을 명시
                - 어떤 내용들을 작성해야 할지, 빼먹은 것은 없을지 참고 할만한 서비스 👇
                    
                    [gitignore.io](https://www.toptal.com/developers/gitignore)
                    
- GitHub
    - 웹 상에 소스 코드를 올려서 여러 사람과 공유하는 장소
    - 사용방법
        - #1) git 설치
        - #2) 기본흐름
            - git init으로 local storage(.git폴더) 생성
            - git add로 변경파일 stagingarea로 이동
            - git commit으로 add파일을 local storage에 저장
            - git push로 local storage를 remote stage로 업로드
        - #3) 수행
            - gitHub에 repository 생성
            - **cd {업로드할 작업폴더의 위치}** → git cmd에서 입력해 이동
            - **git init** → 해당 폴더를 git이 추적할 수 있도록 .git 폴더 생성 (local repository)
            - **git status** → git이 버전관리 대상 파일들의 상태를 파악할 수 있음
                - 명령어가 동작하지 않을 때 에러 확인
                - 내가 작업한 파일 외에 다른 파일이 수정되진 않았는지 확인
            - **git add .** → 버전 관리할 파일들을 staging area로 추가
            - **git commit -m "msg"** → commit 메시지를 작성 & add내용 local repository에 확정
            - **git remote add origin {remote repository 주소}** → remote repository를 등록
                - origin은 remote repository의 별칭으로 일반적으로 origin 사용
                - 매 번 remote repository의 주소를 입력하는 것이 귀찮으므로 별칭을 사용
                - repository의 주소는 본인의 github에서 업로드할 곳의 repository 주소
            - **git push origin master** → commit 한 내용을 remote repository에 push( 업로드 )
                - master는 브랜치( branch )의 이름
                - remote repository를 생성하면 기본적으로 master 브랜치가 생성
                - 다른 branch로 push 하고 싶으면, 아래와 같이 master를 특정 브랜치명으로 바꿔서 명령어를 실행
                    - git push origin {브랜치명}
        - #4) 깃허브에 업로드
            - 첫 push 후 계속해서 push할 경우
                - 커맨더 창에서 소스코드가 있는 폴더로 이동
                - git add . → git commit -m "msg" → git push origin "브랜치명"
    - 협업시 사용방법 예시
        - A, B, C 3명이 팀을 이뤄 프로젝트를 진행
        - **A는 환경 설정을 마친 프로젝트 파일을 Github에 올립니다.**
            - Github에 repository를 생성하여 B, C를 collaborator로 추가
                
                ![Untitled 28](https://user-images.githubusercontent.com/80798580/142413897-cc31eb92-1201-4bb9-b6f6-36d4dfc26aa0.png)
                
                - B, C가 해당 프로젝트에 pull, push 할 권한 생성
            - A는 각종 기본 라이브러리들을 추가해서 초기 프로젝트를 셋팅 후 깃헙에 업로드
                - `git init` → `git add .` → `git commit -m "프로젝트 시작"` → `git remote add origin 깃헙주소` → `git push origin master`
        - **B, C는 프로젝트 파일을 자신의 PC로 가져옵니다.**
            - B, C는 A가 작업한 프로젝트 파일을 clone해서 가져옴
            - `git clone 깃헙주소` : git clone을 하면 자동으로 remote repository가 등록
        - **A, B, C는 각각 브랜치를 생성하여 작업을 진행합니다.**
            - `git branch brchA` , `git branch brchB` , `git branch brchC` : 각각 자신의 branch를 생성해서 독립된 작업 공간을 마련
            - A, B, C는 깃헙을 공유하고 있는 상황이며, 독립적인 local repository 갖음
            - 각 기능을 끝낼 때 마다 깃헙에 자신의 브랜치 작업본 push / 병합 필요시 master 브랜치에 merge
        - **B가 기능 구현을 마치고 이 파일을 master branch에 병합합니다.**
            - `git add .` → `git commit -m "기능 구현 완료"` → `git checkout master` → `git merge brchB` → `git push origin master`
            - **master 브랜치는 local이든 remote이든 관리만 한다는 것이 핵심**
        - **A, C는 작업 진행 중에 B가 올린 최신 버전을 갖고 와서 이어서 작업을 진행합니다.**
            - `git checkout master` → `git pull origin master`
                - 브랜치를 이동할 때, 작업을 마무리 짓고 commit을 한 후 이동
                - working directory에 작업내용이 있다면 브랜치 이동이 안됨
            - `git checkout brchA` →`git merge master`
                - 최신 버전을 가져와 자신의 작업본에 반영
            - 충돌시 어떤 코드를 적용할지 결정이 하여 수동으로 작업
        - **C의 코드에서 버그가 발생하여 이전 버전으로 돌아가야 합니다.**
            - push를 한 상황이고, 버그가 발생하기까지 총 5번의 commit을 했다고 가정
                
                ![Untitled 29](https://user-images.githubusercontent.com/80798580/142413916-edb460a0-e4c2-4810-8f45-a3df9b5ef087.png)
                
                ![Untitled 30](https://user-images.githubusercontent.com/80798580/142413927-b28bc39c-d845-4c9d-a129-d32f90414e06.png)
                
                - 깃허브에서 commit 이력 확인 가능 / f37a6b7 버전으로 돌아가려 함
                    - `git log --online -10` : log통해 commit 이력 확인 가능
                - `git revert commit번호` : 해당 버전의 commit 번호를 복사해서 revert
                - `git add .` → `git commit -m "기능2로 백업"` → `git push origin brchC`
                - revert : 이력을 남기고 버전을 되돌리는 명령어이므로 기능3, 4, 5에 대한 커밋 이력은 남아있음
                    
                    ![Untitled 31](https://user-images.githubusercontent.com/80798580/142413940-53dd2806-57bd-4311-92fc-53340452d222.png)
                    
- 실제 수행
    
    ![Untitled 32](https://user-images.githubusercontent.com/80798580/142413976-43df6adf-89f3-4735-a1ca-9ca7e0dc575f.png)
    
    ![Untitled 33](https://user-images.githubusercontent.com/80798580/142413987-8d4b73f1-407d-4d30-80c0-89d0c50ecd42.png)
    
    ![Untitled 34](https://user-images.githubusercontent.com/80798580/142413998-e76e4461-a0df-433a-96f9-293cba0f6fb7.png)
    
    - 정상적으로 commit과 remote까진 수행했으나 push에서 오류가 발생
        - GitHub에 현재 존재하는 readme파일 때문에 오류 발생
        - readme파일은 필요하지 않으므로 git push origin +master통해 강제로 push
        - 만약 필요한 파일일 경우 git pull origin master
