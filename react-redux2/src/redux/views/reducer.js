import { ADD_VIEW } from "./type";

const INITIAL_STATE = {
  count: 0,
};

const viewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_VIEW:
      return {
        ...state,
        count: state.count + action.payload,
      };
    default:
      return state;
  }
};

export default viewReducer;
