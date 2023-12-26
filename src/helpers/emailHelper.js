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

const verificationEmail = (maileData) => {
  const emailBody = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };
  emailProcessor(emailBody);
};
