const { validateArticulo } = require("../services/validators");
const db = require("../models");

module.exports = {
  addArticulo: async (req, res) => {
    const {
      codigo,
      nombre,
      descripcion,
      categoriaId,
    } = req.body;
    const errors = validateArticulo(
      codigo,
      nombre,
      descripcion,
    );
    if (errors) {
      return res.status(401).json(errors);
    }
    const newArticulo = await db.Articulo.build({
      codigo,
      nombre,
      descripcion,
      categoriaId,
      estado: true,
    });
    const saveArticulo = await newArticulo.save();
    return res.status(200).json(saveArticulo);
  },
  allArticulos: async (req, res) => {
    const articulos = await db.Articulo.findAll({
      include: db.Categoria
    });

    return res.status(200).json(articulos);
  },
  getArticulo: async (req, res) => {
    const { id } = req.params;
    const articulo = await db.Articulo.findOne({ where: { id: id } });
    return res.status(200).json(articulo);
  },
  updateArticulo: async (req, res) => {
    const { id, nombre, descripcion, codigo } = req.body;
    const errors = validateArticulo(codigo, nombre, descripcion);
    if (errors) {
      return res.status(401).json(errors);
    }

    const articulo = await db.Articulo.findOne({ where: { id: id } });
    const updatedArticulo = await articulo.update({
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion,
    });

    return res.status(200).json(updatedArticulo);
  },
  activateArticulo: async (req, res) => {
    const { id } = req.body;
    const articulo = await db.Articulo.findOne();
    if (!articulo) {
      return res.status(401).send("Id Invalido");
    }
    const updatedArticulo = await articulo.update({
      estado: true,
    });
    return res.status(200).json(updatedArticulo);
  },
  deactivateArticulo: async (req, res) => {
    const { id } = req.body;
    const articulo = await db.Articulo.findOne({ where: { id: id } });
    if (!articulo) {
      return res.status(401).send("Id Invalido");
    }
    const updatedArticulo = await articulo.update({
      estado: false,
    });
    return res.status(200).json(updatedArticulo);
  },
};
