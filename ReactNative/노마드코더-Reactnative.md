# Reactnative

일시: 2021년 12월 1일
태그: 공부, 프로그램

<aside>
📌 2021.11 노마드코더 강의 및 간단한 활용을 통한 Reactnative공부

</aside>

---

### 공부

- Expo를 이용한 react native App 개발
- 강의
    - #1) **INTRODUCTION**
        - #1.4 **Installing Requirements**
            
            ![Untitled](Reactnative%2008c70896e6064654a0ef4d1f2fe85dc4/Untitled.png)
            
            - react native 구성요소(인프라)
            - android app- Java & android studio / ios app- xcode
            - Expo - window = npm install —global expo-cli, Mac = brew install watchman
                - react native 인프라 모두 구축되어있음 & js코드 변경가능
                    - 직접 인프라 compile할 필요없음
                - 컴퓨터의 react native 코드를 폰으로 전송
                - 폰안의 react native 코드 실행
            - app store에 등록시 해당 인프라&js 코드 모두 전달
        - #1.5 **How Does React Native Work**
            
            ![Untitled](Reactnative%2008c70896e6064654a0ef4d1f2fe85dc4/Untitled%201.png)
            
            - react native : code를 ios/ java android code로 번역하는 인터페이스
                - 브라우저 미존재, bridge 존재
            
            ![Untitled](Reactnative%2008c70896e6064654a0ef4d1f2fe85dc4/Untitled%202.png)
            
            - react native 동작방식(native앱) : js와 OS의 상호작용
                - 이벤트 발생 → native(android, ios와 같은 OS)가 js에 msg 전송 → js가 msg받아 다른 msg 전송 → native에서 msg받아 UI업데이트
        - #1.6 **Creating The App**
            - expo
                - 앱생성 : expo init app_name
                - 앱실행 : npm start
                - 로그인 : expo login
    - #2) **WEATHER APP**
    - #3) **WORK HARD TRAVEL HARD APP**
    - #4) **PUBLISHING OUR APPS**