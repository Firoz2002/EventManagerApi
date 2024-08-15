const express = require('express');
const router = express.Router();

const v3ApiRoutes = require('./v3/index');

router.use('/v3/app', v3ApiRoutes);

module.exports = router;