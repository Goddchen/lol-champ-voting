import React, { Component } from 'react'
import './App.css'
import Champion from './Champion'
import championsJSON from './champions.json'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      champions: Object.keys(championsJSON.data).map(key => championsJSON.data[key])
    }
    console.log(this.state)
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
  }

  render() {
    console.log(this.props)
    return (
      this.state.champions.sort((c1, c2) => c1.name - c2.name).map((champion) => <Champion data={champion} />)
    );
  }
}

export default App;
