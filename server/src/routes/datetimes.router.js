const express = require('express');
const DatetimesRouter = express.Router();
const datetimes = require('../models/datetimes.model'); // date times model

/* Get all Datetimess */
DatetimesRouter.get('/', (req, res, next) => {
    datetimes.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
});

/* Get Single datetimes */
DatetimesRouter.get("/:datetimes_id", (req, res, next) => {
    datetimes.findById(req.params.datetimes_id, function (err, result) {
        if(err){
             res.status(400).send({
               success: false,
               error: err.message
             });
        }
        res.status(200).send({
            success: true,
            data: result
        });
     });
});


/* Add Single datetimes */
DatetimesRouter.post("/", (req, res, next) => {
  let newDatetimes = {
    meetid: req.body.meetid,
    userid: req.body.userid,
    datetimes: req.body.datetimes
  };
   datetimes.create(newDatetimes, function(err, result) {
    if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
    }
      res.status(201).send({
        success: true,
        data: result,
        message: "datetimes created successfully"
      });
  });
});

/* Edit Single datetimes */
DatetimesRouter.patch("/:Datetimes_id", (req, res, next) => {
  let fieldsToUpdate = req.body;
  datetimes.findByIdAndUpdate(req.params.Datetimes_id,{ $set: fieldsToUpdate }, { new: true },  function (err, result) {
      if(err){
          res.status(400).send({
             success: false,
            error: err.message
            });
      }
      res.status(200).send({
        success: true,
        data: result,
        message: "datetimes updated successfully"
        });
  });
});

/* Delete Single datetimes */
DatetimesRouter.delete("/:Datetimes_id", (req, res, next) => {
  datetimes.findByIdAndDelete(req.params.Datetimes_id, function(err, result){
      if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
      }
    res.status(200).send({
      success: true,
      data: result,
      message: "datetimes deleted successfully"
    });
  });
});

module.exports = DatetimesRouter;