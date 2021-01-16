import React from 'react';
import { Route } from 'react-router-dom';
import Read from './Entry';
import Edit from './Edit';
import Delete from './Delete';

const Proj = ({match}) => {
    return (
        <>
            <Route path={`${match.url}/:id`} component={Read} />
            <Route path={`${match.url}/edit/:id`} component={Edit}/>
            <Route path={`${match.url}/delete/:id`} component={Delete}/>
        </>
    )
};

export default Proj;