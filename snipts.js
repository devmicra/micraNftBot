const woeidData = woeid.getWoeid(process.env.CURRENT_LOCAL)
  const localName = woeidData.country
  const localId = woeidData.woeid

  console.log("Inicializando buscas de trending topics para " + '\x1b[33m%s\x1b[0m', localName + '\x1b[37m', '...')

  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_SECRETE_API_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRETE,

  })

  const trendingTopics = []
  client.get('https://api.twitter.com/1.1/trends/place.json?id=' + localId, function (error, data) {
    if (!error) {
      console.log('\x1b[33m%s\x1b[0m', data[0].trends.length + '\x1b[37m', 'trending topics recebidos...');
      for (var i = 0; i < data[0].trends.length; i++) {
        console.log('\x1b[33m%s\x1b[0m', data[0].trends[i].name)
        trendingTopics[i] = data[0].trends[i].name
      }
      console.log('Trending topics capturados...')
      return trendingTopics
    } else {
      console.log(error)
    }
  })


  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then((responseJson) => {
    // Do something with the response
  })
  .catch((error) => {
    console.log(error)
  });