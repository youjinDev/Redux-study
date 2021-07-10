# 📚 Redux study

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

## 3. Redux의 상탯값 변경 과정😎

 <img src="/img/그림01.jpg" width=700px>

#### 1) Store

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

#### 2) Action

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

function addTodo(title) {
  return { type: ADD, title, id };
}

function removeTodo(id) {
  return { type: REMOVE, id };
}

store.dispatch(addTodo({ title: "청소하기", id: 123 }));

// ...OR
const actionCreators = { addTodo, removeTodo };
store.dispatch(actionCreators.addTodo(title, id));
store.dispatch(actionCreators.removeTodo(id));
```

#### 3) Middleware

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

#### 4) Reducer

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

## 4. react-redux🦆

- react-redux는 redux를 react와 연동해서 사용하기 편리하도록 만든 라이브러리
- **react-redux의 장점**
  - store를 하위 컴포넌트에 매번 상속하지 않고도 사용할 수 있다
  - 스토어 데이터를 사용, 변경하는 코드를 모듈화해 컴포넌트 내 중복된 코드 사용을 최소화 할 수 있다
- react-redux도 위에서 기술한 것 처럼 redux와 동일한 과정을 거치나, `store👉component`, `component👉action` 단계에서 `connect`라는 패키지 함수가 사용된다는 차이가 있다.

#### 1) react-redux의 `Provider`로 스토어 상속하기

```javascript
import { Provider } from "react-redux";

/*
Provider에 데이터를 넘겨주면
중간 컴포넌트에서 props값을 다시 전달해줄 필요 없이
모든 하위 컴포넌트에서 데이터를 사용할 수 있다.
*/

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

#### 2) react-redux의 `connect`로 스토어 데이터 사용하기

- `connect` : react-redux가 store로부터 값을 읽기 위해 제공하는 함수. 두 가지 인자를 갖는다.
  - `mapStateToProps` : store의 상태가 변경될 때마다 호출된다. store의 전체 상태값을 받아와 컴포넌트 props에 할당한다. 반드시 순수 객체 데이터로 리턴해야함!
  - `mapDispatchToProps` : 이 인자는 **함수**가 될 수도 있고, **객체**가 될 수도 있다.
    - 함수일 때 : 컴포넌트 생성시 한 번 호출됨. dipatch를 인자로 받아 컴포넌트 함수에 바인딩한다.
    - 객체일 때 : action creator로 가득찬 객체일 경우, 각 action creator는 호출될 때 자동으로 해당 액션을 전달하는 prop 함수로 바뀜 (공식 문서에서는 객체 추천)

```javascript
// component에서는 props.num, props.todos, props.filter 이렇게 받음!
const mapStateToProps = (state, ownProps) => (
  return {
    num: 42,
    todos: state.todos,
    filter: state.visibilityFilter,
});

const mapDispatchToProps = {
  // ... normally is an object full of action creators
};

// `connect`는 새로운 함수를 리턴함
const connectToStore = connect(mapStateToProps, mapDispatchToProps);

// 그리고 그 함수는 연결된 wrapper 컴포넌트를 리턴함
const ConnectedComponent = connectToStore(Component);

// ⭐ 위 두 단계를 합쳐서 이렇게 사용
connect(mapStateToProps, mapDispatchToProps)(Component);

// 사용하지 않는 인자는 null이나 undefined 넣기
connect(mapStateToProps, null)(Component);
```

#### 3) react-redux로 스토어 데이터 변경하기

- connect의 두번째 인자 `mapDispatchToProps`는 컴포넌트 함수가 실행되면 바인딩된 dipatch 함수가 실행된다.

```javascript
// 함수일 경우 인자로 dispatch와 부모 컴포넌트에서 전달한 props 변수를 받는다.
const mapDispatchToProps = (dispatch, props) => {
  return {
    // addString 함수는 props에 할당된다
    addString: () => dispatch(add()),
  };
};
```

---

## 📖 Reference

- [redux 공식 문서](https://react-redux.js.org/tutorials/)
- 이재승 <실전 리액트 프로그래밍>
- 이정열 <초보자를 위한 실전 리액트 200제>
