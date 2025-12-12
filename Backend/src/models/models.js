const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/data.json');

function loadData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  getAll() {
    return loadData();
  },

  getById(id) {
    const items = loadData();
    return items.find(item => item.id === id);
  },

  create(payload) {
    const items = loadData();

    const newItem = {
      id: Date.now().toString(),
      name: payload.name,
      descr: payload.descr,
      price: payload.price,
      creationDate: new Date().toISOString()
    };

    items.push(newItem);
    saveData(items);

    return newItem;
  },

  update(id, payload) {
    const items = loadData();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) return null;

    const updatedItem = {
      ...items[index],
      ...payload
    };

    items[index] = updatedItem;
    saveData(items);

    return updatedItem;
  },

  delete(id) {
    const items = loadData();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) return false;

    items.splice(index, 1);
    saveData(items);

    return true;
  }
};