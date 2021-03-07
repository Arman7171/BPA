const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'bizznesprofress',
        pass: 'bpa123123123'
    },  
},
{
    from: 'BPA bot <bizznesprofress@gmail.com>',
});

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log('meail------',err);
        console.log('Email sent: ', info);    
    })
}

module.exports = mailer