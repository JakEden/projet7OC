const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');



const stuffCtrl = require('../controllers/stuff');



   router.post('/:id/rating',auth, stuffCtrl.createNote);
   router.get('/',auth, stuffCtrl.getAllBooks);
   router.post('/',auth,stuffCtrl.createThing);
   router.get('/:id',auth, stuffCtrl.modifyOneThing);
   router.delete('/:id ',auth, stuffCtrl.deleteOneThing);
   router.get('/bestrating',auth, stuffCtrl.getBestRating);
   router.put('/:id ',auth,stuffCtrl.updateOneBook);
  
  



module.exports = router;