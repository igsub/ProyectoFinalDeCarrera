const Datetime = require('../models/datetime'); // date times model
var Project = require('../models/project');

var controller = {
    
    test: (req, res) => {
        res.status(200).send("Funciona!");
    },

    // saveProject: (req, res) => {
    //     var project = new Project();

    //     var params = req.body;
    //     project.name = params.name;
    //     project.description = params.description;
    //     project.category = params.category;
    //     project.year = params.year;
    //     project.langs = params.langs;

    //     project.save((error, projectStored) => {
    //         if (error) return res.status(500).send({message: 'Error al guardar'});

    //         if (!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

    //         return res.status(200).send({
    //             project: projectStored
    //         });
    //     })
    // },

    // getProject: (req, res) => {
    //     var project_id = req.params.project_id;
        
    //     if (project_id == null) {
    //         return res.status(404).send('No existe el datetime');
    //     }

    //     Project.findById(project_id, (err, project) => {
    //         if(err){
    //                 return res.status(500).send({
    //                 success: false,
    //                 error: err.message
    //                 });
    //         }
    //         if (!project) {
    //             return res.status(404).send('No existe el datetime 2');
    //         }
    //         return res.status(200).send({
    //             project
    //         });
    //     });
    // },
    
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
        var datetime_id = req.params.datetime_id;
        
        if (datetime_id == null) {
            return res.status(404).send('No existe el datetime');
        }

        Datetime.findById(datetime_id, (err, datetime) => {
            if(err){
                    return res.status(500).send({
                    success: false,
                    error: err.message
                    });
            }
            if (!datetime) {
                return res.status(404).send('No existe el datetime 2');
            }
            return res.status(200).send({
                datetime
            });
        });
    },

    addDatetime: (req, res) => {
        var datetime = new Datetime();

        var params = req.body;
        datetime.meetId = params.meetId;
        datetime.description = params.description;
        datetime.userId = params.userId;
        datetime.start = params.start;
        datetime.end = params.end;
        datetime.weather = params.weather;

        datetime.save((error, datetimeStored) => {
            if (error) return res.status(500).send({message: 'Error al guardar'});

            if (!datetimeStored) return res.status(404).send({message: 'No se ha podido guardar el datetime'});

            return res.status(200).send({
                datetime: datetimeStored
            });
        })
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