/* Filename: app.mjs */

const express = require('express');
const path = require('path');
const app = express();

// Set the view engine and the directory where HTML files are located
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080; // Setup the port of the server

// Routes
const authRoutes = require('./routes/auth_routes');
const homeRoutes = require('./routes/home_routes');

// Use routes
app.use('/', authRoutes);
app.use('/home', homeRoutes);

// app.post('/api/create_account', (request, response) => {

//    const firstName = request.body.firstName;
//    const lastName = request.body.lastName;

//    const email = request.body.email;
//    const password = request.body.password;
//    const passwordVerification = request.body.passwordVerification;
   
//    const phoneNumber = request.body.phoneNumber;

//    // Receive all the emails in the database and check if there is a user with the given email
//    const sqlEmailsQuery = "SELECT email FROM users WHERE email = ?";
//    db_pool.query(sqlEmailsQuery, [email], (error, results) => {
//       if (error) {
//          return response.status(500).send('Error creating account');
//       }

//       if (results.length > 0) {
//          return response.send("Email Address already exists");
//       }
      
//       response.redirect('/home');
//    })

// });


// Start the server execution
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
