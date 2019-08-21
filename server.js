const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

module.exports = server;


server.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    }
    )
    .catch(err => {
        res.status(500).json({
            message: 'Could not find accounts'
        })
    })
})

server.post('/', (req, res) => {
    const account= req.body;
    const name= req.body;
    const budget= req.body;

    db('accounts').insert(account)
    .then(post => {
        if (!name || !budget)
        res.status(400).json({ message: 'Please include name and budget'})
        else {
            res.status(201).json({ message: 'Account added successfully'})
        }
    })
    .catch(err=> {
        res.status(500).json({
            message: 'Could not add account.'
        })
    })
})

server.put('/:id', (req, res) => {
    const changes= req.body;
    const name= req.body;
    const budget= req.body;
    
    db('accounts').where(name || budget).update(changes)
    .then(edits => {
        res.status(200).json(edits)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Could not update account.'
        })
    })
})

server.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id }).del()
    .then(deleted => {
        res.status(200).json({ 
            message: 'Account removed.'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Could not remove account.'
        })
    })
})

