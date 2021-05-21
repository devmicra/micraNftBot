const twitter = require('./bots/twitter.js')
const watson = require('./bots/watson.js')


async function start() {
    await twitter.robot()
    await watson.robot()
}

start()







