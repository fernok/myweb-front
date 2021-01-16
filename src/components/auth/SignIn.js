import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../css/Auth.css';

class SignInFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            authorizationWarning: "",
            isAuthorized: false,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async checkUser() {
        const requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        const response = await fetch('/auth/signin', requestOptions);
        
        const data = await response.json();
        
        this.setState({isAuthorized: data.isLoggedIn});
    }

    componentDidMount() {
        this.checkUser();
    }

    handleSubmit = async e => {
        const username = this.state.username;
        const password = this.state.password;
        
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password}),
            credentials: 'include'
        };
        const response = await fetch('/auth/signin', requestOptions);

        const data = await response.json();
        
        if (data.success) {
            this.setState({isAuthorized: true, username: username});
        } else {
            this.setState({authorizationWarning: "Authorization Failed."});
        }
    }

    render() {
        return (
            this.state.isAuthorized ? <Redirect to={{
                pathname: '/',
                state: { username: this.state.username, isAuthorized: this.state.isAuthorized }
            }}/> :
            <div className="sur-signin">
                <div>Sign In</div>
                <div className="sur-form">
                    <div className="input">
                        <form onSubmit={this.handleSubmit}>
                            <div><div className="sur-input-warning">username<div>{this.state.authorizationWarning}</div></div><input className="signin-input" onChange={e=>this.setState({username: e.target.value})}/></div>
                            <div><div>password</div><input className="signin-input" onChange={e=>this.setState({password: e.target.value})} type="password"/></div>
                            <div>
                                <button type="submit" className="signin-button">Sign In!</button>
                            </div>
                        </form>
                    </div>
                    <div className="to-other">Not a member? <a href='/auth/signup'>Create an account.</a></div>
                </div>
            </div>
        )
    }
}

class SignIn extends React.Component {
    render() {
        return (
            <div className="mainframe">
                <SignInFrame />
            </div>
        )
    }
}

export default SignIn;