# warning: LF will be replaced by CRLF
### React Native Weather App 개발 중 `git add .`을 입력하자 다음과 같은 경고 출력됨
```
 warning: LF will be replaced by CRLF in Weather/App.js.
The file will have its original line endings in your working directory
```
- 서로 다른 OS로 작업하는 개발자들이 Git으로 협업할 때 발생하는 Whitspace 오류하고 한다.
- 유닉스 시스템상에서는 한 줄의 끝이 LF(Line Feed)로 이루어져있지만, 윈도우에서는 줄 하나가 CR(Carriage Return)과 LF(Line Feed) 즉 CRLF로 이루어지기 때문


## 해결방법1
<hr>

### 서로 다른 OS로 작업하는 개발자들이 Git으로 협업할 때 발생한 오류 였다면,
- Git의 core.autocrlf 기능을 켜면 해결가능
- 개발자가 Git에 코드를 commit했을 때, LF와 CRLF로 서로 서로 변환해주는 기능
```
git config --global core.autocrlf true
```

## 해결방법2
<hr>

### 그런데 나의 경우 개인적인 작업에서 해당 오류가 발생하였으므로 vscode나 git 오류로 추정됨

- 따라서 위와 같은 변환 기능을 원하지 않고, 해당 에러 메시지를 끄고 작업하기를 원하므로 아래와 같이 설정함
```
git config --global core.safecrlf false
```