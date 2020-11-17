import React, { Component } from 'react'
import axios from "axios"
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";
import "./Auth.css"

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = async (e) => {
        e.preventDefault()
        const {username, password} = this.state
        try {
            const user = await axios.post('/auth/register', {username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard/')
        } 
        catch(err){ 
                alert(err.response.request.response)
        }
    }

    login = async (e) => {
        e.preventDefault()
        const {username, password} = this.state
        try {
            const user = await axios.post('/auth/login', {username, password})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard/')
        } 
        catch(err){ 
                alert(err.response.request.response)
        }
    }

    render() {
        const {username, password} = this.state
        return (
            <div className = "auth">
                    <h3>Helo</h3>

                    <form>
                        <input 
                            name="username" 
                            value={username} 
                            placeholder="Enter Username" 
                            onChange={ e => this.changeHandler(e)}
                        />
                        <input 
                            name="password" 
                            type="password"
                            value={password} 
                            placeholder="Enter Password" 
                            onChange={ e => this.changeHandler(e)}
                        />
                        <button onClick = {e => this.register(e)}>Register</button>
                        <button onClick = {e => this.login(e)}>Log in</button>
                    </form>        
            </div>
        )
    }
}

export default connect(null, {loginUser})(Auth)
