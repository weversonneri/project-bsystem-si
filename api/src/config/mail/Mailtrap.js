const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = {
  async sendMail({
    to,
    subject,
    context,
  }) {
    try {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'e285b9aa54bbfc',
          pass: '841642e6a883c6',
        },
      });

      const source = fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8');
      // Create email generator
      const template = handlebars.compile(source);

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'test@test.com',
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: template(context),
      });

      console.log('Message sent: %s', info.messageId);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error(err);
    }
  },
};
