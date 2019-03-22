const express = require('express');

const actionsRouter = require('../routers/actions-router.js');
const projectsRouter = require('../routers/projects-router.js');

const server = express();
server.use(express.json());

server.use('./api/actions', actionsRouter);
server.use('./api/projects', projectsRouter);

// server.get('/', (req, res) => {
//     res.send('test')
// });

module.exports = server;