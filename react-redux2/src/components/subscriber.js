import React from "react";
import { connect } from "react-redux";
import { addSubscrbers } from "../redux/index";

const Subscribers = ({ count, addSubscrbers }) => {
  return (
    <div className="items">
      <h2>구독자수 : {count}</h2>
      <button onClick={() => addSubscrbers()}>구독👍</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.subscribers.count,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addSubscrbers: () => dispatch(addSubscrbers()),
//   };
// };

const mapDispatchToProps = {
  // property와 value 값이 같으면 생략 가능 property: value 생략 가능
  addSubscrbers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);
