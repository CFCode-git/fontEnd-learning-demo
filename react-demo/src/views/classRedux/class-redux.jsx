import React, { Component } from "react";
import "../../App.css";
import { connect } from "react-redux";

class classRedux extends Component {
  subtract() {
    this.props.subtract(3);
  }
  add() {
    this.props.add(2);
  }
  render() {
    return (
      <div className="classRedux">
        <div className="count">{this.props.count}</div>
        <div className="calculator">
          <button onClick={() => this.add()}>+</button>
          <button onClick={() => this.subtract()}>-</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.classCountReducer.classCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add: (value) => {
      dispatch({
        type: "classADD",
        payload: value,
      });
    },
    subtract: (value) => {
      dispatch({
        type: "classSUBTRACT",
        payload: value,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(classRedux);
