import React from 'react';
var Router = require('react-router');
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
import getGithubInfo from '../utils/helpers';

var Profile = React.createClass({
    mixins: [ReactFireMixin],
    // Set initial state of component 
    getInitialState: function(){
        return{
            notes: [],
            bio: {},
            repos: []
        }
    },
    // Ajax request 
    // taking the username from the params itself
    componentDidMount: function(){
        this.ref = new Firebase('https://notes-cd9b3.firebaseio.com/');
        this.init(this.props.params.username);
    },
    // When this component receive new props
    // And whenever react router changes its route
    componentWillReceiveProps: function(nextProps){
        this.unbind('notes');
        this.init(nextProps.params.username);
    },
    componentWillUnmount: function(){
        this.unbind('notes');
    },
    init: function(username){
         var childRef = this.ref.child(username);
        this.bindAsArray(childRef, 'notes');

        getGithubInfo(username)
            .then(function(data){
                this.setState({
                    bio: data.bio,
                    repos: data.repos
                })
            }.bind(this))
    },
    handleAddNote : function(newNote){
        // update firebase with the newNote
        // append the newNote to the end of firebase
        this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote)
    },
    render: function(){
        return(
            <div className="row">
                <div className="col-md-4">
                    <UserProfile username={this.props.params.username} bio={this.state.bio}/>
                </div>
                <div className="col-md-4">
                    <Repos username={this.props.params.username} repos={this.state.repos}/>
                </div>
                <div className="col-md-4">
                    <Notes 
                        username={this.props.params.username} 
                        notes={this.state.notes}
                        addNote={this.handleAddNote}/>
                </div>
            </div>
        )
    }
});

module.exports = Profile;