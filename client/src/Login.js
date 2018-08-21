import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class Login extends Component {
  constructor() {
    super()
    this.state = {
      error: ''
    }
  }

    login(user) {
    axios.request({
      method: 'POST',
      url: 'https://mysterious-island-83177.herokuapp.com/api/login',
      data: user,
      withCredentials: true,
      headers: {
        'crossDomain': true,
      }
      // 'Access-Control-Allow-Origin': 'https://infinite-shore-24194.herokuapp.com',
      // //   'Content-Type': 'application/json',

      // }
    }).then(response => {
      console.log(response.data)
      let userId = response.data.id;
      return window.location.href = '/profile/' + userId
    }).catch(error => {
      this.setState({error: 'Invalid login'}, () => {console.log(this.state);

        })
    })
}




  onSubmit(e) {
    const user = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.login(user)
    e.preventDefault()
  }

  render() {
    return (
      <div className="login">
        <br/>
        <Link to='/'>Back</Link>
        <div className="row">{this.state.error}</div>
        <form className="col s12" onSubmit={this.onSubmit.bind(this)}>
          <div className="row">
          <div className="input-field col s12">
            <input id="username" className="validate" type="text" name="username" ref="username"/>
            <label className="active" htmlFor="username">Username</label>
          </div>
          <div className="input-field col s12">
            <input id="password" className="validate" type="password" name="password" ref="password"/>
            <label className="active" htmlFor="password">Password</label>
          </div>
      <div className="input-field col s12">
          <button className="btn waves-effect waves-light" type="submit" name="action">Login</button>
          </div>
          </div>

        </form>


        </div>
     
    );
  }
}

export default Login;


