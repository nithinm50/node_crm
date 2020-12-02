const Invoice = require('../models/invoice');


exports.GetInvoices = (req, res, next) => {
    res.render('module/invoices/invoice', {
        title: 'Clevertize CRM | All invoices',
        page: 'invoices',
        setup: false
    })
}

exports.AddInvoice = (req, res, next) => {
    res.render('module/invoices/edit', {
        title: 'Clevertize CRM | Add New invoice',
        page: 'invoices',
        setup: false
    })
}

exports.GetInvoice = (req, res, next) => {
    const userId = req.params.id;
    res.render('module/invoices/show', {
        title: 'Clevertize CRM | invoice Details',
        page: 'invoices'
    })
}