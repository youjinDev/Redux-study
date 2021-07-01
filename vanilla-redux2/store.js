const redux = require("redux");
const createStore = redux.createStore;

// middleware로 logger 사용
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
// 2개 이상의 리듀서를 함께 인자로 넘길 때 combieReducers
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

// action-type
const ADD_SUBSCRIBER = "ADD_SUBSCRIBER";
const ADD_VIEW = "ADD_VIEW";

// action creator
const addSubscriber = () => {
  return {
    type: ADD_SUBSCRIBER,
  };
};

const addViewCount = () => {
  return {
    type: ADD_VIEW,
  };
};

// state
const subscriberState = {
  type: ADD_VIEW,
  subscribers: 365,
};

const viewState = {
  viewCount: 100,
};

// reducers
const subscriberReducer = (state = subscriberState, action) => {
  switch (action.type) {
    case ADD_SUBSCRIBER:
      return {
        ...state,
        subscribers: state.subscribers + 1,
      };
    default:
      return state;
  }
};

const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case ADD_VIEW:
      return {
        ...state,
        viewCount: state.viewCount + 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  view: viewReducer,
  subscriber: subscriberReducer,
});

// store
const store = createStore(rootReducer, applyMiddleware(logger));

//subscribe - view - dispatch
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addSubscriber());
store.dispatch(addViewCount());
store.dispatch(addViewCount());
console.log(store.getState());
