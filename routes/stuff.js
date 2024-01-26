const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const stuffCtrl = require('../controllers/stuff');


   router.get('/', stuffCtrl.getBooks);
   router.get('/bestrating', stuffCtrl.getBestRatedBooks);
   router.post('/',auth, multer, stuffCtrl.addBook);
   router.get('/:id',stuffCtrl.getBook);
   router.delete('/:id',auth, stuffCtrl.deleteBook);
   router.put('/:id',auth, multer, stuffCtrl.updateBook);
   router.post('/:id/rating',auth,multer, stuffCtrl.createNote);
  

module.exports = router;