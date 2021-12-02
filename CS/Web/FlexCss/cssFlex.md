# CSS의 Flex 속성
## Flex(Flexible Box, FlexBox)
- 레이아웃 배치 전용 기능 <-> float, inline-block : 레이아웃위한 기능아님
- 구성
    - Flex Container : 부모요소
    - Flex Item : 자식요소
    - ex) 
    ```
        <div class="container">
            <div class="item"></div>
            <div class="item"></div>
        </div>
    ```
- 속성
    - Flex container에 적용하는 속성
        1. display
            - display: flex
                - Flex 아이템들 가로방향 배치
                - &자신의 내용물 만큼의 width
                - &컨테이너(부모) 높이 만큼의 height
            - display: inline-flex
                - 컨테이너(부모)가 주변요소와 어울어지는 것 결정
                - inline-block처럼 동작
        2. flex-direction : 아이템 배치 방향 설정
            - flex-direction: row
                - default값 
                - item이 행(가로)방향 배치
            - flex-direction: column
                - item이 열(세로)방향 배치
            - flex-direction: row-reverse
                - item이 역순 행(가로) 배치
            - flex-direction: column-reverse
                - item이 역순 열(세로) 배치
        3. flex-wrap : 줄넘김 처리 설정
            - flex-wrap: nowrap
                - default값
                - 줄바꿈X, 넘치면 삐져나감
            - flex-wrap: wrap
                - 줄바꿈
            - flex-wrap: wrap-reverse
                - 역순 줄바꿈
        4. flex-flow : flex-direction, flex-wrap 한번에 지정
            - flex-flow: row wrap
                - flex-direction: row & flex-wrap: wrap
        5. justify-content : 메인축 방향으로 item 정렬
            - justify-content: flex-start
                - default
                - item 시작점으로 정렬
                - flex-direction: row면 왼쪽
                - flex-direction: column이면 위
            - justify-content: flex-end
                -item 끝점으로 정렬
                - flex-direction: row면 오른쪽
                - flex-direction: column이면 아래
            - justify-content: center
                -item 가운데로 정렬
            - justify-content: space-between
                - item 사이 균일 간격
            - justify-content: space-around
                - item 둘레에 균일 간격
            - justify-content: space-evenly
                - item 사이와 둘레에 균일 간격
        6. align-items : 수직축 방향으로 item 정렬
            - align-items: stretch
                - defalut
                - item이 수직축방향으로 끝까지 늘어남
            - align-items: flex-start
                - item을 시작점으로 정렬
                - flex-direction: row면 위
                - flex-direction: column이면 왼쪽
            - align-items: flex-end
                - item을 끝으로 정렬
                - flex-direction: row면 아래
                - flex-direction: column이면 오른쪽
            - align-items: center
                -item을 가운데로 정렬
            - align-items: baseline
                -item을 텍스트 베이스라인 기준으로 정렬
        7. align-content : 여러 행 정렬, flex-wrap: wrap 정렬된 상태에서 item 행이 2줄이상됐을 경우 수직축 방향 정렬
            - align-content: stretch
            - align-content: flex-start
            - align-content: flex-end
            - align-content: center
            - align-content: space-between
            - align-content: space-around
            - align-content: space-evenly
    - Flex item에 적용하는 속성
        1. flex-basis : item 기본크기 설정, flex-direction:row면 너비, flex-direction:column면 높이
            - flex-basis: auto
                - default
                - 해당 item의 width 값
            - flex-basis: 50% or 100px ...
                - width, height에 사용하는 단위 수 이용
                - 해당 item이 flex-basis값 초과시 그대로 유지
        2. flex-grow : flex-basis값보다 커질 수 있는지 결정, 0보다 큰값일 시 해당 item flexble박스로 변하고 원래 크기보다 커져 빈공간 매움
        - flex-grow: 0
            - default
        - flex-grow: 1...
            - item의 flex-basis 제외한 여백부분을 flex-grow에 지정된 숫자 비율로 나누어 가짐
        3. flex-shrink : flex-basis값보다 작아질 수 있는지 결정, 0보다 큰값일 시 해당 item flexble박스로 변하고 flex-basis보다 작아짐
            - flex-shrink: 1
                - default
            - flex-shrink: 0
                - item크기가 flex-basis보다 작아지지 않음
                - 고정폭 칼럼 만들 수 있음
        4. flex : flex-grow, flex-shrink, flex-basis 한번에 사용가능한 축약형 속성
            - flex: 1 1 auto
                - flex-grow: 1
                - flex-shrink: 1
                - flex-basis: auto
        5. align-self : 해당 item의 수직축 방향 정렬
            - align-self: auto
                - default
                - align-items 설정 상속 받음
            - align-self: stretch
            - align-self: flex-start
            - align-self: flex-end
            - align-self: center
            - align-self: baseline
        6. order : 배치순서, item의 시각적 나열순서 결정
            - order: 1,2...
        7. z-index : Z축 정렬, 클수록 위로 올라옴
            - z-index: 0
                - default
            - z-index : 1,2...