var express = require('express')
var sqlite = require('sqlite3').verbose()
var fetch = require('node-fetch')
var cors = require('cors')
var app = express()
var db = new sqlite.Database('db.sqlite3')

const riotApiKey = process.env.RIOT_API_KEY

db.run('CREATE TABLE IF NOT EXISTS voting (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, champion_id INTEGER NOT NULL, timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)');

app.use(express.json())
app.use(cors())
app.options('*', cors())

app.get('/votings', function (req, res) {
    db.all('SELECT COUNT(*) AS count, champion_id FROM voting GROUP BY champion_id', (err, rows) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.send(rows);
        }
    });
});

app.delete('/votings', (req, res) => {
    db.run('DELETE FROM voting', (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(202);
        }
    });
});

app.post('/votings', function (req, res) {
    db.run('INSERT INTO voting (champion_id) VALUES (?)', [req.body.champion_id], (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

app.get('/masteries', (req, res) => {
    fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/tk5UJkDOn5ytCt9zV8JFg0WGrFzb-2ucVXa27UBrReZhMaI?api_key=${riotApiKey}`)
        .then(apiRes => apiRes.json())
        .then(masteries => {
            res.send(masteries.map((mastery => {
                return {
                    champion_id: mastery.championId,
                    mastery: mastery.championLevel
                }
            })))
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(500)
        });
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});