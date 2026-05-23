
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.API_KEY ||  'MAIL_GUN_API_KEY', // TODO: Replace with your mailgun API KEY
        domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN' // TODO: Replace with your mailgun DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, subject, text, html) => {
    const mailOptions = {
        from: process.env.YOUR_EMAIL_HERE, // TODO replace this with your own email
        to: email, // TODO: the receiver email has to be authorized for the free tier
        subject,
        text,
        html
    };
async function sendtranscationemail(useremail,name,account,amount){
    useremail,
    subject,
    text,
    html,
   await sendMail(email,subject,text,html)
}
async function failedtranscation(useremail,name,account,amount) {
    useremail,
    subject,
    text,
    html,
   await sendMail(email,subject,text,html)
    
}

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return (err, null);
        }
        return (null, data);
    });
}

module.exports = {sendMail,failedtranscation,sendtranscationemail}