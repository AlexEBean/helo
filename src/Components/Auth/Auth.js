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
            profilePic: "",
            newUser: false
        }
    }
    
    toggleNewUser = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = async (e) => {
        e.preventDefault();
        const {username, password, profilePic} = this.state
        try {
            const user = await axios.post('/auth/register', {username, password, profilePic})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        } 
        catch(err){ 
                alert(err.response.request.response)
        }
    }

    login = async (e) => {
        e.preventDefault();
        const {username, password, profilePic} = this.state
        try {
            const user = await axios.post('/auth/login', {username, password, profilePic})
            this.props.loginUser(user.data)
            this.props.history.push('/dashboard')
        } 
        catch(err){ 
                alert(err.response.request.response)
        }
    }

    render() {
        const {username, password, profilePic, newUser} = this.state
        return (
            <div className = "auth">
                {newUser 
                ? 
                <div>
                    <h3>Register</h3>
                    <form onSubmit = {e => this.register(e)}>
                        <input 
                            name="username" 
                            value={username} 
                            placeholder="Username?" 
                            onChange={ e => this.changeHandler(e)}
                        />
                        <input 
                            name="password" 
                            type="password"
                            value={password} 
                            placeholder="Password?"
                            onChange={ e => this.changeHandler(e)}
                        />
                        <input
                            name = "profilePic"
                            value = {profilePic}
                            placeholder="Profile Picture URL"
                            onChange={(e) => this.changeHandler(e)}
                        />
                        <button>Submit</button>
                    </form>
                    <button onClick={this.toggleNewUser}>Log in here</button>
                </div>
                :
                <div>
                    <h3>Login</h3>
                    <form onSubmit = {e => this.login(e)}>
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
                        <button>Submit</button>
                    </form>
                    <button onClick={this.toggleNewUser}>Register here</button>
                </div>}                
            </div>
        )
    }
}

export default connect(null, {loginUser})(Auth)
