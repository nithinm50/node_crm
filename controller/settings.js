const { validationResult } = require('express-validator');
const { Error } = require('mongoose');
const User = require('../models/user');
const Organisation = require('../models/organisation');


exports.GetSettings = (req, res, next) => {
    res.render('settings/edit', {
        title: 'Personal Settings | Clevertize CRM',
        page: 'setup',
        item: 'personal settings',
        setup: true,
        user: req.user,
        org: req.org
    })
}
exports.GetCompany = (req, res, next) => {
    res.render('settings/company', {
        title: 'Company Details | Clevertize CRM',
        page: 'setup',
        item: 'company details',
        setup: true,
        user: req.user,
        org: req.org
    })
}

exports.GetAccount = (req, res, next) => {
    res.render('settings/account', {
        title: 'Account Details | Clevertize CRM',
        page: 'setup',
        item: 'account details',
        setup: true,
        user: req.user
    });
}

exports.PostOrg = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation error, please provide the lead name.');
        error.statusCode = 422;
        throw error;
    }
    const cname = req.body.cname;
    const alias = req.body.alias;
    const phone = req.body.phone;
    const mobile = req.body.mobile;
    const website = req.body.website;
    const admin = req.body.admin;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const country = req.body.country;
    const userId = req.body.userId;
    const org = new Organisation({
        cname: cname,
        alias: alias,
        phone: phone,
        mobile: mobile,
        website: website,
        admin: admin,
        address: {
            street: street,
            city: city,
            state: state,
            zipcode: zipcode,
            country: country
        },
        members: {
            user: []
        }
    });
    org.save().then(result => {
        return req.user.addOrganisation(result._id);
    }).then(user => {
        return Organisation.findById(user.orgId)
    }).then(comp => {
        return comp.addUsers(req.user)
    }).then(result => {
        if (result) {
            req.session.org = result;
            return req.session.save(err => {
                res.redirect('/');
            });
        }
        res.status(201).json({
            message: 'Organisation created successfully!',
            org: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}