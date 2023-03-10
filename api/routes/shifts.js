var express = require('express');
const pool = require('../db/db')
const setDateTimeFromDateAndTime = require('../functions/setDateFromDateAndTime')
var router = express.Router();

// Question 1 fetch (all shifts)
router.get('/', function (req, res, next) {
  pool.query("SELECT question_one_shifts.*, facilities.facility_name  FROM question_one_shifts LEFT JOIN facilities ON question_one_shifts.facility_id = facilities.facility_id;")
  .then(que => {
    const allShifts = que
    res.json({ shifts: allShifts.rows });
  })
});

// Question 2 fetch (compare shifts for overlap)
router.get('/compare', function (req, res, next) {
    const shift1ID = req.query.id1 || null
    const shift2ID = req.query.id2 || null
    pool.query("SELECT *  FROM question_one_shifts WHERE shift_id IN ($1, $2) ORDER BY shift_date ASC, start_time ASC", [
        shift1ID,
        shift2ID
    ])
    .then(que => {
      const shiftsToCompare = que.rows
      if (shiftsToCompare.length !== 2) {
        res.status = 403;
        res.json({error: "Invalid parameters, please verify you are using valid and existing shift_id's"})
      } else {
        const maxOverlapMinutes = (shiftsToCompare[0].facility_id === shiftsToCompare[1].facility_id) ? 30 : 0
        const shift1EndDate = setDateTimeFromDateAndTime(shiftsToCompare[0].shift_date, shiftsToCompare[0].end_time, shiftsToCompare[0].start_time)
        const shift2StartDate = setDateTimeFromDateAndTime(shiftsToCompare[1].shift_date, shiftsToCompare[1].start_time)
        let overlapMinutes = (shift1EndDate - shift2StartDate) / 1000 / 60
        if (overlapMinutes < 0) {overlapMinutes = 0}
        const exceedsOverlapThreshold = (maxOverlapMinutes < overlapMinutes)
        res.json({ 
            shifts: shiftsToCompare,
            maxOverlapMinutes,
            overlapMinutes,
            exceedsOverlapThreshold
         });
      }
    })
  });

module.exports = router;