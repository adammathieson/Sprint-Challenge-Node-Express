express = require('express');

const db = require('../data/helpers/actionModel.js');

const router = express.Router();

//Get
router.get('/', (req, res) => {
    db
        .get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: 'The information could not be retrieved.' })
        });
});

//Get()
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
        .get(id)
        .then(action => {
            if(!action) {
                return res.status(404).json({ errorMessage: '' })
            }
            res.status(202).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: '' })
        });
});

//Post
router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    if(!project_id || !description) {
        return res.status(400).json({ errorMessage: 'Please provide a project ID and a description.' })
    }
    db
        .insert({ 
            project_id,
            description,
            notes
        })
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: 'The action could not be saved to database' })
        });
});

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(action => {
            if(action === 0) {
                return res.status(404).json({ errorMessage: 'The action with the specified ID does not exist.' })
            }
            res.status(202).json({ success: 'Action was successfully removed from database.' })
        })
        .catch(err => {
            res.status(500).json({ error: 'The action could not be removed from the database.' })
        });
});

//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    db
        .update(id, {
            project_id,
            description,
            notes
        })
        .then(action => {
            if(action === 0) {
                return res.status(404).json({ errorMessage: 'The action with the specified ID does not exist.' })
            }
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: '' })
        });
});

module.exports = router;