const fs = require('fs');
const path = require('path');
const tasks = require('../data/task.json');

const saveTasks = () => {
    fs.writeFileSync(path.join(__dirname, '../data/task.json'), JSON.stringify(tasks, null, 2));
};

const generateId = () => {
    const maxId = tasks.reduce((max, task) => (task.id_task > max ? task.id_task : max), 0);
    return maxId + 1;
};

module.exports = {
    getAll: () => tasks,
    getById: (id) => tasks.find(t => t.id_task === id),
    getByProjectId: (projectId) => tasks.filter(t => t.id_project === projectId),
    add: (newTask) => {
        const newTaskWithId = { id_task: generateId(), ...newTask };
        tasks.push(newTaskWithId);
        saveTasks();
        return newTaskWithId;
    },
    update: (id, updatedTask) => {
        const index = tasks.findIndex(t => t.id_task === id);
        if (index !== -1) {
            tasks[index] = updatedTask;
            saveTasks();
            return updatedTask;
        }
        return null;
    },
    delete: (id) => {
        const index = tasks.findIndex(t => t.id_task === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            saveTasks();
            return true;
        }
        return false;
    }
};