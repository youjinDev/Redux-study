# 📚 Redux-study

<img src="https://media.vlpt.us/images/sonofhuman20/post/7c171f4f-2b5c-45b8-928c-21ba4618c769/redux.png"/>

_Redux with vanilla JS and React_

## 1. Why Redux❔

- `Redux`는 `JavaScript`를 위한 상태 관리 프레임워크
- **리덕스 사용 이유**
  - 컴포넌트 코드로부터 상태 관리 코드를 분리할 수 있다
  - 서버 렌더링 시 데이터 전달이 간편하다
  - 로컬 스토리지에 데이터를 저장하고 불러오는 코드를 쉽게 작성할 수 있다
  - 같은 상태값을 다수의 컴포넌트에서 필요로 할 때 좋다
  - 부모 컴포넌트에서 깊은 곳에 있는 자식 컴포넌트에 상탯값을 전달할 때 좋다
  - 알림창과 같은 전역 컴포넌트의 상탯값을 관리할 때 좋다
  - 페이지가 전환되어도 데이터가 살아있어야 할 때 좋다

## 2. Redux의 세 가지 원칙🔥

#### 1) 전체 상탯값을 하나의 객체에 저장하기

- 전체 상탯값을 하나의 자바스크립트 객체로 표현되기 때문에 활용도가 높아진다. 이를 통해서 undo와 redo 기능 등을 구현 할 수 있다. 다만, 프로젝트 규모가 커질수록 모든 상탯값을 하나의 객체로 관리하는 것은 어려움이 따르므로 필요한 일부 상태만 리덕스를 활용하는 것도 가능하다.

#### 2) 상탯값은 불변 객체로 만들기

- 액션 객체와 함께 `dispatch`메서드를 호출하면 상탯값이 변경된다. 이는 상탯값을 변경하는 **유일한** 방법이어야 한다. 상탯값이 불변 객체여야 하는 이유는 이전 상탯값과 이후 상탯값을 비교해서 변경 여부를 파악하는 경우 불변 객체일 경우가 훨씬 편리하기 때문이다.

#### 3) 상탯값은 순수 함수에 의해서만 변경시키기

- `reducer`는 리덕스에서 상탯값을 변경하는 함수이다. reducer는 부수 효과(side effect)를 발생시키지 않도록 순수 함수로 작성해야한다. 순수 함수이기 때문에 같은 상탯값과 액션 객체를 입력하면 항상 똑같은 다음 상탯값을 반환한다. 따라서 실행된 액션 객체를 순서대로 저장했다가 나중에 똑같은 순서대로 `dispatch` 메서드를 호출하면 replay기능을 구현할 수 있다.

## 3. Redux의 상탯값 변경 과정

 <img src="/img/그림01.jpg" width=700px>

#### 0) Store

- state data를 저장하는 객체
- 하나의 app에 하나의 store 만 있는 것이 원칙이나, 기술적으로는 다수의 store가 있어도 문제가 되지 않는다. 특별한 이유가 없다면 Store는 하나만 만드는 것이 좋다.

```javascript
const store = createStore(reducer, [preloadedState], [middleWare]); // ⭐ reducer 인자 필수
```

- store의 메소드
  - `getState()`
  - `dispatch(action)`
  - `subscribe(listener)`
  - `replaceReducer(nextReducer)`

#### 1) Action

- `type` 속성을 **필수로** 가진 자바스크립트 **객체**
- 속성은 `type` 외에도 필요한 만큼 넣을 수 있다

```javaScript
const actionObject = {
  // ⭐ type은 문자열 보다는 const 변수로 관리해주는 것이 좋다
  type : "ADD",
  title: "청소하기",
  id: 123
}
```

- action 객체는 `dispatch` 메서드의 인자로 넣어 호출시 위 그림과 같은 상탯값 변경 과정을 시작한다

```javascript
const store = createStore(reducer);
store.dispatch(actionObject);
```

- 단, `dispatch`를 호출할 때 직접 액션 객체를 입력하는 방식은 지양하는 편이 좋다. 꼭 써야한다면 `action creator`를 이용하여 타입을 강제하는 방법도 있다.

```javascript
const ADD = "todo/ADD";
const REMOVE = "todo/REMOVE";

function addTodo({ title, id }) {
  return { type: ADD, title, id };
}

function removeTodo({ id }) {
  return { type: REMOVE, id };
}

store.dispatch(addTodo({ title: "청소하기", id: 123 }));
```

#### 2) Middleware

- 리듀서가 액션을 처리하기 전에 실행되는 **함수**
- 디버깅 목적으로 상탯값 변경시 로그를 출력하거나, 리듀서에서 발생한 예외를 서버로 전송하는 등의 목적으로 활용
- 특별한 미들웨어를 설정하지 않는다면 발생한 액션은 바로 리듀서로 전달된다
- `store`와 `action`을 기반으로 필요한 작업을 수행한다

```javascript
// ⭐ 기본구조는 함수 세 개가 중첩된 구조이다
const middleWare = (store) => (next) => (action) => next(action);

function middleWare(store) {
  return function (next) {
    return function (action) {
      return next(action);
    };
  };
}
```

- 액션이 발생할 때마다 이전 상탯값과 이후 상탯값을 로그로 출력하는 미들웨어의 예

```javascript
const printLog = (store) => (next) => (action) => {
  console.log(`이전 상탯값은 ${store.getState()}입니다`);
  const result = next(action); // ⭐ next()호출시 reducer 호출
  console.log(`이후 상탯값은 ${store.getState()}입니다`);
  return result;
};

const store = createStore(reducer, applyMiddleware(printLog));
```

#### 3) Reducer

- 액션이 발생했을 때 새로운 상탯값을 만드는 함수
- 순수 함수 지향
- 상탯값을 변경하는 **유일한** 방법이어야 한다

```javascript
// 구조
const reducer = (state, action) => nextState;

// EXAMPLE
const MyReducer = (prevState = INITIAL_STATE, { type }) => {
  switch (type) {
    case ADD:
      return prevState + 1; // return 값이 다음 state가 된다
    case MINUS:
      return prevState - 1;
    default:
      return prevState;
  }
};
```
