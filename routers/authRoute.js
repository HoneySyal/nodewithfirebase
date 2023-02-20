const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// var admin = require("firebase-admin");
// let db = admin.firestore();

router.get('/', authController.listUser);
router.post('/signup', authController.createUser);
router.post('/update/:id', authController.updateUser);
router.post('/user', authController.viewUser);
router.post('/delete/:id', authController.deleteUser);
router.post('/login', authController.login);


module.exports = router;