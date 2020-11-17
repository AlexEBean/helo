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
        this.search()
    }

    search = () => {
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

    handleCheckBox = (e) => {
        if (e.target.value){
            this.setState({ userPosts: !this.state.userPosts })
        }
          
      }

    render() {
        const {search, posts, userPosts} = this.state
        const mapped = posts.map(post => {
            return (
                <div>
                    <h1>{post.title}</h1>
                    <h1>{post.username}</h1>
                    <img src={`${post.img}`} alt="profile-pic"/>
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
                id = "userPosts"
                checked = {userPosts}
                onChange = {(e) => {
                    this.handleCheckBox(e)
                    this.search()
                }}
                />
                <label for = "userPosts">My Posts</label>
                {mapped}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Dashboard)
