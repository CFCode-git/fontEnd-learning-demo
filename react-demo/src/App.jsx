import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import useFnRedux from "./views/functionRedux/fn-redux";
import classRedux from "./views/classRedux/class-redux";

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="fn-redux">fn</Link>
        </li>
        <li>
          <Link to="class-redux">class</Link>
        </li>
      </ul>
      <Switch>
        <Redirect exact from="/" to="/fn-redux" />
        <Route path="/fn-redux" exact component={useFnRedux} />
        <Route path="/class-redux" exact component={classRedux} />
      </Switch>
    </Router>
  );
}

export default App;
