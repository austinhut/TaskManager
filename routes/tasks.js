const express = require('express');
const Joi = require('joi');

const router = express.Router();

const taskArray = [
  {
    id: 1,
    task: 'task 1'
  }
];

 let delay = 500;

//list all tasks

router.get('/', (req, res) => {
  setTimeout(() => {
    res.send(taskArray);
  },delay);
});

//list a single task

router.get('/:id', (req, res) => {
  
  const task = taskArray.find(t => t.id === parseInt(req.params.id));
  
  setTimeout(() => {
    if (!task) {
      return res.status(404).send('404 - task not found');
    }
    else res.send(task);
  },delay);
});

//add a task

router.post('/', (req, res) => {
  setTimeout(() => {
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
  },delay);
});

//update a task

router.put('/:id', (req, res) => {

  setTimeout(() => {
    const task = taskArray.find(t => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).send('404 - task not found');
    }
    const { error } = validateTask(req.body); //result.error
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    task.task = req.body.task;
    res.send(task);
  },delay);
  
  

});

//remove a task 

router.delete('/:id', (req, res) => {
  setTimeout(() => {
    const task = taskArray.find(t => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).send('task not found');
    }
    const index = taskArray.indexOf(task);
    taskArray.splice(index, 1);
    res.send(task);
  },delay);
  

});

//validation

function validateTask(task){
  setTimeout(() => {
    const schema = Joi.object({ 
      id: Joi.number( ), 
      task: Joi.string( ).min(6).required( ) 
    });
    return schema.validate(task);
  },delay);
  
};

module.exports = router;