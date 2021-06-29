import React from "react";
import { connect } from "react-redux";

function Detail({ todo }) {
  console.log(todo);
  return (
    <>
      <h1>Detail</h1>
      <h2>{todo?.text}</h2>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  console.log(state);
  return { todo: state.find((elem) => elem.id === parseInt(id)) };
}

export default connect(mapStateToProps)(Detail);
