import React, { Component } from "react";

class CurrentWinner extends Component {
    render() {
        var topVotedChamp = this.props.votings
            .sort((v1, v2) => v2.count - v1.count)
            .map(voting => this.props.champions.find(champion => parseInt(champion.key) === parseInt(voting.champion_id)))
            .filter(champion => champion != null)
            .values().next().value
        var topVotedMastery = this.props.masteries != null ? this.props.masteries
            .find(mastery => parseInt(mastery.champion_id) === parseInt(topVotedChamp.key)) : null
        return (
            <div>
                <p className="text-center">
                    <span>I will be playing {topVotedChamp.name}.</span>
                    {topVotedMastery != null && <span> Current level: {topVotedMastery.mastery}</span>}
                </p>
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${topVotedChamp.id}_0.jpg`} className="w-100" alt="" />
            </div>
        )
    }
}

export default CurrentWinner