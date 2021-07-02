// Importing Axios to let us make API calls easly and efficiently
// const axios = require("axios");
import axios from "axios";
// import ZidAPI from "./axios";
// Declaring Zid API main URL as a constant since it will not change
const ZidAPI = "https://api.zid.dev/app/v1";
const AbandonedCarts = async () => {
  const headers = {
    "X-MANAGER-TOKEN": process.env.MANAGER_TOKEN,
    Authorization: "Bearer " + process.env.auth,
  };
  try {
    const getAbandondCarts = await axios.get(
      `${ZidAPI}/managers/store/abandoned-carts`,
      {
        headers: headers,
        params: { page: 1, page_size: 10, duration: 4 },
      }
    );
    if (getAbandondCarts) {
      return getAbandondCarts.data;
    }
  } catch (error) {
    return error;
  }
  return getAbandondCarts.data;
};

// exports.Zid = Zid;
export default AbandonedCarts;
