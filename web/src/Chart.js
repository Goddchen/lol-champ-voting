import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import ColorHash from 'color-hash'

class Chart extends Component {
  render() {
    return (
      <Doughnut data={
        {
          labels: this.props.votings
            .sort((v1, v2) => v2.count - v1.count)
            .map(voting => this.props.champions
              .find(champion => parseInt(voting.champion_id) === parseInt(champion.key)))
            .filter(champion => champion != null)
            .map(champion => champion.name),
          //.slice(0, 5),
          datasets: [
            {
              data: this.props.votings
                .sort((v1, v2) => v2.count - v1.count)
                .map(voting => voting.count),
              backgroundColor: this.props.votings
                .sort((v1, v2) => v2.count - v1.count)
                .map(voting => new ColorHash().hex(voting.champion_id))
            }
          ]
        }
      } height={200} options={{
        maintainAspectRatio: false,
        legend: {
          labels: {
            filter: (legendItem, data) => legendItem.index < 5
          }
        }
      }} />
    )
  }
}

export default Chart