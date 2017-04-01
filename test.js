const tracker = require('./tracker')

const round = tracker()

round.setActors(['Car', 'Shanks', 'Whimsy', 'Koss', 'Gal', 'Enemy'])

const doOutput = () => {
  console.log(round.getGMView()) 
  console.log(round.getPlayerView())
}

for(let i = 0; i < 10; i++) {
  round.next()
  doOutput()
}

for(let i = 10; i > 0; i--) {
  round.previous()
  doOutput()
}


