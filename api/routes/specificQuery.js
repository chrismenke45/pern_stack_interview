var express = require('express');
const pool = require('../db/db')
var router = express.Router();

// fetch for Q4 - Remaining spots of each nursing type in each facility
router.get('/Q4', function (req, res, next) {
  pool.query("SELECT facility_id, nurse_type_needed,  SUM(jobs.total_number_nurses_needed) - COUNT(nurse_hired_jobs.nurse_id) AS remaining_spots " +
  "FROM jobs LEFT JOIN nurse_hired_jobs ON jobs.job_id = nurse_hired_jobs.job_id " +
  "GROUP BY nurse_type_needed, facility_id " +
  "ORDER BY jobs.facility_id ASC, jobs.nurse_type_needed ASC")  
  .then(que => {
      const spotsRemaining = que.rows
      res.json({ spotsRemaining });
    })
});

// fetch for Q5 - Available jobs nurse can still be hired for
router.get('/Q5', function (req, res, next) {
  pool.query("SELECT nurses.nurse_name, nurses.nurse_id, nurses.nurse_type, COUNT(jobs.job_id) AS jobs_available_to_nurse " +
  "FROM nurses LEFT JOIN jobs ON nurses.nurse_type = jobs.nurse_type_needed " +
  "AND jobs.job_id IN " +
  "(" +
  "SELECT jobs.job_id  FROM jobs LEFT JOIN nurse_hired_jobs ON jobs.job_id = nurse_hired_jobs.job_id GROUP BY jobs.job_id HAVING jobs.total_number_nurses_needed - COUNT(nurse_hired_jobs.nurse_id) > 0" +
  ") " +
  "AND jobs.job_id IN " +
  "(" +
  "SELECT jobs.job_id FROM jobs LEFT JOIN nurse_hired_jobs ON jobs.job_id = nurse_hired_jobs.job_id WHERE nurse_hired_jobs.nurse_id != nurses.nurse_id AND jobs.nurse_type_needed = nurses.nurse_type" +
  ") " +
  "GROUP BY nurses.nurse_id " +
  "ORDER BY nurses.nurse_id") 
  .then(que => {
      const availableJobsCounts = que.rows
      res.json({ availableJobsCounts });
    })

});

// fetch for Q6 - Nurses Coworkers
router.get('/Q6', function (req, res, next) {
  const nurseID = req.query.id || null
  pool.query("SELECT DISTINCT nurses.nurse_name FROM nurse_hired_jobs " +
    "JOIN jobs ON jobs.job_id = nurse_hired_jobs.job_id JOIN nurses ON nurses.nurse_id = nurse_hired_jobs.nurse_id " +
    "WHERE jobs.facility_id IN " +
    "(" +
    "SELECT DISTINCT facility_id FROM jobs WHERE job_id IN (SELECT job_id FROM nurse_hired_jobs WHERE nurse_id = $1)" +
    ") " +
    "AND nurse_hired_jobs.nurse_id != $1", [nurseID]
  )
    .then(que => {
      const coworkersNames = que.rows
      res.json({ coworkersNames });
    })

});

module.exports = router;