import axios from "axios";
// import ZidAPI from "./axios";
// Declaring Zid API main URL as a constant since it will not change
const ZidAPI = "https://api.zid.dev/app/v1";

const AddCoupon = async (couponInfo) => {
  const headers = {
    "X-MANAGER-TOKEN": process.env.MANAGER_TOKEN,
    Authorization: "Bearer " + process.env.auth,
  };

  const data = {
    name: couponInfo.name,
    code: couponInfo.code,
    discount_type: couponInfo.discount_type,
    discount: couponInfo.discount,
    free_shipping: couponInfo.free_shipping,
    free_cod: couponInfo.free_cod,
    total: couponInfo.total,
    date_start: couponInfo.date_start,
    date_end: couponInfo.date_end,
    uses_total: couponInfo.uses_total,
    uses_customer: couponInfo.uses_customer,
    apply_to: couponInfo.apply_to,
    status: couponInfo.status,
  };
  try {
    const addCoupon = await axios.post(
      `${ZidAPI}/managers/store/coupons/add`,
      data,
      {
        headers: headers,
      }
    );
    if (addCoupon) {
      return addCoupon.data;
    }
  } catch (error) {
    return error;
  }
};
export default AddCoupon;
