import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import "./Nav.css"


class Nav extends Component {


    render() {
        return (
            <nav>
                <div className = "profile">
                    <img className = "profile-pic" src = {this.props.user.profilePic} alt = "profile-pic"/>
                    Welcome {this.props.user.username}
                </div>
                <Link to = "/dashboard">
                    Home
                </Link>
                <Link to = "/new">
                    New Post
                </Link>
                <Link to = "/">
                    Logout
                </Link>
            </nav>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Nav)
