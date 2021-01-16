import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Main from './components/root/Main';
import Auth from './components/auth/Auth';
import Proj from './components/proj/Proj';

class App extends Component {
    render() {
        return (
            <>
                <Route exact path="/" component={Main} />
                <Route path="/auth" component={Auth} />
                <Route path="/p" component={Proj} />
            </>
        )
    }
}

export default App;