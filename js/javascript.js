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

//calc stats

//redraw stats
function redrawStats() {
    const statsBooks = document.querySelector("span.numBooks");
    const statsRead = document.querySelector("span.numRead");
    const statsUnread = document.querySelector("span.numUnread");
    const statsPagesRead = document.querySelector("span.numPagesRead");
    const statsPagesUnread = document.querySelector("span.numPagesUnread");

    statsBooks.textContent = numBooks;
    statsRead.textContent = numRead;
    statsUnread.textContent = numUnread;
    statsPagesRead.textContent = numPagesRead;
    statsPagesUnread.textContent = numPagesUnread;
}

//redraw books

//redraw screen

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

// toggleForm();
redrawStats();

console.log(books);