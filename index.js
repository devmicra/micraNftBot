const twitter = require('./bots/twitter.js')
const text = require('./bots/text.js')


async function start() {
    await twitter.robot()
    await text.robot(twitter.getTrending())
}

start()







