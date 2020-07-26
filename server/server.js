require('dotenv').config();
const cors = require('cors');

const user = process.env.PGUSER;
const pass = process.env.PGPASS;
const dbName = process.env.PGDATABASE;
const dbPort = process.env.PGPORT;
const dbHost = process.env.PGHOST;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

const Pool = require('pg').Pool
const pool = new Pool({
  user: user,
  host: dbHost,
  database: dbName,
  password: pass,
  port: dbPort,
})

app.post('/api/user', cors(), (req, res) => {
  pool.connect()
  .then(() => {
    console.log("user: ", req.body);
    var sql = `INSERT INTO user (email, password) VALUES (?, ?, ?, ?, ?, ?)`;
    // pool.query(sql, [], (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    // })
  })
});

async function callIt () {
  await pool.connect();
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    console.log("hey there ", results.rows)
  })
}
