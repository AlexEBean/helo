import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {loginUser, logoutUser} from "../../redux/reducer"
import axios from "axios"
import "./Nav.css"


class Nav extends Component {

    componentDidMount = () => {
        this.getUser()
    }

    getUser = async () => {
        try {
            const currentUser = await axios.get("/api/auth/me")
            loginUser(currentUser.data)
        } catch (err) {
            console.log(err)
        }
    }

    logout = () => {
        logoutUser()
    }

    render() {
        return (
            <nav>
                <div className = "profile">
                    <img className = "profile-pic" src = {this.props.user.profile_pic} alt = "profile-pic"/>
                    Welcome {this.props.user.username}
                </div>
                <Link to = "/dashboard">
                    Home
                </Link>
                <Link to = "/new">
                    New Post
                </Link>
                <Link to = "/"
                    onClick = {this.logout}
                >
                    Logout
                </Link>
            </nav>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser, logoutUser})(Nav)
