import React, { Component } from 'react'
import './App.css';

import Nav from "./Components/Nav/Nav"
import routes from "./routes"
import {withRouter} from "react-router"

class App extends Component {
  render() {
    return (
      <div className = "body">
        {this.props.location.pathname === "/"
        ?
        null
        :
        <Nav/>
        }
        {routes}
      </div>
    )
  }
}

export default withRouter(App)
