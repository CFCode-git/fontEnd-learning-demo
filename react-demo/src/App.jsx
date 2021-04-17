import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import useFnRedux from './views/functionRedux/fn-redux'
import classRedux from './views/classRedux/class-redux'
import PageA from "./views/PageA"

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
        <li>
          <Link to="Page-a">page a</Link>
        </li>
      </ul>
      <Switch>
        <Redirect exact from="/" to="/page-a"/>
        <Route path="/fn-redux" exact component={useFnRedux}/>
        <Route path="/class-redux" exact component={classRedux}/>
        <Route path="/page-a" exact component={PageA}/>
      </Switch>
    </Router>
  )
}

export default App
