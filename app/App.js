import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';
require('./styles/header.scss');

ReactDOM.render(
    // routes is an instruction sheet to Router to deside which component to render based on which
    // router we're at.
    <Router>{routes}</Router>,
    document.getElementById('app')

)