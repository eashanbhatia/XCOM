const path = require('path');
const express = require('express');
const router = express.Router();
const Controller = require('../controller/user');
const multer  = require('multer')


router.get('/',Controller.getIndex);

module.exports = router;