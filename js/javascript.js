console.log("Hi, Mom!");

// ========== global variables ========== //

let books = [];
let formToggle = false;
let numBooks = 0;
let numRead = 0;
let numUnread = 0;
let numPagesRead = 0;
let numPagesUnread = 0;

const container = document.querySelector(".container");

// ========== object constructor ========== //

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`
    }
}

// ========== functions ========== //

function addBook(title, author, pages, read) {
    const add = new Book(title, author, pages, read);
    books.push(add);
}

function toggleForm() {
    const addBtn = document.querySelector(".addBtn");
    const addForm = document.querySelector(".addForm");

    if (formToggle === false) {
        addBtn.style.display = "none";
        addForm.style.display = "block";
        formToggle = true;
    } else if (formToggle === true) {
        addForm.style.display = "none";
        addBtn.style.display = "block";
        formToggle = false;
    }
}

//submit form, add book

function calcStats() {
    const booksRead = books.filter(book => book.read === true);
    const booksUnread = books.filter(book => book.read === false);
    const pagesRead = booksRead.reduce((sum, book) => sum += book.pages, 0);
    const pagesUnread = booksUnread.reduce((sum, book) => sum += book.pages, 0);

    numBooks = books.length;
    numRead = booksRead.length;
    numUnread = booksUnread.length;
    numPagesRead = pagesRead;
    numPagesUnread = pagesUnread;
}

function redrawStats() {
    const statsBooks = document.querySelector("span.numBooks");
    const statsRead = document.querySelector("span.numRead");
    const statsUnread = document.querySelector("span.numUnread");
    const statsPagesRead = document.querySelector("span.numPagesRead");
    const statsPagesUnread = document.querySelector("span.numPagesUnread");
    calcStats();
    statsBooks.textContent = numBooks;
    statsRead.textContent = numRead;
    statsUnread.textContent = numUnread;
    statsPagesRead.textContent = numPagesRead;
    statsPagesUnread.textContent = numPagesUnread;
}

//draw book
function drawBook(book) {
    const library = document.querySelector(".library");

    const cardOuter = document.createElement("div");
    cardOuter.classList.add("cardOuter");

    const cardInner = document.createElement("div");
    cardInner.classList.add("cardInner");
    cardOuter.appendChild(cardInner);

    const cardTitle = document.createElement("input");
    cardTitle.type = "text";
    cardTitle.id = "cardTitle";
    cardTitle.value = book.title;
    cardTitle.disabled = true;
    cardInner.appendChild(cardTitle);

    const cardAuthor = document.createElement("input");
    cardAuthor.type = "text";
    cardAuthor.id = "cardAuthor";
    cardAuthor.value = book.author;
    cardAuthor.disabled = true;
    cardInner.appendChild(cardAuthor);

    const divPages = document.createElement("div");
    divPages.classList.add("pages");
    cardInner.appendChild(divPages);

    const cardPages = document.createElement("input");
    cardPages.type = "text";
    cardPages.id = "cardPages";
    cardPages.value = book.pages;
    cardPages.disabled = true;
    divPages.appendChild(cardPages);

    const cardPagesLabel = document.createElement("label");
    cardPagesLabel.textContent = " pages";
    cardPagesLabel.setAttribute("for", "cardPages");
    divPages.appendChild(cardPagesLabel);

    const divCardIcons = document.createElement("div");
    divCardIcons.classList.add("cardIcons");
    cardInner.appendChild(divCardIcons);

    const divActionChecked = document.createElement("div");
    divActionChecked.classList.add("cardAction", "checked");
    divCardIcons.appendChild(divActionChecked);

    const paraRead = document.createElement("p");
    paraRead.textContent = "Read";
    divActionChecked.appendChild(paraRead);

    const imgRead = document.createElement("img");
    if (book.read === true) {
        imgRead.alt = "checked icon";
        imgRead.src = "./img/checked.svg";
    } else if (book.read === false) {
        imgRead.alt = "unchecked icon";
        imgRead.src = "./img/unchecked.svg";
    }
    divActionChecked.appendChild(imgRead);

    const divActionEdit = document.createElement("div");
    divActionEdit.classList.add("cardAction", "edit");
    divCardIcons.appendChild(divActionEdit);

    const paraEdit = document.createElement("p");
    paraEdit.textContent = "Edit";
    divActionEdit.appendChild(paraEdit);

    const imgEdit = document.createElement("img");
    imgEdit.alt = "edit icon";
    imgEdit.src = "./img/edit.svg";
    divActionEdit.appendChild(imgEdit);

    const divActionDelete = document.createElement("div");
    divActionDelete.classList.add("cardAction", "delete");
    divCardIcons.appendChild(divActionDelete);

    const paraDelete = document.createElement("p");
    paraDelete.textContent = "Delete";
    divActionDelete.appendChild(paraDelete);

    const imgDelete = document.createElement("img");
    imgDelete.alt = "delete icon";
    imgDelete.src = "./img/delete.svg";
    divActionDelete.appendChild(imgDelete);

    library.appendChild(cardOuter);
}

//redraw books

//redraw screen

//toggle read status

//toggle edit mode

//submit edits

//delete book

// ========== event listeners ========== //

//click
container.addEventListener("click", (e) => {
    let target = e.target;
    switch(target.id) {
        case "addBtn":
            toggleForm();
            break;
        case "submitBook":
            toggleForm(); //later, change this to submitForm and let that function toggle form
            break;
    }
});

//keyup (for data validation checking)




// ========== functionality testing ========== //

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
books.push(theHobbit); //declare new book object, push it to arry

addBook("Shameless", "Bryan Tyler Cohen", 173, false);
    //add book straight into array as function

addBook("A Game of Thrones", "George R.R. Martin", 807, true);

// toggleForm();
redrawStats();

drawBook(books[0]);

console.log(books);