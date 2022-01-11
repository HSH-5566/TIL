# HTML/CSS 웹 표준
## 2022.01.11 HTML
### 웹 표준
- HTML(구조) / CSS(표현) / Javascript(동작)
- 파일용량 축소 / 로딩속도 / SEO / 유지보수
- 시맨틱 웹/태그: 태그 이름통해 역할 짐작 ->SEO
### 의미있는 마크업 및 HTML
- Structure 언어: HTML, XHTML, XML
- 문서형 정의: 마크업 문서 정의위한 DTD선언
    - HTML5의 경우 `<!DOCTYPE html>`
### HTML 구성요소
- 태그, 요소, 속성
- 블록 레벨 엘리먼트
- 인라인 레벨 엘리먼트: 단독 마크업 불가, 블록엘리먼트에 둘러싸여야함
- 휴먼 랭귀지: 사용하는 언어를 HTML문서에 선언
    - `<html xml: lang="ko">`
- 문자 코드 세트 지정: 인코딩위해 meta태그 이용
    - 다국어 인코딩: utf-8
    - 한글: euc-kr
- 키워드 지정: 검색키워드위한 meta태그 이용
### HTML 명령어
- 주소 `<address>`: 웹 문서 아래쪽에 연락처 등 정보 표시
    - 인라인 요소와 데이터만 가능
- 하이퍼링크 `<a>`
- 이미지 `<img/>`: src, alt(대체 텍스트)
    - 웹 접근성위해 alt 반드시 작성
- 목록
    - 비순서형 `<ul>`
    - 순서형 `<ol>`
    - 정의형 `<dl>`
- 강조
    - `<strong>, <bold>, <em>`
- 테이블 `<table>, <tr>, <th>, <td>`
    - 셀병합
        - colspan: 열 다른 셀 병합
        - rowspan: 행 다른 셀 병합
    - 제목 셀과 내용 셀의 연관성
        - scope: 웹 접근성위함
    - 열 그룹 요소: `<colgroup>, <col>`
    - 행 그룹 요소 `<thead>, <tbody>, <tfoot>`
- 폼 form: 웹 문서가 서로 상호작용 가능하도록 함, data 전송
    - 폼 요소 그룹화 및 제목
        - `<fieldset>, <legend>`
    - 레이블 `<label>`: 폼요소 설명
        - 명시적인 레이블: `<label for=”input의 id입력”>input요소`
        - 암묵적인 레이블: `<label>input요소</label>`
- `<input type="컨트롤값" value="초기값" name="변수명">`
- 인라인 프레임 `<iframe>`: 특정 페이지 불러옴
    - `<iframe src=”URL” id=”식별자” name=”변수명” title=”설명” width=”” height=””></iframe>`
 `<canvas>`: 그래프, 게임 등 비트맵 그래픽 표시, js연동 필요
- 그룹화하는 태그
    - `<span>`: 인라인 요소 그룹화, 블록요소 포함 불가
    - `<div>`: 블록요소 그룹화
        > 내용 관계없을 시
    - `<article>`: 내용이 독립적, 홀로 설수있는 내용, HTML5 DOC타입인지 확인필요
        > 내용 독립적일 시 
    - `<section>`: 서로 관계있는 문서 분리하는 역할, 다른주제 문서 구분위해 사용
        > 내용 관계 있을 시
    - `<header>`: 페이지에 대한 정보, `<nav>`포함 가능
    - `<footer>`: 문서 대한 꼬리말
    - `<nav>`: 네비게이션 역할하는 링크 그룹
    - `<aside>`: 부차적인 내용, `<article>`요소의 왼, 바깥쪽에 위치
- `CDATA`: Character DATA
    - `<![CDATA[]]`
        - []안의 문장이 파싱되지않고 그대로 문자열로 출력
- 마우스 - 키보드 이벤트 처리기 대응: 웹 접근성 목표
    - onmousedown - onkeydown
    - onmouseup - onkeyup
    - onclick - onkeypress
    - onmouseover - onfocus
    - onmouseout - onblur

## 2022.01.12 CSS