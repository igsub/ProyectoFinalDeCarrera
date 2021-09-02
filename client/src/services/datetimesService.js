//  /client/src/services/datetimesService.js

import axios from "../axios";

const datetimesService = {
    
    getAll: async () => {
        // let res = await axios.get(`/datetimes`);
        // return res.data || [];
        await axios.get('/datetimes/getAllDatetimes')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    
    newdatetime: async (data) => {
        let res = await axios.post("/datetimes", data);
        return res.data || [];
    },

    // getDatetime: async (data) => {

    // }

};

export default datetimesService;
