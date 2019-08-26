module.exports = (app) => {
    const bookInfo = require('../controllers/bookInfo.controller.js');
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
    

    app.get('/bookInfo/:bookTitle', cors(), bookInfo.findOne);
}
