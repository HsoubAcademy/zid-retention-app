import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (mailData) => {
  const msg = {
    to: mailData.to,
    from: "info@geekcademy.com", // Use the email address or domain you verified above
    subject: mailData.subject,
    text: mailData.text,
    html: mailData.html,
  };
  const sendingMail = await sgMail.send(msg);
  if (sendingMail) {
    return "Mail has been sent";
  } else {
    console.log("SENDING MAIL ERROR ===> ", sendingMail);
    return "There was a problem in sending the mail";
  }
};

export default sendMail;
