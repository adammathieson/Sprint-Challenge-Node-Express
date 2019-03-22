express = require('express');

const db = require();

const router = express.Router();

//Get
router.get('/', (req, res) => {
    db
        .get().
        .then(() => {
            res.status().json()
        })
        .catch(err => {
            res.status(500).json({ error: })
        });
});

//Get()
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
        .get(id)
        .then(() => {
            if() {
                return res.status(404).json({ errorMessage: '' })
            }

        })
        .catch(err => {
            res.status(500).json({ error: })
        });
});

//Post
router.post('/', (req, res) => {
    const {} = req.body;
    if() {
        return res.status(400).json({ errorMessage: '' })
    }
    db
        .insert({})
        .then(() => {
            res.status(201).json()
        })
        .catch(err => {
            res.status(500).json({ error: })
        });
});

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db
        .remove(id)
        .then(() => {
            if() {
                return res.status(404).json({ errorMessage: '' })
            }
            res.status(202).json({ success: '' })
        })
        .catch(err => {
            res.status(500).json({ error: '' })
        });
});

//Update
router.put('/:id', (req, res) => {
    const { id } req.params;
    const {} = req.body;
    db
        .update(id, {})
        .then(() => {
            if() {
                return res.status(404).json({ errorMessage: '' })
            }
            res.status(200).json()
        })
        .catch(err => {
            res.status(500).json({ error: '' })
        });
});

module.exports = router;