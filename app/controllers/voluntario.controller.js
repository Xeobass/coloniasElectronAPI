const Voluntario = require("../models/voluntario.model");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const voluntario = new Voluntario({
        id_usuario:req.body.id_usuario,
        email_usuario: req.body.email_usuario,
        nombre_usuario: req.body.nombre_usuario,
        pass_usuario: req.body.pass_usuario,
        activo: req.body.activo,
        es_admin: req.body.es_admin

    });
  
    // Save Customer in the database
    Voluntario.create(voluntario, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };
  
  // Retrieve all Customers from the database.
  exports.findAll = (req, res) => {
    Voluntario.getAll((err, data) => {
        console.log("solicitando todos los voluntarios:",data);
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving customers."
            });
          else res.send(data);
        });
  };
  
  // Find a single Customer with a customerId
  exports.findOne = (req, res) => {
    Voluntario.findById(req.params.voluntarioId, (err, data) => {
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
    console.log(`accediendo al sistema con las credenciales: usr -> ${req.query.nombre_usuario} y pass -> ${req.query.pass_usuario} de la prote -> ${req.query.prote}`);
    Voluntario.credentials(req.query.pass_usuario,req.query.nombre_usuario,req.query.prote,(err,resp)=>{
      if(err){
        console.log("Error, el usuario no existe o no activado");
        res.send(false);
      }else{
        console.log(`Bienvenido/a ${req.query.nombre_usuario}`);
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
  
    Voluntario.updateById(
      req.params.customerId,
      new Voluntario(req.body),
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
    Voluntario.remove(req.params.voluntarioId, (err, data) => {
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
    Voluntario.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all customers."
            });
          else res.send({ message: `All Customers were deleted successfully!` });
        });
  };