# JS 기초강의

## 7. 오브젝트

### 오브젝트: key와 value의 집합체

- 생성
  ```javascript
  const obj1 = {}; //object literal: {}이용
  const obj2 = new Object(); // object constructor: new이용
  ```
- computed property:

```javascript
element["property"];
```

- property value shorthand

```javascript
function Person(name, age) {
  return { name, age };
}
```

- construntor function

```javascript
function Person(name, age) {
  //this={};
  this.name = name;
  this.age = age;
  //return this;
}
```

- in operator

```javascript
console.log("name" in person);
```

- for ..in / for ..of

```javascript
for (key in person) {
  console.log(key);
}
```

```javascript
//for value of iterable
for (value of array) {
  console.log(value);
}
```

- cloning

```javascript
const user = { a: 10 };
const user2 = user;
user2.a = 100;
console.log(user); //100
```

```javascript
Object.assign(dest, obj1, obj2,,,);
```

## 8. Array

- 선언

```javascript
const arr1 = new Array();
const arr2 = [1, 2];
```

- for loop

```javascript
//for
//for of
//forEach
arr.forEach((value, index, arr) => {});
callbackfn;
```

- 배열 조작
  - 추가, 삭제
    - push(): 뒤에 추가
    - unshift(): 앞에 추가, 비용큼
    - pop(): 뒤에서 삭제
    - shift(): 앞에서 삭제, 비용큼
    - splice(index, [index])
      - arr.aplice(1, 1, 'a', 'b'); 면 1번 인덱스 요소 삭제 후 'a','b'를 그자리에 추가
  - 합치기
    - arr.concat(arr2);
  - 검색
    - arr.indexOf('a'): 해당 배열 위치 return
    - arr.includes('a'): 해당 배열 존재여부 return
    - arr.lastIndexOf('a'): 해당 배열에서 가장 마지막에 있는 a 위치 return
