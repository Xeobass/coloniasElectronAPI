const sql = require("../configs/db.config");

// constructor
const DatosGatos = function(datosGatos) {
    this.id_datos_gato=datosGatos.id_datos_gato,
    this.fecha_nac = datosGatos.fecha_nac,
    this.fecha_def = datosGatos.fecha_def,
    this.tb_foto_ficha_fk = datosGatos.tb_foto_ficha_fk,
    this.tb_colonia_fk = datosGatos.tb_colonia_fk

    console.log("datosGatos:",datosGatos)
};


DatosGatos.create = (newdatosGatos, result) => {
    console.log("New datosGatos = ",newdatosGatos)
    sql.query("INSERT INTO tb_datos_gato SET ?", newdatosGatos, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created datosGatos: ", { id: res.insertId, ...newdatosGatos });
      result(null, { id: res.insertId, ...newdatosGatos });
    });
  };


module.exports = DatosGatos;