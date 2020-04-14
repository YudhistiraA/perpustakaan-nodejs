const {
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    getUserByUserEmail,
    deleteUser
  } = require("./anggota.service");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    

    createanggota: (req, res) => {
      const body = req.body;
      
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.nama_anggota, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        }
        const result = (body.kd_anggota, results.kd_anggota);
        if (result) {
          results.password = undefined;
          results.number = undefined;
          const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
              expiresIn: "1h"
          });
          return res.json({
            success: 1,
            results,
            message: "login successfully",
            token: jsontoken
          });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password"+err
          });
        }
      });
    },
    getUserByUseraggota: (req, res) => {
      const id = req.params.id;
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    getanggota: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },
    updateanggota: (req, res) => {
      const body = req.body;
 
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "updated successfully"
        });
      });
    },
    deleteanggota: (req, res) => {
      const data = req.body;
      deleteUser(data, (err,results) => {
       
        if (err) {
         
            console.log(err)
          
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "not found"
          });
        }else{
          return res.json({
            success: 1,
            message: "deleted sucses"
          })
        }
     
      });
    },
  
  };