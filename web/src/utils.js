export function getOnlyChampsBelowLevel5SortedByVotingDescSortedByNameAsc(champions, votings, masteries) {
    return getOnlyChampsBelowLevel5(champions, votings, masteries)
    .sort((c1, c2) => {
        if (c1.votings !== c2.votings) return -(c1.votings - c2.votings)
        return c1.name - c2.name
      })
}

function getOnlyChampsBelowLevel5(champions, votings, masteries) {
    return champions.map(champion => {
        champion.votings = getChampionVotings(votings, champion.key)
        champion.mastery = getChampionMastery(masteries, champion.key)
        return champion
    })
    .filter(champion => champion.mastery < 5)
}

function getChampionMastery(masteries, champion_id) {
    var found = masteries.find(mastery => parseInt(mastery.champion_id) === parseInt(champion_id))
    return found ? found.mastery : 0;
}

function getChampionVotings(votings, champion_id) {
    var found = votings.find(voting => parseInt(voting.champion_id) === parseInt(champion_id))
    return found ? found.count : 0;
}