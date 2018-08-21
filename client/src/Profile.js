import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import Logout from './Logout';
import WriteBlog from './WriteBlog';
import ShowUserBlogs from './ShowUserBlogs';



import Cookies from 'js-cookie'



class Profile extends Component {
constructor(props) {
    super(props)
    this.state={
      details: [],
      isLoading: true
    }
  }


componentDidMount() {
    this.setState({isLoading: false})
}

  componentWillMount() {
      let userId = this.props.match.params.id;
    axios.get(`https://mysterious-island-83177.herokuapp.com/api/profile/${userId}`)
    .then(response => {
      if(response.data){
      this.setState({details: response.data}, () => {console.log(this.state.details);
        }) }
      else {
        Cookies.remove('robzcookie', { path: '/' })
                return window.location.href = '/login'

      }
    })
}






  render() {

    return (
      <div>

       <div>
        <nav>
    <div className="nav-wrapper">
      <a href="/profile/:id" className="brand-logo">Profile</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="sass.html">Hello {this.state.details.Name} </a></li>
        <li><a href="badges.html">{this.state.details.Email}</a></li>
        <li><Logout /></li>

      </ul>
    </div>
  </nav>
      <div className='profile-div'>
      <WriteBlog />
      <ShowUserBlogs/>
      </div>

      </div>





      </div>
    );
  }
}

export default Profile;