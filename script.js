const myLibrary = [new Book("Harry Potter", "JK Rowling", "505", false)];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}
const newBookBtn = document.getElementById("new-book");
const form = document.getElementById("form");

newBookBtn.addEventListener("click", () => {
  console.log("clicked");
  form.classList.toggle("visible");
});
const tableBody = document.getElementById("table-body");
function addBookToLibrary(myLibrary) {
  // Clear the table body before adding new rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Add each book as a row in the table
  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    // Create and append cells for each book property
    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);

    const readCell = document.createElement("td");
    readCell.textContent = book.read ? "Read" : "Not Read";
    row.appendChild(readCell);

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      DeleteBook(index);
    });
    const removeCell = document.createElement("td");
    removeCell.appendChild(removeBtn);
    row.appendChild(removeCell);

    // Toggle read status button
    const readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    readBtn.addEventListener("click", () => {
      ToggleBookReadStatus(index);
    });
    const readBtnCell = document.createElement("td");
    readBtnCell.appendChild(readBtn);
    row.appendChild(readBtnCell);

    tableBody.appendChild(row);
  });
}
addBookToLibrary(myLibrary);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);

  let title = formData.get("title");
  let author = formData.get("author");
  let pages = formData.get("pages");
  let read = formData.get("read") == "on" ? true : false;

  // Create a new Book instance
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  addBookToLibrary(myLibrary);
});

function DeleteBook(index) {
  myLibrary.splice(index, 1);
  addBookToLibrary(myLibrary);
}

function ToggleBookReadStatus(index) {
  const book = myLibrary[index];
  book.read = !book.read;
  addBookToLibrary(myLibrary);
}
