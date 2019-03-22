express = require('express');

const db = require('../data/helpers/projectModel.js');

const router = express.Router();

//Get (all)
router.get('/', (req, res) => {
    db
        .get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: 'The information could be retrieved.' })
        });
});

//Get (project)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
        .get(id)
        .then(project => {
            if(!project) {
                return res.status(404).json({ errorMessage: 'The project with the specified ID does not exist.' })
            }
            res.status(202).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: 'Project could not be retrieved.' })
        });
});

//Get (project action)
router.get('/:id/action', (req, res) => {
    const { id } = req.params;
    db
        .getProjectActions(id)
        .then(actions => {
            if(!actions) {
                return res.status(404).json({ errorMessage: 'There are no actions associated with that ID.' })
            }
            res.status(202).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: 'Actions could not be retrieved.' })
        });
});

//Post
router.post('/', (req, res) => {
    const { name, description} = req.body;
    if(!name || !description) {
        return res.status(400).json({ errorMessage: 'Please provide a name and description for the project.' })
    }
    db
        .insert({
            name,
            description
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: 'Project could not be saved to database.'})
        });
});

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(project => {
            if(project === 0) {
                return res.status(404).json({ errorMessage: 'The project with the specified ID does not exist.' })
            }
            res.status(202).json({ success: 'Project successfully removed from the database.' })
        })
        .catch(err => {
            res.status(500).json({ error: 'Project could not be removed from database.' })
        });
});

//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description} = req.body;
    if(!name || !description) {
        return res.status(400).json({ errorMessage: 'Please provide a name and description for the project.' })
    }
    db
        .update(id, {
            name,
            description
        })
        .then(project => {
            if(project === 0) {
                return res.status(404).json({ errorMessage: 'The project with specified ID does not exist.' })
            }
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: 'The project could not be modified.' })
        });
});

module.exports = router;