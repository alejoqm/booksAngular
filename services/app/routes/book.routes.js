module.exports = (app) => {
    const books = require('../controllers/book.controller.js');
    var cors = require('cors')

    var whitelist = ['http://localhost:4200', 'http://127.0.0.1:4200']
    var corsOptionsDelegate = function (req, callback) {
      var corsOptions;
      if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false } // disable CORS for this request
      }
      callback(null, corsOptions) // callback expects two parameters: error and options
    }
    

    // Create a new Note
    app.post('/books', cors(), books.create);

    // Retrieve all Notes
    app.get('/books', cors(corsOptionsDelegate), books.findAll);

    // Retrieve a single Note with noteId
    app.get('/books/:bookTitle', books.findOne);

    // Update a Note with noteId
    app.put('/books/:bookTitle', books.update);

    // Delete a Note with noteId
    app.delete('/books/:bookTitle/:bookAuthor', cors(), books.delete);
}
