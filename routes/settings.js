const express = require('express');
const router = express.Router();
const adminController = require('../controller/settings');
const auth = require('../config/auth');
const { check, body } = require('express-validator');

router.get('/settings', auth, adminController.GetSettings);
router.get('/company-details', auth, adminController.GetCompany);
router.get('/account-details', auth, adminController.GetAccount);

router.post('/organisation', auth, adminController.PostOrg);

module.exports = router;