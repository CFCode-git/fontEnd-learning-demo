import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../App.css";

function useFnRedux() {
  // console.log("执行了");
  const dispatch = useDispatch();
  const count = useSelector((state) => state.fnCountReducer.fnCount);
  // console.log(count);
  // useEffect(() => {}, [dispatch]);
  const add = () => {
    console.log("fn add");
    // store.dispatch({ type: "ADD" });
    dispatch({ type: "fnADD", payload: 2 });
  };

  const subtract = () => {
    console.log("fn subtract");
    // store.dispatch({ type: "SUBTRACT" });
    dispatch({ type: "fnSUBTRACT", payload: 1 });
  };

  return (
    <div className="fnRedux">
      <div className="count">{count}</div>
      <div className="calculator">
        <button onClick={() => add()}>+</button>
        <button onClick={() => subtract()}>-</button>
      </div>
    </div>
  );
}

export default useFnRedux;
