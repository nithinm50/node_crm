const express = require('express');
const authController = require('../controller/auth');
const router = express.Router();
const User = require('../models/user');
const { check, body } = require('express-validator');
const auth = require('../config/auth');

router.get('/login', authController.Getlogin);

router.get('/signup', authController.GetSignup);

router.get('/reset', authController.GetReset);

router.get('/reset/:token');

router.post('/reset');

router.post('/login', [
    check('email').isEmail().withMessage('Email address cannot be Empty!').normalizeEmail(),
    body('password', 'password cannot be Empty!').isLength({
        min: 6
    }).isAlphanumeric().trim()
], authController.PostLogin);

router.post('/signup', [
    body('name', 'Name should consist atleast contain 5 charcters').isLength({
        min: 5
    }).isAlphanumeric(),
    check('email').isEmail().withMessage('enter a valid email address.')
        .custom((value, {
            req
        }) => {
            return User.findOne({
                email: value
            }).then(UserDoc => {
                if (UserDoc) {
                    return Promise.reject('E-mail already in use')
                }
            });
        }).normalizeEmail(),
    body('phone', 'Enter a 10 digit phone number').isLength({ min: 10 }).isNumeric().custom((value, { req }) => {
        return User.findOne({
            phone: value
        }).then(UserPhone => {
            if (UserPhone) {
                return Promise.reject('Phone number already in use')
            }
        })
    }),
    body('password', 'Enter a password with both numbers and alphabets, It should have a min length of 6 characters')
        .isLength({
            min: 6
        })
        .isAlphanumeric().trim(),
    body('repassword').custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            throw new Error('Password mismatch');
        }
        return true;
    })
], authController.PostSignup);

router.post('/logout', authController.PostLogout);

module.exports = router;
