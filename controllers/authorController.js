const Author = require('../models/author');
const Book = require('../models/book');

const asyncHandler = require('express-async-handler');

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  res.render('author_list', {
    title: 'Author List',
    author_list: allAuthors,
  });
});
// ? v0.1
// exports.author_list = asyncHandler(async (req, res, next) => {
//   res.send('NOT IMPLEMENTED: Author list');
// });

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.params);
    // Get details of author and all their books (in parallel)
    const author = await Author.findById(req.params.id).exec();
    const allBooksByAuthor = await Book.find({ author: req.params.id }, "title summary").exec();

    if (!author) {
      // No results.
      const err = new Error('Author not found');
      err.status = 404;
      throw err;
    }

    if (!allBooksByAuthor) {
      // No results.
      const err = new Error('Books not found');
      err.status = 404;
      throw err;
    }

    console.log("allBooksByAuthor: ", allBooksByAuthor);

    res.render('author_detail', {
      title: 'Author Detail',
      author: author,
      author_books: allBooksByAuthor,
    });
  } catch (err) {
    return next(err);
  }
});


// Display Author create form on GET.
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create GET');
});

// Handle Author create on POST.
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author create POST');
});

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete GET');
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author delete POST');
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update GET');
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author update POST');
});
