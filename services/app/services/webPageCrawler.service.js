var Crawler = require("crawler");
var BookInfoSchema = require('../models/bookInfo.model');
var fileExtension = require('file-extension');
var book;
class WebPageCrawler {
    constructor(_book) {
        book = _book;        
    }

    start(_links) {
        this.links = _links;
        
        var c = new Crawler({
            maxConnections : 10,
            retries: 0,
            callback : this.postProccessRequest
        });
        console.log("Book " + book);
        _links.forEach(element => {
            console.log("Extension " + fileExtension(element.link));
            if(fileExtension(element.link) !== 'pdf') {
                c.queue(element.link);
            }
        });
    }

    postProccessRequest (error, res, done) {
        var complementText = function(initialValue, secondValue) {
            return secondValue ? (initialValue ? initialValue + '--': '') + secondValue : initialValue;
        }

        var saveResult = function(info) {
            const bookInfo = new BookInfoSchema({
                title: book, 
                info: info
            });

            // Save Note in the database
            bookInfo.save()
            .then(data => {
                console.log(bookInfo)
            }).catch(err => {
                console.log(err.message);
            });
        }

        if(error){
        } else {
            var $ = res.$;
            var info = {
                brand: '',
                price: '',
                releaseDate: '',
                description: ''
            };
            saveResult
            info.brand = complementText('', $("meta[property='product:brand']").attr("content"));
            info.price = complementText('', $("meta[property='product:price:amount']").attr("content"));
            info.releaseDate = complementText('', $("meta[property='book:release_date']").attr("content"));
            info.description = complementText('', $('.description').text());
            saveResult(info);
        }
        done();
    }

}
module.exports = WebPageCrawler;