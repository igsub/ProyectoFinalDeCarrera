//  /client/src/services/postsService.js

import axios from 'axios';
// eslint-disable-next-line
const postsService = {
  getAll: async () => {
    let res = await axios.get(`/posts`);
    return res.data || [];
  }
}

export default postsService;
