import React, { Component } from "react";

class CurrentWinner extends Component {
    render() {
        return (
            <div>
                <p className="text-center"><span>I will be playing </span>
                    {this.props.votings
                        .sort((v1, v2) => v2.count - v1.count)
                        .map(voting => this.props.champions.find(champion => parseInt(champion.key) === parseInt(voting.champion_id)))
                        .filter(champion => champion != null)
                        .values().next().value.name}
                    <span>. Current level: </span>
                    {this.props.masteries != null && this.props.masteries.length > 0 ? this.props.votings
                        .sort((v1, v2) => v2.count - v1.count)
                        .map(voting => (this.props.masteries.find(mastery => parseInt(mastery.champion_id) === parseInt(voting.champion_id)) || { mastery: 0 }).mastery)
                        .values().next().value : 0}
                    .</p>
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.props.votings
                    .sort((v1, v2) => v2.count - v1.count)
                    .map(voting => this.props.champions.find(champion => parseInt(champion.key) === parseInt(voting.champion_id)))
                    .filter(champion => champion != null)
                    .values().next().value.id}_0.jpg`} className="w-100" alt="" />
            </div>
        )
    }
}

export default CurrentWinner