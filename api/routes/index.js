var express = require('express');
const pool = require('../db/db')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  pool.query("SELECT * FROM nurses").then(que => {
    const allNurses = que
    res.json({ nurses: allNurses.rows });
  })

});

module.exports = router;
