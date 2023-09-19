const files = require('./file_manager');
const fs = require('fs');
const express = require('express');
const app = express();
const root = './views'

function startServer() {
    app.set('view engine', 'ejs');
    app.listen(3000);
    app.use(express.static('rsc'));
    app.use(express.urlencoded({ extended: true }));
    app.get('/', (req, res) => res.render('index'));
    app.post('/done', (req, res) => {
        var variables = req.body;

        if (fs.existsSync(`./students/${variables.student_name}`))
            res.render('done', { registered: true });
        else {
            fs.mkdir(`./students/${variables.student_name}`, (error) => {
                if (error)
                    console.log('Cannot create the directory.');
                else
                    res.render('done', { registered: false });
            });
        }
    });
    app.use((req, res) => res.sendFile('404.html', { root }));
}

module.exports.startServer = startServer;