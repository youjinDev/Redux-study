import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from "./type";

export const addSubscrbers = () => {
  return {
    type: ADD_SUBSCRIBER,
  };
};

export const removeSubscrbers = () => {
  return {
    type: REMOVE_SUBSCRIBER,
  };
};
