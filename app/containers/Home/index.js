/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      photo:"",
      preview:"",
      description:""
    }
  }

  handlePhoto = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState ({
        photo: file,
        preview: reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  handleDesc = (event) => {
    this.setState ({
      description:event.target.value
    })
  }

  storePhoto = () => {

    let data = new FormData();
    data.append('photo', this.state.photo);
    data.append('description', this.state.description);

    fetch('http://localhost:8000/api/storePhoto', {
      method:'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error)
      {
        alert(json.error);
      }
      else if(json.success)
      {
        alert(json.success);
      }
    })
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <input type="file" onChange={this.handlePhoto}/>
        <input type="description" onChange={this.handleDesc}/>
        <input type="submit" value="Submit" onClick={this.storePhoto} />
        <img src={this.state.preview}/>

      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
