//  /client/src/services/datetimesService.js

import axios from "../axios";

const datetimesService = {
  getAll: async () => {
    // let res = await axios.get(`/datetimes`);
    // return res.data || [];
    await axios
      .get("/datetimes/getAllDatetimes")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getDatetime: async (id) => {
    await axios
      .get("/datetimes/getDatetime/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateDatetime: async (id, data) => {
    await axios
      .put("/datetimes/updateDatetime/" + id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteDatetime: async (id) => {
    await axios
      .delete("/datetimes/getDatetime/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // getDatetime: async (data) => {

  // }
};

export default datetimesService;
