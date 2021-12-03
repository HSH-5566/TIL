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
            
            ![Untitled](https://user-images.githubusercontent.com/80798580/144238712-5a7544a1-7981-4028-a9de-9f10bb4219da.png)
            
            - react native 구성요소(인프라)
            - android app- Java & android studio / ios app- xcode
            - Expo - window = npm install —global expo-cli, Mac = brew install watchman
                - react native 인프라 모두 구축되어있음 & js코드 변경가능
                    - 직접 인프라 compile할 필요없음
                - 컴퓨터의 react native 코드를 폰으로 전송
                - 폰안의 react native 코드 실행
            - app store에 등록시 해당 인프라&js 코드 모두 전달
        - #1.5 **How Does React Native Work**
            
            ![Untitled 1](https://user-images.githubusercontent.com/80798580/144238775-5b99be6f-4259-4051-99d3-9492fbc331da.png)
            
            - react native : code를 ios/ java android code로 번역하는 인터페이스
                - 브라우저 미존재, bridge 존재
            
            ![Untitled 2](https://user-images.githubusercontent.com/80798580/144238752-68c2a995-c659-48c9-a282-0f48f971bce9.png)
            
            - react native 동작방식(native앱) : js와 OS의 상호작용
                - 이벤트 발생 → native(android, ios와 같은 OS)가 js에 msg 전송 → js가 msg받아 다른 msg 전송 → native에서 msg받아 UI업데이트
        - #1.6 **Creating The App**
            - expo
                - 앱생성 : expo init app_name
                - 앱실행 : npm start
                - 로그인 : expo login
    
    - #2) **WEATHER APP**
        - #2.0 **Snack**
            - [snack.expo.dev](http://snack.expo.dev) : 브라우저에서 react 어플리케이션 만들도록 지원하는 온라인 코드에디터
        - #2.1 **The Rules of Native**
            - View 컴포넌트 : react native는 브라우저가 아니므로 div사용불가
            - Text 컴포넌트: 모든 텍스트를 입력
            - 일부 style css 사용 불가 ex) border: 1px green solid
            - StyleSheet.create({}) : 오브젝트 생성, 자동완성 기능 지원
            - status-bar 컴포넌트 : 상단의 시계, 배터리, 와이파이 등
                - 화면에 표시되지 않는 컴포넌트
                - OS와 상호작용위한 컴포넌트
        - #2.2 **React Native Packages / #**2.3 **Third Party Packages**
            - [reactnative.dev](http://reactnative.dev) : reactNative에 대한 document 확인 가능
            - reactNative에서 여러 API 컴포넌트 등 지원 중단
            - [reactnative.direct](http://reactnative.direct) : third party와 API지원
            - Expo SDK : expo에서 자체적으로 만든 API, Packages
                - ~>reactNative에서 여러 API, 컴포넌트 등 지원 중단
        - #2.4 **Layout System**
            - 기본적으로 모든 View는 flex
            - flexDirection 기본값 column
            - 레이아웃 구성 시 비율 이용 ex) <View style={{flex: 1}}></View>
                - 부모의 flex비율 따라 자식에게 flex비율 적용
                    - ex) `<View style={{flex: 1}}>
                                <View style={{flex: 1}}></View>
                                <View style={{flex: 1}}></View>
                        </View>`
        - #2.5 **Styles /** #2.6 **Styles part Two**
            - expo console
                - r : reload
                - m : 토글바 메뉴
            - ScrollView : 수직 스크롤이 가능한 View 생성
                - props
                    - horizontal : 수평 스크롤로 변경(내부의 View 수평정렬)
                    - contentContainerStyle : ScrollView 사용 시 ScrollView 스타일 적용할 경우 스style props (style={}) 사용 불가
                        - contentContainerStyle = {styles.container}
                    - pagingEnabled : 자유로운 스크롤 방지, 대신 페이지 생성
                    - showHorizontalScrollIndicator : 스크롤 숨기기
                        - showHorizontalScrollIndicator = {false}
                    - indicatorStyle : 스크롤 스타일 변경, iOS에서만 동작
                        - indicatorStyle = "white"
            - element inspector : 크롬 개발자 도구와 유사, css 확인가능
            - Dimensions API : 화면의 크기 가져옴
                - Dimensions.get('window').width
                - const {width : WIDTH, height : HEIGHT} = Dimensions.get('window')
        - #2.6 **Location**
            - 
        - #2.7 **Weather**
    - #3) **WORK HARD TRAVEL HARD APP**
    - #4) **PUBLISHING OUR APPS**
