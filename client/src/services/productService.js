//  /client/src/services/productService.js

import axios from 'axios';
// eslint-disable-next-line
const productservice = {
  getAll: async () => {
    let res = await axios.get(`/api/product`);
    return res.data || [];
  }
}
export default productservice;
