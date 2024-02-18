const { Router } = require('express') //Desestructuración. Extraer un atributo de un objeto.

const route = Router()

//Importar métodos del controlador
const { empleadoGet, empleadoPost, empleadoPut, empleadoDelete } = require('../controllers/empleados')

route.get('/', empleadoGet)

route.post('/', empleadoPost)

route.put('/', empleadoPut)

route.delete('/', empleadoDelete)

module.exports = route