import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie'




import Landing from './Landing';
import Register from './Register.js';
import Login from './Login.js';
import Profile from './Profile.js';
import ShowUserBlogs from './ShowUserBlogs.js';
import EditBlog from './EditBlog.js';








class App extends Component {
    constructor() {
    super();
    this.state = {
      authorized: ''
    }
    
  }

  componentDidMount() {
   
  var mycookie = Cookies.get('robzcookie');
  if (mycookie) {
    this.setState({authorized : true})
  } 
  if (mycookie =! Cookies.get('robzcookie')) {
    this.setState({authorized : false})
  }
  }

  



  render() {
  
    return (

      <div>

      <Router>
        <div >
                     

          <Route exact path="/" key="landing" component={Landing} />
                    <Route exact path="/myblogs" key="myblogs" component={ShowUserBlogs} />

          <Route path="/register" key="Register"component={Register} />

          <Route exact path="/login" render={() => (
            this.state.authorized ? (
              <Redirect to="/profile/:id"/>
                ) : (
            <Route path="/Login" key="Login" component={Login} />
  )
)}/>

          <Route exact path="/profile/:id" render={() => (
            this.state.authorized ? (
              '') : (
            <Redirect to="/login"/>
  )
)}/>
                    <Route exact path="/profile/:id/myblogs/:id" key="edit-blog" component={EditBlog} />

          { this.state.authorized? <Route exact path="/profile/:id" key="profile" component={Profile} /> : ''}
        </div>
      </Router>
     

      </div>
    );
  }
}





export default App;
