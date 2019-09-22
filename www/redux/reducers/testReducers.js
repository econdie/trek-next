const exampleInitialState = {
  count: 3
};

export const actionTypes = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT"
};

// REDUCERS
export const testReducers = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1
      });
    default:
      return state;
  }
};
