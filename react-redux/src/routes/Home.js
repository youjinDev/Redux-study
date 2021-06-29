import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../store";

function Home({ todo, addTodo }) {
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    addTodo(text);
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>{JSON.stringify(todo)}</ul>
    </>
  );
}

function mapStateToProp(state, ownProps) {
  const [todo] = state;
  return { todo }; // should return a plain object
}

function mapDispatchToProp(dispatch) {
  console.log(dispatch);
  return {
    // should return a plain object
    addTodo: (text) => dispatch(actionCreator.addTodo(text)),
    removeTodo: (id) => dispatch(actionCreator.removeTodo(id)),
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);
