import { createStore } from "redux";
// action, reducer, store 작성

// type변수
const ADD = "ADD";
const REMOVE = "REMOVE";

// action creator
const addTodo = (text) => {
  return { type: ADD, text };
};

const removeTodo = (id) => {
  return { type: REMOVE, id };
};

// reducer
const todoReducer = (state = ["he"], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case REMOVE:
      return state.filter((todo) => todo !== action.id);
    default:
      return state;
  }
};

export const actionCreator = {
  addTodo,
  removeTodo,
};

const store = createStore(todoReducer);
export default store;
