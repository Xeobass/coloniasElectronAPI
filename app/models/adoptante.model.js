const sql = require("../configs/db.config");

// constructor
const Adoptante = function(adoptante) {
    this.id_adoptante = adoptante.id_adoptante;
    this.nombre_adopt = adoptante.nombre_adopt;
    this.apellido1_adopt = adoptante.apellido1_adopt;
    this.apellido2_adopt = adoptante.apellido2_adopt;
    this.telefono_adopt = adoptante.telefono_adopt;
    this.direccion_adopt = adoptante.direccion_adopt;
    this.provincia_adopt = adoptante.provincia_adopt;
    this.codpos_adopt = adoptante.codpos_adopt;
    this.email_adopt = adoptante.email_adopt;
    this.tb_dni_fk = adoptante.tb_dni_fk;
    this.es_acogida = adoptante.es_acogida;

    console.log("adoptante:",adoptante)

};

Adoptante.create = (newAdoptante, result) => {
    console.log("newAdoptante = ",newAdoptante)
    sql.query("INSERT INTO tb_adoptante SET ?", newAdoptante, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created newAdoptante: ", { id: res.insertId, ...newAdoptante });
      result(null, { id: res.insertId, ...newAdoptante });
    });
  };


  module.exports = Adoptante;