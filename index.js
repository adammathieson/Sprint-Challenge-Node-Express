const server = require('./api/server.js');

const port = process.env.PORT || 6500;

server.listen(port, () => {
    console.log(`\n***Server running on http://localhost:${port} ***\n`)
});
