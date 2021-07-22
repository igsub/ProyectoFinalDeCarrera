//  /client/src/services/datetimesService.js

import axios from 'axios';

const datetimesService = {
  getAll: async () => {
    let res = await axios.get(`/datetimes`);
    return res.data || [];
  },
  newdatetime: async (data) => {
    let res = await axios.post('/datetimes', data);
    return res.data || [];
  }
}

export default datetimesService;
