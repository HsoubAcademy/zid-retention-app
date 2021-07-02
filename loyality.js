import AbandonedCarts from "./zid.js";
import sendMail from "./mail.js";

const Loyalty = async (couponCode) => {
  const getAbandondCarts = await AbandonedCarts();
  if (getAbandondCarts) {
    const response = getAbandondCarts["abandoned-carts"];
    if (response) {
      const getEmails = [];
      for (let i = 0; i < response.length; i++) {
        getEmails.push(response[i].customer_email);
      }

      const mailData = {
        to: getEmails,
        from: "info@geekcademy.com", // Use the email address or domain you verified above
        subject: "Special Offer for you",
        text: "Please use this " + couponCode + " for completing your order",
        html: "Please use this " + couponCode + " for completing your order",
      };
      return await sendMail(mailData);
    } else {
      return "There was an error getting abandond carts";
    }
  } else {
    return "There is a server error";
  }
};

export default Loyalty;
