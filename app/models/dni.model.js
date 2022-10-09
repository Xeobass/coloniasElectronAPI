const sql = require("../configs/db.config");

// constructor
const Dni = function(dni) {
    this.num_dni = dni.num_dni;
    this.front_dni = dni.front_dni;
    this.back_dni = dni.back_dni;

    console.log("dni:",dni)
};


Dni.create = (newDni, result) => {
    console.log("New colonia = ",newDni)
    sql.query("INSERT INTO tb_dni SET ?", newDni, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created colonia: ", { id: res.insertId, ...newDni });
      result(null, { id: res.insertId, ...newDni });
    });
  };


module.exports = Dni;