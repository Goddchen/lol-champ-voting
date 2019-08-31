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
      masteries: [],
      champions: Object.keys(championsJSON.data).map(key => championsJSON.data[key])
    }
    this.updateVotings = this.updateVotings.bind(this)
  }

  componentDidMount() {
    this.updateVotings()
    fetch('http://localhost:3000/masteries')
      .then(res => res.json())
      .then(data => {
        this.setState({
          masteries: data
        })
      })
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Which champ should I level to level 5 next?</h1>
        <p className="text-center">I'll be playing only the most voted champ in normal games until level 5 is reached.</p>
        <Container>
          <Row>
            {this.state.champions
              .map(champion => {
                champion.votings = (this.state.votings.find(voting => parseInt(voting.champion_id) === parseInt(champion.key)) || { count: 0 }).count
                champion.mastery = (this.state.masteries.find(mastery => parseInt(mastery.champion_id) === parseInt(champion.key)) || { mastery: 0 }).mastery
                return champion
              })
              .sort((c1, c2) => {
                if (c1.votings !== c2.votings) return -(c1.votings - c2.votings)
                return c1.name - c2.name
              })
              .filter(champion => champion.mastery < 5)
              .map(champion =>
                <Col xs="3" className="mb-3" key={champion.key}>
                  <Champion data={champion} votings={champion.votings} mastery={champion.mastery} updateVotings={this.updateVotings}/>
                </Col>
              )}
          </Row>
        </Container>
      </div>
    );
  }

  updateVotings() {
    fetch('http://localhost:3000/votings')
      .then(res => res.json())
      .then(data => {
        this.setState({
          votings: data
        })
      })
      .catch(console.error)
  }
}

export default App;
