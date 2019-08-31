import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap'
import SVG from 'react-inlinesvg'
import Champion from './Champion'
import championsJSON from './champions.json'
import { config } from './config'
import {version} from '../package.json'

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
      .catch(console.error)
  }

  render() {
    return (
      <div className="p-3">
        <a href="https://github.com/Goddchen/lol-champ-voting/" target="_blank" rel="noopener noreferrer">
          <SVG src='<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 250 250" fill="#ffffff" style="position: absolute; top: 0; right: 0"> \
                      <path d="M0 0l115 115h15l12 27 108 108V0z" fill="#000000"/> \
                      <path class="octo-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" style="-webkit-transform-origin: 130px 106px; transform-origin: 130px 106px"/> \
                      <path class="octo-body" d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"/> \
                    </svg>' />
        </a>
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
                <Col className="col-12 col-sm-6 col-md-3 mb-3" key={champion.key}>
                  <Champion data={champion} votings={champion.votings} mastery={champion.mastery} updateVotings={this.updateVotings} />
                </Col>
              )}
          </Row>
          <Row>
            <Col>
                <p className="text-center">
                  Version: {version}<br/>
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
