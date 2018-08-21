import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PrivateBlogs from './PrivateBlogs';




class ShowUserBlogs extends Component {
constructor() {
    super()
    this.state={
      blogs: [],
      isLoading: true
    }
  }

  componentWillMount() {

    axios.get(`https://mysterious-island-83177.herokuapp.com/api/profile/:id/myblogs`)
    .then(response => { this.setState({blogs: response.data}), console.log(response.data)})
    .catch(error => {
    console.log(error.response)
});;
    }

componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1500);
}




  
  render(){
    const blogs = this.state.blogs.map((item) => {
    	console.log(item.id)
      return (
			 <PrivateBlogs key={`${item.id}`} item={item} />
        )

    })
    return (
      <div>
            
          {this.state.isLoading ? 
            <div className="extra-margin">
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
           </div>
           </div> : 
           <div className="profileBlogs">
              <ul>{blogs}</ul> 
          </div> }
        </div>
    );
  }
}




export default ShowUserBlogs;



