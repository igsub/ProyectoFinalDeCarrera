const { findByIdAndUpdate } = require('../models/datetimes');
const Datetimes = require('../models/datetimes');

const DatetimesController = {

    voteDatetime: (req, res) => {
        const meeting_id = req.body.meeting_id;
        Datetimes.findByIdAndUpdate({_id: datetime_id}, {$inc: {count: 1}}, (error, datetimeUpdated) => {
            if (error) return res.status(500).send({message: 'Error al actualizar'});

            if (!datetimeUpdated) return res.status(404).send({message: 'No existe el datetime para actualizar'});

            return res.status(200).send({
                datetime: datetimeUpdated
            });
        });
    }

}

module.exports = DatetimesController;