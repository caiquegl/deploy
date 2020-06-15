var Inputmask = require('inputmask');

var selector = document.getElementById("money");

var im = new Inputmask("000.000,00");
im.mask(selector);