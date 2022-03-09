/* -------------------------------------------- */
/*                     Misc                     */
/* -------------------------------------------- */
import fs from "fs";
import clc from "cli-color";
import emoji from "node-emoji";

export const log = console.log;
export const warn = (str) => clc.redBright(str)+emoji.get('warning');
export const success = (str) => clc.green(str)+emoji.get('tada');

/* -------------------------------------------- */
/*                  Declaration                 */
/* -------------------------------------------- */

export class Container {
  fileDir: string;
  createFile: Function;

  constructor(fileDir: string) {
    this.fileDir = fileDir;
    this.createFile = async (fileDir)=> {
      await fs.promises.unlink(fileDir)
      .then(async ()=> await fs.promises.writeFile(fileDir,'utf8'))
    }
  }

  /* ---------------- Functions --------------- */
  async save(data: Object): Promise<Number> {
    try {
      const jsonData: Array<Object> = JSON.parse(
        await fs.promises.readFile(this.fileDir, "utf8")
      );
      const newData: Object = data;
      if (jsonData.length) {
        const lastItem = jsonData[jsonData.length - 1];
        const lastId = lastItem["id"];
        newData["id"] = lastId + 1;
      } else {
        newData["id"] = 1;
      }
      const jsonNewData: Array<Object> = jsonData;
      jsonNewData.push(newData);
      await fs.promises.writeFile(this.fileDir, JSON.stringify(jsonNewData));
      log(success(`Product saved!`))
      return await newData["id"]
    } catch (error) {
      log(warn(error.message));
    }
  }

  /* ---------------- Get by Id --------------- */
  async getById(id: number): Promise<Object> {
    try {
      const jsonData = JSON.parse(await fs.promises.readFile(this.fileDir,'utf8'));
      const filteredData = jsonData.filter(element => element['id']===id );
      log(success('Object Retrieved!'))
      return filteredData[0]
    } catch (error) {
      log(warn(error.message));
    }
  }

  /* ----------------- Get all ---------------- */
  async getAll(): Promise<Object[]> {
    try {
      const allData = JSON.parse(await fs.promises.readFile(this.fileDir,'utf8'))
      log(success('Array Retreived!'))
      return allData;
    } catch (error) {
      log(warn(error.message));
    }
  }

  /* -------------- Delete by ID -------------- */
  async deleteById(id: number): Promise<void> {
    try {
      const jsonData: Array<Object> = JSON.parse(
        await fs.promises.readFile(this.fileDir, "utf8")
      );
      const jsonNewData: Array<Object> = jsonData.filter((element) => element["id"] != id);
      await fs.promises.writeFile(this.fileDir, JSON.stringify(jsonNewData));
      log(success(`Product deleted!`))
    } catch (error) {
      log(warn(error.message));
    }
  }


  /* --------------- Delete all --------------- */
  async deleteAll(): Promise<void> {
    try {
      await fs.promises.unlink(this.fileDir)
      log(success('All deleted!'))
    } catch (error) {
      log(warn(error.message));
    }
  }
}

/* ------- Declarar constructor Objetos ------- */

function Product(
  title: string,
  price: number,
  thumbnail: string,
  id: number = 0
) {
  this.title = title;
  this.price = price;
  this.thumbnail = thumbnail;
  this.id = id;
}

/* -------------------------------------------- */
/*                     Tests                    */
/* -------------------------------------------- */

const productsDir: Container = new Container("./products.txt");
const product1: Object = new Product(
  "Shirt",
  551,
  "https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
);

const product2: Object = new Product(
  "Dress",
  700,
  "https://images.pexels.com/photos/8050084/pexels-photo-8050084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
);

const product3: Object = new Product(
  "Shoes",
  677,
  "https://images.pexels.com/photos/3389419/pexels-photo-3389419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
);

productsDir.save(product1)
.then(async ()=> log(await productsDir.getAll()))
.then(async ()=> await productsDir.save(product2))
.then(async ()=> await log(productsDir.getAll()))
.then(async ()=> await productsDir.save(product3))
.then(async ()=> await log(productsDir.getAll()))
.then(async ()=> await log(productsDir.getById(2)))
.then(async ()=> await log(productsDir.getAll()))
.then(async ()=> await log(productsDir.deleteById(3)))
.then(async ()=> await log(productsDir.getAll()))
.then(async ()=> await log(productsDir.deleteAll()))
.then(async ()=> await log(productsDir.getAll()))

