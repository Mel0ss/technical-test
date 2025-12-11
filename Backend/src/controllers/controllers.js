const Model = require('../models/models');

module.exports = {
  getAll(req, res) {
    try {
      const items = Model.getAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el modelo' });
    }
  },

  getById(req, res) {
    try {
      const item = Model.getById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Modelo no encontrado' });

      res.json(item);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el modelo' });
    }
  },

  create(req, res) {
    try {
      const payload = req.body;
      if (!payload || !payload.name) {
        return res.status(400).json({ error: 'name es obligatorio' });
      }

      const created = Item.create(payload);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el modelo' });
    }
  },

  update(req, res) {
    try {
      const updated = Model.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Modelo no encontrado' });

      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el modelo' });
    }
  },

  delete(req, res) {
    try {
      const deleted = Model.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Modelo no encontrado' });

      res.json({ message: 'Modelo eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el modelo' });
    }
  }
};