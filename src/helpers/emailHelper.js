import nodemailer from "nodemailer";

//email configuration and send the email

//email template

const verificationEmail = (emailData) => {
  try {
    //1.
    const transporter = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
        pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
