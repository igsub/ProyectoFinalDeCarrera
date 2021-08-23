const datetimes = require('../models/datetimes.model'); // date times model

var controller = {
    
    test: (req, res) => {
        res.status(200).send("Funciona!");
    },
    
    getAllDatetimes: (req, res) => {
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
    },

    getDatetime: (req, res) => {
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
    },

    addDatetime: (req, res) => {
        let newDatetimes = {
            meetid: req.body.meetid,
            userid: req.body.userid,
            datetimes: req.body.datetimes,
            weather: req.body.weather,
            description: req.body.description
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
    },

    editDatetime: (req, res) => {
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
    },

    deleteDatetime: (req, res) => {
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
    }
}

module.exports = controller;