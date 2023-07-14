const express = require('express')
const router = express.Router();
const fs = require('fs')
const teamRoutes = require('./teams.js')
const matchRoutes = require('./match.js')


router.use(matchRoutes)
router.use(teamRoutes)


module.exports = router