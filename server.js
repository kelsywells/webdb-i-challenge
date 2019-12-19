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

server.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(404).json({
            message: "No account by that ID"
        })
    }
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        }
        )
        .catch(err => {
            res.status(500).json({
                error: 'Server error- Could not find accounts',
                err
            })
        })
})

server.post('/:id', (req, res) => {
    const name = req.body.name;
    const budget = req.body.budget;
    const account = req.body.account;

    db('accounts').insert(account)
        .then(account => {
            if (!name || !budget)
                res.status(400).json({
                    message: 'Please include name and budget'
                })
            else {
                res.status(201).json(account)
            }
        })
        .catch(err => {
            console.log("name", name)
            res.status(500).json({
                error: 'Server error- Could not add account.',
                err
            })
        })
})

server.put('/:id', (req, res) => {
    const { name, budget } = req.body;

    if (!id || !name || !budget) {
        res.status(400).json({
            message: "Please include ID, name, and budget"
        })
    }

    db('accounts').where(name || budget).update()
        .then(changed => {
            res.status(200).json(changed)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Server error- Could not update account',
                err
            })
        })
})

server.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id }).del()
        .then(deleted => {
            if (deleted) {
                res.status(204).json({
                    message: 'Account removed.'
                })
            } else {
                res.status(404).json({
                    message: "Invalid account ID"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Could not remove account.'
            })
        })
})

module.exports = server;