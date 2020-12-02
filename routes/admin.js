const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const dashboardController = require('../controller/dashboard');
const leadController = require('../controller/lead');
const clientController = require('../controller/client');
const invoiceController = require('../controller/invoice');
const { check, body } = require('express-validator');


router.get('/', auth, dashboardController.getDashboard);

router.get('/leads', auth, leadController.GetLeads);

router.get('/leads/create', auth, leadController.AddLead);

router.post('/leads/create', auth, [
    body('lname').not().isEmpty().withMessage('The Last Name is required'), check('company').not().isEmpty().withMessage('The Field Company is required')
], leadController.PostLead)

router.get('/leads/:id', auth, leadController.leadDetails);

router.get('/clients', auth, clientController.GetClients);

router.get('/clients/create', auth, clientController.AddClient);

router.post('/clients/create', auth, [
    body('name').not().isEmpty().withMessage('The Client Name is required'), check('company').not().isEmpty().withMessage('Name of the Company is required'), check('gst').not().isEmpty().withMessage('GST number is required')
], clientController.PostClient);

router.get('/invoices', invoiceController.GetInvoices);

router.get('/invoices/create', invoiceController.AddInvoice);

router.get('/invoice/:id', invoiceController.GetInvoice);

module.exports = router;