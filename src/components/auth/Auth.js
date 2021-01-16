import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
// import { SignIn, SignOut, SignuUp } from 'auth';

const Auth = ({match}) => {
    return (
        <>
            <Route path={`${match.url}/signin`} component={SignIn} />
            <Route path={`${match.url}/signout`} component={SignOut} />
            <Route path={`${match.url}/signup`} component={SignUp} />
        </>
    )
};

export default Auth;