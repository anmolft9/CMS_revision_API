import nodemailer from "nodemailer";

//email configuration and send the email

//email template

const verificationEmail = async (emailData) => {
  try {
    //1.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: EMAIL_PORT.EMAIL_USER,
        pass: EMAIL_PORT.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  } catch (error) {
    console.log(error);
  }
};
