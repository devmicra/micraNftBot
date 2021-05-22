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

var content = {
  trending: ''
}

async function robot() {
  console.log('\u001b[33m> [twitter-robot] Starting')

  // get WOEID 
  const woeidData = woeid.getWoeid(process.env.CURRENT_LOCAL)
  const localName = woeidData.country
  const localId = woeidData.woeid

  console.log('\u001b[33m> [twitter-robot] \u001b[37mSearching trending topics in\u001b[33m ' + localName)

  const fetchTwitterTrendingTopics = await fetch(
    'https://api.twitter.com/1.1/trends/place.json?id=' + localId,
    options
  ).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('\u001b[33m> [twitter-robot] \u001bSomething went wrong');
    }
  })
    .catch((error) => {
      console.log(error)
    })

  if (fetchTwitterTrendingTopics) {

    console.log('\u001b[33m> [twitter-robot] \u001b[37mFound\u001b[33m ' + fetchTwitterTrendingTopics[0].trends.length + '\u001b[37m trendings')

    const trendingTopics = fetchTwitterTrendingTopics[0].trends
    // console.log(trendingTopics);
    //////////////////////////////////////////////////////////////////////////////////
    //   let maxVolumeTweet = ([])

    // for (i = 0; i < trendingTopics.length; i++) {
    //   if (!!parseInt(trendingTopics[i].tweet_volume)) {
    //     maxVolumeTweet = parseInt(trendingTopics[i].tweet_volume)
    //     // console.log(trendingTopics[i].tweet_volume);
    //   }
    // }

    // console.log('\u001b[33m> [twitter-robot] \u001b[37mFound a trend with\u001b[33m', Math.max(maxVolumeTweet) + '\u001b[37m tweets')

    // for (i = 0; i < trendingTopics.length; i++) {
    //   if (Math.max(maxVolumeTweet) == parseInt(trendingTopics[i].tweet_volume)) {
    //     content.trending = trendingTopics[i].name
    //   }
    // }
    content.trending = trendingTopics[Math.round(Math.random() * (trendingTopics.length - 1))].name
  }
  // console.log('\u001b[33m> [twitter-robot] \u001b[37mThis trend is\u001b[33m', content.trending);
  // // console.log(content);
  ////////////////////////////////////////////////////////////////////////////////////////


  console.log('\u001b[33m> [twitter-robot] \u001b[37mThe random trend is\u001b[33m', content.trending);

  return content
}

function getTrending() {
  return content
}

module.exports = {
  robot,
  getTrending
}




