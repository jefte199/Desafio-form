//import libs
const express = require('express');
const mongoose = require('mongoose');

//import model
const ModelForm = require('./models/schema_form');

//init mongodb

module.exports = mongoose.connect("mongodb://localhost/form").then(() => { //form is database
  console.log("Mongo conectado...");
})
  .catch((err) => {
    console.log("Erro de conecção com o mongo: ", err);
  });

const CreateIdForm = mongoose.model('form');

// init server
const server = express();

server.use(express.json());

// ROUTES
server.get('/', (req, res) => res.json({ msg: 'Welcome API: form' }));

server.get('/form', (req, res) => {
  // search forms in mongodb
  CreateIdForm.find().then((result) => {
    if (result) {
        res.json({
          result: result
        });
    } else {
      res.status(400).json({ error: 'fails.' });
    }
  }).catch((err) => {
    console.log("ERROR: ", err);
  });

});

server.post('/form', (req, res) => {
  const { name, email, cpf_cnpj, teleph, zip_code, logradouro, number, bairro, city, state } = req.body;

  CreateIdForm.findOne({
    // search form in mongodb
    cpf_cnpj_f: `${cpf_cnpj}`
  }).then((result) => {
    if (!result) {
      //Create form
      new CreateIdForm({
        name_f: name, 
        email_f: email, 
        cpf_cnpj_f: cpf_cnpj, 
        teleph_f: teleph, 
        zip_code_f: zip_code, 
        logradouro_f: logradouro, 
        number_f: number, 
        bairro_f: bairro, 
        city_f: city, 
        state_f: state
      }).save().then((result) => {
        console.log('OK, Form add');

        res.json({
          result: `created new form ${name}`
        });
        }).catch((err) => {
        console.log("ERROR: ", err);
      });
    } else {
      res.status(400).json({ error: 'fails: User already exists.' });
    }
  }).catch((err) => {
    console.log("ERROR: ", err);
  });

});

server.delete('/form/:id_cpf_cnpj', (req, res) => {
  const cpf_cnpj_delete = req.params.id_cpf_cnpj;

  CreateIdForm.deleteOne({
    cpf_cnpj_f: `${cpf_cnpj_delete}`
  }).then((result) => {
    if (!result){
      res.status(400).json({ error: 'fails: User not exists.' });
    }else {
      res.json({
        result: `form deleted - cpf/cnpj ${cpf_cnpj_delete}`
      });
    }
  }).catch((err) => {
    console.log("ERROR: ",err);
  });

});

// Server PORT 

const port = 3333;

console.log(`Server PORT: ${process.env.PORT || port}`);

server.listen(process.env.PORT || port);
