import React, { Component } from 'react'
import { Card, CardBody, CardText, CardHeader, CardImg, Button, Toast, ToastHeader, ToastBody, Spinner } from 'reactstrap'
import { config } from './config'
import ColorHash from 'color-hash'

class Champion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorToastVisible: false,
            errorToastHeader: "Header",
            errorToastBody: "Body",
            isLoading: false
        }
        this.submitVote = this.submitVote.bind(this)
    }

    render() {
        return (
            <div>
                <Card className="shadow-sm">
                    <CardHeader style={this.props.coloredHeaders || false ? { backgroundColor: new ColorHash({ lightness: 0.8 }).hex(this.props.data.key) } : null}>{this.props.data.name}</CardHeader>
                    <CardImg src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.props.data.id}_0.jpg`} />
                    <CardBody>
                        <CardText>
                            {this.props.votings} Votes
                        </CardText>
                        {
                            this.props.mastery !== -1 &&
                            <CardText>
                                Current Level: {this.props.mastery}
                            </CardText>
                        }
                        <Button className="w-100" onClick={this.submitVote}>{this.state.isLoading ? <Spinner size="sm" /> : "Vote"}</Button>
                    </CardBody>
                </Card>
                <Toast isOpen={this.state.errorToastVisible}>
                    <ToastHeader icon="danger">{this.state.errorToastHeader}</ToastHeader>
                    <ToastBody>{this.state.errorToastBody}</ToastBody>
                </Toast>
            </div>
        )
    }

    submitVote() {
        var _paq = window._paq || [];
        _paq.push(['trackEvent', 'Voting', 'Vote', this.props.data.key])
        this.setState({
            isLoading: true
        })
        fetch(`${config.apiUrl}/votings`,
            {
                method: 'POST',
                body: JSON.stringify({ champion_id: this.props.data.key }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                if (res.status === 429) {
                    this.setState({
                        errorToastVisible: true,
                        errorToastHeader: "Nope!",
                        errorToastBody: "You can only submit 1 vote each champ, no cheating!"
                    }, () => window.setTimeout(() => this.setState({ errorToastVisible: false }), 3000))
                } else if (res.ok) {
                    this.props.updateVotings()
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => this.setState({
                isLoading: false
            }))
    }
};

export default Champion