import React from 'react';

class AddNote extends React.Component{
    handleSubmit(){
        var newNote = this.note.value;
        this.note.value = '';
        this.props.addNote(newNote)
    }
    setRef(ref){
        this.note = ref;
    }
    render(){
        // ref is like a name tag you give it to an input field so you can access to that value
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Add new note" ref={ (ref) => this.setRef(ref) } />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={() => this.handleSubmit()}> Submit </button>
                </span>
            </div>
        )
    }
}

AddNote.PropTypes = {
    username: React.PropTypes.string.isRequired,
    addNote: React.PropTypes.func.isRequired
}

export default AddNote;
