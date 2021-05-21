require('dotenv').config()
const woeid = require('woeid')
const fetch = require('node-fetch');

const twitterToken = 'Bearer ' + process.env.TWITTER_BEARER_TOKEN

const options = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    Authorization: twitterToken,
  }
}


async function robot() {
  console.log('\x1b[33m%s\x1b[0m', '> [twitter-bot] Starting...');

  // get WOEID 
  const woeidData = woeid.getWoeid(process.env.CURRENT_LOCAL)
  const localName = woeidData.country
  const localId = woeidData.woeid

  console.log("Inicializando buscas de trending topics para " + '\x1b[33m%s\x1b[0m', localName + '\x1b[37m', '...')

  const fetchTwitterTrendingTopics = await fetch(
    'https://api.twitter.com/1.1/trends/place.json?id=' + localId,
    options
  ).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Something went wrong');
    }
  })
    .catch((error) => {
      console.log(error)
    })

  if (fetchTwitterTrendingTopics) {

    console.log('\x1b[33m%s\x1b[0m', fetchTwitterTrendingTopics[0].trends.length + '\x1b[37m', 'trending topics encontradas...')

    const trendingTopics = fetchTwitterTrendingTopics[0].trends
    // console.log(trendingTopics);

    let maxVolumeTweet = ([])

    for (i = 0; i < trendingTopics.length; i++) {
      if (!!parseInt(trendingTopics[i].tweet_volume)) {
        maxVolumeTweet = parseInt(trendingTopics[i].tweet_volume)
        // console.log(trendingTopics[i].tweet_volume);
      }
    }

    console.log('Uma trending com ' + '\x1b[33m%s\x1b[0m', Math.max(maxVolumeTweet) + '\x1b[37m', 'tweets foi encontrada...')

    let trending
    
    for (i = 0; i < trendingTopics.length; i++) {
      if (Math.max(maxVolumeTweet) == parseInt(trendingTopics[i].tweet_volume)) {
        trending = trendingTopics[i].name
      }
    }

    console.log('Esse trending é ' + '\x1b[33m%s\x1b[0m', trending);


  }
}
module.exports = {
  robot,

}




