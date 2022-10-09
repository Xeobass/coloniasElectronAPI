const Adoptante = require("../models/adoptante.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log("valor de req:",req);
  
    // Create a colonia
    const adoptante  = new Adoptante({
        id_adoptante    :      req.body.id_adoptante,
        nombre_adopt    :      req.body.nombre_adopt,
        apellido1_adopt :   req.body.apellido1,
        apellido2_adopt :   req.body.apellido2,
        telefono_adopt  :    req.body.telefono,
        direccion_adopt :   req.body.direccion,
        provincia_adopt :   req.body.provincia,
        codpos_adopt    :      req.body.codpos,
        email_adopt     :       req.body.email,
        tb_dni_fk       :         req.body.dniFK,
        es_acogida      :        req.body.enAcogida
    });
  
    console.log("La adoptante definido es:",adoptante);
    // Save adoptante in the database
    Adoptante.create(adoptante, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the hucha."
        });
      else res.send(data);
    });
  };