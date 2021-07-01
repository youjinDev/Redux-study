import { combineReducers } from "redux";
import subscribersReducer from "./subscribers/reducer";
import viewReducer from "./views/reducer";
import commentReducer from "./comments/reducer";

const rootReducer = combineReducers({
  views: viewReducer,
  subscribers: subscribersReducer,
  comments: commentReducer,
});

export default rootReducer;
