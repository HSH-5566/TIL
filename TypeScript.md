# TypeScript

일시: 2021년 11월 18일
태그: 공부, 프로그램

<aside>
📌 2021.11 노마드코더 강의 및 간단한 활용을 통한 Typescript공부

</aside>

![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled.png)

![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%201.png)

![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%202.png)

---

### Typescript

- superset of javascript
- 인터넷 강의 - 노마드 강의
    - #0.2 **Introduction and What are we building**
        - typescript
            - superset of javascript, 언어 예측 가능, 읽기 쉬운 코드 .. js를 더 잘 사용가능
            - 발전된 js라고 생각
        - npm init -y : package.json 파일 생성
            - package.json 생성해 Node 패키지대한 정보, 의존중인 버전에 대한 정보로 node.js에서 사용하는 모듈들을 패키지화해 관리, 배포위해 사용
            - npm : Node Package Manager, node.js에서 사용하는 모듈 패키지화해 관리, 배포
            - package.json : 패키지에 대한 정보, 의존중인 버전에 대한 정보 담고 있음
    - #0.3 **Setting Typescript Up**
        - typescript 환경설정
            - npm install typescript --save-dev 입력
            - tsconfig.json 생성 : ts에게 어떻게 js로 변환하는지 알림
                - compilerOptions
                    - module : node.js 사용 & import, export 가능하게 함
                    - target : 컴파일될 js 버전
                    - sourcemap : sourcemap 처리 유무 true, false
                - include : 어떤 파일이 컴파일 과정에 포함되는 지 알림, 컴파일 과정에서 포함될 파일의 배열
                - exclude
        - 컴파일
            - npx tsc
                - ts파일의 js파일, js.map파일 생성
        - 실행
            - `npm start`: package.json의 scripts에 "start": "node index.js", "prestart": "tsc" 추가
        - node.js는 ts이해불가이므로 js로 컴파일 필요
    - #0.4 **First steps with Typescript**
        - typescript
            - typed언어이므로 변수 타입 설정 필요
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%203.png)
                
                - 함수 호출시 argument 개수 맞추지 않으면 오류 발생 → 버그 방지
                - argument에 ? 붙이면 해당 argument 없어도 함수 실행가능
    - #0.5 **Types in Typescript**
        - typescript 타입 지정
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%204.png)
            
        - typescript 환경설정 - 컴파일 간단하게
            - npm install tsc-watch --save-dev
            - 폴더 추가
                - src : 컴파일 위한 ts파일 모음
                - dist : ts컴파일 후 js.map, js 파일 모음
            - script변경 : `"start": "npx tsc-watch --onSuccess \" node dist/index.js\" "`
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%205.png)
                
            - include 변경 : `"include": ["src/**/*"]`
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%206.png)
                
            - `npm start`
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%207.png)
                
                - ts파일 저장시 바로 컴파일되는 환경 구축
    - #0.6 **Interfaces on Typescript**
        - interface
            - ts에서 지원하는 기능, js에서는 미지원
            - 타입 체크를 위해 사용
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%208.png)
                
                - object의 타입 지정, 함수에서 person이 해당 인터페이스에 맞는지 ts가 체크
    - #0.7 **Classes on Typescript part One**
        - class
            - js에서 interface 사용하고 싶을 때 이용
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%209.png)
                
                - public, private는 js에서 적용안됨 → ts에서만 이용가능
                - private : 해당 클래스 밖에서 접근불가한 속성 → 속성보호가능
    - #0.8 **Blockchain Creating a Block**
        - Block 클래스 생성
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2010.png)
            
            - `let blockchain: [Block] = [genesisBlock];`
                - ts가 Block만 blockchain에 넣을 수 있게함
                - blockchain.push("stuff")은 작동하지 않음
    - #0.9 **Creating a Block part Two**
        - `npm install crypto-js`
            - 해쉬 생성위해 설치
            - `import * as CryptoJs from 'crypto-js';`
        - calculateBlockHash 함수
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2011.png)
            
            - static으로 선언 : Block객체(instance) 생성안해도 호출 가능
            - SHA256이용
        - 그 외 함수
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2012.png)
            
            - getBlockchain : blockchain 반환
            - getLastestBlock :  마지막 blockchain의요소 반환
            - getNewTimeStamp : 현재 날짜를 통해 timestamp생성
    - #0.10 **Creating a Block part Three**
        - createNewBlock : 새로운 블록 생성함수
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2013.png)
            
            - 출력
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2014.png)
                
                - blockchain에 입력하지 않았으므로 index 증가 X
    - #0.11 **Validating Block Structure**
        - validateStructure : validate 함수 생성
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2015.png)
            
        - isBlockValid : 새로운 블록과 이전 블록 비교해 유효성 검사
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2016.png)
            
            - index, hash 등 비교
    - #0.12 **Validating Block Structure part Two**
        - isBlockValid : 검증 요소 추가
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2017.png)
            
            - getHashforBlock : 해당 블록의 hash 계산
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2018.png)
                
        - addBlock : 어떤 Block이 isBlockValid 검증 통과시 blockchain에 push
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2019.png)
            
    - #0.13 **Conclusions**
        - createNewBlock : addBlock 추가
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2020.png)
            
            - createNewBlock시 해당 블록 blockchain에 추가 가능
        - 실행
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2021.png)
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2022.png)
            
    
    > typescript를 사용하면 변수, 함수 등의 타입 체크 쉬움
    > 
    > 
    > 개발자의 실수를 줄여주고 어떤 값이 입력 되어야 하는지 확인 가능
    > 
- 유튜브 - 코딩앙마 강의
    - #1) 타입스크립트 사용이유
        - 브라우저는 ts이해못함 → js로 변환이 필요
        - js(동적언어) : 실행 시점, 런타임에 타입결정 & 오류발견
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2023.png)
            
        - java, ts(정적언어) : 컴파일 타임에 타입결정 & 오류발견
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2024.png)
            
        - 환경설정없이 typescript 실행 사이트
            
            [TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play)
            
    - #2) 기본타입
        - 타입부여 : ':자료형'
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2025.png)
            
        - 튜플
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2026.png)
            
        - void: 함수에서 반환값 없을 경우
        - never: 무한루프 또는 Error 반환
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2027.png)
            
        - enum : 비슷한 값끼리 묶음
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2028.png)
            
        - null, undefined
    - #3) 인터페이스
        - 인터페이스에서 object정의
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2029.png)
            
            - interface User
                - ? : 해당 요소 없어도 생성가능, 선택적 매개변수
                - readonly : 해당 요소 정의 후 변경 불가
                - type Score : A, B, C, D만 입력가능
        - 인터페이스에서 함수정의
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2030.png)
            
        - 인터페이스에서 class정의
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2031.png)
            
            - extends : interface 확장 가능, 여러개 확장도 가능
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2032.png)
                
            - implements : class에서 해당 interface 상속 받음
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2033.png)
                
    - #4) 함수
        - ? : 선택적 매개변수
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2034.png)
            
            - 함수생성시 선택적매개변수가 가장 앞에 오면안됨
            - 이 경우 undefined 이용
        - ... : 나머지 매개변수 타입, 전달받은 매개변수를 배열로 나타낼 수 있음
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2035.png)
            
        - this 타입 정의
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2036.png)
            
            - 매개변수 전달 시 this제외하고 입력됨
        - 오버로드 : 동일한 함수지만 매개변수 타입, 개수 따라 다른 방식으로 동작해야할 때 사용
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2037.png)
            
            - san, jane이 string반환할지 User객체 반환할지 확신없어 오버로드 이용
                - 함수내에선 분기처리 되어있으나 타입만 보고는 알 수 없기 때문
    - #5) 리터럴, 유니온/교차 타입
        - 리터럴 타입
            - 문자열 리터럴 타입 : const와 같이 정해진 string 값 가짐 ex) `const a = "bob"`
            - 숫자형 리터럴 타입 : 정해진 숫자 값 가짐 ex) `type a = 1 | 2 | 3`
        - 유니온 타입 : | , A 또는 B로 OR의미 → 여러 타입 중 선택 가능하게 함
            - 식별가능한 유니온 타입 : 동일한 속성의 이름을 다르게하여 구분가능하게 함
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2038.png)
                
        - 교차 타입 : &, A와 B로 AND의미 → 여러개의 타입을 하나로 합침
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2039.png)
            
    - #6) 클래스
        - ts에서 class 작성
            - 멤버변수 미리 선언 필요
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2040.png)
                
            - 멤버변수 미리 선언 안할 경우 : public, readonly 키워드 붙임
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2041.png)
                
        - 접근제한자 : ts에서 지원
            - public : 자식 클래스, 클래스 인스턴스 모두 접근가능, 명시하지 않을 경우도 public
            - private : 해당 class내부에서만 접근가능, `#변수`의 경우도 private
            - protected : 자식은 접근가능하나 클래스 인스턴스로 접근 불가
        - static : 정적 멤버변수 생성
            - `this.static변수이름`이 아니라 `class명.static변수이름`으로 접근
        - 추상 class
            - `abstract class 이름 {}`
            - new로 생성 불가, 상속(extends)를 이용해서만 사용가능
            - `abstract function()`  : 상속 받은 쪽에서 구현해야함
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2042.png)
                
    - #7) 제네릭
        - <T> : 클래스, 함수, 인터페이스를 다양한 타입으로 재사용 가능하게함
            - 선언시 타입 파라미터만 작성, 생성시점에 사용하는 타입 결정
                
                ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2043.png)
                
        - interface에서 제네릭 이용
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2044.png)
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2045.png)
            
            - <T extends {name:string}> : T가 {name:string}을 확장한 형태가 와야한다는 뜻
    - #8) 유틸리티 타입
        - keyof
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2046.png)
            
            - `type UserKey = keyof User` ===`type UserKey ='id' | 'name' | 'age' | 'gender'`
        - Partial<T>
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2047.png)
            
            - property를 모두 optional로 변경(선택적 매개변수)
            - admin에서 User에 없는 property사용시 Error
        - Required<T>
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2048.png)
            
            - 모든 property를 필수로 변경
        - Readonly<T>
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2049.png)
            
            - 읽기전용으로 변경 → 첫 할당만 가능, 수정 불가
        - Record<K, T> : K: key, T:type
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2050.png)
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2051.png)
            
        - Pick<T, K>
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2052.png)
            
            - T 타입에서 K property만 픽함
                - User에서 id와 name만 가져와서 사용가능
        - Omit<T, K> → property제거
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2053.png)
            
            - 특정 property 생략하고 사용 가능
                - User에서 age와 gender 제외하고 사용
        - Exclude<T1, T2> → type제거
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2054.png)
            
            - T1 타입에서 T2 타입을 제외하고 사용
                - T1에서 number, string을 제외한 boolean만 T2 타입이 됨
        - NonNullable<Type>
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2055.png)
            
            - null과 undefined 제외한 타입만 남김
        - 
- 간단 프로젝트
    - 환경설정
        - react에 typescript 적용
            - `npm install typescript @types/node @types/react @types/react-dom @types/jest @types/react-router-dom`
            - js → ts / jsx → tsx
        - 실행
            - `json-server —watch ./src/db/data.json —port 3001`
            - `npm start`
    - 프로젝트
        
        기존에 했던 단어장 프로젝트의 js 파일을 tsx, ts 파일로 변환하고 타입을 적용하였다.
        
        ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2056.png)
        
        - Word.tsx
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2057.png)
            
            - json에 있는 word 데이터를 통해 IWord interface를 만들고 이를 IProps의 word의 타입으로 주어 word 타입을 지정하였다.
        - Day.tsx
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2058.png)
            
            - 위의 IWord interface를 import하여 words에 배열로 타입을 지정하였으며 day의 타입을 string으로 지정하였다.
        - DayList.tsx
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2059.png)
            
            - json에 있는 day 데이터를 통해 Iday interface를 만들고 이를 day에 배열로 주어 타입을 지정하였다.
        - CreateWord.tsx
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2060.png)
            
            - 위의 Iday를 import 하여 days의 타입을 배열로 지정하였으며 form에서 이용되는 onSubmit의 event에 React.FormEvent라는 타입을 주었다.
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2061.png)
            
            - 영어, 한국어입력 부분을 HTMLInputElement 타입, 날짜 입력 부분을 HTMLSelectElement 타입으로 설정하였다.
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2062.png)
            
            - 해당 부분이 null이 아님을 보장하기 위해 조건문을 이용하였다.
        - useFetch.ts
            
            ![Untitled](TypeScript%20b1e987ad39974e4fb44b2596d8dbed43/Untitled%2063.png)
            
            - useFetch()의 경우 jsx를 return 하지 않으므로 ts파일로 변환하였다.
            - url의 타입을 string으로 지정하였다.
