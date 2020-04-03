const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../validate/register.validate');

router.get('/register', controller.getRegister);
router.post('/register', validate.postRegister, controller.postRegister);
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);
router.get('/logout', controller.getLogout);
module.exports = router;