import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/form/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Rank from './components/rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import {config} from './config';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable:true,
        value_area: 750
      }
    }
  }
};

class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user : {
        id : '',
        email : '',
        name : '',
        entries : 0,
        joined : ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id : data.id,
        email : data.email,
        name : data.name,
        entries : data.entries,
        joined : data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col*width,
      topRow : clarifaiFace.top_row*height,
      rightCol : width - (clarifaiFace.right_col*width),
      bottomRow : height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

  onChangeInput = (event) => {
    console.log(event.target.value);
    this.setState({
      input : event.target.value
    });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input});

    let resok = true;
    fetch(`${config.url}/imageUrl`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({input : this.state.input})
    })
    .then(res => {
      resok = res.ok;
      return res.json();
    })
    .then(res => {
      if(resok){
        fetch(`${config.url}/image`,{
          method : 'PUT',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({id : this.state.user.id})
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries : count}));
        })
        .catch(err => console.log('error in /image request'))
      }
      this.displayFaceBox(this.calculateFaceLocation(res));
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route : route, imageUrl : '', box:{}});
    if(route==='home'){
      this.setState({isSignedIn : true});
    }else{
      this.setState({isSignedIn : false});
    }
  }

  render(){
    return (
      <div className="App">
        <Particles
          params={particlesOptions}
          className="particles"
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {
          this.state.route === 'home'?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onChangeInput={this.onChangeInput} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div>
            :
            (
              this.state.route === 'signin'?
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
  
}

export default App;
