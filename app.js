const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv').config();
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getMilliseconds().toString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const User = require('./models/user');
const Org = require('./models/organisation');
const PORT = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter
    }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


const admin_route = require('./routes/admin');
const auth_route = require('./routes/auth');
const profile_route = require('./routes/settings');
const error_controller = require('./controller/errors');

const csrfProtection = csrf();
const MONGODB_URI = process.env.MONGODB_URI;

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});


app.use((req, res, next) => {
    if (!req.session.org) {
        return next();
    }
    Org.findById(req.session.org._id)
        .then(org => {
            if (!org) {
                return next();
            }
            req.org = org;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

app.use(auth_route);
app.use(admin_route);
app.use(profile_route);

app.get('/500', error_controller.get500);

app.use(error_controller.get404);

app.use((error, req, res, next) => {
    res.status(500).render('500', {
        title: 'Internal Server Error',
        isAuthenticated: req.session.isLoggedIn
    });
});

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () =>
            console.log(`server listening on the port : ${PORT}`)
        );
    })
    .catch(err => {
        console.log(err);
    });