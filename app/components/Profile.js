var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
    mixins: [ReactFireMixin],
    // Set initial state of component 
    getInitialState: function(){
        return{
            notes: [1, 2, 3],
            bio: {
                name: 'Zied Glb'
            },
            repos: ['a', 'b', 'c']
        }
    },
    // Ajax request 
    componentDidMount: function(){
        this.ref = new Firebase('https://notes-cd9b3.firebaseio.com/');
        var childRef = this.ref.child(this.props.params.username);
        this.bindAsArray(childRef, 'notes');
    },
    componentWillUnmount: function(){
        this.unbind('notes');
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