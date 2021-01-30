const path = require('path');
const express = require('express');
const router = require('express').Router();

const publicAssets = path.join(__dirname, '../../public');

router.use('/', express.static(publicAssets));

//catch anything that doesn't match send 404
router.use((req,res) => res.sendStatus(404));

module.exports = router;