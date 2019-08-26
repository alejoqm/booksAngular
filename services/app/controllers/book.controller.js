const Book = require('../models/book.model.js');
const BookSearch = require('../services/bookSearch.service.js');

// Create and Save a new Note
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if(!req.body.title || !req.body.author) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Create a Note
    const book = new Book({
        title: req.body.title, 
        author: req.body.author
    });

    // Save Note in the database
    book.save()
    .then(data => {
        var bookSearch = new BookSearch();
        bookSearch.search(book.title);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Book."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    const book = new Book({
        title: req.params.bookTitle, 
        author: req.params.bookAuthor
    });
    Book.findOneAndRemove({ title: { $eq: req.params.bookTitle } }, { title: req.params.bookTitle })
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with title " + req.params.bookTitle
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        console.log(err);
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookTitle
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.bookTitle
        });
    });

};
