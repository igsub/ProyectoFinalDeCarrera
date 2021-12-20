const Datetime = require('../models/datetime'); // date times model

var controller = {
    
    test: (req, res) => {
        res.status(200).send("Funciona!");
    },
    
    getAllDatetimes: (req, res) => {
        Datetime.find({}).exec ((error, datetimes) => {
            if (error) return res.status(500).send({message: 'Error al cargar los datetimes'});

            if (!datetimes) return res.status(404).send({message: 'No se han podido cargar los datetimes'});

            return res.status(200).send({
                datetimes: datetimes
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

    updateDatetime: (req, res) => {
        var datetime_id = req.params.datetime_id;
        var fieldsToUpdate = req.body;
        
        Datetime.findByIdAndUpdate(datetime_id, fieldsToUpdate, (error, datetimeUpdated) => {
            if (error) return res.status(500).send({message: 'Error al actualizar'});

            if (!datetimeUpdated) return res.status(404).send({message: 'No existe el datetime para actualizar'});

            return res.status(200).send({
                datetime: datetimeUpdated
            });
        });
    },

    deleteDatetime: (req, res) => {
        var datetime_id = req.params.datetime_id;
        Datetime.findByIdAndDelete(datetime_id, function(error, datetimeDeleted){
            if (error) return res.status(500).send({message: 'Error al eliminar'});

            if (!datetimeDeleted) return res.status(404).send({message: 'No existe el datetime para eliminar'});

            return res.status(200).send({
                datetime: datetimeDeleted
            });
        });
    }
}

module.exports = controller;