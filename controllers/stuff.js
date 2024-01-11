const Book = require('../models/Book');

exports.createThing =  (req, res, next) => {
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  
   };


   exports.modifyOneThing = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
   };


   exports.deleteOneThing = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };


  exports.getAllBooks = ((req, res, next) => {
    Book.find()
      .then(book => res.status(200).json(book))
      .catch(error => res.status(400).json({ error }));
   });


exports.getBestRating = (req, res, next) => {
    Book.find()
      .then(book => res.status(200).json(book))
      .catch(error => res.status(400).json({ error }));
   };


   exports.updateOneBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };


  exports.createNote =  (req, res, next) => {
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
   };