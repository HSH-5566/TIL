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
            - ScrollView : 수직 스크롤이 가능한 View 생성, flex속성 줄필요 없음(Screen보다 커야하므로)
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
                - import { Dimensions } from 'react-native';
                - Dimensions.get('window').width
                - const {width : WIDTH, height : HEIGHT} = Dimensions.get('window')
        - #2.7 **Location**
            - Geo Location
                - `expo install expo-location`
                - Method
                    - requestPermissionsAsync() : 유저권한 요청, 더이상 사용X
                    - requesForegroundtPermissionsAsync(): 앱 사용 중에만 위치추적
                    - requestBackgroundPermissionsAsync(): 앱 사용외에도 위치추적
                    - getLastKnownPositionAsync(): 유저 마지막 위치
                    - getCurrentPositionAsync(): 유저의 현재 위치
                        - accuracy : 정확도 옵션 1~6
                    - watchPositionAsync(): 유저 위치 관찰
                    - geocodeAsync(addr): 주소를 받아서 위도와 경도로 반환
                    - geocodeAsync(location): 위도 경도를 받아 도시, 구역 반환
                    - Geofencing메소드: 유저가 특정지역 벗어났을 시 알림
        - #2.8 **Weather**
            - openweather API 이용
                - API key의 경우 서버에 탑재 ~>보안
                - OneCallAPI: 7일간의 예보
            - ActivityIndicator: 로딩출력 Component
        - #2.9 **Recap**
            - toFix(1) : 소수점 한자리만 갖게 함
        - #2.10 **Icons**
            - expo/vector-icons : 아이콘 라이브러리
            - `import {Fontisto } from '@expo/vector=icons'`
            - [icons.expo.fyi](http://icons.expo.fyi) : 가능한 아이콘 확인
            - <Fontisto name="" size={} color="">
            - ... :  스프레드 연산자 ,ES6 JS문법
    - #3) **WORK HARD TRAVEL HARD APP**
        - #3.1 **Touchables**
            - TouchableOpacity: 누르는 이벤트를 Listen할 준비가 된 View, 누른 요소를 투명하게하는 애니메이션 존재
                - activeOpacity: 투명도 조절
                - onPress: 클릭시 실행되는 이벤트
            - TouchableHighlight: 클릭시 배경 변경
                - activeOpacity: 투명도 조절
                - onPress: 클릭시 실행되는 이벤트
                - underlayColor: 변경되는 배경색 설정
            - TouchableWithoutFeedback: 화면 가장위에 일어나는 탭 이벤트 listen, UI변화없음(애니메이션없음)
                - onPress: 클릭시 실행되는 이벤트
            - pressable: TouchableOpacity의 발전된 버전
                - delayLongPress: 누르는 시간을 얼마나해야 이벤트 작동할지 설정
                - hitSlope: 요소바깥 어디까지 탭 누르는 것 감지할지 설정
        - #3.2 **TextInput**
            - TextInput: reactnative에서 text작성가능한 유일한 방법
                - placeholder
                - onFocus
                - onChangeText: 입력받은 내용 감지
                - onSubmitEditing: 키보드 입력버튼 클릭시 발생
                - keyboardType: 이메일, 주소,,, 키보드 타입으로 변경 ex) number-pad
                - returnkeyType: 키보드의 전송버튼 타입 변경 ex) send
                - secureTextEntry: 비밀번호 형식 출력
                - multiline: 여러줄작성시
        - #3.3 **To Dos /** #3.4 **Paint To Dos**
            - Object.assign(target오브젝트, source1, 2,,,): 오브젝트 합쳐서 반환
            - Object.keys(x)
        - #3.5 **Persist**
            - 메뉴따라 다른 오브젝트 출력 : toDos[key].working === working 비교
            - AsyncStorage
                - expo install @react-native-async-storage/async-storage
                - import AsyncStorage from '@react-native-async-storage/async-storage';
                - 사용방법
                    
                    [Usage | Async Storage](https://react-native-async-storage.github.io/async-storage/docs/usage/)
                    
        - #3.6 **Delete**
            - 삭제 로직
                - const newToDos = {...toDos} // toDos 새로운 변수 생성
                - delete newToDos[key] // key(id)에 해당하는 값 삭제
                - setToDos(newToDos) // toDos에 저장
                - await saveToDos(newToDos) // asyncStorage에 저장
            - Alert API
                - Alert.alert("제목","내용",{{text:"no"},{text:"yes", onPress={}}})
            - callBack: 버튼 클릭시 일어나는 동작
    - #4) **PUBLISHING OUR APPS**
        - #4.0 **Introduction**
            - publish: expo의 publish 이용, expo서버로 전송
            - 안드로이드, IOS, 웹 사이트(react native web) 가능
            - react native web: react native 코드를 html로 변형
        - #4.1 **React Native Web**
            - app.js: IOS, 안드로이드, 웹 환경설정 가능
            - assets
                - adaptive-icon: 안드로이드 아이콘
                - favicon: 웹 즐겨찾기 아이콘
                - icon: 구글, IOS 아이콘
                - splash: 앱 로드전에 보이는 화면
            - Platform API
                - 현재 플랫폼 확인 가능
                - ex) Platform.OS==='web'
        - #4.2 **Building for App Stores**
            - expo build:android || expo build:ios
                - expo서버에서 앱스토어에 보낼 수 있는 앱 제작
            - reactnative windows, MacOs
                - 윈도우, Mac에서 작동하는 앱 제작가능
            - ViroReact, ViroMedia
                - VR용 React Native
            - 웹사이트에 게시
                
                [Publishing Websites - Expo Documentation](https://docs.expo.dev/distribution/publishing-websites/)
                
                - npm i gh-pages
                - package.json에 deploy, predeploy 추가
                - npm run deploy
        - #4.3 **Going Native**
            - expo 단점
                - 기초적인 파일(infrastructure)에 접근 불가
                - 앱 크기가 매우 큼: 사용하지 않는 expo SDK도 포함하여 앱 제작
            - create react-native-app app_name
                - 기초적인 파일(infrastructure)에 접근 가능 & 모든 expo SDK 접근 가능