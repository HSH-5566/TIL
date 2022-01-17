# Javascript / JQuery
## 2022.01.14 Javascript
### Javascript
- JAVA의 문법을 채용했으나 다름
- 형식이 자유로움
    - type 미검사
- ECMAScript명세에 맞춰 JavaScript 모듈이 구현됨
    - 웹 표준 구현
    - 크로스 브라우징: 테스트 중요
- use strict 모드: 브라우저에서 JS의 문법 검사
    <pre>
    <code>
        "use strict";
        function testFunction(){
            var testvar = 4;
            return testvar;
        }
        testvar = 5;
    </code>
    <code>
        y= 3.14; //err 없음
        myFunction();
        function myFunction(){
            "use strict"; // 지역함수 선언
            x= 3.14; //err: use strict가 지역적으로 검증
        }
    </code>
    </pre>
- 변수
    - 선언
        - var
        - const: 상수 - 초기화 후 값변경 불가
        - let: 변수 - 초기화 후 값변경 가능
    - 호이스팅: 변수가 자동으로 위에서 선언
- 자료형
    - Number: 정수, 실수
    - Boolean: true / false
    - String: 문자
    - null: 값 미할당, 대소문자 구분(Null, NULL 불가)
    - undefined: 값 미정의

> 과제
- 자바스크립트 자료형대해 자료조사
- var, let, const 키워드 조사, 차이점 예제 첨부해 메일로 전송
zerocooldog@pionnet.co.kr - 월요일 제출