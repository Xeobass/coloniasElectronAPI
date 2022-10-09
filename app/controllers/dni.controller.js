const Dni = require("../models/dni.model.js");

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
    const dni  = new Dni({
      num_dni : req.body.numDni,
      front_dni : req.body.basicfilednifront,
      back_dni : req.body.basicfiledniback
    });
  
    console.log("La dni definido es:",dni);
    // Save cat in the database
    Dni.create(dni, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the hucha."
        });
      else res.send(data);
    });
  };

