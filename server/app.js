/* Filename: app.mjs */

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();

const corsOptions = {
   origin: "http://127.0.0.1:5173"
};

// Set the view engine and the directory where HTML files are located
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
   secret: "CareerSphereauthor AntonisZks",
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false }
}));
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080; // Setup the port of the server

// Routes
const authRoutes = require('./api/routes/auth_routes');
const userRoutes = require('./api/routes/user_routes');
const imageRoutes = require('./api/routes/image_routes');
const homeRoutes = require('./api/routes/home_routes');

// Use routes
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/images', imageRoutes);
app.use('/home', homeRoutes);


// Start the server execution
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
