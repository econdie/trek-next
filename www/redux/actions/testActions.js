const actionTypes = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT"
};

// ACTIONS
export function incrementCount() {
  return { type: actionTypes.INCREMENT };
}

export function decrementCount() {
  return { type: actionTypes.DECREMENT };
}
