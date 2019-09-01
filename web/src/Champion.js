import React, { Component } from 'react'
import { Card, CardBody, CardText, CardHeader, CardImg, Button } from 'reactstrap'
import { config } from './config'
import ColorHash from 'color-hash'

class Champion extends Component {

    constructor(props) {
        super(props)
        this.submitVote = this.submitVote.bind(this)
    }

    render() {
        return (
            <div>
                <Card className="shadow-sm">
                    <CardHeader style={this.props.coloredHeaders || false ? {backgroundColor: new ColorHash({lightness: 0.8}).hex(this.props.data.key)} : null}>{this.props.data.name}</CardHeader>
                    <CardImg src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.props.data.id}_0.jpg`} />
                    <CardBody>
                        <CardText>
                            {this.props.votings} Votes
                        </CardText>
                        <CardText>
                            Current Level: {this.props.mastery}
                        </CardText>
                        <Button className="w-100" onClick={this.submitVote}>Vote</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }

    submitVote() {
        fetch(`${config.apiUrl}/votings`,
            {
                method: 'POST',
                body: JSON.stringify({ champion_id: this.props.data.key }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(_ => this.props.updateVotings())
            .catch(console.error)
    }
};

export default Champion