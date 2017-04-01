
const round = () => {
  const state = { 
    actors: [], 
    currentActorIndex: 0,
    info: {}
  }
  const mod = (left, right) => ((left % right) + right) % right;

  const setActors = actors => state.actors = actors
  const checkActors = predicate => state.actors.length > 0 && predicate()
  const next = () => checkActors(() => state.currentActorIndex = mod((state.currentActorIndex + 1) , state.actors.length))
  const previous = () => checkActors(() => state.currentActionIndex = mod((state.currentActorIndex - 1) , state.actors.length))
  const getPlayerView = () => Object.assign({}, { current: state.actors[state.currentActorIndex], next: state.actors[mod((state.currentActorIndex + 1) , state.actors.length)] })
  const getGMView = () => Object.assign(getPlayerView, { info: state.info })

  return {
    setActors,
    next,
    previous,
    getPlayerView,
    getGMView
  }
}

const tracker = updater => {
  let currentRound = round()

  return {
    newRound: () => currentRound = round(),
    current: () => currentRound
  }
}

module.exports = tracker