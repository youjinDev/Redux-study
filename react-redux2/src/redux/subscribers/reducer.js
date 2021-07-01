import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from "./type";

const INITIAL_STATE = {
  count: 370,
};

const subscribersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SUBSCRIBER:
      return {
        ...state,
        count: state.count + 1,
      };
    case REMOVE_SUBSCRIBER:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default subscribersReducer;
