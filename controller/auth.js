const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

exports.Getlogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Clevertize CRM | Login',
    errormsg: null,
    inputFields: {
      email: '',
      password: '',
    },
  });
};

exports.GetSignup = (req, res, next) => {
  res.render('auth/signup', {
    title: 'Clevertize CRM | Sign up',
    errormsg: null,
    inputFields: {
      name: '',
      email: '',
      phone: '',
      password: '',
      repassword: '',
    },
  });
};

exports.GetReset = (req, res, next) => {
  res.render('auth/reset', {
    title: 'Clevertize CRM | Forgot Password',
    errormsg: null,
    inputFields: {
      email: '',
    },
  });
};

exports.PostSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup',
      {
        title: 'Clevertize CRM | Sign up',
        errormsg: errors.array()[0].msg,
        inputFields: {
          lname: name,
          email: email,
          phone: phone,
          password: password,
          repassword: req.body.repassword,
        },
      })
  }
  bcrypt.hash(password, 12)
    .then(hashpass => {
      const user = new User({
        lname: name,
        email: email,
        phone: phone,
        password: hashpass
      });
      return user.save();
    }).then(() => {
      res.redirect('/login');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode(500);
      next(error);
    });
}

exports.PostLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      title: 'Clevertize CRM | Login',
      errormsg: errors.array()[0].msg,
      inputFields: {
        email: email,
        password: password,
      }
    });
  }
  User.findOne({
    email: email
  })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          title: 'Clevertize CRM | Login',
          errormsg: 'Invaild Email or Password',
          inputFields: {
            email: email,
            password: ''
          }
        });
      }
      bcrypt.compare(password, user.password)
        .then(isValid => {
          if (isValid) {
            req.session.user = user;
            req.session.org = user.orgId;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
              res.redirect('/');
            });
          }
          return res.status(422).render('auth/login', {
            title: 'Clevertize CRM | Login',
            errormsg: 'Invaild Email or Password',
            inputFields: {
              email: email,
              password: ''
            }
          });
        })
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode(500);
      next(error);
    });
};

exports.PostLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.render('/');
  })
};

exports.PostReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (!user) {
        req.flash('error', 'No account with the following email was found!')
        return res.redirect('/reset');
      }
      user.resetToken = token;
      user.TokenExpiry = Date.now() + 3600000;
      return user.save();
    }).catch(err => {
      const error = new Error(err);
      error.httpStatusCode(500);
      next(error);
    })
  })
}