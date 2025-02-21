const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = path.extname(name);
    const fileName = name.replace(extension, '') + '-' + Date.now() + extension;
    callback(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Middleware pour compresser les images avant de les enregistrer
const compressImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  // Utilisation de Sharp pour compresser et convertir l'image en WebP
  sharp(req.file.path)
  .resize({ width: 800 }) 
  .webp({ quality: 30 })  
  .toFile(path.resolve(req.file.destination, 'compressed', req.file.filename.replace(/\.[^/.]+$/, "") + '.webp'), (err, info) => {
    if (err) {
      return next(err);
    }
    // Supprimer l'image originale après la conversion
    fs.unlinkSync(req.file.path);
    // Indiquer le chemin de l'image compressée
    req.file.path = path.resolve(req.file.destination, 'compressed', req.file.filename.replace(/\.[^/.]+$/, "") + '.webp');
    next();
  });

};

module.exports = { upload, compressImage };