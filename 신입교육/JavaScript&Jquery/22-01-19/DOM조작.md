# Javascript / JQuery

## 2022.01.19 Javascript

### 1. DOM

- css 조작

  - tag요소 선택해 스타일 변경

    ```javascript
    const changeStyle = () => {
      const div = document.querySelector("div");
      if (div.style.color == "red") {
        div.style.color = "blue";
      } else {
        div.style.color = "red";
      }
    };

    const btn = document.querySelector("button");
    btn.addEventListener("click", () => changeStyle());
    ```

  - class 이용해 스타일 변경
    ```javascript
    var li = document.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
      if (i % 2 !== 0) {
        li[i].classList.add("on");
      }
    }
    ```
  - !문제: practice1.html
    ```javascript
    var li = document.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
      if (i === 0) {
        li[i].style.fontSize = "32px";
        li[i].style.color = "blue";
      }
      li[i].classList.toggle("off");
      li[i].classList.toggle("on");
    }
    ```
  - DOM 추가/변경/제거

    - DOM업데이트 시 화면을 다시 reflow(재구조화), repaint(그리기)하는데 비용 높음

      ```javascript
      var ul = document.querySelector("ul");
      var li = document.createElement("li");
      var liText = document.createTextNode("위젯");

      li.appendChild(liText);
      ul.appendChild(li);
      ```

    - 실무에서는 createDocumentFragment 이용해 해당 태그만 그리도록 함

      ```javascript
      var ul = document.querySelector("ul");
      var frag = document.createDocumentFragment();
      var li = document.createElement("li");
      var liText = document.createTextNode("위젯");

      li.appendChild(liText);
      frag.appendChild(li);
      ul.appendChild(frag);
      ```

  - DOM 속성 가져오기 / 추가

    - getAttribute("속성"), setAttribute("속성","값")

      ```javascript
      //getAttribute
      var selecli = document.getElementsByTagName("li")[6];
      if (
        !selecli.getAttribute("class") ||
        selecli.getAttribute("class") == "off"
      ) {
        selecli.setAttribute("class", "on");
      }
      //className
      if (selecli.className === "" || selecli.className === "off") {
        selecli.setAttribute("class", "on");
      }
      //classList
      if (!selecli.classList.contains("off")) {
        selecli.setAttribute("class", "on");
      }
      ```

  - DOM요소 삭제
    ```javascript
    document.querySelector(".on").remove();
    ```
    - parentNode, nextSibling ... 이용해 삭제
      ```javascript
      const removeGoods = (e) => {
        const removeTarget = e.currentTarget;
        if (removeTarget) {
          removeTarget.parentNode.remove();
        }
      };
      ```
  - DOM으로 요소생성
    - 실무에서는 DOM으로 생성안함, `${}`이용하여 요소 생성

> 공부

- reflow repaint
- 속성 안나오는 이유: 요소마다 가진 속성이 다름, 기본적으로 가지고 있는 속성이 아니면 getAttribute('')이용

> 과제

- Html 렌더링 처리중 reflow와 repaint단계가 있다. 각각의 단계에서 어떤 역할을 하는지 조사
- reflow와 repaint 최소화하기위한 최적화방법이 있는데 2가지 이상 조사하여 예제로 제출
