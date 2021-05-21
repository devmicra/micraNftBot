require('dotenv').config()
const twitter = require('./twitter.js')
const Algorithmia = require("algorithmia")

async function robot(data) {

    console.log('\x1b[36m%s\x1b[0m', '> [watson-bot] Starting...')
    console.log('O termo a ser pesquisado é ' + '\x1b[36m%s\x1b[0m', data)


    var input = {
        "articleName": data,
        "lang": "en"
    };
    Algorithmia.client(process.env.ALGORITHIMIA_API_KEY)
        .algo("web/WikipediaParser/0.1.2?timeout=300") // timeout is optional
        .pipe(input)
        .then(function (response) {
            console.log(response.get());
        });

}

module.exports = {
    robot
}