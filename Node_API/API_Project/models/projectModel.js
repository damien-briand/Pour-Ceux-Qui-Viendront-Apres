const fs = require('fs');
const path = require('path');
const projects = require('../data/project.json');

const saveProject = () => {
    fs.writeFileSync(path.join(__dirname, '../data/project.json'), JSON.stringify(projects, null, 2));
};

const generateId = () => {
    const maxId = projects.reduce((max, project) => (project.id_project > max ? project.id_project : max), 0);
    return maxId + 1;
};

module.exports = {
    getAll: (limit) => projects.slice(0, limit),
    getByID: (id) => projects.find(p => p.id_project === id),
    add: (project) => {
        const newProject = { id_project: generateId(), ...project };
        projects.push(newProject);
        saveProject();
        return newProject;
    },
    update: (id, updatedProject) => {
        const index = projects.findIndex(p => p.id_project === id);
        if (index !== -1) {
            projects[index] = updatedProject;
            saveProject();
            return updatedProject;
        }
        return null;
    },
    delete: (id) => {
        const index = projects.findIndex(p => p.id_project === id);
        if (index !== -1) {
            projects.splice(index, 1);
            saveProject();
            return true;
        }
        return false;
    },
    addMemberToProject: (projectId, member) => {
        const project = projects.find(p => p.id_project === projectId);
        if (project) {
            if (!project.membres) {
                project.membres = [];
            }
            project.membres.push(member);
            saveProject();
            return project;
        }
        return null;
    },
    removeMemberFromProject: (projectId, employeeId) => {
        const project = projects.find(p => p.id_project === projectId);
        if (project && project.membres) {
            const index = project.membres.findIndex(e => e.employeeId === employeeId);
            if (index !== -1) {
                project.membres.splice(index, 1);
                saveProject();
                return project;
            }
        }
        return null;
    }
};