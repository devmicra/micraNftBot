require('dotenv').config()
const twitter = require('./twitterTrending.js')
const wiki = require('wikipedia');

var content = {
    trending: '',
    term: '',
    wikipediaResume: '',
    wikipediaContent: ''
}

async function robot(data) {

    console.log('\u001b[36m> [text-robot] Starting')

    await fetchContentFromWikipedia(data)

    async function fetchContentFromWikipedia(data) {

        content.trending = data.trending
        // console.log(content.trending);
        console.log('\u001b[36m> [text-robot]\u001b[37m Find suggestion from Wikipedia')

        const numberMaxsuggestions = 20
        // const wikipediaSuggestion = await wiki.suggest(content.trending)
        // console.log(wikipediaSuggestion);
        // console.log('\u001b[36m> [text-robot]\u001b[37m The initial suggestion is\u001b[36m', wikipediaSuggestion)

        const searchResults = await wiki.search(content.trending, { suggestion: true, limit: numberMaxsuggestions });
        content.term = await searchResults.results[Math.round(Math.random() * (searchResults.results.length-1))].title

        console.log('\u001b[36m> [text-robot]\u001b[37m The suggestion is\u001b[36m', content.term)
        console.log('\u001b[36m> [text-robot]\u001b[37m Fetching content from Wikipedia')

        const wikipediaPage = await wiki.page(content.term)
        content.wikipediaContent = await wikipediaPage.content({ redirect: false })
        content.wikipediaResume = await wikipediaPage.intro({ redirect: false })

        console.log('\u001b[36m> [text-robot] Resume:\u001b[37m ' + content.wikipediaResume)
        console.log('\u001b[36m> [text-robot] Content:\u001b[37m ' + content.wikipediaContent)

       return content

    }

}

function getContent(){
    return content
  }

module.exports = {
    robot,
    getContent
}