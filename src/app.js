const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.json({ msg: 'Welcome API: form' }));

const port = 3333;

console.log(`Server PORT: ${process.env.PORT || port}`);

server.listen(process.env.PORT || port);