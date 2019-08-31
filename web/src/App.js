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
      votings: [],
      champions: Object.keys(championsJSON.data).map(key => championsJSON.data[key])
    }
    console.log(this.state)
  }

  componentDidMount() {
    fetch('http://localhost:3000/votings')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          votings: data
        })
      })
      .catch(console.error)
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1 className="text-center">Which champ should I level to level 5 next?</h1>
        <Container>
          <Row>
            {this.state.champions
              .map(champion => {
                champion.votings = (this.state.votings.find(voting => voting.champion_id == champion.key) || { count: 0 }).count
                return champion
              })
              .sort((c1, c2) => {
                if (c1.votings !== c2.votings) return -(c1.votings - c2.votings)
                return c1.name - c2.name
              })
              .map((champion) =>
                <Col xs="3" className="mb-3">
                  <Champion data={champion} key={champion.key} votings={champion.votings} />
                </Col>
              )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
