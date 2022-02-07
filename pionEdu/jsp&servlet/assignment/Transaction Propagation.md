# Transaction 전파단계

[ 트랜잭션 전파 ] : 현재 트랜잭션에서 다른 트랜잭션으로 이동하는 것

- Spring에서는 일반적으로 트랜잭션 영역 내에서 실행되는 모든 코드가 해당 트랜잭션 내에서 실행되지만,
- 이미 트랜잭션 컨텍스트가 존재하는 상황에서 트랜잭션인 메서드 실행할 때는 동작을 지정하는 옵션을 이용
- 트랜잭션의 전파 설정
  - 진행되고 있는 트랜잭션에서 다른 트랜잭션이 호출될 때 처리방식 결정
  - @Transactional의 옵션 propagation 통해 설정
    ```java
    @Transactional(propagation=Propagation.REQUIRED)
    ```

[ 전파옵션 (Transaction propagation) ]

- MANDATORY
  - 트랜잭션 존재 시 해당 트랜잭션 이용
  - 트랜잭션 없을 시 예외 발생
  - 혼자 독립적으로 트랜잭션 진행하면 안되는 경우 이용
- NESTED
  - 트랜잭션 존재 시 중첩된 트랜잭션 생성해 처리 수행
  - 트랜잭션 없을 시 REQUIRED와 동일하게 동작 (새로운 트랜잭션 생성)
  - 중첩된 트랜잭션은 먼저 시작된 부모 트랜잭션의 commit, rollback에는 영향 받으나 중첩된 트랜잭션의 commit, rollback은 부모 트랜잭션에 영향 없음
  - 중첩된 트랜잭션 내부에서 rollback발생 시 해당 중첩 트랜잭션의 시작지점 까지만 rollback
  - 중첩된 트랜잭션은 부모 트랜잭션 commit시 같이 commit
- NEVER
  - 트랜잭션 존재 시 예외 발생
  - 트랜잭션 없는 상태로 처리 수행
  - 트랜잭션 사용하지 않도록 강제함
- NOT_SUPPORTED
  - 트랜잭션 존재 시 잠시 보류 후 트랜잭션 없는 상태로 처리 수행
  - 트랜잭션을 사용하지 않게 함
- REQUIRED (default)
  - 트랜잭션 존재 시 해당 트랜잭션 그대로 사용
  - 트랜잭션 없을 시 트랜잭션 새로 생성
  - 부모와 자식 트랜잭션 중 하나라도 문제가 발생하면 모두 rollback
- REQUIRES_NEW
  - 트랜잭션 존재 시 해당 트랜잭션 잠시 보류 후 신규 트랜잭션 생성
  - 항상 새로운 트랜잭션 시작
  - 부모와 자식 트랜잭션 중 문제가 발생해도 문제가 발생한 트랜잭션만 rollback, 서로 영향 주지 않음
- SUPPORTS
  - 트랜잭션 존재 시 해당 트랜잭션 사용
  - 트랜잭션 없을 시 트랜잭션 없이 진행
  - 트랜잭션이 별로 필요 없는 조회 메서드에서 이용
  - Propagation=”SUPPORTS” read-only=”true” 넣어 운용하는 것이 성능유리

[ 전파옵션 정리 ]

| 전파옵션          | 트랜잭션 있을 경우                | 트랜잭션 없을 경우 | 특징                                                  |
| ----------------- | --------------------------------- | ------------------ | ----------------------------------------------------- |
| REQUIRED(default) | 해당 트랜잭션 이용                | 트랜잭션 생성      | 트랜잭션에 문제 생길 시 모두 rollback                 |
| REQUIRES_NEW      | 보류 후 트랜잭션 생성             | 트랜잭션 생성      | 트랜잭션에 문제발생 시 해당 트랜잭션만 rollback       |
| NESTED            | 중첩된 트랜잭션 생성              | 트랜잭션 생성      | 부모트랜잭션 rollback 시만 중첩된 트랜잭션도 rollback |
| NEVER             | 예외 발생                         | 트랜잭션 없이 처리 | 트랜잭션 미사용                                       |
| MANDATORY         | 해당 트랜잭션 이용                | 예외 발생          | 독립적인 트랜잭션 진행하면 안될 때 이용               |
| SUPPORTS          | 해당 트랜잭션 이용                | 트랜잭션 없이 처리 | 트랜잭션 별로 필요없을 시 이용                        |
| NOT_SUPPORTED     | 보류 후 트랜잭션 없는 상태로 처리 | 트랜잭션 없이 처리 | 트랜잭션 사용하지 않게 함                             |

[ 사용 예시 ]

- 고객주문과 주문내역 기록 기능 구현 시
  - 중요한 일(고객주문) + 중요하지 않은 일(로그) : 주문 실패 시 로그 기록되지 않아야 하지만, 주문 성공했는데 로그 실패로 전체 rollback되면 안됨
  - NESTED 이용 : 부모 트랜잭션(주문) / 중첩된 트랜잭션(로그)
  - 중첩된 트랜잭션의 commit과 rollback은 부모 트랜잭션에 영향 주지 않음
  ```java
  @Transactional(propagation=Propagation.NESTED)
  ```

[ 트랜잭션 롤백 예외 ] : rollbackFor

- 선언적 트랜잭션에서는 런타임 예외가 발생했을 때만 rollback
- 비즈니스 예외(Checked Exception)는 개발자에게 복구 맡기고, 프로그램적으로 문제가 있는 런타임에 발생하는 예외만 롤백
- Checked Exception 발생 했을 때도 rollback 원할 경우
  ```java
  @Transactional(rollbackFor = DataNotFoundException.class)
  ```

[ 참고 문서 ]

Transaction Propagation

- https://happyer16.tistory.com/
- https://kingofbackend.tistory.com/134
- https://oingdaddy.tistory.com/28
