import React, { Component } from 'react'
import axios from "axios"
import {connect} from "react-redux"
import "./Post.css"

class Post extends Component {
    constructor(){
        super()
        this.state = {
            title: "",
            img: "",
            content: "",
            author: "",
            authorPicture: ""
        }
    }

    componentDidMount = () => {
        axios.get(
            `/api/post/${this.props.match.params.postid}`
      )
      .then(res => {
        const { title, img, content, username, user_id, post_id} = res.data[0];
      this.setState({ 
          title: title, 
          img: img, 
          content: content, 
          author: username, 
          authorPicture: `https://robohash.org/${username}`,
          authorId: user_id,
          postId: post_id
        })
      })
      .catch(err => console.log(err))
    }

    deletePost = async (postId) => {
        await axios.delete(`/api/post/${postId}`)
        this.props.history.push("/dashboard")
    }
    
    render() {
        const {title, img, content, author, authorPicture, authorId, postId} = this.state
        return (
            <div className = "post">
                <h1>{title}</h1>
                <img src={img} alt="post-pic"/>
                <h1>{content}</h1>
                <h1>By {author}</h1>
                <img src={authorPicture} alt="profile-pic"/>
                {authorId === this.props.user.userId
                ?
                    <button
                    onClick = {() => {
                        this.deletePost(postId)
                    }}
                    >Delete Post
                    </button>
                :
                    null
                }
                                    <button
                    onClick = {() => {
                        console.log(this.state)
                    }}
                    >What
                    </button>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Post)