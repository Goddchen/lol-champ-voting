var express = require('express');
var sqlite = require('sqlite3').verbose();
var app = express();
var db = new sqlite.Database('db.sqlite3');

db.run('CREATE TABLE IF NOT EXISTS voting (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, champion_id INTEGER NOT NULL, timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)');

app.use(express.json());

app.get('/', function (req, res) {
    db.get('SELECT COUNT(*) AS count FROM voting', (err, row) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send({
                count: row.count
            });
        }
    });
});

app.delete('/', (req, res) => {
    db.run('DELETE FROM voting', (err) => {
        if(err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(202);
        }
    });
});

app.post('/', function (req, res) {
    db.run('INSERT INTO voting (champion_id) VALUES (?)', [req.body.champion_id], (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});