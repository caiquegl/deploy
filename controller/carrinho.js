
const {carrinhos} = require("../models");


const carrinhoController = {
    store: async (req, res) => {
        const {nome_produto, valor_produto, descricao_produto, id_produto, foto_produto} = req.body;
        let id = req.session.usuario.id;


        let valorTotal = 1*valor_produto;

    let findProdu = await carrinhos.findAll({
        where:{
            id_produto,
            id_usuario: id,
        }
    });

    let countIten = 1;

    let valorTotalDb = 0;


    findProdu.forEach(element => {
        let countCarr = element.quantidade_produto;
        countIten = 1 + countCarr;
        
        valorTotalDb = countIten * element.valor_produto;

    });

    let varTotal = await carrinhos.findAll(
        {
          where:{
            id_usuario: id
          }
        }
      )
      

  


    if(findProdu < 1){
        const carrinhoDb = await carrinhos.create(
            {
                nome_produto,
                valor_produto,
                id_produto,
                quantidade_produto: 1,
                descricao_produto,
                foto_produto,
                id_usuario: id,
                valor_total_produto: valorTotal,
                createdAt: new Date,
                updateAt: new Date,
            });
    }else{
        await carrinhos.update({
            quantidade_produto: countIten,
            valor_total_produto: valorTotalDb,
            updateAt: new Date,
        },{
            where:{
                id_produto,
                id_usuario:id
            }});
    }
    

        count = await carrinhos.count({
          where: {
            id_usuario: id
          }
        })

        req.session.count = {
          count: count,
        };

        

            return res.redirect("/carrinho");
    },

    remove: async (req, res) => {
        const {id_produto} = req.body;
        let id = req.session.usuario.id;


        

        await carrinhos.destroy(
            {
                where: {
                    id_produto,
                    id_usuario: id,
                }
            });


        count = await carrinhos.count({
          where: {
            id_usuario: id
          }
        })

        req.session.count = {
          count: count,
        };

            return res.redirect("/carrinho");
        }
}

module.exports = carrinhoController;