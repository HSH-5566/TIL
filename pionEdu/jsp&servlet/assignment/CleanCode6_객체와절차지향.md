# Clean code 6장 : 객체와 자료구조

[ 자료 추상화 ]

- 구현을 감추기 위해 추상화 이용 : 단순히 변수 사이에 함수를 넣는다고 구현이 숨겨지지 않으므로 추상 인터페이스 제공해 사용자가 구현 모르고 자료 핵심 조작할 수 있어야 함
- 변수 그대로 반환하는 구체적인 클래스

```java
public interface Vehicle {
	public getFuelThankCapacityInGallons();
	public getGallonsOfGasoline();
}
```

- 추상적인 개념(백분율)으로 반환하는 추상적인 클래스

```java
public interface Vehicle {
	double getPercentFuelRemaining();
	}
```

> 자료를 세세히 공개하는 것 보다 추상적인 개념으로 표현하는게 더 좋음

[ 자료 / 객체 비대칭 ]

- 자료구조 : 자료를 그대로 공개하고 별다른 함수 제공하지 않음
  -     별다른 동작없이 자료 노출해 새 동작(함수) 추가 쉬움
- 객체 : 추상화 뒤로 자료를 숨긴 채 자료 다루는 함수만 공개 - 동작을 공개하고 자료를 숨겨 새 객체 타입 추가 쉬움
  >     객체와 자료구조는 근본적으로 양분 (상호보완적)
- 절차적인 코드 : 새로운 함수를 추가할 경우 유리
  -     기존 클래스 그대로 새로운 함수 추가 쉬움
  - 새로운 자료구조 추가 어려움 : 클래스의 모든 함수 수정 필요
- 객체지향 코드 : 새로운 자료 타입이 필요할 경우 유리 - 기존 함수 그대로 새로운 클래스 추가하기 쉬움 - 새로운 함수를 추가하기 어려움 : 모든 클래스 수정 필요
  >     객체지향 코드에서 어려운 변경은 절차적인 코드에서 쉽고, 절차적인 코드에서 어려운 변경은 객체지향 코드에서 쉬움

[ 디미터 법칙 ]

- 모듈이 자신이 조작하는 객체의 속사정을 몰라야한다는 법칙
- 클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출

  - 클래스 C
  - f가 생성한 객체
  - f 인수로 넘어온 객체
  - C 인스턴스 변수에 저장된 객체
  - 단, 위 객체에서 허용된 메서드가 반환하는 객체의 메서드를 호출하면 안됨

  ```java
  class Demeter {
  private Member member;
  public myMethod(OtherObj other) {
  // ...
  }
  public LawOfDemeter(Paramemter param) {
  myMethod(); // 1. 객체 자신의 메서드
  param.paramMethod(); // 2. 메서드의 파라미터로 넘어온 객체들의 메서드
  Local local = new Local(); // 3. 메서드 내부에서 생성, 초기화된 객체의 메서드
  local.localMethod();
  member.memberMethod(); // 4. 인스턴스 변수로 가지고 있는 객체가 소유한 메서드
  }
  }
  ```

- 기차충돌 : 객체가 한 줄로 이어진 것처럼 보여 분리가 필요한 코드

  ```java
  public int getAmount(User user) {
  return user.getWallet().getAmount().getValue();
  }
  ```

  - 디미터 법칙 위반 여부 : 객체의 경우 디미터 법칙 위반, 자료구조의 경우 내부구조를 당연히 노출하므로 디미터 법칙의 대상 아님

- 잡종 구조 : 중요한 기능 수행하는 함수, 공개 변수, 공개 get/set함수가 있어 객체, 자료구조가 절반씩 있는 구조
  - 새로운 함수, 자료구조 추가 모두 어려움
  - 객체, 자료구조의 단점만 모아놓은 구조
- 구조체 감추기
  - 객체의 경우 함수 내에서 줄줄이 호출해서는 안됨 : 객체는 내부구조 감춰야 함

[ 자료 전달 객체 DTO(Data Transfer Object) ]

- 공개 변수만 존재하고 함수가 없는 클래스
  ```java
  public class Address {
  private String city;
  }
  ```
- 활성 레코드 : DTO의 특수 형태

  - 공개 변수가 있거나 비공개 변수에 조회/설정 함수있는 자료구조
  - Save, find 같은 탐색함수 제공

  ```java
  public class Address {
  private String city;
  public Address(String city) {
  this.city = city;
  }

      public String getCity() {
      	return city;
      }
  }
  ```

  - 비즈니스 규칙 메서드 추가해 객체로 취급할 경우 잡종 구조 : 활성 레코드는 자료구조로 취급 – 비즈니스 규칙 담으며 내부 자료 숨기는 객체 따로 생성

> 시스템 구현할 때 새로운 자료 타입 추가하는 유연성이 필요하면 객체와 객체지향코드, 새로운 동작 추가하는 유연성이 필요하면 자료구조와 절차적인 코드가 적합

[ 참고 문서 ]
Clean code

- http://amazingguni.github.io/blog
- https://m.blog.naver.com/PostView
- https://github.com/Yooii-Studios/Clean-Code
- https://bang-jh.tistory.com/12
