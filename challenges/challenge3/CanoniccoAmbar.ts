/* -------------------------------------------- */
/*                     Misc                     */
/* -------------------------------------------- */

import emoji from 'node-emoji';
import clc from 'cli-color'
import { log, warn, Container, success }  from '../challenge2/CanoniccoAmbar'

const listen = clc.blueBright.italic

/* -------------------------------------------- */
/*                   Functions                  */
/* -------------------------------------------- */

import fs from "fs";

// function getProducts (path: string): Array<Object> {
//   let productsArray: Array<Object> ;
//   fs.promises.readFile(path, 'utf-8')
//   .then( content => productsArray = JSON.parse(content))
//   .catch( error => {
//     log(warn('getProducts error'));
//     throw error
//   })
//   return productsArray
// }

function getRandomInt(min: number, max: number) : number {
  return Math.floor(Math.random() * (max - min)) + min
}

// function getRandomProduct (path: string): Object {
//   let product: Object;
//   let products: Array<Object>
//   let contentLength: number;
//   fs.promises.readFile (path, 'utf-8')
//   .then( content => {
//     products = JSON.parse(content)
//     contentLength = products.length
//     product = products[getRandomInt(0,contentLength)];
//   })
//   .catch( error => {
//     log(warn('getRandomProduct error'));
//     throw error
//   })
//   return product
// }

/* -------------------------------------------- */
/*                 Server Setup                 */
/* -------------------------------------------- */

import express from 'express';


const app = express();
const PORT = 8080;


const server = app.listen(PORT, () => {
  const logRes = `${emoji.get('earth_americas')} Server Listening on http://localhost:${PORT}/${emoji.get('speaker')}`
  log(listen(logRes))
})

server.on('error', error => {
  const logRes = `${emoji.get('exclamation')} Server error ${error} ${emoji.get('exclamation')}`
  log(warn(logRes))
});

/* -------------------------------------------- */
/*                   Requests                   */
/* -------------------------------------------- */

app.get('/', (req,res) => {
  res.send ({message: 'Hello world from home'})
})

const productsFile: Container = new Container('./products.txt')

app.get('/products', async (req, res) => {
    const response: Array<Object> = await productsFile.getAll();
    res.send(response);
    log(success(`Response received`))
  })

app.get('/random-product', async (req, res)  => {
  const allProducts: Array<Object>  = await productsFile.getAll()
  const response = allProducts[getRandomInt(0,allProducts.length)]
  res.send(response)
  log(success(`Response received`))
});