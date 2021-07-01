import {
  // eslint-disable-next-line no-unused-vars
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
} from "./type";

const INITIAL_STATE = {
  comments: [],
  loading: false,
  err: null,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.paylaod,
        loading: false,
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        err: action.paylaod,
        loading: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
