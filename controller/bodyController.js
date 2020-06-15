const Sequelize = require("sequelize");
const config = require("../config/database");
const {Pedido,produtos,enderecos,carrinhos,mapas} = require("../models");






const bodyController = {
    home: async(req, res) => {
      const con = new Sequelize(config);

        const produtosDb = await con.query("select * from produtos",
          {
            type: Sequelize.QueryTypes.SELECT,
          }
        );
        return res.render("index", {usuario: req.session.usuario, produtos: produtosDb, quantItens: req.session.count, title: 'Home'});
    },
    noticia: (req, res) => {

        return res.render("noticia", {usuario: req.session.usuario, quantItens: req.session.count, title: 'News'});
    },
    cadastro: (_req, res) => {
        return res.render("cadastro", {title: "cadastro"});
    },
    
    
    
    
    carrinho: async (req, res) => {
    

      let id = req.session.usuario.id;



      const carrinhosDb = await carrinhos.findAll(
        {
          where: {
            id_usuario: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      let varTotal = await carrinhos.findAll(
        {
          where:{
            id_usuario: id
          }
        }
      )
      let soma = 0;
      varTotal.forEach(element => {
        soma += parseInt(element.valor_total_produto);
        
      });

      console.log(soma);

      return res.render("carrinho", {usuario: req.session.usuario, carrinho: carrinhosDb, quantItens: req.session.count, title: 'Carrinho', soma});

  },
    cliente: async (req, res) => {
      let id = req.session.usuario.id;


      const enderecoDb = await enderecos.findAll(
        {
          where: {
            id_usuario: id
        },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      const pedidosDb = await Pedido.findAll(
        {
          where:{
            id_usuario: id
          }
        });
        let convertTotalPedido = ";"
        pedidosDb.forEach(element => {
          convertTotalPedido =  element.valor_total_produto.replace(/\//g,'+');
          convertTotalPedido = convertTotalPedido.slice(0, -1);
          convertTotalPedido = convertTotalPedido.slice(0, -1);
          convertTotalPedido = eval(convertTotalPedido);
          console.log(convertTotalPedido);
        });

      
      
      return res.render("cliente", {usuario: req.session.usuario, quantItens: req.session.count, enderecoDb: enderecoDb, pedidos: pedidosDb, title: 'Inicial'});
  },

  logout: (req, res) => {
    req.session.destroy();
    res.render('login',{title:'login'})
      
},

    login: (_req, res) => {
        return res.render("login",{title: 'Login'});
    },
    
    mapa:  (req, res) => {
        return res.render("mapa", {usuario: req.session.usuario, quantItens: req.session.count, title: 'Mapa'});
    },
    mapaSearch:  async(req, res) => {
      let tipos = req.body;
      const {tipoLocal, wifi, livro, cafeteria, mesas, computadores,tomadas} = req.body;


      let where = {};

      let addObj = {tipo: tipoLocal};
      let buscaLocal = Object.assign(where,addObj);

      for (const key in req.body) {
        if(key == "tipoLocal"){
          continue
        }
        if(req.body[key] != undefined){
          where[key] = 1
        }
      };

      

      let achado = await mapas.findAll({
        where
      });

      achado.forEach(element => {
        console.log("Nome "+element.nome);
      });


      return res.render("mapa", {usuario: req.session.usuario, quantItens: req.session.count, title: 'Mapa', achado});
  },
    paginaAdmin: async(req, res) => {
      const con = new Sequelize(config);
      let id = req.session.usuario.id;



        let quantItens = await carrinhos.count({
          where: {
            id_usuario: id
          }
        })

       let produtosDb =  await produtos.findAll(
          {
            where: {
              id_usuario: id
            }
          }
        );

        
        

        return res.render("paginaAdmin", {usuario: req.session.usuario, produtos: produtosDb, quantItens, title: 'Pagina Admin'});
    }
};

module.exports = bodyController;