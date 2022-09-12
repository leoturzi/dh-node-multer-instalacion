const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/groupsController');

// configuramos multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // metodo donde especificamos donde vamos a guardar el archivo
    cb(null, path.join(__dirname, '../public/img/groups'));
  },
  filename: (req, file, cb) => {
    // creamos variable donde guardamos el nombre del archivo
    const newFileName = `group-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

// Ejecutamos multer
const upload = multer({ storage });

// Todos los grupos
router.get('/', controller.index);

// Formulario de creación
router.get('/create', controller.create);

// Procesamiento del formulario de creación
// especificamos que campo va a procesar el archivo del formulario
router.post('/', upload.single('group-image'), controller.store);

// Detalle de un grupo
router.get('/:id', controller.show);

module.exports = router;
