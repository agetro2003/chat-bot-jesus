

const TeleBot = require('telebot')
const {
    default: axios
    } = require('axios');
const { sendPhoto, keyboard, sendMessage } = require('telebot/lib/methods');
   
const ENDPOINT = '';
// Botones 
const BUTTONS = {

    productos: {
        label: 'Mostrar productos',
        command: '/productos'
    },
    pagos: {
        label: 'Mostrar metodos de pago',
        command: '/pagos'
    },
    entrega: {
        label: 'Ver zonas de entrega y horario de trabajo',
        command: '/entrega'
    },
    buscar: {
        label: 'Elegir producto',
        command: '/buscar'
    },
    inicio: {
    label: 'Regresar a inicio',
    command: '/start'
    },
    carrito: {
    label: 'Agregar un producto al carro de compras',
    command: '/carrito'
    },
    buscarOtro: {
    label: 'Elegir otro producto',
    command: '/buscar'
    },
    verCarrito: {
        label: 'Ver el carrito de compras',
        command: '/verCarrito'
    }


}

const bot = new TeleBot({
    token: '5408568027:AAFrKUI_pi0rx5hspRjE7A5ZC3Zb9mSM7zk',
    usePlugins: ['namedButtons', 'askUser'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});


//Ver productos 
bot.on('/productos', (msg) =>  {
    async function getProductos() {
        try {
            const respuesta = await axios.get(ENDPOINT);
           let productos = respuesta.data;
           let resultado = `id  |  Nombre                           |  Precio\n`;
         let len = productos.length;
         let i=0;
         for (;i<len;i++){
           resultado += `${productos[i].id}  | ${productos[i].title.substring(0,20)} | $${productos[i].price} \n`;
           } 
           return bot.sendMessage(msg.chat.id,` ${resultado}`);
        } catch (error) {
            console.log(error);
        }
    }
    

    getProductos() 
    let replyMarkup = bot.keyboard([
        [BUTTONS.inicio.label, BUTTONS.buscar.label]
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Elija entre las siguientes opciones', {replyMarkup});
});
 
  //Buscar producto
  bot.on ('/buscar', (msg) => {
    return bot.sendMessage(msg.chat.id, ' A continuacion introduzca el id del producto que desea consultar', {ask: 'id'});
    })
  //Mostrar producto
    bot.on ('ask.id', msg => {
        const id = Number(msg.text);

        if (!id) {
            return bot.sendMessage(msg.chat.id, 'Introduzca un id valido. Ej: 2', {ask: 'id'});
        } else {
            async function getProductID(id) {
                const respuesta = await axios.get(ENDPOINT+`/${id}`);
               let producto = respuesta.data;
               let resultado = `id: ${producto.id}\n Nombre: ${producto.title}\n 
Precio: $${producto.price} \n Descripcion: \n ${producto.description} \n ${producto.image} \n
Categoria: ${producto.category}\n
Valoracion: promedio ${producto.rating.rate} de ${producto.rating.count} valoraciones \n`;

                return bot.sendMessage(msg.chat.id, `${resultado}`);
            }
            getProductID(id)
            let replyMarkup = bot.keyboard([
                [BUTTONS.buscarOtro.label], [BUTTONS.carrito.label],
                [BUTTONS.inicio.label]
            ], {resize: true});
            return bot.sendMessage(msg.chat.id,'Aqui se encuentra el producto solicitado',{replyMarkup});

        }

    })
/* En desarrollo
    //Agregar producto al carrito.

    let carro = []
    let verificador; 
    
    bot.on('/carrito', (msg) => {
        return bot.sendMessage(msg.chat.id, ' A continuacion introduzca el id del producto que desea agregar', {ask: 'idCarro'});
    })
    bot.on('ask.idCarro', (msg) => {
        const idCarro = Number(msg.text);
        if (!idCarro) {
            return bot.sendMessage(msg.chat.id, 'Introduzca un id valido. Ej: 2', {ask: 'idCarro'});
        } else {
            async function getProducto(id) {
                const respuesta = await axios.get(ENDPOINT+`/${idCarro}`);
               let producto = respuesta.data;
               verificador = false;
                for (let index = 0;  index < carro.length; index++) {
                   if (idCarro == carro[index][0])
                   {carro[index][3] ++;
                   verificador = true;
                   }
                }
                if (verificador === false) {
                   /* let a = {
                       id: producto.id,
                       title: producto.title,
                       price: producto.price,
                       cantidad: 1 
                    }
                    carro.push(a);
                    carro[carro.length][0] = producto.id;
                    carro[carro.length][1] = producto.title;
                    carro[carro.length][2] = producto.price;
                    carro[carro.length][3] = 1
                } 
                return carro; 
        }
         getProducto(idCarro)

         let replyMarkup = bot.keyboard([
            [BUTTONS.productos.label], [BUTTONS.verCarrito.label],
            [BUTTONS.inicio.label]
        ], {resize: true});
return bot.sendMessage(msg.chat.id, 'Su producto ha sido agregado', {replyMarkup});

    }
    })

    //Mostrar carrito
bot.on ('/verCarrito', (msg) => {
//
    let resultado = `Carrito de Compra \n
Cantidad |  id  | Nombre                   |  precio  \n`;
for (let index = 0; index <= carro.length; index++) {
    resultado += `${carro[index][3]}    |  ${carro[index][0]}  |${carro[index][1].substring(0,20)} | $${carro[0][2]}  \n`;
}

let replyMarkup = bot.keyboard([
    [BUTTONS.productos.label],
    [BUTTONS.inicio.label]
], {resize: true});

return bot.sendMessage(msg.chat.id, `${carro}`, {replyMarkup});

})

*/
bot.on('/pagos', async (msg) => {

   try {

await bot.sendMessage(msg.chat.id, '<strong> Metodos de pago </strong>', {parseMode: 'HTML'})   ;
await bot.sendMessage(msg.chat.id, '• Efectivo');
await bot.sendPhoto(msg.chat.id, 'imagenes/efectivo.png');
await bot.sendMessage(msg.chat.id, '• Transferencia');
await bot.sendPhoto(msg.chat.id, 'imagenes/transferencia.jpg');
await bot.sendMessage(msg.chat.id, '• Criptomonedas');
await bot.sendPhoto(msg.chat.id, 'imagenes/criptos.png');
 
  } catch (error) {
      console.log(error)
  }
});
bot.on('/entrega', (msg) => msg.reply.text('esto es entrega'));

// menu inicial
bot.on('/start', (msg) => {

    let replyMarkup = bot.keyboard([
        [BUTTONS.productos.label, BUTTONS.pagos.label],
        [BUTTONS.entrega.label]
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Bienvenido a la tienda. \n Elija la opcion de su preferencia',{replyMarkup});
});


bot.start();
