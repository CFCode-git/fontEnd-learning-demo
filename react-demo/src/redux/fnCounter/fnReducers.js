const initState = {
  fnCount: 0,
};

const fnCountReducer = (state = initState, action) => {
  switch (action.type) {
    case "fnADD":
      return { fnCount: state.fnCount + action.payload };
    case "fnSUBTRACT":
      return { fnCount: state.fnCount - action.payload };
    default:
      return state;
  }
};
export default fnCountReducer;
