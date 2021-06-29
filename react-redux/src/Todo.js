import React from "react";
import { connect } from "react-redux";
import { actionCreator } from "./store";
import { Link } from "react-router-dom";

function Todo({ text, id, removeTodo }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={removeTodo}>DELETE</button>
    </li>
  );
}

function mapDispatchToProp(dispatch, ownProps) {
  console.log(ownProps);
  return {
    removeTodo: () => dispatch(actionCreator.removeTodo(ownProps.id)),
  };
}
export default connect(null, mapDispatchToProp)(Todo);
