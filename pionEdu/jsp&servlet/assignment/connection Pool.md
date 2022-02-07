# Connection Pool

: WAS가 실행되면서 일정량의 Connection 객체(DB연결 객체)를 미리 만들어 pool에 저장하고, 클라이언트에서 요청할 경우 Connection 객체를 빌려준 후 해당 객체의 임무가 완료되면 반납 받아 다시 pool에 저장하는 프로그래밍 기법.

[ 동작과정 ]

1. 사용자가 DB를 사용하기 위해 Connection 요청
2. Connection pool에서 사용하지 않고 있는 Connection 객체 제공
3. 사용자가 Connection 객체 사용완료 시 pool로 반환

[ 특징 ]
Connection 생성/삭제의 불필요한 작업이 사라짐

- 보통 DB에 접근할 경우 Connection 객체 생성/삭제가 필요하지만 Connection pool을 이용하면 객체를 미리 생성 후 사용하므로 불필요한 생성/삭제가 없음
  Connection 객체 적정량만 생성
- DB 접근이 많을 경우 Connection 객체가 한정되어 있으므로 사용가능한 Connection 객체가 존재할 때까지 대기해야 하지만, Connection 객체를 너무 많이 생성하면 메모리를 차지해 성능 저하 가능
- 적정량의 Connection 객체를 생성해야 함

[ 장점 ]

- DB Connection 객체를 미리 만들어 연결하여 메모리상에 등록해 클라이언트가 빠르게 DB접속
- Connection 객체 수를 제한할 수 있어 과다접속으로 인한 서버 자원고갈 방지
- DB 접속 모듈을 공통화 하여 DB서버 환경 변경 시 유지보수 쉬움
- 연결이 끝난 Connection 객체를 재사용해 새로 객체 만드는 비용 줄임

[ DBCP(DataBase Connetion Pool) 라이브러리 종류 ]

- Commons DBCP: 아파치가 제공하고 대부분이 이용하는 대표적인 DBCP 라이브러리
- Tomcat DBCP: Tomcat에 내장되어 사용되고 Commons DBCP 바탕으로 만들어진 DBCP 라이브러리
- HikariCP: 빠르고 안정적이며 크기가 작은 DBCP 라이브러리
