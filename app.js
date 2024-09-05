/* Filename: app.mjs */

const express = require('express');
const path = require('path');

const app = express();

// Set the view engine and the directory where HTML files are located
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080; // Setup the port of the server

app.get('/', (request, response) => {
   response.render('login');
});

app.get('/login', (request, response) => {
   response.render('login');
});

app.get('/signup', (request, response) => {
   response.render('signup');
});

app.get('/home', (request, response) => {
   response.status(201).render('home');
});

// Start the server execution
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
