import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import App from './App';
import Cookies from 'js-cookie'




class Logout extends Component {


logout() {
  axios.get(`https://mysterious-island-83177.herokuapp.com/api/logout`, {withCredentials: true})
    .then(response => {
        Cookies.remove('robzcookie', { path: '/' })
        return window.location.href = '/'
        })
}



  render() {

    return (
      <a onClick={this.logout.bind(this)}>Logout</a>
    );
  }
}

export default Logout;