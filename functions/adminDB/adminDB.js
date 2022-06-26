
let axios = require('axios');

let {log, output} = require('../../utils/utlis');
let connectDB = require('../connectDB/connectDB');

const ENDPOINT = 'https://fakestoreapi.com/products/';

exports.handler = async (event, context) => {
let {
    httpMethod: method,
    queryStringParameters:p
} = event;

let client = await connectDB()
const colProductos = client.db().collection('Productos');

 
const respuesta = await axios.get(ENDPOINT);
let productos = respuesta.data; 
     
if (method == "POST") {
    try {

        for (let i = 0;i<20;i++) {
            await colProductos.insertOne({
                id: productos[i].id, 
                name: productos[i].title,
                price: productos[i].price,
                description: productos[i].description,
                category: productos[i].category,
                image: productos[i].image,
                rating: productos[i].rating
            })
        }
       return output(" Se han llenado los productos")
    } catch (error) {
       log (error);
    }
}
if (method == "GET") {
    try {
        let r = await colProductos.find({}).toArray();
        return output(r);
    } catch (error) {
        log(error);
    }
}
}
