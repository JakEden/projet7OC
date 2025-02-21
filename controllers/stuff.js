const Book = require("../models/Book");
const fs = require("fs");

exports.addBook = (req, res, next) => {
  const thingObject = JSON.parse(req.body.book);
  delete thingObject._id;
  delete thingObject._userId;
  const book = new Book({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get(
      "host"
    )}/images/compressed/${req.file.filename.replace(/\.[^/.]+$/, "")}.webp`,
  });

  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const originalFilename = book.imageUrl.split("/images/")[1];

        // Suppression de l'image originale
        fs.unlink(`images/${originalFilename}`, () => {
          // Suppression de l'image compressée
          fs.unlink(`images/compressed/${originalFilename}`, () => {
            // Suppression du livre de la base de données
            Book.deleteOne({ _id: req.params.id })
              .then(() => {
                res.status(200).json({ message: "Objet supprimé !" });
              })
              .catch((error) => res.status(401).json({ error }));
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getBooks = (req, res, next) => {
  Book.find()
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

exports.getBestRatedBooks = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateBook = (req, res, next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/compressed/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete thingObject._userId;

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        let newImageUrl = `${req.protocol}://${req.get(
          "host"
        )}/images/compressed/${req.file.filename}`;

        newImageUrl = newImageUrl.replace(/\.[^.]+$/, ".webp");

        Book.updateOne(
          { _id: req.params.id },
          { ...thingObject, imageUrl: newImageUrl, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.createNote = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req.body.userId;
    const grade = req.body.rating;

    // Recherchez le livre correspondant dans la base de données
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    // Vérifiez si l'utilisateur a déjà noté ce livre
    const existingRating = book.ratings.find(
      (rating) => rating.userId === userId
    );

    if (existingRating) {
      return res
        .status(400)
        .json({ message: "L'utilisateur a déjà noté ce livre" });
    }

    // Ajoutez la nouvelle évaluation à la liste des évaluations du livre
    book.ratings.push({ userId, grade });

    // Calculez la nouvelle moyenne en fonction de la nouvelle évaluation ajoutée
    const totalRatings = book.ratings.length;
    let totalGrades = 0;
    book.ratings.forEach((rating) => {
      totalGrades += rating.grade;
    });
    book.averageRating = totalGrades / totalRatings;

    // Sauvegardez le livre mis à jour dans la base de données
    await book.save();

    res
      .status(201)
      .json({ message: "Évaluation enregistrée avec succès", book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de l'évaluation" });
  }
};
