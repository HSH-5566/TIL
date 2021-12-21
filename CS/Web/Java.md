#### https://minchoi0912.tistory.com/93

# OOP(객체지향프로그래밍)

### 객체와 객체의 유기적인 상호작용 통해 프로그램이 동작하는 것

### 코드 재사용 및 유지보수 용이

### <->절차지향 : 순차적인 처리 중시, 프로그램 전체가 유기적 연결, C언어, 컴퓨터 작업 처리방식과 유사

# 자바의 장점 / 단점

### 자바 가상머신위에서 동작하므로 OS에 독립적

### 오픈 소스 프로젝트(아파치, 스프링 등)가 많아 짧은 개발기간 내 안정적인 프로그램 구현

### 속도가 느림 But 하드웨어 성능발전으로 JVM 기능의 향상되어 속도 격차 줄어듦

# 메모리 영역

### 메소드 영역 : static변수, 전역변수, class정보 등

### stack : 지역변수, 함수, 메서드

### heap : new 연산자 통해 동적할당 된 객체저장, 가비지 컬렉션의해 관리

# Primitive type / Referenece type

### 기본형 : stack 메모리 영역에 실제 값 저장하는 데이터 타입, call by value, byte / short / int / long / float / double / char / boolean

### 참조형 : 메모리 상에 객체가 있는 위치 저장하는 것, 실제 값은 heap에 저장되고 stack에는 메모리 주소만 저장, call by reference, String / class / interface / new연산자로 정의

# 가비지 컬렉션

### 시스템에서 더 이상 사용않는 동적할당된 메모리 블록 찾아 사용가능한 자원으로 회수하는 것

### 자동으로 이루어지므로 메모리 영역관리 불필요

# 전역변수 / 지역변수

### 전역변수 : 함수바깥에 선언해 클래스 전체에서 사용가능한 변수

### 지역변수 : 함수 속에서 선언해 해당 함수 내에서만 사용가능한 변수

# static(정적멤버)

### 메모리 공간 할당 시 처음 설정된 메모리 공간이 변하지 않는 것

### 객체 생성 않고도 사용가능한 필드, 메소드, 객체마다 가질 필요없는 공통 데이터의 경우 static으로 선언

### 객체 생성 않고 사용가능하여 인스턴스 필드, 메소드를 내부에서 사용 불가

# 쓰레드

### 프로세스 내 실제 작업 수행하는 주체

### 모든 프로세스는 1개 이상의 쓰레드가 존재

### 멀티 스레드 프로세스 = 두개 이상의 쓰레드 가지는 프로세스

# JDBC

### JAVA에서 DB 종류 관계없이 DB에 쉽게 접근가능하게 하는 API

### Connection, PreparedStatement, ResultSet 등 여러 클래스 생성 Exception처리해야하는 번거로움 (코드반복, 생상성저하)

### Spring JDBC : 기존 JDBC 단점 극복, 반복적 작업 대신함

- ConnectionPool : DB와 항상 연결되어 있는 객체들, DB와의 연결위해 사용하는 객체
- DataSource : ConnectionPool 관리객체, 커넥션풀 이용해 연결&반납 작업수행
- pom.xml에서 dependency 추가

# Singleton

### 하나의 클래스에 하나의 인스턴스만 만들어 사용위한 패턴

### 커넥션풀과 같은 객체는 인스턴스 여러개 생성시 자원낭비이므로 하나만 생성하는 것이 효율적

### 생성자에 private 접근 제어자 통해 인스턴스 생성 제약 & 단일 객체 반환 가능하도록 정적메소드 지원

# JDK / SDK

### JDK : 자바 프로그램 개발도구, 자바 application 구축위한 핵심 플랫폼 구성요소

### SDK : 개발위한 클래스, 컴파일러, 실행도구, 디버깅툴, 튜토리얼 등을 모아놓은 환경을 제공하는 것

# StringBuilder

### String과 문자열 더할 때 기존의 데이터에 더하는 방식 이용

- 속도 빠르고 부하가 적음
- append()로 문자열 더함
- toString()으로 만들어진 문바열 String으로 변환
<pre>
<code>
    StringBuilder sb = new StringBuilder();
    sb.append("A");
    sb.append("B");
    System.out.print(sb.toString());
</code>
</pre>

### <-> String: 불변 객체, String+String연산시 새로운 String 생성해 메모리 할당, 해제 발생시켜 연산 많아지면 성능 하락

# equals와 ==

### 공통

- 비교한 값을 boolean type으로 변환

### 차이

- equals()
  - 메소드
  - 비교 대상의 내용 자체 비교
- ==
  - 비교를 위한 연산자
  - 비교 대상의 주소값 비교

### 주소값

- CBV: 대상에 주소값 가지지 않는 것으로 값 할당 받는 형태로 사용
  - primitive type: int, float, double, byte
- CBR: 대상을 선언 시 주소값 부여, 객체 불러올때 주소값 불러온 것
  - Class, Object

# final과 static

### final: 상속불가, 변할 수 없는 상속선언에 사용

- final 변수: 초기화만 가능한 변수, 새로운 값 할당 불가한 상수가 됨

  `static final int a = 10;`

- final 클래스: 상속 불가 클래스, abstract사용불가
  `final [접근제한자] 클래스명`
- final 메소드: 상속받은 클래스의 오버라이딩 재정의 제한

### static: 공용 변수를 만들 때 사용되는 예약어

- static 변수(클래스 변수): 클래스의 모든 객체가 공유 가능, 클래스객체 생성없이도 호출가능

  `static변수존재클래스.static변수명`

- static 메소드(클래스 메소드): 어느 객체 내용에도 의존적이지 않은 하나의 작업 수행, 오버라이딩 불가&메소드 숨김 발생해 상속받은 클래스에서 사용불가
- static초기화블록: 클래스에서 static 키워드만 이용해 초기화 블록으로 이용가능, main보다 먼저 수행됨
  `static { }`
  static import: 다른 클래스의 static멤버 사용위한 선언

  `import static packageName.ClassName.staticMembetName`

  `import static packageName.ClassName.*`

# 문자열 자르기

### substring

- `String.substring(start)` //문자열 start위치부터 끝까지 문자열 자르기
- `String.substring(start,end)` //문자열 start위치 부터 end전까지 문자열 발췌

### split

- 특정문자 기준으로 문자열잘라 배열에 저장
- `문자열배열 = 대상문자열.split("기준문자");`
- ex) `String[] array = str.split("#");`
