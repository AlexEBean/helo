import React, { Component } from 'react'
import {connect} from "react-redux"

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            search: "",
            userPosts: true
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {search, posts, userPosts} =this.state
        const mapped = posts.map(e => {
            return (
                <div>
                    <h1>{e.title}</h1>
                    <h1>{e.username}</h1>
                    <img src={e.profilePic} alt="profile-pic"/>
                </div> 
            )  
        })
        return (
            <div>
                <input 
                name = "search"
                value = {search}
                placeholder="Search.."
                onChange={ e => this.changeHandler(e)}
                />
                <button>Search</button>
                <button>Reset</button>
                <input 
                name = "myPosts"
                type = "checkbox"
                id = "myPosts"
                />
                <label for = "myPosts">My Posts</label>
                {mapped}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Dashboard)
