# CDN

## 1. CDN의 사용 이유

### CDN: 웹 캐시 서버들을 전세계에 분산 배치 & 원본 서버의 콘텐츠를 웹 캐시서버에 캐시 -> 사용자기기/브라우저가 웹 콘텐츠 빠르게 다운

- 원본서버보다 가까운 캐시서버에 접속하는 것이 더 빠름

### 웹 애플리케이션 서비스를 해외시장에 진출시 고려 사항

- 추가 트래픽 감당가능한 서버용량 / 해외 사용자들의 웹 사이트 로딩 속도
- 해결방안
  - 1`)` 기존 서버 용량 증설
    - HW/SW 증설로 인한 비용 증가 & 기존 아키텍쳐 변경 적음 -> 빠르게 글로벌서비스 제공
    - 원본 데이터 센터와 해외 사용자의 지리적 위치로 로딩속도 보장 어려움
  - 2`)` 해외에 직접 데이터 센터 구축
    - 데이터 센터 구축위한 막대한 비용 & 복잡한 아키텍쳐 설계 필요
  - 3`)` 해외의 호스팅 서비스 이용
    - 비용 절감 가능 & 원본 애플리케이션 수정 및 동기화 이슈

### CDN 서비스 장점

- 성능 및 안정성 보장: 다수의 POP보유
- 아키텍쳐 단순화: 아키텍쳐 변경 및 동기화 불필요
- 높은 비즈니스 투자 수익: 사용한 트래팩만큼 비용 지불 및 저렴

### CDN 특징

- 동적콘텐츠 가속
- 프런트엔드 최적화
- 동영상 또는 라이브 스트리밍 서비스
- 클라우드 보안

## 2. CDN의 원리

### CDN 서비스 아키텍처

- 에지서버: 네트워크의 끝단, 사용자와 가장 가까운 곳에 위치한 서버들
  - CDN업체의 경우 전세계/특정지역에 여러 POP만들어 에지노드 구성

### CDN 동작 방법

- 기존 IP 조회
  - 브라우저 주소창에 URL 입력
  - DNS으로부터 웹 사이트 IP 주소 조회
  - 해당 웹사이트 호스팅하는 조직의 DNS서버가 도메인 명에 대한 IP 주소 반환
  - 브라우저가 해당 IP주소로 웹 콘텐츠 요청
  - > 웹 사이트 호스팅 서버와 지리적으로 멀 경우 RTT 증가
- CDN을 이용한 IP 조회
  - 브라우저가 웹 사이트 IP주소 조회 시 호스팅 조직의 DNS서버가 CDN 서비스 제공자의 도메인 명 반환 (자사의 서버 IP 대신)
  - 브라우저가 CDN 서비스 제공자의 DNS서버에 해당 도메인 대한 IP 요청
  - CDN 업체의 DNS서버가 사용자와 가장 가까운 위치의 에지서버 IP 최종반환
  - 브라우저가 해당 에지서버에 사용자 요청 전송
  - 에지서버가 캐시된 콘텐츠 반환 / 캐시 않았을 경우 원본 서버에서 콘텐츠 받아와 캐시 후 브라우저에 응답

### CDN 적용 방법

- CDN 적용 시 소스코드 수정없이 DNS만 변경
  - 원본 서버로 사용할 호스트명과 IP를 네임서버의 A 레코드로 추가
  - CDN설정에 원본 서버의 호스트명 등록 (ex\_ org-www.example.com)
    - 원본 서버명을 예측쉬운 서버명으로 하면 DDOS의 표적 가능성
    - 기존 서버명의 해시값,,, 이용
  - 기존 도메인명에 부여되었던 IP정보를 CDN 서비스 제공자의 도메인으로 변경: CNAME

## 3. 다중 캐시 전략

- 상황에 따라 캐시를 극대화할 수 있는 방안 필요
- 다중캐시: 사용자-서버 사이 여러 캐시 계층 주어 캐시 효율 극대화

### 캐시 축출

- 용량이 일정 한계치에 도달하면 캐시된 콘텐츠에 우선순위 부여해 낮은 순위의 콘텐츠부터 삭제
- 우선사항
  - 일정기간 캐시 적중이 없었던 콘텐츠
  - 캐시 적중률이 미미한 콘텐츠
  - 더 오래된 콘텐츠

### 롱테일 콘텐츠

- 생성 초기에 많이 조회되다가 짧은 시간이 흐른 후 조회 수가 확 줄고 이후 거의 조회되지 않는 콘텐츠
- 예 `)` 소셜미디어, 온라인 쇼핑몰
- 웹 사이트 내 콘텐츠 종류 많고 사용자 층 넓게 퍼져 있을수록 심화

### 캐시 서버 간 캐시 콘텐츠 공유

- 하나의 에지 서버 기준으로 실 사용자 방문에 의한 캐시 적중률 매우 낮음: 콘텐츠가 수많은 에지서버에 캐시되어 있음
- > 캐시된 콘텐츠가 에지 서버들 사이에서 하나의 서버를 사용하는 것처럼 공유될 시 캐시 적중률 증가
  - 에지 서버간 캐시 공유 ICP와 같은 프로토콜 이용

### 다중 계층 캐시

- 에지 서버들과 원본 서버 사이에 추가 캐시 서버계층(부모계층) 두어 같은 콘텐츠 여러 번 캐시하는 방식
  - 부모계층은 원본 서버에 가까이 존재
  - 부모계층의 캐시 서버 수가 자식계층의 캐시 서버 수보다 훨씬 적어야 함
- 다중 계층 캐시의 효과
  - 캐시 적중률 향상
    - 에지서버가 부모 계층에서 캐시된 콘텐츠받아 전달
  - 과도한 트래픽으로부터 원본 서버 보호
    - POP 적을수록 원본 서버의 캐시 트래픽 감소하나 사용자 응답속도 느림
    - POP 많을수록 원본 서버의 캐시 트래픽 증가하나 사용자 응답속도 빠름
      - 다중 계층 캐시를 이용한 캐시 트래픽 감소가능: 부모 계층 에지서버 이용
  - 사용자 요청에 대한 응답 속도 향상
    - CDN 서비스 이용시 최초요청만 원본서버에 접속, 나머지 요청은 사용자와 가장 가까운 캐시서버에서 처리
    - 자식-부모 에지 서버 사이에 전달경로 최적화 적용되어 사용자 요청에 빠르게 응답

## 4. 전달 경로 최적화

- CDN 서비스: 콘텐츠 캐시 및 애플리케이션 가속 서비스
- 경로
  - 라스트 마일: 최종사용자 - CDN 에지 서버
  - 미들 마일: CDN 네트워크 구간
  - 퍼스트 마일: 에지 서버 - 원본 서버 구간

### 라스트 마일 최적화

- 최종 사용자 요청을 가장 가까운 곳의 에지서버로 전송
- 방법
  - DNS 기반 에지 선택
    - 자사 DNS 서버로 특정 웹 사이트 도메인 쿼리 요청 시 사용자 로컬 DNS와 가장 가깝고 사용량 적은 에지 서버의 IP 반환
    - DNS 쿼리에 사용자 기기 IP 미포함, 사용자 로컬 DNS IP 정보는 DNS 쿼리에 포함 -> 사용자 위치 정보 짐작 가능 (정확X)
    - 장점: 기본적이고 안정적으로 사용되므로 안정적 운영 가능
    - 단점: 실사용자의 IP정보가 아닌 인터넷 서비스 제공자의 DNS 서버 위치 정보이므로 엉뚱한 에지서버 선택 가능
    - !ECS: DNS 리졸버가 최종 DNS서버에서 도메인명 조회시 쿼리에 최종사용자의 IP정보 일부 포함해 전송
  - 애니캐스트 기반의 에지 선택
    - 네트워크 상에서 원하는 IP 주소로 데이터 전송하는 방식
      - 유니캐스트: 1:1통신, 송신측은 수신측의 주소 정확히알고 메시지 전송, 대부분의 웹사이트에서 이용
      - 멀티캐스트: 1:N통신, 송신측은 수신측의 그룹주소, 포트 알아야 함, 클러스터 환경에서 관리노드가 자식노드 관리시 이용
      - 브로드캐스트: 불특정 다수에세 메시지 전송, 메시지 수신 여부 수신자가 결정
      - 애니캐스트: 1:1통신, 다수 노드가 같은 IP주소 갖음, 송신시 네트워크 상 가장 가까운 노드 선택해 전송(송신측 라우터 & BGP)
        - 브라우저가 웹 사이트 도메인명 대한 IP 정보 요청
        - CDN의 DNS서버가 가장 가까운 지역의 IP 반환
        - 브라우저가 해당 IP에 HTTP요청 시 애니캐스트 방식의해 가장 가까운 에지 서버 자동 선택되어 요청 처리
        - 장점: 실제 사용자와 가장 가까운 네트워크 에지 서버 선택 / 서버 장애시 자동 우회해 가용성보장
        - 단점
          - 실 사용자와 지리적으로 가장 가까운 에지 선택 미보장- BGP가 지리적 경로보다 ISP정책따른 경로 선택(네트워크적으로 가장 가까움)
          - BGP통한 경로 탐색 시 에지서버의 성능상태 미고려하므로 수행되지않는 에지 서버 선택가능 - 서버 자체가 죽지 않는 이상 라우터는 네트워크 상 발견되는 모든 서버 양호하다 판단
          - > 에지 서버의 상태 감시 & 용량 임계점에 도달한 서버는 네트워크 라우팅 테이블에서 제외

### 퍼스트 마일 최적화

- 최적의 원본 서버 탐색
- 다수 데이터 센터 통해 고가용성 유지하려하면 상황따라 적절한 데이터 센터찾아 요청전달, 응답 받는 것 중요
- 트래픽분산
  - 비율에 따른 트래픽분산: 지정 비율에 맞춰 분산
  - 지역에 따른 트래픽분산: 지역 구분해 가장 가까운 데이터 센터로 HTTP요청
  - 성능에 따른 트래픽분산: 데이터 센터 성능 고려해 분산
- > 어떤 사용자의 이어지는 요청은 모두 같은 데이터 센터에서 처리: 웹 사이트 이용 중 세션 끊기지 않기위함
  - CDN에서 사용자 쿠키에 선택된 데이터 센터의 정보 넣음

### 미들 마일 최적화

- 사용자 요청 받은 에지 서버와 원본 서버간 가장 빠른 네트워크 경로 탐색
- 에지 서버는 BGP이용
  - 가장 빠른경로 미보장 & 해당 구간에 트래픽 몰릴 시 우회보다 지연초과 가능
- 정체 구간 파악해 여러 경로 중 (ex 우회 경로와 BGP경로) 최적경로 파악해 선택

### 프로토콜 최적화

- 한번에 많은 트래픽 전송가능하도록 최적화
- 웹트래픽 - HTTP기반 / HTTP - TCP/IP 프로토콜 기반 / 송수신 측 3-way handshake방식으로 TCP 연결 & 데이터 패킷 송수신
- 윈도우 사이즈: 수신가능한 데이터의 크기 - 서버에 통지
  - 송신 측은 수신 측의 윈도우 사이즈 고려해 더 적은 양의 데이터 전송
- TCP 최적화
  - 느린시작 알고리즘: 송신측이 전송시작 시 적은 양의 데이터부터 전송
    - 초기 혼잡 윈도우에 정해진 만큼 데이터 패킷 전송
    - 문제 없을 시 윈도우 값 제곱으로 증가
    - 네트워크 혼잡으로 RTO 발생 시 혼잡 윈도우의 절반으로 임계치 설정 & 처음부터 전송 시작
    - 이후 혼잡 윈도우 값이 정해진 임곗값보다 커지면 혼잡회피위해 혼잡윈도우 값이 제곱아닌 선형 증가
    - 이후 임계값은 패킷 유실, 네트워크 에러, 중복응답 등 따라 계산되어 정해짐
  - CDN 구간에서 최적화 진행법
    - 미들 마일의 네트워크 관리 양호 전제 필요 == CDN제공자는 ISP와 파트너 쉽 맺어 경로 최적화 완료(전제 성립)
    - 1. 초기 혼잡 윈도우 값 늘려 한번에 많은 데이터 패킷 전송
         - 이더넷 초기 혼잡 윈도우 값 3MSS
         - CDN 업체에서 자사 미들 마일 구간 수신 에지서버의 윈도우 사이즈, 송신 에지 서버의 초기 혼잡윈도우 값 크게 늘려 한번에 전송하는 패킷 양 늘림
    - 2. RTO 값 낮춰 실패한 패킷 빠르게 재전송
      - CDN에서 해당 값 낮춰 누락 데이터 빠르게 전송
    - 퍼스트 마일에도 적용 가능
- TLS종료와 TCP연결 재사용
  - 클라이언트-서버 HTTP통신위해 TCP연결 맺는 3-way handshake & TLS handshake (상호 인증서 확인 및 메세지 암호화)
  - CDN 서비스 사용 시
    - 최종 사용자가 CDN과 TCP 연결
    - CDN은 원본서버와 또 다른 TCP 연결 생성
    - HTTP 통신 시 TLS handshake는 최종사용자와 CDN사이 / CDN과 원본서버 사이 한번 씩 발생
    - CDN 에지 서버와 TCP/IP 연결 생성 시 에지서버가 원본서버와 사용자 수 만큼의 연결 새로 생성하는 것 비효율적
    - 효율성 높이기 위해 원본서버와의 TCP연결 끊지않고 이미 생성된 연결 재사용
      - 원본 서버 == TCP연결 생성 유지 수 감소해 서버 자원 절약
      - 최종사용자 == 원본 서버가 아닌 가까운 에지 서버와 TCP, TLS handshake 수행해 응답속도 개선
    - !프로토콜 다운그레이드: 성능의 이유로 CDN구간만 HTTPS 연결 / CDN과 원본구간은 HTTP연결 유지
      - 암호화된 연결 미사용 시 중간자 공격 위험성 존재
      - > 전 구간에서 항상 암호화된 통신 필요

## 5. 기타 성능 옵션

- 웹 사이트 호스팅 서버에서 제공못한 기능 CDN에서 제공
- CDN이 대신 제공하는 기본 기능
  - HTTP 압축
    - 기본적인 텍스트 파일 포맷에 gzip압축 적용해 브라우저로 전송
    - CDN이 제공하는 압축은 에지서버와 브라우저 네트워크 구간에만 적용
    - 호스팅서버-에지서버 사이 네트워크 구간 가속화위해선 서버 측에서 압축 설정
  - 브라우저 캐시
    - CDN 서비스 이용 시 콘텐츠 캐시 주기 별도 설정
      - CDN에 설정한 TTL값 그대로 이용
      - 서버에서 응답한 헤더를 그대로 브라우저로 전송
      - CDN에 설정한 캐시 주기와 서버 응답 헤더의 캐시 주기 중 더 길게 남은 값을 사용
      - CDN에 설정한 캐시 주기와 서버 응답 헤더의 캐시 주기 중 더 짧게 남은 값을 사용
      - 브라우저 캐시를 사용하지 않음
  - HTML, CSS, JS 최소화
    - CDN에서 제공하는 최적화 기능
    - 에지 서버에서 응답 콘텐츠의 공백, 주석 제거해 캐시 후 같은 요청대해 최적화된 콘텐츠 제공
  - DNS 프리페치와 프리커넥트
    - `<link>` 이용해 브라우저 성능 개선 힌트 가능
    - CDN에서 제공하는 DNS 프리페치 기능: HTTP응답에 Link 헤더 추가
    ```
    Link: <http://image.example.com>; rel=dns-prefetch // 도메인에 IP 미리 조회
    Link: <http://image.example.com>; rel=preconnect //TCP 연결까지 미리 생성
    ```
- 신기술 적용을 위한 CDN 기능
  - HTTP/2와 HTTP/3
    - HTTP/2: 브라우저와 에지 서버 사이 구간에서만 캐시 가능한 정적 콘텐츠 가속에 사용
    - HTTP/3: HTTP/2 보다 빠르고 안전한 차세대 프로토콜
  - 서버 푸시
    - 리소스에 대한 다운로드 요청없이도 필요한 자원 미리 전송해주는 기능
    - HTTP/2의 주요 기능
    - 푸시 대상 지정 방식
        - CDN에 푸시할 자원 미리 지정: 푸시 객체 변경시 CDN 설정 변경 & 페이지별 푸시 대상 다를시 체이지마다 설정 필요
        - 웹 페이지에 푸시할 리소스 태그로 지정: `<link>`의 preload 주로 이용 / 푸시 객체 판단위해 원본서버에 갔다와야하므로 시간지연
    - > 웹 사이트 렌더링 속도 개선 가능
  - IPv6 듀얼 스택
    - 장점
        - 방대한 주소 수로 NAT 불필요
        - 헤더 간소화
        - 자동 구성 기능
        - 고유 IP 자동설정
        - 품질 보장
        - 보안 강화
    - IPv4/IPv6 모두 사용 가능한 듀얼 스택 장착 통해 IPv6 장점 경험 가능
    
