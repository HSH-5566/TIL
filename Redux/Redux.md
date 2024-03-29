# Redux

일시: 2021년 11월 16일
태그: 공부, 프로그램

<aside>
📌 2021.11 노마드코더 강의 및 간단한 활용을 통한 Redux공부

</aside>

---

![Untitled](Redux%200941a68b7f2d4f01a834770120e0bdfc/Untitled.png)

![Untitled](Redux%200941a68b7f2d4f01a834770120e0bdfc/Untitled%201.png)

### Redux공부

- Redux
    - Javascript apllication을 위한 상태관리 방법
    - React와 별개 → Vue, js, Angular, React ... 이용가능
- yarn add redux 또는 npm install redux
- 강의
    - #1.1 Store, Reducer
        - Store : state 저장소
        - reducer : state를 유일하게 modify하는 함수, return하는 모든 것이 application state가 됨
        - Store생성 : const 저장소이름 = createStore(reducer)
        - reducer생성 : const 리듀서이름 = (state, action) ⇒ { return state} //state는 currentState
        - 저장소이름.getState()
    - #1.2 Action
        - Action : redux에서 함수부를 때 사용하는 두 번째 인자로 reducer와 소통하는 방법
        - action 추가 : 저장소이름.dispatch({type: "내용", ...}) // 반드시 obj & type 존재
        - dispatch : 리듀서를 action을 넣어 호출
    - #1.3 subscribe
        - subscribe: store 내부의 변화 감지 및 함수 실행
        - 저장소이름.subscribe(함수)
    - #1.4 recap
        - reducer 내부 switch문 이용
        - action type의 경우 const ADD = "ADD"와 같이 정의해 {type:ADD}와 같이 오류 발견 쉽게 하기
    - #2.1 state mutation
        - mutate state 사용하면 안됨 ex) array.push("a");
        - 항상 새로운 state create 후 return
    - #2.3 Delete To Do part Two
        - mutate 하지않고 array state 요소 삭제 : filter()
    - #3.0 Setup
        - npm install react-redux react-router-dom
    - #**3.1 Connecting the Store**
        - react-router-dom 이용 : 반드시 <Router>안에<Routes>안에 <Route>
            
            <Router>
              <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/:id" element={<Detail/>}></Route>
              </Routes>
            </Router>
            
        - react-redux 사용 : index.js → <Provider store={store}><App /></Provider>
    - #**3.2 mapStateToProps**
        - mapStateToProps : store와 component를 connect하는 방법
            
            function mapStateToProps(리덕스의 state, 컴포넌트) {return}
            
             - 컴포넌트에 Redux state를 props로 전달 
            
        - connect() : react-redux 요소, Redux state로 부터 component에 prop으로써 전달
            
            export default connect (mapStateToProps)(component)
            
    - #**3.3 mapDispatchToProps**
        - mapDispatchToProps
        - connect()의 두번째 인자
            
            mapStateToProps가 없을경우 connect(null, mapDispatchToProps)
            
    - #**3.4 Deleting To Do**
        - 삭제가 안되는 문제 발생! ~> ownProps.id가 없음
            
            <ul>{toDos.map(toDo => <ToDo text={toDo.text} key={[toDo.id](http://todo.id/)}/>)}</ul>에서 id 안넘겨줌
            
            → <ul>{toDos.map(toDo => <ToDo text={toDo.text} id={[toDo.id](http://todo.id/)} key={[toDo.id](http://todo.id/)}/>)}</ul>
            
    - #**3.6 Conclusions**
        - mapDispatchToProps : dispatch용도
        - mapStateToProps : getState용도
    - #**4.0 Redux Toolkit**
        - Redux 코드 줄이는 도구
        - npm install @reduxjs/toolkit
    - #**4.1 createAction**
        - 
    - #**4.2 createReducer**
        - const reducer = **createReducer([], {})**
        - state mutate 가능 → push... 이때 return하지 않음.  ~> redux 툴킷, Immer가 새로운 state return 지원
    - #**4.3 configureStore**
        - store 생성 & redux developer tool 지원
    - #**4.4 createSlice**
        - reducer&action 생성
        - const toDos = createSlice({name: 'toDoReducer', initialState:[], reducer:{ ... }})
