const User = require('../models/user');

var userController = {
    
    getUser: (req, res) => {
        var user_id = req.params.user_id;
        
        if (user_id == null) {
            return res.status(404).send('No existe el usuario');
        }

        User.findById(user_id, (err, user) => {
            if(err){
                    return res.status(500).send({
                    success: false,
                    error: err.message
                    });
            }
            if (!user) {
                return res.status(404).send('No existe usuario');
            }
            return res.status(200).send({
                user
            });
        });
    },

    addUser: (req, res) => {
        var user = new User();

        var params = req.body;
        user.user_id = params.user_id;
        user.name = params.name;
        user.lastname = params.lastname;
        user.address = params.address;
        user.meetings = [];
        user.email = params.email;

        User.save((error, userStored) => {
            if (error) return res.status(500).send({message: 'Error al guardar el usuario'});

            if (!userStored) return res.status(404).send({message: 'No se ha podido guardar el usuario'});

            return res.status(200).send({
                user: userStored
            });
        });
    },

    getAllUsers: (req, res) => {
        User.find({}).exec ((error, users) => {
            if (error) return res.status(500).send({message: 'Error al cargar los users'});

            if (!users) return res.status(404).send({message: 'No se han podido cargar los users'});

            return res.status(200).send({
                users: users
            });
        });
    },

    deleteUser: (req, res) => {
        var user_id = req.params.user_id;
        User.findByIdAndDelete(user_id, function(error, userDeleted){
            if (error) return res.status(500).send({message: 'Error al eliminar'});

            if (!userDeleted) return res.status(404).send({message: 'No existe el usuario para eliminar'});

            return res.status(200).send({
                user: userDeleted
            });
        });
    },

    updateUser: (req, res) => {
        var user_id = req.params.user_id;
        var fieldsToUpdate = req.body;
        
        User.findByIdAndUpdate(user_id, fieldsToUpdate, (error, userUpdated) => {
            if (error) return res.status(500).send({message: 'Error al actualizar'});

            if (!userUpdated) return res.status(404).send({message: 'No existe el usuario para actualizar'});

            return res.status(200).send({
                user: userUpdated
            });
        });
    }
}

module.exports = userController;