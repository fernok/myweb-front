import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Read from './Read';
import Edit from './Edit';
import Delete from './Delete';

const Proj = ({match}) => {
    return (
        <>
            <Switch>
                <Route path={`${match.url}/edit/:id`} component={Edit}/>
                <Route path={`${match.url}/:id`} component={Read} />
                {/* <Route path={`${match.url}/delete/:id`} component={Delete}/> */}
            </Switch>
        </>
    )
};

export default Proj;