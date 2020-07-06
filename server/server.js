require('dotenv').config();

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

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

console.log(user);

const Pool = require('pg').Pool
const pool = new Pool({
  user: user,
  host: dbHost,
  database: dbName,
  password: pass,
  port: dbPort,
})

async function callIt () {
  await pool.connect();
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
  })
}

callIt();

