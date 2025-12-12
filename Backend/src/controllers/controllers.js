const Model = require('../models/models');

module.exports = {
  getAll(req, res) {
    try {
      const items = Model.getAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  getById(req, res) {
    try {
      const item = Model.getById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },

  create(req, res) {
    try {
      const { name, descr, price } = req.body;

      if (!name || !descr || !price) {
        return res.status(400).json({ error: 'name, descr y price son obligatorios' });
      }

      const created = Model.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  update(req, res) {
    try {
      const updated = Model.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  delete(req, res) {
    try {
      const deleted = Model.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
};