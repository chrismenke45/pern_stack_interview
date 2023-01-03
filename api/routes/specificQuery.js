var express = require('express');
const pool = require('../db/db')
var router = express.Router();

// fetch for Q4 - Remaining spots of each nursing type in each facility
router.get('/Q4', function (req, res, next) {
  pool.query("SELECT facility_id, nurse_type_needed,  SUM(jobs.total_number_nurses_needed) - COUNT(nurse_hired_jobs.nurse_id) AS remaining_spots  FROM jobs LEFT JOIN nurse_hired_jobs ON jobs.job_id = nurse_hired_jobs.job_id GROUP BY nurse_type_needed, facility_id ORDER BY jobs.facility_id ASC, jobs.nurse_type_needed ASC")
  .then(que => {
    const spotsRemaining = que.rows
    res.json({ spotsRemaining });
  })

});

// // fetch for Q5 - 
// router.get('/Q4', function (req, res, next) {
//   pool.query("SELECT facility_id, nurse_type_needed,  SUM(jobs.total_number_nurses_needed) - COUNT(nurse_hired_jobs.nurse_id) AS remaining_spots  FROM jobs LEFT JOIN nurse_hired_jobs ON jobs.job_id = nurse_hired_jobs.job_id GROUP BY nurse_type_needed, facility_id ORDER BY jobs.facility_id ASC, jobs.nurse_type_needed ASC")
//   .then(que => {
//     const spotsRemaining = que.rows
//     res.json({ spotsRemaining });
//   })

// });

module.exports = router;