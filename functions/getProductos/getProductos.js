let {log} = require('../../utils/utlis');
let connectDB = require('../connectDB/connectDB');
const TeleBot = require('telebot')




    async function getCollection(collection, find) {
        let client = await connectDB();
    const colProductos = client.db().collection(collection);
    
try {
    let productos = await colProductos.find(find).toArray();
    return productos;
} catch (error) {
    log(error)
}}

/*
async function getProductosID(id) {
    try {
       let productos = await getCollection('Productos', {id: id})
        let resultado = `id  |  Nombre                           |  Precio\n`;
     let len = productos.length;
     let i=0;
     for (;i<len;i++){
       resultado += `${productos[i].id}  | ${productos[i].name.substring(0,20)} | $${productos[i].price} \n`;
       } 
       log(resultado)
     return  bot.sendMessage(msg.chat.id,` ${resultado}`);
    } catch (error) {
        log(error);
    } 
}
getProductosID(5)*/
module.exports =  getCollection;