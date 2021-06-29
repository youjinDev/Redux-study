import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../store";
import Todo from "../Todo";

function Home({ todo, addTodo }) {
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {todo.map((elem) => (
          <Todo text={elem.text} key={elem.id} id={elem.id} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProp(state) {
  return { todo: state }; // should return a plain object
}

function mapDispatchToProp(dispatch) {
  console.log(dispatch);
  return {
    // should return a plain object
    addTodo: (text) => dispatch(actionCreator.addTodo(text)),
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);
