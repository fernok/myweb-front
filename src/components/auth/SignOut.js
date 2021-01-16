import React from 'react';
import { Redirect } from 'react-router-dom';

class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {canRedirect: false};
    }

    async userSignOut() {
        const requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        const response = await fetch('/auth/signout', requestOptions);

        const data = await response.json();
        console.log(data);
        if (data.success) {
            this.setState({canRedirect: true});
        } else {
            this.setState({canRedirect: false});
        }
    }

    componentDidMount() {
        this.userSignOut();
    }

    render() {
        return (
            <div>
                Hello! this is SignOut page!
                {
                    this.state.canRedirect ?
                    <Redirect to="/" /> : <span>Sign Out failed..</span>
                }
            </div>
        )
    }
}

export default SignOut;