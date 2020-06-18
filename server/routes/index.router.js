const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/withdraw',jwtHelper.verifyJwtToken, ctrlUser.withdraw); 
router.post('/deposit', jwtHelper.verifyJwtToken, ctrlUser.deposit);
router.post('/transfer', jwtHelper.verifyJwtToken, ctrlUser.transfer);
router.get('/transactionHistory', jwtHelper.verifyJwtToken, ctrlUser.transactionHistory);

module.exports = router;



