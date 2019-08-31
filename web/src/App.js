import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap'
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
      <div>
        <h1 className="text-center">Which champ should I level to level 5 next?</h1>
      <Container>
        <Row>
          {this.state.champions.sort((c1, c2) => c1.name - c2.name).map((champion) =>
            <Col xs="3" className="mb-3">
              <Champion champion={champion} key={champion.key} />
            </Col>
          )}
        </Row>
      </Container>
      </div>
    );
  }
}

export default App;
