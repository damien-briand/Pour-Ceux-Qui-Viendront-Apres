const fs = require('fs');
const path = require('path');
const teams = require('../data/teams.json');

const saveTeams = () => {
    fs.writeFileSync(path.join(__dirname, '../data/teams.json'), JSON.stringify(teams, null, 2));
};

module.exports = {
    getAll: () => teams,
    getById: (id) => teams.find(t => t.id_team === id),
    add: (team) => {
        teams.push(team);
        saveTeams();
        return team;
    },
    update: (id, updatedTeam) => {
        const index = teams.findIndex(t => t.id_team === id);
        if (index !== -1) {
            teams[index] = updatedTeam;
            saveTeams();
            return updatedTeam;
        }
        return null;
    },
    delete: (id) => {
        const index = teams.findIndex(t => t.id_team === id);
        if (index !== -1) {
            teams.splice(index, 1);
            saveTeams();
            return true;
        }
        return false;
    },
    addEmployeeToTeam: (teamId, employeeId) => {
        const team = teams.find(t => t.id_team === teamId);
        if (team) {
            if (!team.employees) {
                team.employees = [];
            }
            team.employees.push({ employeeId });
            saveTeams();
            return team;
        }
        return null;
    },
    removeEmployeeFromTeam: (teamId, employeeId) => {
        const team = teams.find(t => t.id_team === teamId);
        if (team && team.employees) {
            const index = team.employees.findIndex(e => e.employeeId === employeeId);
            if (index !== -1) {
                team.employees.splice(index, 1);
                saveTeams();
                return team;
            }
        }
        return null;
    },
    getByBatiment: (batiment) => teams.filter(t => t.batiment && t.batiment.toLowerCase() === batiment.toLowerCase())
};