import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
 
    };
  }

  onDelete() {
    let blogId = this.state.item.id;
    axios.delete(`https://mysterious-island-83177.herokuapp.com/api/profile/:id/myblogs/${blogId}`)
    .then(response => {
      return window.location.href = '/profile/:id'
        }).catch(err => console.log(err))


  }


  render() {
    return (
      <div >
      <div className="privateBlog">
        <li>
        {this.state.item.title}   
        </li>
         <li>
        {this.state.item.content}       
        </li>
        <li><a href={`/profile/:id/myblogs/${this.state.item.id}`}>Edit</a></li>
  </div>
  <div className="deleteButton">
 <button onClick={this.onDelete.bind(this)}  type="submit" name="action">X</button>
 </div>

     </div>
    );
  }
}

export default Blogs;


