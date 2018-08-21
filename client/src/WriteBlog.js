import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class WriteBlog extends Component {

  addBlog(newBlog) {
    axios.request({
      method: 'post',
      url: 'https://mysterious-island-83177.herokuapp.com/api/addblog',
      data: newBlog
    }).then(response => {
      return window.location.href = '/api/profile/:id'
    }).catch(err => console.log(err));

  }

    onSubmit(e) {
    console.log(this.refs.title.value +''+ this.refs.content.value)
    const newBlog = {
      Title: this.refs.title.value,
      Content: this.refs.content.value
    }
    this.addBlog(newBlog)
    e.preventDefault()

  }


  render() {
    return (
      <div>
        <br/>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
                      <label htmlFor="title">Title</label>

            <input type="text" name="title" ref="title"/>
          </div>
          <div>
                      <label htmlFor="content">Content</label>

            <input type="text" name="content" ref="content"/>
          </div>


          <button type="submit">Add Blog</button>

        </form>


      </div>
     
    );
  }
}

export default WriteBlog;