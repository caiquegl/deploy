
const bcrypt = require("bcryptjs");
const { usuarios } = require("../models");
const { check, validationResult, body } = require("express-validator")


const registerController = {
  store: async (req, res) => {

    const listaDeErrors = validationResult(req)

    const { email, password, CPF, nome, endereco, nascimento, sexo, ofertas } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    if (listaDeErrors.isEmpty()) {

      const usuario = await usuarios.findAll({

        where: {
          email,
        }

      });

      console.log(usuario)

      if (!usuario.length < 1) {
        return res.render("cadastro", {
          msg: "Conta ja cadastrada",
        });
      } else {
        const user = await usuarios.create({
          email,
          password: hashPassword,
          CPF,
          nome,
          nascimento,
          sexo,
          ofertas,
          vendedor: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      }

      return res.redirect("cliente");
    } else {
      console.log('estou aqui'+listaDeErrors);
      return res.render("cadastro", { errors: listaDeErrors.errors })
    }

  }

}

module.exports = registerController;