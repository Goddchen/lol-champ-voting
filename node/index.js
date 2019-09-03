var express = require('express')
var sqlite = require('sqlite3').verbose()
var fetch = require('node-fetch')
var cors = require('cors')
var basicAuth = require('express-basic-auth')
var swaggerUi = require('swagger-ui-express')
var app = express()
var db = new sqlite.Database('db.sqlite3')

const riotApiKey = process.env.RIOT_API_KEY

db.run('CREATE TABLE IF NOT EXISTS voting (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, champion_id INTEGER NOT NULL, timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)');

app.enable('trust proxy')
app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./openapi.json')))

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

app.delete('/votings',
    basicAuth({
        users: {
            'admin': 'so-super-secret'
        }
    }), (req, res) => {
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
    var ip = req.ip
    if (ip.includes('::ffff:')) {
        ip = ip.split(':').reverse()[0]
    }
    db.get('SELECT COUNT(*) AS count FROM voting WHERE ip=? AND champion_id=?', [ip, req.body.champion_id], (err, row) => {
        if (err) console.error(err.message)
        var count = row.count
        if (count == 0) {
            db.run('INSERT INTO voting (champion_id, ip) VALUES (?, ?)', [req.body.champion_id, ip], (err) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        } else {
            res.sendStatus(429)
        }
    })
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