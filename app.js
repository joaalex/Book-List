// function Book(title, author, isbn){
//   this.title = title;
//   this.author - author;
//   this.isbn = isbn;
// };

// function UI(){
//   UI.prototype.addBook = function(book){
//     const list = document.querySelector('#book-list');

//     const row = document.createElement('tr');
//     row.innerHTML = `
//     <td> ${book.title}</td>
//     <td> ${book.author}</td>
//     <td> ${book.isbn}</td>
//     <td> <a href="#" class="delete"> x</a> </td>
//     `;
//     list.appendChild(row);

//   };

//   UI.prototype.clearUi = function(){
//     document.querySelector('#title').value = '',
//     document.querySelector('#author').value = '',
//     document.querySelector('#isbn').value = '';
//   };
  
//   UI.prototype.showAlert = function(message, className){
//     const form = document.querySelector('form');
//     const container = document.querySelector('.container');
//     const div = document.createElement('div');
//     div.className = `alert ${className}`;
//     div.appendChild(document.createTextNode(message))
//     container.insertBefore(div, form);

//     setTimeout(function(){
//       document.querySelector('.alert').remove();
//     }, 3000);
//   };

//   UI.prototype.deleteList = function (target){
//    if(target.className === 'delete'){
//     target.parentElement.parentElement.remove();
//    }else{

//    };
//   };

// };



// document.querySelector('form').addEventListener('submit', function(e){
//   const title = document.querySelector('#title').value,
//         author = document.querySelector('#author').value,
//         isbn = document.querySelector('#isbn').value;
  
//   const book = new Book(title, author, isbn);

//   const ui = new UI()

//   if(title === '' || author === '' || isbn === '') {
//     ui.showAlert('Please fill the field', 'error');

//   }else{
//     ui.addBook(book);
//     ui.showAlert('Book Added Successfully', 'success');
    
//     ui.clearUi();

//   };

//   e.preventDefault();
// });


// document.querySelector('#book-list').addEventListener('click', function(e){

//   const ui = new UI();

//   ui.deleteList(e.target)
//   ui.showAlert('Book Removed', 'success');

//   e.preventDefault();
// });


// Es6 

class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  };
};

class UI{
  addBook(book){
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> ${book.isbn}</td>
    <td> <a href="#" class="delete"> x</a> </td>
    `;
    list.appendChild(row);
  };

  clearUi(){
    document.querySelector('#title').value = '',
    document.querySelector('#author').value = '',
    document.querySelector('#isbn').value = '';
  };

  showAlert(message, className){
    const form = document.querySelector('form');
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message))
    container.insertBefore(div, form);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  };

  deleteList(target){
    if(target.className === 'delete'){
          target.parentElement.parentElement.remove();
         };
  };

};

class StoretoLS{

  static displayBooks(){
    const books = StoretoLS.getBooksFromLS();

    books.forEach(function(book){
      const ui = new UI();
      ui.addBook(book);
    });
  };

  static addBookToLS(book){
    const books = StoretoLS.getBooksFromLS();

    books.push(book);
    
    localStorage.setItem('books', JSON.stringify(books));
  };

  static getBooksFromLS(){

    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    };
    return books;
  };

  static removeBookFromLS(isbnNo){
 
   const books = StoretoLS.getBooksFromLS();

   books.forEach(function (book, index){
    if(book.isbn === isbnNo){
    books.splice(index, 1);
    }
   });
   localStorage.setItem('books', JSON.stringify(books));
  };
};

document.addEventListener('DOMContentLoaded', StoretoLS.displayBooks);

document.querySelector('form').addEventListener('submit', function(e){
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
  
  const book = new Book(title, author, isbn);

  const ui = new UI()

  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill the field', 'error');
  } else {
    ui.addBook(book);
    StoretoLS.addBookToLS(book)
    ui.showAlert('Book Added Successfully', 'success');
    
    ui.clearUi();
  };

  e.preventDefault();
});


document.querySelector('#book-list').addEventListener('click', function(e){

  const ui = new UI();

  ui.deleteList(e.target)
  StoretoLS.removeBookFromLS(e.target.parentElement.previousElementSibling.textContent)
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});




