module.exports = app => {
    const voluntario = require("../controllers/voluntario.controller");
  
    // Create a new Customer
    app.post("/voluntario", voluntario.create);
  
    // Retrieve all Customers
    app.get("/voluntario", voluntario.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/voluntario/:customerId", voluntario.findOne);
  
    // Update a Customer with customerId
    app.put("/voluntario/:customerId", voluntario.update);
  
    // Delete a Customer with customerId
    app.delete("/voluntario/:customerId", voluntario.delete);
  
    // Create a new Customer
    app.delete("/voluntario", voluntario.deleteAll);

    app.get("/login",voluntario.credentials);
  };