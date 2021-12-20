import axios from '../axios';

const userService = {

    getUser: async (id) => {
        await axios.get('/user/getUser/' + id)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },

    getAllUsers: async () => {
        await axios.get('/user/getAllUsers')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },

    addUser: async (data) => {
        await axios.post('/user/addUser/', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },

    updateUser: async (data) => {
        await axios.put("/user/updateUser/" + id, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },

    deleteUser: async (id) => {
        await axios.delete('/user/deleteUser/' + id)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

}

export default userService;