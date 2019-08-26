const BookInfo = require('../models/bookInfo.model.js');

exports.findOne = (req, res) => {
    console.log("Book info");
    BookInfo.find({ title: { $eq: req.params.bookTitle } })
    .then(bookInfo => {
        if(!bookInfo) {
            return res.status(404).send({
                message: "Book not found with title " + req.params.bookTitle
            });
        }
        res.send(bookInfo);
    })
};