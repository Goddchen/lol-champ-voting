import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap'
import Champion from './Champion'
import GitHubBadge from "./GitHubBadge"
import Chart from "./Chart"
import CurrentWinner from "./CurrentWinner"
import championsJSON from './champions.json'
import { config } from './config'
import { version } from '../package.json'

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
    fetch(`${config.apiUrl}/masteries`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          masteries: data
        })
      })
      .catch((err) => {
        console.error(err)
        this.setState({
          masteries: null
        })
      })
  }

  render() {
    return (
      <div className="p-3">
        <GitHubBadge />
        <h1 className="text-center">Which champ should I level to level 5 next?</h1>
        <p className="text-center">I'll be playing only the most voted champ in normal games until level 5 is reached.</p>
        <Container>
          {
            this.state.votings.length > 0 ? <Row className="mb-3">
              <Col>
                <Chart votings={this.state.votings} champions={this.state.champions} />
              </Col>
            </Row> : null
          }
          {
            this.state.votings.length > 0 ?
              <Row className="mb-3">
                <Col className="col-12 col-sm-12 col-md-6 offset-0 offset-sm-0 offset-md-3">
                  <CurrentWinner votings={this.state.votings} champions={this.state.champions} masteries={this.state.masteries} />
                </Col>
              </Row> : null
          }
          <Row>
            {this.state.champions
              .map(champion => {
                champion.votings = (this.state.votings.find(voting => parseInt(voting.champion_id) === parseInt(champion.key)) || { count: 0 }).count
                champion.mastery = this.state.masteries === null ? -1 : (this.state.masteries.find(mastery => parseInt(mastery.champion_id) === parseInt(champion.key)) || { mastery: 0 }).mastery
                return champion
              })
              .sort((c1, c2) => {
                if (c1.votings !== c2.votings) return -(c1.votings - c2.votings)
                return c1.name - c2.name
              })
              .filter(champion => champion.mastery < 5)
              .map(champion =>
                <Col className="col-12 col-sm-6 col-md-3 mb-3" key={champion.key}>
                  <Champion data={champion} votings={champion.votings} mastery={champion.mastery} updateVotings={this.updateVotings} />
                </Col>
              )}
          </Row>
          <Row>
            <Col>
              <p className="text-center">
                Version: {version}<br />
                Total #votings: {this.state.votings.map(voting => parseInt(voting.count)).reduce((prev, curr) => prev + curr, 0)}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  updateVotings() {
    fetch(`${config.apiUrl}/votings`)
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
