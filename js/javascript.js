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
const library = document.querySelector(".library");

// ========== object constructor ========== //

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.edit = false;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`
    }

    this.toggleReadStatus = function() {
        if (this.read === true) {
            this.read = false;
        } else if (this.read === false) {
            this.read = true;
        }
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

function clearForm() {
    const formTitle = document.querySelector("#formTitle");
    const formAuthor = document.querySelector("#formAuthor");
    const formPages = document.querySelector("#formPages");
    const formRead = document.querySelector("input[name='fRead']:checked");

    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";
    formRead.checked = false;
}

function submitBook () {
    const formTitle = document.querySelector("#formTitle");
    const formAuthor = document.querySelector("#formAuthor");
    const formPages = document.querySelector("#formPages");
    const formRead = document.querySelector("input[name='fRead']:checked");
    
    if (formTitle.value.length > 0 &&
        formAuthor.value.length > 0 &&
        Number.isInteger(Number(formPages.value)) &&
        Number(formPages.value) > 0 &&
        formRead !== null) {
        let formReadBool = null;
        if (formRead.value === "true") {
            formReadBool = true;
        } else if (formRead.value === "false") {
            formReadBool = false;
        }
        addBook(formTitle.value, formAuthor.value, Number(formPages.value), formReadBool);
        redrawScreen();
        clearForm();
        toggleForm();

    } else if (formTitle.value.length <= 0) {
        alert("Title must not be blank.");
    } else if (formAuthor.value.length <= 0) {
        alert("Author must not be blank.");
    } else if (!Number.isInteger(Number(formPages.value)) ||
                Number(formPages.value) <= 0) {
        alert("Pages must be a whole number.");
    } else if (formRead === null) {
        alert("Select whether you have already read the book or not.");
    }

}

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

function drawBook(book) {
    const bookID = book.id;
    const library = document.querySelector(".library");

    const cardOuter = document.createElement("div");
    cardOuter.classList.add("cardOuter");
    cardOuter.id = bookID;

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
    divActionChecked.id = "checked";
    divCardIcons.appendChild(divActionChecked);

    const paraRead = document.createElement("p");
    paraRead.id = "checked";
    paraRead.textContent = "Read";
    divActionChecked.appendChild(paraRead);

    const imgRead = document.createElement("img");
    imgRead.id = "checked";
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
    paraEdit.id = "edit";
    paraEdit.textContent = "Edit";
    divActionEdit.appendChild(paraEdit);

    const imgEdit = document.createElement("img");
    imgEdit.id = "edit";
    imgEdit.alt = "edit icon";
    imgEdit.src = "./img/edit.svg";
    divActionEdit.appendChild(imgEdit);

    const divActionDelete = document.createElement("div");
    divActionDelete.classList.add("cardAction", "delete");
    divCardIcons.appendChild(divActionDelete);

    const paraDelete = document.createElement("p");
    paraDelete.id = "delete";
    paraDelete.textContent = "Delete";
    divActionDelete.appendChild(paraDelete);

    const imgDelete = document.createElement("img");
    imgDelete.id = "delete";
    imgDelete.alt = "delete icon";
    imgDelete.src = "./img/delete.svg";
    divActionDelete.appendChild(imgDelete);

    library.appendChild(cardOuter);
}

function redrawBooks() {
    library.innerHTML = "";
    books.forEach(book => drawBook(book));
}

function redrawScreen() {
    redrawBooks();
    redrawStats();
}

function toggleRead(id) {
    const card = document.getElementById(id);
    const img = card.querySelector("img#checked");

    const index = books.findIndex(book => book.id === id);
    if (books[index].read === true) {
        img.src = "./img/unchecked.svg";
    } else if (books[index].read === false) {
        img.src = "./img/checked.svg";
    }
    books[index].toggleReadStatus();
    redrawStats();
}

function toggleEdit(id) {
    const index = books.findIndex(book => book.id === id);
    if (books[index].edit === false) {
        editOn(id);
    } else if (books[index].edit === true) {
        submitEdits(id);
    }
}

function editOn(id) {
    const index = books.findIndex(book => book.id === id);
    books[index].edit = true;

    const card = document.getElementById(id);
    const edit = card.querySelector(".edit");
    edit.style.borderBottom = "4px solid var(--l-acc)";

    const title = card.querySelector("#cardTitle");
    const author = card.querySelector("#cardAuthor");
    const pages = card.querySelector("#cardPages");

    title.disabled = false;
    author.disabled = false;
    pages.disabled = false;
}

function submitEdits(id) {
    const index = books.findIndex(book => book.id === id);
    const card = document.getElementById(id);
    const title = card.querySelector("#cardTitle");
    const author = card.querySelector("#cardAuthor");
    const pages = card.querySelector("#cardPages");

    if (title.value.length > 0 &&
        author.value.length > 0 &&
        Number.isInteger(Number(pages.value))) {
            books[index].title = title.value;
            books[index].author = author.value;
            books[index].pages = Number(pages.value);
            redrawStats();
            editOff(id);
    } else if (title.value.length <= 0) {
        alert("Title must not be blank.");
    } else if (author.value.length <= 0) {
        alert("Author must not be blank.");
    } else if (!Number.isInteger(Number(pages.value))) {
        alert("Pages must be a whole number.");
    } 
}

function editOff(id) {
    const index = books.findIndex(book => book.id === id);
    books[index].edit = false;

    const card = document.getElementById(id);
    const edit = card.querySelector(".edit");
    edit.style.removeProperty("border-bottom");

    const title = card.querySelector("#cardTitle");
    const author = card.querySelector("#cardAuthor");
    const pages = card.querySelector("#cardPages");

    title.disabled = true;
    author.disabled = true;
    pages.disabled = true;
}

function deleteBook(id) {
    const card = document.getElementById(id);
    card.remove();
    const index = books.findIndex(book => book.id === id);
    books.splice(index, 1);
    redrawStats();
}

// ========== event listeners ========== //

//click
container.addEventListener("click", (e) => {
    let target = e.target;
    let targetID = "";
    switch(target.id) {
        case "addBtn":
            toggleForm();
            break;
        case "submitBook":
            submitBook();
            break;
        case "checked":
            targetID = target.parentNode.parentNode.parentNode.parentNode.id;
            toggleRead(targetID);
            break;
        case "edit":
            targetID = target.parentNode.parentNode.parentNode.parentNode.id;
            toggleEdit(targetID);
            break;
        case "delete":
            targetID = target.parentNode.parentNode.parentNode.parentNode.id;
            deleteBook(targetID);
            break;
    }
});

// ========== functionality testing ========== //

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true, crypto.randomUUID());
books.push(theHobbit); //declare new book object, push it to arry

addBook("Shameless", "Bryan Tyler Cohen", 173, false, crypto.randomUUID());
    //add book straight into array as function

addBook("A Game of Thrones", "George R.R. Martin", 807, true, crypto.randomUUID());



redrawScreen();