const srmsHandler = require('./handlers/srms_handler');
const signinHandler = require('./handlers/signin_handler');
const signupHandler = require('./handlers/signup_handler');
const paymentHandler = require('./handlers/payment_handler');
const messageHandler = require('./handlers/message_handler');
const fileUploadHandler = require('./handlers/files_upload_handler')
const removeUserHandler = require('./handlers/remove_user_handler');
const studentRegistration = require('./handlers/student_registration_handler');
const removeStudentHandler = require('./handlers/remove_student_handler');
const express = require('express');
const app = express();

function start() {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('rsc'));
    app.set('view engine', 'ejs');
    app.listen(3000);
    
    app.get('/', (req, res) => res.render('index'));
    app.get('/contact', (req, res) => res.render('contact'));
    app.get('/mission', (req, res) => res.render('mission'));
    app.get('/vision', (req, res) => res.render('vision'));
    app.get('/programmes', (req, res) => res.render('programmes'));
    app.get('/signin', (req, res) => res.render('signin', { exists: true, incorrectPassword: false }));
    app.get('/recovery', (req, res) => res.render('account_recovery'));
    app.get('/results_management_system', (req, res) => {
        srmsHandler.retrieveStudents(res);
    });

    app.get('/signup', (req, res) => {
        res.render('signup', { exists: false, done: false });
    });

    app.get('/register_student', (req, res) => {
        res.render('student_registration', { studentExists: false, parentExists: true, done: false });
    });

    app.post('/student_registration', (req, res) => {
        studentRegistration.registerStudent(req, res);
    });

    app.post('/user', (req, res) => {
        signinHandler.validateSigin(req, res);
    });

    app.post('/signup', (req, res) => {
        signupHandler.addNewUser(req, res);
    });

    app.post('/message', (req, res) => {
        messageHandler.sendMessage(req, res);
    });

    app.post('/payment', (req, res) => {
        paymentHandler.makePayment(req, res);
    });
    
    app.post('/remove_student', (req, res) => {
        removeStudentHandler.removeStudent(req, res);
    });

    app.post('/remove_user', (req, res) => {
        removeUserHandler.removeUser(req, res);
    });

    app.post('/file_upload', (req, res) => {
        fileUploadHandler.uploadFile(req, res);
    });

    app.use((req, res) => res.render('404'));
}

module.exports = { start };