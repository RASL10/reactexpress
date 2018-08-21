import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import App from './App';
import Cookies from 'js-cookie'
import Logout from './Logout';
import ShowBlogs from './ShowBlogs';
import WriteBlog from './WriteBlog';





class Landing extends Component {
    constructor() {
    super();
    this.state = {
      authorized: '',
      details: []
    }
    
  }

  componentDidMount() {
   
  var mycookie = Cookies.get('robzcookie');
  if (mycookie) {
    this.setState({authorized : true})


    let userId = this.props.match.params.id;
    axios.get(`https://mysterious-island-83177.herokuapp.com/api/profile/${userId}`)
    .then(response => {
      if(response.data){
      this.setState({details: response.data}, () => {console.log(this.state.details);
        }) }
      else {
        console.log('not working')

      }
    })
  } else {
    this.setState({authorized : false})
  }

  

  
}











  render() {

    return (
      <div>
              <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Home</a>
      { this.state.authorized ?
      <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/profile/:id">Hi, {this.state.details.Name} </a></li>
          <li><a href="/profile/:id">Profile</a></li>
                  <li><Logout /></li>


        </ul> : 
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
      }
      
    </div>
  </nav>
  <ShowBlogs />
  </div>

            
    );
  }
}

export default Landing;