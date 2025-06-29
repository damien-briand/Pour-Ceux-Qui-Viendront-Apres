const batiments = require('../data/batiments.json');

module.exports = {
    getAll: () => batiments,
    getByPole: (pole) => batiments.filter(b => b.pole === pole),
    getById: (id) => batiments.find(b => b.id_batiment === id),
    add: (batiment) => {
        batiments.push(batiment);
        return batiment;
    },
    update: (id, updatedBatiment) => {
        const index = batiments.findIndex(b => b.id_batiment === id);
        if (index !== -1) {
            batiments[index] = updatedBatiment;
            return updatedBatiment;
        }
        return null;
    },
    delete: (id) => {
        const index = batiments.findIndex(b => b.id_batiment === id);
        if (index !== -1) {
            batiments.splice(index, 1);
            return true;
        }
        return false;
    }
};