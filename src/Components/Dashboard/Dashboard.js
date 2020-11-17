import React, { Component } from 'react'
import {connect} from "react-redux"
import axios from "axios"

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            search: "",
            userPosts: true
        }
    }

    componentDidMount = () => {
        axios.get(
            this.state.search
            ? `/api/posts/${this.props.user.userId}?userposts=${this.state.userPosts}&search=${this.state.search}`
            : `/api/posts/${this.props.user.userId}?userposts=${this.state.userPosts}`
      )
      .then(res => {
        this.setState({ posts: res.data })
      })
      .catch(err => console.log(err))
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckBox = () => {
          this.setState({ userPosts: !this.state.userPosts })
      }

    render() {
        const {search, posts, userPosts} = this.state
        const mapped = posts.map(e => {
            return (
                <div>
                    <h1>{e.title}</h1>
                    <h1>{e.username}</h1>
                    <img src={`${e.img}`} alt="profile-pic"/>
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
                name = "userPosts"
                type = "checkbox"
                id = "myPosts"
                checked = {userPosts}
                onChange = {() => this.handleCheckBox()}
                onClick = {() => {
                    console.log(userPosts)
                }}
                />
                <label for = "myPosts">My Posts</label>
                {mapped}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Dashboard)
