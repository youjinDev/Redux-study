import { createStore } from "redux";

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const counter = document.querySelector(".counter");
counter.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

// const handlePlus = () => (counter.innerHTML = ++number);
// const handleMinus = () => (counter.innerHTML = --number);

// plus.addEventListener("click", handlePlus);
// minus.addEventListener("click", handleMinus);

// reducer = (state, action) => nextState
// reducer는 순수 함수여야 한다
// 여기서 action 객체의 type 속성으로 구분해서 리듀서가 할 동작을 알려준다
const countReducer = (prev = 0, { type }) => {
  switch (type) {
    case ADD:
      return prev + 1;
    case MINUS:
      return prev - 1;
    default:
      return prev;
  }
};

// Store에는 data가 저장됨
const store = createStore(countReducer);

// action Object는 반드시 type속성을 가져야 함! 이 속성으로 액션 객체를 구분하기때문
// type속성을 제외한 나머지는 상탯값을 수정하기 위해 사용되는 정보
// 액션 객체와 함께 dispatch 메서드를 호출하면 상탯값이 변경된다
const incrementAction = {
  type: ADD,
  log: "this is add action",
};

const decrementAction = {
  type: MINUS,
  log: "this is minus action",
};

plus.addEventListener("click", () => {
  store.dispatch(incrementAction);
});

minus.addEventListener("click", () => {
  store.dispatch(decrementAction);
});

const onChange = () => {
  console.log("onChange 실행");
  console.log(store.getState());

  // prev state !== current state이면 counter.innerHTML = getState();
  counter.innerHTML = store.getState();
};

store.subscribe(onChange);
