const User = require('../models/user');
const crypto = require("crypto");

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
        console.log("BODY EMAIL: ", req.body.email)
        User.find({email: req.body.email}, (err, user) => {
            console.log("err:", err)
            console.log("err:", user)
            if (err) return res.status(500).send({message: 'Error al buscar el usuario'});

            if (user === null) {
                var new_user = new User();
                var params = req.body;
                new_user.user_id = crypto.randomBytes(16).toString("hex");
                new_user.name = params.name;
                new_user.lastname = params.lastname? params.lastname : null;
                new_user.address = params.address? params.address : null;
                new_user.meetings = [];
                new_user.email = params.email? params.email : null;

                new_user.save((error, userStored) => {
                    if (error) return res.status(500).send({message: 'Error al guardar el usuario'});
        
                    if (!userStored) return res.status(404).send({message: 'No se ha podido guardar el usuario'});
        
                    return res.status(200).send({
                        user: userStored
                    });
                });
            } else {
                return res.status(200).send({
                    user
                });
            }
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