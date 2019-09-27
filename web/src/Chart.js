import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import ColorHash from 'color-hash'
import { getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc } from "./utils.js";

class Chart extends Component {
  render() {
    return (
      <Doughnut data={
        {
          labels:
            getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc(this.props.champions, this.props.votings, this.props.masteries)
              .map(champion => champion.name),
          datasets: [
            {
              data:
                getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc(this.props.champions, this.props.votings, this.props.masteries)
                  .map(champion => champion.votings),
              backgroundColor:
                getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc(this.props.champions, this.props.votings, this.props.masteries)
                  .map(champion => new ColorHash().hex(champion.key))
            }
          ]
        }
      } height={200} options={{
        maintainAspectRatio: false,
        legend: {
          labels: {
            filter: (legendItem, _) => legendItem.index < 5
          }
        }
      }} />
    )
  }
}

export default Chart