const { Schema, model } = require("mongoose");

const FormSchema = new Schema({
  name_f: {
    type: String,
    require: true
  },
  email_f: {
    type: String,
    require: true
  },
  cpf_cnpj_f: {
    type: String,
    require: true
  },
  teleph_f: {
    type: Number,
    require: true
  },
  zip_code_f: {
    type: Number,
    require: true
  },
  logradouro_f: {
    type: String,
    require: true
  },
  number_f: {
    type: Number,
    require: true
  },
  bairro_f: {
    type: String,
    require: true
  },
  city_f: {
    type: String,
    require: true
  },
  state_f: {
    type: String,
    require: true
  },
});

const ModelForm = model('form', FormSchema);

exports.ModelForm = ModelForm;