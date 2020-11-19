import React, { Component } from 'react'
import axios from "axios"
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
        const { title, img, content, username} = res.data[0];
        console.log(res.data[0])
      this.setState({ 
          title: title, 
          img: img, 
          content: content, 
          author: username, 
          authorPicture: `https://robohash.org/${username}` })
      })
      .catch(err => console.log(err))
    }
    
    render() {
        const {title, img, content, author, authorPicture} = this.state
        return (
            <div className = "post">
                <h1>{title}</h1>
                <img src={img} alt="post-pic"/>
                <h1>{content}</h1>
                <h1>By {author}</h1>
                <img src={authorPicture} alt="profile-pic"/>
            </div>
        )
    }
}

export default Post
