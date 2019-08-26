const cheerio = require('cheerio')
var request = require('request');
const format = require('string-format')
const WebPageCrawler = require('./webPageCrawler.service');

const googleBaseUrl = 'https://www.google.com/search?q={} libro&safe=active&source=lnms';
request = request.defaults({jar: true});


class BookSearch  {
    constructor() {
    }
    
    search(book) {
        var toSearch = format(googleBaseUrl, book);
        console.log("Searching " + toSearch);
        
        request(toSearch, function(err, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (err) {
              return res.status(500).send(err);
            }
            var $ = cheerio.load(html);
            var links = [];
            // For each outer div with class g, parse the desired data
            $('.kCrYT').each(function(i, element) {
                if($(this).find('a').attr('href')) {
                    var link = $(this).find('a').attr('href').replace('/url?q=', '').split('&')[0];
                    links.push({
                      link: link
                    });
                }
            });
            console.log(links);
            var webCrawler = new WebPageCrawler(book);
            webCrawler.start(links)
        });
    }
}
module.exports = BookSearch;