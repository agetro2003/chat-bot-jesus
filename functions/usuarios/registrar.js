let yup = require('yup')
let axios = require('axios');
const TeleBot = require('telebot')

let {log, output} = require('../../utils/utlis');
let connectDB = require('../connectDB/connectDB');
const bot = require('../../main');
const { sendMessage } = require('telebot/lib/methods');


async function guardarDatos(msg){
    let client = await connectDB()
const colUsers = client.db().collection('users');
let mensaje = await toString(msg);
let datos = mensaje.split(' ');

try {
     await colUsers.insertOne({
        correo: datos[0],
        usuario: datos[1],
        contraseña: datos[2],
        ciudad: datos[3]
    })
    return log(datos)
} catch (error){
    log (error);
}

}
/*
bot.on ('/formulario', (msg) => {
    bot.sendMessage(msg.from.id, ` Para registrarse introduzca los datos necesarios en el siguiente orden ]\n
"correo usuario contraseña ciudad"`, {ask: 'datos'})
})

bot.on ('ask.datos', msg => {
    let mensaje = toString(msg.text);
    let datos = mensaje.split(' ');
   await guardarDatos(datos)
})*/

module.exports = guardarDatos;



