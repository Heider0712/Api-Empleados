const { Schema, model } = require("mongoose");

const EmpleadoSchema = Schema({
  Usuario: {
    type: String,
    unique: true,
    required: [true, "El usuario es obligatorio!"],
  },
  Nombre: {
    type: String,
    required: [true, "El nombre es obligatorio!"],
  },
  Apellido: {
    type: String,
    required: [true, "El apellido es obligatorio!"],
  },
  Correo: {
    type: String,
    unique: true,
    required: [true, "El correo es obligatorio!"],
  },
  Celular: {
    type: String,
    unique: true,
    required: [true, "El número de celular es obligatorio!"],
  },
  Password: {
    type: String,
    required: [true, "La contraseña es obligatoria!"],
  },
  PorcentGanancia: {
    type: Number,
    required: [true, "El porcentaje de ganancia es obligatorio!"],
  },
}, { timestamps: true});
module.exports = model("Empleado", EmpleadoSchema);