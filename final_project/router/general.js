const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const author = req.params.author;
    let bookKeys = Object.keys(books);
    let filtered_keys = bookKeys.filter((key) => books[key].author === author);
    let filtered_books = [];
    filtered_keys.forEach((key) => filtered_books.push(books[key]));

    if (filtered_books.length > 0) {
        res.send(filtered_books);
    } else {
        res.send(`No books authored by: ${author}.`);
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    const title = req.params.title;
    let bookKeys = Object.keys(books);
    let filtered_keys = bookKeys.filter((key) => books[key].title === title);
    let filtered_books = [];
    filtered_keys.forEach((key) => filtered_books.push(books[key]));

    if (filtered_books.length > 0) {
        res.send(filtered_books);
    } else {
        res.send(`No books with title: ${title}.`);
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
