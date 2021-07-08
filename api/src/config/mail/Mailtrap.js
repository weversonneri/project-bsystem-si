const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const nodemailerhbs = require('nodemailer-express-handlebars');
const path = require('path');

module.exports = {
  async sendMail({
    to,
    subject,
    context,
    template,
  }) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const viewPath = path.resolve(__dirname, '..', '..', 'app', 'views');

    transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: path.resolve(viewPath, 'layouts'),
          partialsDir: path.resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'test@test.com',
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      template,
      context,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  },
};
