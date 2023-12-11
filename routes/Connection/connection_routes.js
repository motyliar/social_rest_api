const express = require('express');
const connection = require('../../controllers/Connection/connection_controller');

const router = express.Router();

router.get('/', connection.connectionGetter);


module.exports = router;

