# Javascript / JQuery

## 2022.01.18 Javascript

### 1. Closer (클로져)

- 지역변수를 외부에서도 참조할 수 있는 함수
  ```javascript
  function foo() {
    var x = 1;
    return {
      increase: function () {
        x++;
      },
      getX: function () {
        return x;
      },
    };
  }
  var result = foo();
  result.increase();
  console.log(result.getX());
  result.increase();
  console.log(result.getX());
  ```

### 2. 객체

- 종류
  - 사용자 정의 객체: 사용자가 정의한 객체
  - 내장 객체: 이미 정의된 객체 Date, Array, Number,,,
  - 브라우저 내장 객체: 브라우저 수행 시 생성
- 객체 리터럴: Object 생성자보다는 객체 리터럴 주로 이용
  - 중괄호로 감쌈
  - 프로퍼티와 메서드 ,로 분리
  - 프로퍼티 명과 프로퍼티 값을 :으로 분리
- 사용자 정의 객체 (생성자 함수)

  ```javascript
  const Person = function (name) {
    this.name = name;
    this.say = function () {
      return `I am ${this.name}`;
    };
  };
  const admin = new Person("MEME");
  console.log(admin.say());
  ```

  - prototype: 모든 객체는 프로토타입이 존재, 객체 생성시 상속받음
  - 메모리에 한번만 올라가 참조: 같은내용이 여러번 메모리에 올라가지않음(개별로 함수 생성시 값 복사하여 여러번 메모리에 올라감)

    ```javascript
    const Person = function (name) {
      this.name = name;
    };
    Person.prototype.say = function () {
      return `I am ${this.name}`;
    };
    var me = new Person("me");
    var na = new Person("na");
    console.log(me.say(), na.say());
    ```

  - 프로토 타입 추가/변경 가능

  ```javascript
  String.prototype.say = function () {
    return `I am ${this}`;
  };
  console.log("dam".say());
  ```

  - 동적으로 메소드 추가

  ```javascript
  var Member = function (first, last) {
    this.first = first;
    this.last = last;
  };
  var mem = new Member("na", "ni");
  mem.getName = function () {
    return `${this.first}, ${this.last}`;
  }; //생성된 인스턴스에 메소드 추가
  console.log(mem.getName());
  var mem2 = new Member("22", "333");
  console.log(mem2.getName()); //Err ~> mem.getName = function
  ```

  ```

  ```

- 내장객체
  - Date
    ```javascript
    today = new Date();
    str = today.getYear() + "년";
    str += today.getMonth() + 1 + "월";
    str += today.getDate() + "일";
    document.write(str);
    str = today.getHours() + "시";
    str += today.getMinutes() + "분";
    str += today.getSeconds() + "초";
    document.write(str);
    ```
  - history
    - forward(): 앞으로 이동
    - back(): 뒤로 이동
    - go(): 임의의 위치로 이동
    ```javascript
    <input
      type="button"
      onclick="javascript:history.back(-1);"
      value="history.back(-1)"
    />
    <input
      type="button"
      onclick="javascript:history.forward(-1);"
      value="history.forward(-1)"
    />
    <input
      type="button"
      onclick="javascript:history.go(-1);"
      value="history.go(-1)"
    />
    ```
- 브라우저 객체
  - location: 현재 페이지의 url을 조회하거나 새로운 페이지로 이동
  - navigator

### 3. DOM(Document Object Model)

- 특징
  - HTML과 XML문서에 대한 프로그래밍 인터페이스
  - 문서에 대한 구조적 정보를 제공
  - 브라우저마다 DOM 접근 방식달라 크로스 브라우징 필요(현재는 IE만)
- 요소 선택
  - document.getElementById("id")
  - document.getElementByName("name")
  - document.getElementByTagName("name")
  - etc...
  ```javascript
  var byName = document.getElementById("testId");
  document.write("-----" + byName.type + "-----");
  document.write("-----" + byName.name + "-----");
  document.write("-----" + byName.value + "-----");
  byName.type = "text";
  byName.value = "값변경ㅇㅇ";
  document.write("-----" + byName.value + "-----");
  function innerHTMLTest() {
    var div = document.getElementsByTagName("div");
    div[0].innerHTML = "HIHIHI";
  }
  innerHTMLTest();
  ```

> 공부

- Scope chain
- 왜 .name이 undefined?
  - https://violetboralee.medium.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%86%8D%EC%84%B1-attribute-%EA%B3%BC-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0-property-d2f9b772addf
  - http://html.elex.pe.kr/reference/div
  - div 표준속성에 name이 없어 getattribute나 attributes이용해 가져와야.

> 과제

- this대해 조사, 샘플예제 첨부
  - function sample(){} (함수 선언문)에서 this
  - new키워드를 사용한 인스턴스 객체에서의 this
  - ()=>{}에로우함수에서의 this
