const Client = require('../models/client');
const { Error } = require('mongoose');
const { validationResult } = require('express-validator');

exports.GetClients = (req, res, next) => {
    Client.find({ orgId: req.user.orgId })
        .then(clients => {
            res.render('module/customers/client', {
                title: 'Clevertize CRM | All Clients',
                page: 'clients',
                setup: false,
                clients: clients,
                org: req.org
            })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode(500);
            next(error);
        });

}

exports.AddClient = (req, res, next) => {
    res.render('module/customers/edit', {
        title: 'Clevertize CRM | Add New client',
        page: 'clients',
        errormsg: null,
        inputFields: {
            name: '',
            company: '',
            gst: '',
            street: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            billing: ''
        },
        setup: false,
        user: req.user
    })
}

exports.PostClient = (req, res, next) => {
    const name = req.body.name;
    const company = req.body.company;
    const gst = req.body.gst;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const zipcode = req.body.zipcode;
    const billing = req.body.address;
    const userId = req.body.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('module/customers/edit', {
            title: 'Clevertize CRM | Add New client',
            page: 'clients',
            errormsg: errors.array()[0].msg,
            inputFields: {
                name: name,
                company: company,
                gst: gst,
                street: street,
                city: city,
                state: state,
                country: country,
                zipcode: zipcode,
                billing: billing
            },
            setup: false,
            user: req.user
        })
    }
    const client = new Client({
        name: name,
        company: company,
        gst: gst,
        address: {
            street: street,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode,
            billing: billing
        },
        userId: userId,
        orgId: req.user.orgId
    });
    client.save().then(result => {
        return res.redirect('/clients');
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode(500);
        next(error);
    });

}