const twitterTrending = require('./bots/twitterTrending.js')
const text = require('./bots/text.js')
const twitterPost = require('./bots/twitterPost.js')


async function start() {
    await twitterTrending.robot()
    await text.robot(twitterTrending.getTrending())
    await twitterPost.robot(text.getContent())

    await start()

}

start()







