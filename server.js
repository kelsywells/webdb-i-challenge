const express = require('express');
const db = require('./data/dbConfig.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        }
        )
        .catch(err => {
            res.status(500).json({
                error: 'Could not find accounts',
                err
            })
        })
})

module.exports = server;