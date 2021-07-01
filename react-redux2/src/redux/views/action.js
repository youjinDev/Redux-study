import { ADD_VIEW } from "./type";

export const addView = (number) => {
  return {
    type: ADD_VIEW,
    payload: Number(number),
  };
};
