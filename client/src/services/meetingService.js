import axios from "../axios";

const meetingService = {
  addMeeting: async (data) => {
    await axios
      .post("/meeting/addMeeting", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getMeeting: async (id) => {
    await axios
      .get("/meeting/getMeeting" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default meetingService;
