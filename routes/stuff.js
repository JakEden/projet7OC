const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload, compressImage } = require('../middleware/multer-config'); 
const stuffCtrl = require('../controllers/stuff');


router.post('/', auth, upload.single('image'), compressImage, stuffCtrl.addBook);
router.put('/:id', auth, upload.single('image'), compressImage, stuffCtrl.updateBook);

router.get('/', stuffCtrl.getBooks);
router.get('/bestrating', stuffCtrl.getBestRatedBooks);
router.get('/:id', stuffCtrl.getBook);
router.delete('/:id', auth, stuffCtrl.deleteBook);
router.post('/:id/rating', auth, stuffCtrl.createNote);

module.exports = router;
