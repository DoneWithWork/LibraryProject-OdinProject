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
  // do stuff here
  tableBody.childNodes.forEach((child) => {
    tableBody.removeChild(child);
  });
  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    //remove btn
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("data-index", index);
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", (e) => {
      DeleteBook(e.target.getAttribute("data-index"));
    });

    //read btn
    const readBtn = document.createElement("button");
    readBtn.setAttribute("data-index", index);
    readBtn.textContent = book.read ? "Read" : "Not Read";
    readBtn.addEventListener("click", (e) => {
      ToggleBookReadStatus(e.target.getAttribute("data-index"));
    });
    Object.values(book).forEach((value) => {
      if (typeof value !== "function") {
        // Ignore the 'info' function
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      }
    });
    row.appendChild(removeBtn);
    row.appendChild(readBtn);
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
