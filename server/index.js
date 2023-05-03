// const { json, application } = require('express');
const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/cherper');
const cherps = db.get('cherps');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Cherper!'
    });
});

app.get('/cherps', (req, res) => {
    cherps
    .find()
    .then(cherps => {
        res.json(cherps);
    })
})

function isValidCherp(cherp) {
    return cherp.name && cherp.name.toString().trim() !== '' && cherp.nameToString.trim.length <= 50 && 
    cherp.content && cherp.content.toString().trim() !== '' && cherp.content.toString().trim().length <= 140;
}

app.post('/cherps', (req, res) => {
    // console.log(req.body);
    if(isValidCherp(req.body)) {
        // insert into db
        const cherp = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        cherps
        .insert(cherp)
        .then(createdCherp => {
            res.json(createdCherp);
        });
    } else {
        res.status(422)
        res.json({
            message: 'Hey! Name and Content are required!'
        });
    };
});

app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});