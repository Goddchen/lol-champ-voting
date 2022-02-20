import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Spinner } from 'reactstrap'
import Champion from './Champion'
import GitHubBadge from "./GitHubBadge"
import Chart from "./Chart"
import CurrentWinner from "./CurrentWinner"
import championsJSON from './champions.json'
import { config } from './config'
import packageInfo from '../package.json'
import { getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc } from "./utils.js";

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
    if (this.state.masteries === null || this.state.votings === null) {
      return (
        <div className="p-3 d-flex justify-content-center">
          Error loading page :/
        </div>
      )
    } else if (this.state.masteries.length === 0 || this.state.votings.length === 0) {
      return (
        <div className="p-3 d-flex justify-content-center">
          <Spinner />
        </div>
      )
    } else {
      return (
        <div className="p-3">
          <GitHubBadge />
          <h1 className="text-center">Which champ should I level to level 5 next?</h1>
          <p className="text-center">I'll be playing only the most voted champ in normal games until level 5 is reached.</p>
          <Container>
            {
              this.state.votings.length > 0 ? <Row className="mb-3">
                <Col>
                  <Chart votings={this.state.votings} champions={this.state.champions} masteries={this.state.masteries} />
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
              {getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc(this.state.champions, this.state.votings, this.state.masteries)
                .map(champion =>
                  <Col className="col-12 col-sm-6 col-md-3 mb-3" key={champion.key}>
                    <Champion data={champion} votings={champion.votings} mastery={champion.mastery} updateVotings={this.updateVotings} />
                  </Col>
                )}
            </Row>
            <Row>
              <Col>
                <p className="text-center">
                  Version: {packageInfo.version}<br />
                  Total #votings: {this.state.votings.map(voting => parseInt(voting.count)).reduce((prev, curr) => prev + curr, 0)}
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
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
