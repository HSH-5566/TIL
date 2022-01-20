# Javascript / JQuery

## 2022.01.20 Javascript

### 1. JQuery

- js로 만든 라이브러리: vanila js보다 쉬운 문법으로 개발
- 특징

  - CSS 셀렉터
  - 플러그인 아키텍쳐
  - 메서드 체인
    - 자바에서는 Builder 패턴
      ```
      Builder b = new Builder().a().b();
      ```
  - 크로스 브라우저

- 문법
  - $(document).ready(): 페이지에 로드 전에 js 실행
    - onload 속성과 비슷
- 성능향상위해 페이지 하단(`</body>`)에 script
- 선택자
  - `$("*") / $("#id") / $(".class") / $("element") / $(".class, element")`
  - 속성
    - `$(Selector[attr]) / $(Selector[attr = "value"]) / ...`
    - `$(Selector[attr!='value']) / $(Selector[attr ^='value']): value로 시작하는 값 선택 / $(Selector[attr $='value']): value로 끝나는 값 선택`
  - 계층
    - `$('parent' > 'child') / $('prev' ~ 'sibling') / ...`
  - filter
    - `:even / :odd / :last / :focus / ...`
- 메서드
  - CSS: `$(element).css('color','red')`
  - Class: `.hasClass() / .addClass() / .removeClass() / .toggleClass()`
  - Attribute: `.attr() / .removeAttr() / .val() / .text() / .html()`
  - form API: 사용자 데이터를 서버에 전송하기 전에 검증
    - `.serialize() / .serializeArray() / .submit()`
- 이벤트 함수
  - `.blur() / .click() / .focus() / .hover() / .change() / ...`
- `.on()` : 이벤트 연결 함수, 동적이벤트 발생하도록 추가
  - `$(element).on('click', function(){})`
- DOM추가제거
  - `.append() / .appendTo() : 사용방법에 차이 / .prepend() / ...`

> 공부

- https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf
- https://d2.naver.com/helloworld/59361
- async await 키워드 사용법 / Promise 사용법
- 이벤트 버블링 캡쳐링

  > 과제

- 장바구니
  - 수량조절 같은 자주 사용 부분 공통함수
  - DOM / Jquery 버전 2가지
