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
    //send email with defined transport object
    const info = await transporter.sendMail(emailBody);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview url: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"Anmol 👻" <myemail@anmol.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "email verification instructor ✔", // Subject line
    text: `hi ${emailData.fName}, please follow the link to verifiy your email: ${emailData.url}`, // plain text body
    html: `
    <p>Hi ${emailData.fName}</p>
    <br/>
    <br/>
    <p>please follow the link to verify your email</p>
    <br/>
    <br/>
    <p><a style="color:red" href="${emailData.url}">Verify Email</p>
    <br/>
    <p>
    Regards, <br/>
    Anmol Store
    </p>
    
    `, // html body
  };
  emailProcessor(emailBody);
};
