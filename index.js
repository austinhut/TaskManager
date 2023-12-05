//reqs

const Joi = require('joi');
const express = require('express');
const app = express();

app.listen(3000, () => console.log('Listening on port 3000...'));

app.use(express.json());

const taskArray = [
  {
    id: 1,
    task: 'task 1'
  }
];

//add a task

app.post('/api/tasks', (req, res) => {
  
  const task = {
    id: taskArray.length + 1,
    task: req.body.task
  }

  const { error } = validateTask(req.body); //result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  
  taskArray.push(task);
  res.send(task);

});

//remove a task 

app.delete('/api/tasks/:id', (req, res) => {
  
  const task = taskArray.find(t => t.id === parseInt(req.params.id));

  if (!task) {return res.status(404).send('task not found');}
  
  const index = taskArray.indexOf(task);
  taskArray.splice(index, 1);
  res.send(task);

});

//list all tasks

app.get('/api/tasks', (req, res) => {
  res.send(taskArray);
});

//list a single task

app.get('/api/tasks/:id', (req, res) => {
  
  const task = taskArray.find(t => t.id === parseInt(req.params.id));

  if (!task) {return res.status(404).send('404 - task not found');}

  res.send(task);

});

//update a task

app.put('/api/tasks/:id', (req, res) => {

  const task = taskArray.find(t => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).send('404 - task not found');

  const { error } = validateTask(req.body); //result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  
  task.task = req.body.task;

  res.send(task);

});

//validation

function validateTask(task){
  const schema = Joi.object({ 
    id: Joi.number( ), 
    task: Joi.string( ).min(6).required( ) 
  });
  return schema.validate(task);
}