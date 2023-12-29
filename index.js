//reqs
const express = require('express');
const app = express();

app.use(express.json());

const tasksRoute = require('./routes/tasks'); 

app.use('/tasks', tasksRoute);

app.listen(3000, () => console.log('Listening on port 3000...'));

