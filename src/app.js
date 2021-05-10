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

server.post('/form', (req, res) => {
  const { name, email, cpf_cnpj, teleph, zip_code, logradouro, number, bairro, city, state } = req.body;

  CreateIdForm.findOne({
    // search form in mongodb
    cpf_cnpj_f: `${cpf_cnpj}`
  }).then((result) => {
    if (!result) {
      //Create form
      const new_form = new CreateIdForm({
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
      }).catch((err) => {
        console.log("ERROR: ", err);
      });

      res.json(new_form);
    } else {
      res.status(400).json({ error: 'fails: User already exists.' });
    }
  }).catch((err) => {
    console.log("ERROR: ", err);
  });

});

const port = 3333;

console.log(`Server PORT: ${process.env.PORT || port}`);

server.listen(process.env.PORT || port);