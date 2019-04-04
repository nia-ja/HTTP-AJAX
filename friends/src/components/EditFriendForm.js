import React, { Component } from 'react';
import axios from 'axios';

class EditFriendForm extends Component {
    state = {
        name: '',
        age: '',
        email: '',
        id: ''
    }
    componentDidMount() {
        const id = Number(this.props.match.params.id);
        this.fetchFriend(id);
        this.setState(() => ({ id: id }));
        console.log(id);
    }
    fetchFriend = id => {
    axios
        .get(`http://localhost:5000/friends/${id}`)
        .then(response => {
        this.setState(() => ({ name: response.data.name, age: response.data.age, email: response.data.email }));
        })
        .catch(error => {
        console.error(error);
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const myId = Number(this.state.id);
        const updatedFriend = {
            name: this.state.name,
            age: Number(this.state.age),
            email: this.state.email
        }
        console.log(updatedFriend);
        this.props.editFriend(myId, updatedFriend);
        window.location.reload();
        this.setState({name: '', age: '', email: '', id: ''});
    }
    onChange = (e) => this.setState(
        {[e.target.name]: e.target.value}
    );
    render() {
        console.log(this.state.id);
        return(
            <form className="edit-friend" onSubmit={this.onSubmit}>
                <h4>Edit Friend Information</h4>
                <div className='input-field'>
                <label htmlFor='name'>Name</label>
                <input id='name' name='name' value={this.state.name} onChange={this.onChange} />
                </div>
                <div className='input-field'>
                <label htmlFor='age'>Age</label>
                <input id='age' name='age' value={this.state.age} onChange={this.onChange} />
                </div>
                <div className='input-field'>
                <label htmlFor='email'>Email</label>
                <input id='email' name='email' value={this.state.email} onChange={this.onChange} />
                </div>
                <button className='btn' type='submit'>Edit Friend</button>
            </form>
        )
    }
}

export default EditFriendForm;