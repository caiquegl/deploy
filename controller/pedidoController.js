const Sequelize = require("sequelize");
const { produtos,carrinhos,Pedido } = require("../models");






const pedidoController = {
  finalizar: async (req, res) => {

    const id = req.session.usuario.id;


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

    let descri= "";
    varTotal.forEach(element => {
      descri += ` ${element.nome_produto},`;
      
    });

    console.log(descri);

      return res.render("finalizar", {usuario: req.session.usuario, quantItens: req.session.count, title:'Finalizar pedido', soma, descri});
  },
    storePedido: async(req,res)=>{
        const id = req.session.usuario.id;
        const idEndereco = req.session.usuario.id_endereco;
        const {forma_de_pagamento, valor, descricao, categoria} = req.body;


          const quantItens = await carrinhos.count({
            where: {
              id_usuario: id
            }
          })


          if(quantItens > 0){

            

                const carrinhosDb = await carrinhos.findAll(
                    {
                      where: {
                        id_usuario: id
                    },
                      type: Sequelize.QueryTypes.SELECT,
                    }
                  );

                  

                    let id_produtoDb = "";
                    let nome_produtoDb = "";
                    let quantidade_produtoDb = "";
                    let valor_produtoDb = "";
                    let valor_total_produtoDb = "";



                    carrinhosDb.forEach(element => {
                        id_produtoDb += element.id_produto + " / ";
                        nome_produtoDb += element.nome_produto+ " / ";
                        valor_produtoDb += element.valor_produto+".00"+ " / ";
                        valor_total_produtoDb += element.valor_total_produto+".00"+ " / ";
                        quantidade_produtoDb += element.quantidade_produto+ " / ";
                    });

                    let convertTotalPedido = ";"

                    convertTotalPedido =  valor_total_produtoDb.replace(/\//g,'+');
                    convertTotalPedido = convertTotalPedido.slice(0, -1);
                    convertTotalPedido = convertTotalPedido.slice(0, -1);
                    convertTotalPedido = eval(convertTotalPedido);

                  await Pedido.create({
                    id_usuario: id,
                    id_produto: id_produtoDb,
                    nome_produto: nome_produtoDb,
                    quantidade_produto: quantidade_produtoDb,
                    valor_produto: valor_produtoDb,
                    valor_total_produto: valor_total_produtoDb,
                    id_endereco: idEndereco,
                    valor_total_pedido: convertTotalPedido + 20,
                    forma_de_pagamento,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  });

                  // Atualizar produto


                  let contador = 2;

                  

                  carrinhosDb.forEach(async element => {

                    let countProdutos = await produtos.count({
                      vendidos,
                    },{
                      where:{
                        id_produto: element.id_produto,
                      }
                    })
                    

                    await produtos.update({
                      vendidos: contador,
                      updateAt: new Date(),
                    },{
                      where:{
                        id_produto:element.id_produto,
                        id_usuario:id,
                      }});
                    
                  });
                  


                  console.log('travei aqui');


                  await carrinhos.destroy({
                    where:{
                      id_usuario: id,
                    } 
                  })
                    // for (let i = 0; i < quantItens; i++) {

                    //     carrinhosDb.forEach(async element => {
                    //        await Pedido.create({
                    //             id: idPedido,
                    //             id_produto: element.dataValues.id_produto,
                    //             nome_produto: element.dataValues.nome_produto,
                    //             quantidade_produto: element.dataValues.quantidade_produto, 
                    //             id_usuario: id,
                    //             valor_produto: element.dataValues.valor_produto,
                    //             valor_total_produto: element.dataValues.valor_total_produto,
                    //             createdAt: new Date(),
                    //             updatedAt: new Date(),
                    //         });
                    //         await carrinhos.destroy(
                    //             {
                    //                 where: {
                    //                     id_produto: element.dataValues.id_produto,
                    //                 }
                    //             });    
                            
                    //     });
                                              
                    // }

                    // return string = element.dataValues.id_produto;
                    // let value = string.concat(string);


                    // console.log(value);

                    

                    
            }
       


        return res.redirect("/cliente");

    },
    
}
module.exports = pedidoController;