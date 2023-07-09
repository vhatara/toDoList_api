// SHOULD BE ABLE TO CREATE A TASK
// SHOULD BE ABLE TO DELETE A TASK
// SHOULD BE ABLE TO MARK A TASK AS COMPLETE
// SHOULD BE ABLE TO MARK A TASK AS INCOMPLETE
// SHOULD BE ABLE TO VIEW ALL TASKS


const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const tasks = [];
let id = 0;

app.get('/tasks', (req, res) => {
    res.json(tasks);
})

app.post('/tasks', (req, res) => {
    const task = req.body;
    const modifiedData = {};
    modifiedData.id = id + 1;
    id++;
    modifiedData.task = task.task;
    modifiedData.completed = false;
    tasks.push(modifiedData);
    res.json(tasks);
})

app.patch('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id == id);
    task.completed = req.body.completed;
    res.json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
    console.log(tasks)
    const id = req.params.id;
    const task = tasks.find(task => task.id == id);
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    res.json(tasks);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});