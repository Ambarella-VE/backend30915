/* -------------------------------------------- */
/*                     Misc                     */
/* -------------------------------------------- */
import fs from 'fs';
import clc from 'cli-color';
import emoji from 'node-emoji';

const log = console.log


/* -------------------------------------------- */
/*                  Declaration                 */
/* -------------------------------------------- */

class Container {
  fileDir: string;

  constructor(fileDir: string) {
    this.fileDir = fileDir;
  }

  /* ---------------- Functions --------------- */
  save(data: Object): Number {
    let assignedId: Number = 0;
    let newData: Object = data;
    let jsonNewData: Array<Object>
    fs.promises
      .readFile(this.fileDir, "utf8")
      .then((content) => {
        const jsonData: Array<Object> = JSON.parse(content);
        if (jsonData.length) {
          const lastItem = jsonData[jsonData.length - 1];
          const lastId = lastItem["id"];
          newData["id"] = lastId + 1;
        } else {
          newData["id"] =  1;
        }
        jsonNewData = jsonData;
        jsonNewData.push(newData);
      })
      .then(()=>{
        fs.promises.writeFile(this.fileDir, JSON.stringify(jsonNewData),'utf8')
        .then(()=> {
          log("File successsfully written!")
          assignedId = newData["id"]
          return assignedId
        })
        .catch((error)=> {throw error})
        
      })
      .catch( (error) => {
        throw error
      });
  return assignedId
  }

  /* ---------------- Get by Id --------------- */
  getById(id: number): Object {
    let filteredData;
    fs.readFile(this.fileDir, "utf8", (error, content) => {
      if (error) {
        console.log("Object NOT retrieved!");
      } else {
        const jsonData = JSON.parse(content);
        filteredData = jsonData.filter((element) => element["id"] === id);
        console.log("Object successfully retrieved!");
      }
    });
    return filteredData;
  }

  /* ----------------- Get all ---------------- */
  getAll(): any {
    let allData;
    fs.readFile(this.fileDir, "utf8", (error, content) => {
      if (error) {
        console.log("Array NOT retrieved!");
      } else {
        allData = JSON.parse(content);
        console.log("Array successfully retrieved!");
        return allData;
      }
    });
  }

  /* -------------- Delete by ID -------------- */
  deleteById(id: number): void {
    let newData;
    fs.readFile(this.fileDir, "utf8", (error, content) => {
      if (error) {
        console.log("File NOT read!");
      } else {
        const jsonData = JSON.parse(content);
        newData = jsonData.filter((element) => element["id"] != id);
        fs.writeFile(this.fileDir, JSON.stringify(newData), (error) => {
          if (error) {
            console.log("File NOT overwritten with removals!");
          } else {
            console.log("File successfully overwritten with removals!");
          }
        });
      }
    });
  }

  /* --------------- Delete all --------------- */
  deleteAll(): void {
    fs.unlink(this.fileDir, (error) => {
      if (error) {
        console.log("File NOT deleted!");
      }
    });
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


productsDir.save(product1);
console.log(productsDir.getAll());
productsDir.save(product2);
console.log(productsDir.getAll());
productsDir.save(product3);
console.log(productsDir.getById(2));
console.log(productsDir.getAll());
console.log(productsDir.deleteById(3));
console.log(productsDir.getAll());
console.log(productsDir.deleteAll());
console.log(productsDir.getAll())