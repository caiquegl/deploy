
const bcrypt = require("bcryptjs");

const {carrinhos,usuarios} = require("../models");



const autentificacao = {
    validando:(req,res,next)=>{
    
        if(!req.session.usuario){
          res.redirect('/login');
          
      }next();
    },
    validatorLogin: async (req, res) => {
        const { email, password } = req.body;
    
        const [usuario] = await usuarios.findAll({
          
            where: {
              email,
            }
            
        });
    
        if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
          return res.render("login", {
            msg: "Email ou senha errados!",
          });
        }
        
        
        req.session.usuario = {
          id: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email,
          CPF: usuario.CPF,
          id_endereco: usuario.id_endereco,
          nascimento: usuario.nascimento,
          sexo: usuario.sexo,
        };



        let id = req.session.usuario.id;

        count = await carrinhos.count({
          where: {
            id_usuario: id
          }
        })

        req.session.count = {
          count: count,
        };

        console.log(count)
        
      
            return res.redirect("cliente");
      
    
      
    },
    recuSenha: async (req,res) =>{
      const { email} = req.body;

      const [recu] = await usuarios.findAll({
          
        where: {
          email,
        }     
    });
    console.log(recu);

    if (recu) {
      return res.render("login", {
        msgRecu: "Email enviado com nova senha de acesso!!",
      });
    
    }else{
      return res.render("login", {
        msg: "Email não cadastrado!",
      });
    
    }


    },
}

module.exports = autentificacao;