require('dotenv').config()
const Twitter = require('twitter');

var Tokenizer = require('sentence-tokenizer');
var tokenizer = new Tokenizer('Chuck');

const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_SECRETE_API_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRETE
})

async function robot(data) {
    // console.log(data);
    // const tweet = data.wikipediaResume
    tokenizer.setEntry(data.wikipediaResume)
    const tweet = tokenizer.getSentences()[0]
    // console.log(tokenizer.getSentences()[0]);
    console.log('\u001b[32m> [text-robot]\u001b[37m Twitting: \u001b[32m', tweet)


    client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
        if (error) console.log("error", error);
        else
            console.log('\u001b[32m> [twitterPost-robot]\u001b[37m  Twitted!')
    })
    


}

module.exports = {
    robot
}





// cliente.tweetar = function (tweet) {
//     console.log("tweet =", tweet);
//     client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
//         if (error) console.log("error", error);
//         else
//             console.log("Tweet enviado.");
//     });
// }

//Exporta o cliente
// module.exports = cliente;
