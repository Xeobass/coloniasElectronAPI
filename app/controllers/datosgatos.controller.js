const DatosGatos = require("../models/datosgatos.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a cat
  const datosGto = new DatosGatos({
    id_datos_gato:req.body.id_datos_gato,
    fecha_nac : req.body.fecha_nac,
    fecha_def : req.body.fecha_def,
    tb_foto_ficha_fk : req.body.tb_foto_ficha,
    tb_colonia_fk : req.body.tb_colonia_fk
  });

  console.log("El datosGto definido es:",datosGto);
  console.log("REQ:",req);
  // Save cat in the database
  DatosGatos.create(datosGto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cat."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    DatosGatos.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

exports.getColonias = (req,res)=>{
    DatosGatos.getColonias((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

exports.getSexo = (req,res)=>{
    DatosGatos.getSexo((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

exports.getPositivo = (req,res)=>{
    DatosGatos.getPositivo((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving positivo."
    });
  else res.send(data);
  })
}

exports.getSituacion = (req,res)=>{
    DatosGatos.getSituacion((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

exports.getLastGato = (req,res)=>{
    DatosGatos.getLastGato((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    DatosGatos.findById(req.params.gatoId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      });
};

exports.credentials = (req, res) =>{
  console.log(`accediendo al sistema con las credenciales: usr -> ${req.query.usrnombre} y pass -> ${req.query.usrpass}`);
  DatosGatos.credentials(req.query.usrpass,req.query.usrnombre,(err,resp)=>{
    if(err){
      console.log("Error, el usuario no existe");
      res.send(false);
    }else{
      console.log(`Bienvenido/a ${req.query.usrnombre}`);
      res.send(true);
    }
  })
}

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  DatosGatos.updateById(
    req.params.customerId,
    new DatosGatos(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );

 
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    DatosGatos.remove(req.params.volunteerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.customerId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    DatosGatos.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};