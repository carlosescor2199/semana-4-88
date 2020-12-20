const { validateCategoria } = require("../services/validators");
const db = require("../models");

module.exports = {
  addCategoria: async (req, res) => {
    const { nombre, descripcion } = req.body;
    const errors = validateCategoria(nombre, descripcion);
    if (errors) {
      return res.status(401).json(errors);
    }
    const newCategoria = await db.Categoria.build({
      nombre,
      descripcion,
      estado: true,
    });
    const saveCategoria = await newCategoria.save();
    return res.status(200).json(saveCategoria);
  },
  allCategorias: async (req, res) => {
    const categorias = await db.Categoria.findAll({where: { estado: true }});
    return res.status(200).json(categorias);
  },
  getCategoria: async (req, res) => {
    const { id } = req.params;
    const categoria = await db.Categoria.findOne({ where: { id: id } });
    return res.status(200).json(categoria);
  },
  updateCategoria: async (req, res) => {
    const { id, nombre, descripcion } = req.body;
    const errors = validateCategoria(nombre, descripcion);
    if (errors) {
      return res.status(401).json(errors);
    }

    const categoria = await db.Categoria.findOne({ where: { id: id } });
    const updatedCategoria = await categoria.update({
      nombre: nombre,
      descripcion: descripcion,
    });

    return res.status(200).json(updatedCategoria);
  },
  activateCategoria: async (req, res) => {
    const { id } = req.body;
    const categoria = await db.Categoria.findOne({ where: { id: id } });
    if(!categoria) {
        return res.status(401).send('Id Invalido'); 
    }
    const updatedCategoria = await categoria.update({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: true,
    });
    return res.status(200).json(updatedCategoria);
  },
  deactivateCategoria: async (req, res) => {
    const { id } = req.body;
    const categoria = await db.Categoria.findOne({ where: { id: id } });
    if(!categoria) {
        return res.status(401).send('Id Invalido'); 
    }
    const updatedCategoria = await categoria.update({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: false,
    });
    return res.status(200).json(updatedCategoria);
  },
};
