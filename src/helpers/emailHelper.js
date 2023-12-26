import nodemailer from "nodemailer";

//email configuration and send the email

//email template

const emailProcessor = async (emailBody) => {
  try {
    //1.
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail(emailBody);
  } catch (error) {
    console.log(error);
  }
};

const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"Anmol 👻" <myemail@anmol.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "email verification instructor ✔", // Subject line
    text: `hi ${emailData.fName}, please follow the link to verifiy your email: ${email.url}`, // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  emailProcessor(emailBody);
};
