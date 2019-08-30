import React, { Component } from 'react';
import './App.css';
import Test from './Test';

class App extends Component {

  constructor() {
    super()
    this.state = {
      count: 0,
      champions: {}
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(data => {
      this.setState({
        count: data.count
      })
    })
    .catch(console.error)
    fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        champions: data.data
      })
    })
    .catch(console.error)
  }

  render() {
    return (
      <Test test={this.state} />
    );
  }
}

export default App;
