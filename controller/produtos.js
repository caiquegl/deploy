
const { produtos } = require("../models");




const produtosController = {
    storeProduto: async (req, res) => {
        const {nome_produto, valor, descricao, categoria} = req.body;
        const [foto] = req.files;
        let id = req.session.usuario.id;

        console.log(id);

        const produtosDb = await produtos.create({
                nome_produto,
                valor,
                descricao, 
                id_usuario: id,
                categoria,
                foto: foto.filename,
                vendidos: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return res.redirect("paginaAdmin");
    },
    ecomerce: async (req, res) => {
  
        const produtosDb = await produtos.findAll();
      
          return res.render("ecomerce", {usuario: req.session.usuario, produtosDb, quantItens: req.session.count, title: 'E-comerce'});
      },
      ecomerceUp: async (req, res) => {
  
        const produtosDb = await produtos.findAll({
          order: [
            ['valor', 'DESC']
          ]
        });
      
          return res.render("ecomerce", {usuario: req.session.usuario, produtosDb, quantItens: req.session.count, title: 'E-comerce'});
      },
      ecomerceDown: async (req, res) => {
  
        const produtosDb = await produtos.findAll({
          order: [
            ['valor', 'ASC']
          ]
        });
      
          return res.render("ecomerce", {usuario: req.session.usuario, produtosDb, quantItens: req.session.count, title: 'E-comerce'});
      },
      ecomerceId: async (req, res) => {
  
        const id = req.params.id;

        const produtosDb = await produtos.findAll(
          {
            where: {
              categoria: id
            }
          }
        );
      
          return res.render("ecomerce", {usuario: req.session.usuario, produtosDb, quantItens: req.session.count, title: 'E-comerce'});
      },
      remove: async (req, res) => {
  
        const id = req.session.usuario.id;
        const {id_produto} = req.body;


        await produtos.destroy(
          {
            where: {
                id_produto,
                id_usuario: id,
            }
        });
      
          return res.redirect("paginaAdmin");
      },
      infoProdutos: async (req, res) => {
        const id = req.params.id;
        const infoProduto = await produtos.findAll(
          {
            where: {
              id_produto: id
            }
          });
         
          return res.render("infoProdutos", {usuario: req.session.usuario, infoProduto: infoProduto, quantItens: req.session.count, title: 'Pagina Produto'});
      },
}

module.exports = produtosController;