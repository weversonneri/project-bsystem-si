const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const nodemailerhbs = require('nodemailer-express-handlebars');
const path = require('path');
const aws = require('aws-sdk');
const mailConfig = require('./mail');

module.exports = {
  async sendMail({
    to,
    subject,
    context,
    template,
  }) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
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

    const { email, name } = mailConfig.defaults.from;

    // send mail with defined transport object
    await transporter.sendMail({
      from: {
        name,
        address: email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      template,
      context,
    });
  },
};
