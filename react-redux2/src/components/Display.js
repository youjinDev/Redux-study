import React from "react";
import { connect } from "react-redux";

const Display = ({ count }) => {
  return (
    <>
      <p className="display">구독자 수 : {count}</p>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    count: state.subscribers.count,
  };
};
export default connect(mapStateToProps)(Display);
