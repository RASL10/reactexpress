import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPlayer extends Component {

  constructor(props) {
      super(props)
      this.state = {
        id: '',
        Title: '',
        Content: ''
      }

      this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillMount() {
    this.getBlogDetails()
      }


  getBlogDetails() {
      let blogId = this.props.match.params.id;
    axios.get(`https://mysterious-island-83177.herokuapp.com/api/profile/:id/myblogs/${blogId}`)
    .then(response => {
      this.setState({
        id: response.data[0].id, 
        Title: response.data[0].title, 
        Content: response.data[0].content

      }, () => {console.log(response.data)
      });
    }).catch(err => console.log(err))
}


editBlog(newBlog) {
      let blogId = this.props.match.params.id;
      axios.request({
      method:'put',
      url:`https://mysterious-island-83177.herokuapp.com/api/profile/:id/myblogs/${blogId}`,
      data: newBlog
    }).then(response => {
      this.props.history.push('/profile/:id');
    }).catch(err => console.log(err));
  }

  

  onSubmit(e) {
    const newBlog = {
      Title: this.refs.Title.value,
      Content: this.refs.Content.value
    }

    console.log()
    this.editBlog(newBlog)
    e.preventDefault()
  }



  handleInputChange(e) {
    const target = e.target;
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }


  render() {
    return (
      <div>
        <br/>
        <Link to='/profile/:id'>Back</Link>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <input type="text" name="Title" ref="Title" value={this.state.Title} onChange={this.handleInputChange}/>
            <label htmlFor="Title">Title</label>
          </div>
          <div>
            <input type="text" name="Content" ref="Content" value={this.state.Content} onChange={this.handleInputChange}/>
            <label htmlFor="Content">Content</label>
          </div>
          <input type="submit" value="save" />

        </form>


      </div>
     
    );
  }
}

export default EditPlayer;