const { response } = require("express");

const Empleado = require("../models/empleados");

const empleadoGet = async (req, res = response) => {
  const empleado = await Empleado.find();
  res.json({
    empleado,
  });
};

const empleadoPost = async (req, res) => {
    const body = req.body;
    let mensaje = "Empleado creado.";
  
    const ExisteCorreo = await Empleado.findOne({ Correo: body.Correo });
    const ExisteUsuario = await Empleado.findOne({ Usuario: body.Usuario });
    const ExisteCelular = await Empleado.findOne({ Celular: body.Celular });
  
    if (ExisteUsuario) {
      mensaje = "El nombre de usuario ya está en uso.";
    } else if (ExisteCorreo) {
      mensaje = "El correo ya está en uso.";
    } else if (ExisteCelular) {
      mensaje = "El número de celular ya está en uso.";
    } else {
      try {
        const empleado = new Empleado(body);
        await empleado.save();
      } catch (error) {
        mensaje = "Problemas al crear el empleado.";
      }
    }
    res.json({
      msg: mensaje,
    });
  };

const empleadoPut = async (req, res) => {
  const { _id, Usuario, Nombre, Apellido, Correo, Celular, Password, PorcentGanancia } = req.body;
  let mensaje = "Modificación exitosa";

  const empleadoExiste = await Empleado.findOne({ Usuario: Usuario });

  if (!empleadoExiste) {
    mensaje = "Empleado no encontrado.";
  } else {
    try {
      if (Correo !== empleadoExiste.Correo) {
        const otroEmpleado = await Empleado.findOne({ Correo: Correo });
        if (otroEmpleado) {
          mensaje = "Ya hay un usuario utilizando ese correo.";
        } else {
          empleadoExiste.Correo = Correo;
        }
      }
      if (Celular !== empleadoExiste.Celular) {
        const otroEmpleado = await Empleado.findOne({ Celular: Celular });
        if (otroEmpleado) {
          mensaje = "Ya hay un usuario utilizando ese número de celular.";
        } else {
          empleadoExiste.Celular = Celular;
        }
      }
      empleadoExiste.Nombre = Nombre !== undefined ? Nombre : empleadoExiste.Nombre;
      empleadoExiste.Apellido = Apellido !== undefined ? Apellido : empleadoExiste.Apellido;
      empleadoExiste.Password = Password !== undefined ? Password : empleadoExiste.Password;
      empleadoExiste.PorcentGanancia = PorcentGanancia !== undefined ? PorcentGanancia : empleadoExiste.PorcentGanancia;

      await empleadoExiste.save();
    } catch (error) {
      mensaje = "Problemas al modificar el empleado.";
      console.log(error);
    }
  }

  res.json({
    msg: mensaje,
  });
};

const empleadoDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = "Empleado eliminado exitosamente.";
  try {
    await Empleado.deleteOne({ _id: _id });
  } catch (error) {
    mensaje = "Problemas al eliminar el empleado.";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

module.exports = { empleadoGet, empleadoPost, empleadoPut, empleadoDelete };