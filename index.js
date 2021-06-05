const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

const { NODE_ENV, PORT, EMAIL_USER, EMAIL_PASS } = process.env;

app.set('port', PORT || 3000);

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "http://via.placeholder.com", "https://via.placeholder.com", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            styleSrcElem: ["'self'", "https://fonts.googleapis.com/css", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"]
        }
    }
}));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const emisor = {
    user: EMAIL_USER,
    pass: EMAIL_PASS
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: emisor
});

app.post('/send-email', (req, res) => {
    const { subject, html } = req.body;
    const to = '20187221@itla.edu.do'; 
    console.log({subject, html})
    transporter.sendMail({ from: emisor.user, to, subject, html }, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.json({ ok: true });
});

app.use('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

app.use((err, _req, res, next) => {
    res.status(500).send(NODE_ENV === 'development' ? err.msg : 'Ha ocurrido un error');
    next();
});

app.listen(app.get('port'), () => console.log(`Server on ::${app.get('port')}`));