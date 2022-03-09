/* -------------------------------------------- */
/*                     Misc                     */
/* -------------------------------------------- */

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const log = console.log
import clc from 'cli-color'
import emoji from 'node-emoji'

/* -------------------------------------------- */
/*                  User Class                  */
/* -------------------------------------------- */

class User {
  fName: string;
  lName: string;
  books: Array<Object>;
  pets: Array<string>;

  constructor (
    fName: string,
    lName: string,
    books: Array<Object>,
    pets: Array<string>
  ) {
    this.fName = fName;
    this.lName = lName;
    this.books = books;
    this.pets = pets;
  }

  getFullName(): string {
    return `${toTitleCase(this.fName)} ${toTitleCase(this.lName)}`
  }

  addPet(newPet: string): void {
    this.pets.push(toTitleCase(newPet))
  }

  countPets(): Number {
    return this.pets.length
  }

  addBook (title: string, author: string ): void {
    let newBook = {
      title: toTitleCase(title),
      author: toTitleCase(author)
    }
    this.books.push(newBook)
  }

  getBookNames(): Array<string> {
    let bookNames = []
    if (this.books.length > 0){
      for (let i=0; i<this.books.length; i++) {
        bookNames.push((<any>this).books[i].title)
      }
    }
    return bookNames
  }
}

/* -------------------------------------------- */
/*                     Tests                    */
/* -------------------------------------------- */

// User1
const ambar = new User("Ambar","canonicco",[{title: "Murder on the Orient Express", author:"Agatha Christie"}],[])

log(emoji.get('bust_in_silhouette'),ambar)

ambar.addPet('Karo');
ambar.addPet('blondy')

log(emoji.get('bust_in_silhouette'),ambar)

const blue = clc.cyanBright;

log(blue(`${ambar.getFullName()} tiene ${ambar.countPets()} mascota(s)${emoji.get('dog')}`))

// User2
const sergio = new User("sergio","barrantes",[],[])

sergio.addBook("El corazón delator","edgar allan poe")
sergio.addBook("Harry Potter y el prisionero de azkaban","j.k. rowling")

const pink = clc.magentaBright

log(pink(`Si ${toTitleCase(sergio.fName)} ha leído libros, fueron los siguientes: ${emoji.get('books')} ${sergio.getBookNames()}.`))