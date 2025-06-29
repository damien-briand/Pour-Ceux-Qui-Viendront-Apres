const fs = require('fs');
const path = require('path');
const employes = require('../data/employes.json');
const teams = require('../data/teams.json');
const projects = require('../data/project.json');

const saveEmployes = () => {
    fs.writeFileSync(path.join(__dirname, '../data/employes.json'), JSON.stringify(employes, null, 2));
};

const saveTeams = () => {
    fs.writeFileSync(path.join(__dirname, '../data/teams.json'), JSON.stringify(teams, null, 2));
};

const saveProjects = () => {
    fs.writeFileSync(path.join(__dirname, '../data/project.json'), JSON.stringify(projects, null, 2));
};

const removeEmployeeFromTeams = (employeeId) => {
    teams.forEach(team => {
        if (team.employees) {
            team.employees = team.employees.filter(employees => employees.employeeId !== employeeId);
        }
    });
    saveTeams();
};

const removeEmployeeFromProjects = (employeeId) => {
    projects.forEach(project => {
        if (project.membres) {
            project.membres = project.membres.filter(member => member.employeeId !== employeeId);
        }
    });
    saveProjects();
};

module.exports = {
    getAll: (offset, limit) => employes.slice(offset, limit + offset),
    getByAttribute: (attribute, search) => employes.filter(e => 
        e[attribute] && e[attribute].toLowerCase() === search.toLowerCase()
    ),
    add: (employe) => {
        employes.push(employe);
        saveEmployes();
        return employe;
    },
    update: (id, updatedEmploye) => {
        const index = employes.findIndex(e => e.id === id);
        if (index !== -1) {
            employes[index] = updatedEmploye;
            saveEmployes();
            return updatedEmploye;
        }
        return null;
    },
    delete: (id) => {
        const index = employes.findIndex(e => e.id === id);
        if (index !== -1) {
            employes.splice(index, 1);
            saveEmployes();
            removeEmployeeFromTeams(id);
            removeEmployeeFromProjects(id);
            return true;
        }
        return false;
    }
};