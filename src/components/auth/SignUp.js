import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../css/Auth.css';

class SignUpFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordcheck: "",
            usernameWarning: " ",
            passwordWarning: " ",
            isInputValid: false,
            isAuthorized: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = async (target, e) => {
        var newState = {};
        const value = e.target.value;
        newState[target] = value;
        this.setState(newState);

        switch (target) {
            case "username":
                if (value) this.setState({ usernameWarning: "" });
                else this.setState({ usernameWarning: "Enter username!" });
                break;
            case "password":
                if (!value) this.setState({ passwordWarning: "Enter password!" });
                else {
                    if (value === this.state.passwordcheck) this.setState({ passwordWarning: "" });
                    else this.setState({ passwordWarning: "Check password!" });
                }
                break;
            case "passwordcheck":
                if (!value) this.setState({ passwordWarning: "Check password!" });
                else {
                    if (value === this.state.password) this.setState({ passwordWarning: "" });
                    else this.setState({ passwordWarning: "Check password!" });
                }
                break;
            default:
                break;
        }
    }

    handleSubmit = async e => {
        const username = this.state.username.toString();
        const password = this.state.password.toString();

        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password})
        };

        const response = await fetch('/auth/signup', requestOptions);
        const data = await response.json();
        
        if (data.success) {
            this.setState({isAuthorized: true});
        } else {
            this.setState({usernameWarning: data.message});
        }
    }

    render() {
        return (
            this.state.isAuthorized ? <Redirect to='/auth/signin' /> :
            <div className="sur-signin">
                <div>Sign Up</div>
                <div className="sur-form">
                    <div className="input">
                        <form onSubmit={this.handleSubmit}>
                            <div><div className="sur-input-warning">username<div>{this.state.usernameWarning}</div></div>
                                <input className="signin-input" type="text" onChange={e=>this.handleChange("username", e)}/>
                            </div>
                            <div><div className="sur-input-warning">password<div>{this.state.passwordWarning}</div></div>
                                <input className="signin-input" type="password" onChange={e=>this.handleChange("password", e)}/>
                            </div>
                            <div><div>password check</div>
                                <input className="signin-input" type="password" onChange={e=>this.handleChange("passwordcheck", e)}/>
                            </div>
                            <div>
                                <button type="submit" className="signin-button" disabled={this.state.passwordWarning || this.state.usernameWarning}>Sign Up!</button>
                            </div>
                        </form>
                    </div>
                    <div className="to-other">Already a member? <a href='/auth/signin'>Sign in.</a></div>
                </div>
            </div>
        )
    }
}

class SignUp extends React.Component {
    render() {
        return (
            <div className="mainframe">
                <SignUpFrame />
            </div>
        )
    }
}

export default SignUp;