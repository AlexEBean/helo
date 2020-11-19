import React, { Component } from 'react'
import {connect} from "react-redux"
import axios from "axios"
import "./Form.css"

class Form extends Component {
    constructor(){
        super()
        this.state = {
            title: "",
            img: "",
            content: ""
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addPost = (e) => {
        e.preventDefault()
        axios.post(`/api/post/${this.props.user.userId}`, {...this.state})
            .then(() => {
                this.props.history.push("/dashboard")
             })
             .catch((err) => console.log(err))
    }

    render() {
        const {title, img, content} = this.state
        return (
            <div className = "form">
                {img
                ?
                <img src = {`${img}`} alt = "image-pic"/>
                :
                <img src = "https://github.com/DevMountain/simulation-3/blob/master/assets/no_image.jpg?raw=true" alt = "default-pic"/>}
                <form>
                        <input 
                            name="title" 
                            value={title} 
                            placeholder="Title" 
                            onChange={ e => this.changeHandler(e)}
                        />
                        <input 
                            name="img" 
                            value={img} 
                            placeholder="Image URL" 
                            onChange={ e => this.changeHandler(e)}
                        />
                        <input 
                            name="content" 
                            value={content} 
                            placeholder="Content" 
                            onChange={ e => this.changeHandler(e)}
                        />
                        <button onClick = {this.addPost}>Post</button>
                    </form>        
            </div>
        )
    }
}
const mapStateToProps = state => state

export default connect(mapStateToProps)(Form)