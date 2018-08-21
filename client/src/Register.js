import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;


class Register extends Component {

  addUser(newUser) {
    axios.request({
      method: 'post',
      url: 'https://mysterious-island-83177.herokuapp.com/api/register',
      data: newUser
    }).then(response => {
      let userId = response.data.user_id
      
      return window.location.href = '/api/profile/' + userId
    }).catch(err => console.log(err));

  }

    onSubmit(e) {
    console.log(this.refs.name.value)
    console.log(this.refs.email.value)
    console.log(this.refs.password.value)

    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
    }
    this.addUser(newUser)
    e.preventDefault()

  }
  

  render() {
    return (
      <div>
        <br/>
        <Link to='/'>Back</Link>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <input type="text" name="name" ref="name"/>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input type="text" name="email" ref="email"/>
            <label htmlFor="sport">Email</label>
          </div>
          <div>
            <input type="password" name="password" ref="password"/>
            <label htmlFor="sport">Password</label>
          </div>
          <input type="submit" value="Register" />

        </form>


      </div>
     
    );
  }
}

export default Register;


