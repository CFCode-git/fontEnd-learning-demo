const initState = {
  classCount: 0,
};

const fnCountReducer = (state = initState, action) => {
  switch (action.type) {
    case "classADD":
      return { ...state, classCount: state.classCount + action.payload };
    case "classSUBTRACT":
      return { ...state, classCount: state.classCount - action.payload };
    default:
      return state;
  }
};
export default fnCountReducer;
