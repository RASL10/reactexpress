import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
 
    };
  }



  render() {
    return (
      <div className="blog">
        <li>
        {this.state.item.title}   
        </li>
         <li>
        {this.state.item.content}       
        </li>

     </div>
    );
  }
}

export default Blogs;


