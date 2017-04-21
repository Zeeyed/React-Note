var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var routes = require('./config/routes');

ReactDOM.render(
    // routes is an instruction sheet to Router to deside which component to render based on which
    // router we're at.
    <Router>{routes}</Router>,
    document.getElementById('app')

)