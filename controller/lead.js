const { validationResult } = require('express-validator');
const { Error } = require('mongoose');
const Lead = require('../models/lead');

exports.GetLeads = (req, res, next) => {
    // Lead.find({}, function(err, lead){
    //     let x = lead[0]._doc;
    //     for (const key of Object.keys(x)) {
    //         console.log(key + ": " + x[key]);
    //     }
    // })
    Lead.find({ "created_by.id": req.user._id })
        .then(prods => {
            res.render('module/leads/show', {
                title: 'Clevertize CRM | All Leads',
                page: 'leads',
                setup: false,
                leads: prods,
                user: req.user
            })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode(500);
            next(error);
        })
}

exports.AddLead = (req, res, next) => {
    res.render('module/leads/add', {
        title: 'Clevertize CRM | Add New Lead',
        page: 'leads',
        setup: false,
        user: req.user,
        lead: {
            fname: '',
            lname: '',
            company: '',
            title: '',
            email: '',
            phone: '',
            fax: '',
            mobile: '',
            website: '',
            leadSource: '',
            leadStatus: '',
            industry: '',
            rating: '',
            revenue: '',
            emailopt: '',
            utmSource: '',
            utmMedium: '',
            utmCampaign: '',
            utmContent: '',
            address: { state: '', city: '', zipcode: '', state: '', country: '' },
            description: '',
            created_by: {name: '', id: ''},
            modified_by: {name: '', id: ''}
        },
        org: req.org
    })
}

exports.PostLead = (req, res, next) => {
    // for (const key of Object.keys(req.body)) {
    //     console.log(key);
    // }
    const fname = req.body.fname;
    const lname = req.body.lname;
    const company = req.body.company;
    const title = req.body.title;
    const email = req.body.email;
    const phone = req.body.phone;
    const fax = req.body.fax;
    const mobile = req.body.mobile;
    const website = req.body.website;
    const leadSource = req.body.leadSource;
    const leadStatus = req.body.leadStatus;
    const industry = req.body.industry;
    const rating = req.body.rating;
    const revenue = req.body.revenue;
    const emailopt = req.body.emailopt;
    const utmSource = req.body.utmSource;
    const utmMedium = req.body.utmMedium;
    const utmCampaign = req.body.utmCampaign;
    const utmContent = req.body.utmContent;
    const area = req.body.area;
    const street = req.body.street;
    const state = req.body.state;
    const city = req.body.city;
    const country = req.body.country;
    const zipcode = req.body.zipcode;
    const description = req.body.description;
    const owner = req.body.owner;
    const userName = `${req.user.fname} ${req.user.lname}`;
    const userId = `${req.user._id}`;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('module/leads/add', {
            title: 'Clevertize CRM | Add New Lead',
            page: 'leads',
            errormsg: errors.array()[0].msg,
            setup: false,
            user: req.user,
            lead: {
                fname: fname,
                lname: lname,
                company: company,
                title: title,
                email: email,
                phone: phone,
                fax: fax,
                mobile: mobile,
                website: website,
                leadSource: leadSource,
                leadStatus: leadStatus,
                industry: industry,
                rating: rating,
                revenue: revenue,
                emailopt: emailopt,
                utmSource: utmSource,
                utmMedium: utmMedium,
                utmCampaign: utmCampaign,
                utmContent: utmContent,
                address: { area: area, street: street, city: city, state: state, country: country, zipcode: zipcode },
                description: description,
                owner: owner,
                created_by:{
                    user: userName,
                    id: userId
                },
                modified_by:{
                    user: userName,
                    id: userId
                }
            }
        });
    }
    const lead = new Lead({
        fname: fname,
        lname: lname,
        company: company,
        title: title,
        email: email,
        phone: phone,
        fax: fax,
        mobile: mobile,
        website: website,
        lead_source: leadSource,
        lead_status: leadStatus,
        industry: industry,
        rating: rating,
        revenue: revenue,
        email_opt: emailopt,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        address: {
            area: area,
            street: street,
            city: city,
            state: state,
            country: country,
            zipcode: zipcode
        },
        description: description,
        owner: owner,
        created_by:{
            name: userName,
            id: req.user
        },
        modified_by:{
            name: userName,
            id: req.user
        }
    });
    lead.save().then(() => res.redirect('/leads')).catch(err => {
        const error = new Error(err);
        console.log(error);
        error.httpStatusCode(500);
        next(error);
    });
}

exports.leadDetails = (req, res, next) => {
    Lead.findById(req.params.id)
        .then(prods => {
            if (!prods) {
                res.render('module/leads/new', {
                    title: 'Clevertize CRM | Show Lead',
                    page: 'Lead Details',
                    setup: false,
                    lead: prods,
                    user: req.user
                })
            }
            res.render('module/leads/new', {
                title: 'Clevertize CRM | Show Lead details',
                page: prods.lname,
                setup: false,
                lead: prods,
                user: req.user
            })
        }).catch(err => {
            const error = new Error(err);
            error.httpStatusCode(500);
            next(error);
        });
}

exports.updateLeadDetails = (req, res, next) => {
    const entries = Object.keys(req.body)
    const updates = {}

    // constructing dynamic query

    for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i]
    }
    Lead.update({ "username": req.params.user }, { $set: updates },
        function (err, success) {
            if (err) throw (err);
            else {
                res.send({
                    msg: "update success"
                })
            }
        })
}

const formatDateTime = (dateTime) =>{
    let ele = dateTime.split(' ');
    let date = `${ele[0]}, ${ele[2]} ${ele[1]} ${ele[3]}`;
    let time = ele[4].split(':');
    let hour = time[0];
    let AmOrPm = hour >= 12 ? 'pm' : 'am';
    hour = (hour % 12) || 12;
    let minute = time[1];
    let final = `${date} ${hour}:${minute} ${AmOrPm}`;
    return final;
}