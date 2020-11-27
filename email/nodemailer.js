const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'bizznesprofress',
        pass: 'bpa123123123'
    },  
},
{
    from: 'Mailer Test <bizznesprofress@gmail.com>',
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
        console.log('Email sent: ', info);    
    })
}

module.exports = mailer