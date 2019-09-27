import React, { Component } from "react";
import { getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc } from "./utils.js";

class CurrentWinner extends Component {
    render() {
        var topVotedChamp =
            getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc(this.props.champions, this.props.votings, this.props.masteries)
                .values().next().value
        return (
            <div>
                <p className="text-center">
                    I will be playing {topVotedChamp.name}. Current level: {topVotedChamp.mastery}.
                </p>
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${topVotedChamp.id}_0.jpg`} className="w-100" alt="" />
            </div>
        )
    }
}

export default CurrentWinner