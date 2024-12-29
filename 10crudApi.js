// npm install cors
const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const messages = require('./myData');

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"frank",
    password:"admin123",
    database:"my_chat"
});

// GET request - Retrieve all messages
app.get('/msg', (req, res) => {
  var mensajes = [];
  connection.connect(function(error) {
    if(error){
      console.log("Error al conectar a la BD: " + error);
      res.status(500).send("Ocurrió un error inesperado.");
    }else{
      console.log("BD CONECTADA");

      var query = `select m.id, m.contenido content, sender.name sender, recipient.name recipient, m.fecha_hora dateTime
                  from mensajes m
                  join usuarios sender on (sender.id = m.id_usuario_sender)
                  join usuarios recipient on (recipient.id = m.id_usuario_recipient)
                  order by m.fecha_hora`;

      connection.query(query, function(err, result, fields) {
        if (err) throw err;
        for(var i = 0; i < result.length; i++){
          var row = result[i];
          mensajes.push(row);
        }

        res.status(200).json(mensajes);
      });
    }
  });
});

// POST request - Create a new messages
app.post('/msg', (req, res) => {
  const newMessage = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    content: req.body.content,
    sender: req.body.sender,
    recipient: req.body.recipient
  };
  
  connection.connect(function(error) {
    if(error){
      console.log("Error al conectar a la BD: " + error);
      res.status(500).send("Ocurrió un error inesperado.");
    }else{
      console.log("BD CONECTADA");

      var sql = `insert into mensajes (id, contenido, fecha_hora, id_usuario_sender, id_usuario_recipient)
                    values (?, ?, now(), ?, ?)`;

      connection.query(sql, [newMessage.id , newMessage.content, newMessage.sender, newMessage.recipient], function(err, data) {
        if (err) {
          console.log("Error al insertar a la BD: " + err);
          res.status(500).send("Ocurrió un error inesperado.");
        }else{
          res.status(201).json(newMessage);
        }
      });
    }
  });
});

// PUT request - Update an existing post
app.put('/msg/:id', (req, res) => {
  const updateData = {
    id: req.params.id,
    content: req.body.content,
    sender: req.body.sender,
    recipient: req.body.recipient
  };

  console.log(updateData);

  connection.connect(function(error) {
    if(error){
      console.log("Error al conectar a la BD: " + error);
      res.status(500).send("Ocurrió un error inesperado.");
    }else{
      console.log("BD CONECTADA");

      var sql = `update mensajes set contenido = ?, id_usuario_sender = ?, id_usuario_recipient = ?
                  where id = ?`;

      console.log(sql);

      connection.query(sql, [updateData.content, updateData.sender, updateData.recipient, updateData.id], function(err, data) {
        if (err) {
          console.log("Error al actualizar a la BD: " + err);
          res.status(500).send("Ocurrió un error inesperado.");
        }else{
          res.status(200).json(updateData);
        }
      });
    }
  });
});

// DELETE request - Delete a post
app.delete('/msg/:id', (req, res) => {  
  connection.connect(function(error) {
    if(error){
      console.log("Error al conectar a la BD: " + error);
      res.status(500).send("Ocurrió un error inesperado.");
    }else{
      console.log("BD CONECTADA");

      var sql = `delete from mensajes where id = ?`;

      console.log(sql);

      connection.query(sql, [req.params.id], function(err, data) {
        if (err) {
          console.log("Error al actualizar a la BD: " + err);
          res.status(500).send("Ocurrió un error inesperado.");
        }else{
          res.status(204).send()
        }
      });
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});