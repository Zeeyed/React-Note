import React from 'react';
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

const base = Rebase.createClass('https://notes-cd9b3.firebaseio.com/')

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            notes: [],
            bio: {},
            repos: []
        };
    }
    // Ajax request 
    // taking the username from the params itself
    componentDidMount(){
        //this.ref = new Firebase('https://notes-cd9b3.firebaseio.com/');
        this.init(this.props.params.username);
    }
    // When this component receive new props
    // And whenever react router changes its route
    componentWillReceiveProps(nextProps){
        base.removeBinding(this.ref);
        this.init(nextProps.params.username);
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    init(username){
        this.ref = base.bindToState(username, {
            context : this,
            asArray : true,
            state : 'notes'
        });

        getGithubInfo(username)
            .then(function(data){
                this.setState({
                    bio: data.bio,
                    repos: data.repos
                })
            }.bind(this))
    }
    handleAddNote(newNote){
        base.post(this.props.params.username, {
            data : this.state.notes.concat([newNote])
        })
    }
    render(){
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
                        addNote={(newNote) => this.handleAddNote(newNote)}/>
                </div>
            </div>
        )
    }
}

export default Profile;
