const sql = require("../configs/db.config");

// constructor
const Voluntario = function(voluntario) {
    this.id=voluntario.id;
    this.email_usuario = voluntario.email_usuario;
    this.nombre_usuario = voluntario.nombre_usuario;
    this.pass_usuario = voluntario.pass_usuario;
    this.esAdmin    = voluntario.esAdmin;
    this.activo = voluntario.activo;
};

Voluntario.create = (newUser, result) => {
    sql.query("INSERT INTO tb_usuarios SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  Voluntario.findById = (voluntarioId, result) => {
    sql.query(`SELECT * FROM tb_usuarios WHERE id_usuario = ${voluntarioId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found voluntario: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found volunteer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Voluntario.credentials = (voluntarioPass,voluntarioName, voluntarioProte,result)=>{
   sql.query(`SELECT * FROM tb_usuarios WHERE nombre_usuario =\'${voluntarioName}\' AND pass_usuario=\'${voluntarioPass}\' and prote=\'${voluntarioProte}\' and activo=1;`,(err,res)=>{
        //sql.end();
      if(err){
        console.log("Error solicitando datos de login:",err);
        result(err,null);
        return;
      }

      if(res.length){
        result(null,res[0]);
        return;
      }

      result({kind:"not_found"},null);
    })
  }

  Voluntario.getAll = result => {
    sql.query("SELECT * FROM tb_usuarios", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("usuario: ", res);
      result(null, res);
    });
  };
  
  Voluntario.updateById = (id, voluntario, result) => {
    sql.query(
      "UPDATE tb_usuarios SET email_usuario = ?, nombre_usuario = ?, activo = ? WHERE id_usuario = ?",
      [voluntario.email_usuario, voluntario.nombre_usuario, voluntario.activo, id_usuario],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Volunteer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated voluntario: ", { id: id_usuario, ...voluntario });
        result(null, { id: id, ...voluntario });
      }
    );
  };
  
  Voluntario.remove = (id, result) => {
    sql.query("DELETE FROM tb_usuarios WHERE id_usuario = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found volunteer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted voluntario with id: ", id);
      result(null, res);
    });
  };
  
  Voluntario.removeAll = result => {
    sql.query("DELETE FROM tb_usuarios", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} usuario`);
      result(null, res);
    });
  };
  
  module.exports = Voluntario;