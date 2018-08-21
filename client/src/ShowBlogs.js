import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Blogs from './Blogs'





class ShowBlogs extends Component {
constructor() {
    super()
    this.state={
      blogs: [],
    }
  }




  componentDidMount() {

    axios.get(`https://mysterious-island-83177.herokuapp.com/api/blogs`, 
      {withCredentials: false })
    .then(response => { this.setState({blogs: response.data}), console.log(response.data)});
    }

  
  render(){
    const blogs = this.state.blogs.map((item) => {
    	console.log(item.id)
      return (
			 <Blogs key={`${item.id}`} item={item} />
        )

    })
    return (
	<div>
	
        <ul>{blogs}</ul>
</div>
    );
  }
}




export default ShowBlogs;



