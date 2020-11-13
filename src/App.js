import React, { Component } from 'react'
import './App.css';

import Nav from "./Components/Nav/Nav"
import routes from "./routes"
import {withRouter} from "react-router"

class App extends Component {
  render() {
    return (
      <body>
        {this.props.location.pathname === "/"
        ?
        null
        :
        <Nav/>
        }
        {routes}
      </body>
    )
  }
}

export default withRouter(App)
