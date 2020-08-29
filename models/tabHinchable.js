'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TabHinchable = Schema({
    name: String,
    brand: String,
    description: String,
    position: Number,
    image: String
});

module.exports = mongoose.model('tabhinchable', TabHinchable);