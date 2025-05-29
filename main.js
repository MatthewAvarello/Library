let MyLibrary = [];
let Container = document.querySelector("#BookContainer")
let NewBookButton = document.querySelector("#NewBook")
const NewBookForm = document.querySelector("#NewBookForm")
let nameinput = document.querySelector("#name")
let authorinput = document.querySelector("#author")
let pagesinput = document.querySelector("#pages")
NewBookButton.addEventListener("click", revealgui)
NewBookForm.addEventListener("submit",NewBookFormSubmission)
//Variables and event listeners
//Creates A Book object with relevant data
function Book(Name, Author, Pages, Read){
    this.Name = Name
    this.Author = Author
    this.Pages = Pages
    this.Read = Read
    this.id = crypto.randomUUID()
}
//Change read status of book object
Book.prototype.ChangeTheReadStatus = function ChangeTheReadStatus(){
    if (this.Read == true){
        this.Read = false
    } else{
        this.Read = true
    }
    DisplayBooks()
}
//Adds book to array
function AddBookToLibrary(name, author, pages, read){
    let booktoadd = new Book(name, author, pages, read)
    MyLibrary.push(booktoadd)
}
//display all books properties and their values for array
function DisplayBooks(){
    Container.innerHTML = "";
    for(let book in MyLibrary){//Every boom in array
        console.log(MyLibrary[book].id)
        let div = document.createElement("div");
        let trashcan = document.createElement("img");
        let changereadstatus = document.createElement("button");//initaliaze dom elements
        trashcan.setAttribute('class', 'trash-can')
        trashcan.setAttribute('src', 'icons/trash-can.svg')
        trashcan.setAttribute('onclick', "Delete(event)")
        changereadstatus.setAttribute('class','changereadstatus')
        changereadstatus.textContent = "Change Read Status"
        changereadstatus.addEventListener('click',function(){
            let id = div.getAttribute('data-id')//As the event listener is configured in scope it remembers div
            let item = MyLibrary.find(item => item.id === id)
            item.ChangeTheReadStatus()
        });
        div.appendChild(trashcan)
        div.appendChild(changereadstatus)
        for(let properties in MyLibrary[book]){
            if(properties == "id"){
                continue
            }
            if (properties === "ChangeTheReadStatus"){
                continue
            }
            console.log(properties)
            let p = document.createElement("p");
            p.textContent = properties + ": " + MyLibrary[book][properties]
            div.appendChild(p)
        }
        div.setAttribute('data-id', MyLibrary[book]["id"])
        div.setAttribute('class','book')
        Container.appendChild(div)
    }
}
function revealgui(){
    NewBookForm.style.display = "flex";
    NewBookForm.style.backgroundColor = "rgba(128, 128, 128, 0.9)";
}
function NewBookFormSubmission(event){
    event.preventDefault();
    let readstatusinput = document.querySelector("input[name=read_status]:checked")
    let namevalue = nameinput.value
    let authorvalue = authorinput.value
    let pagevalue = pagesinput.value
    let readvalue = readstatusinput.value
    AddBookToLibrary(namevalue,authorvalue,pagevalue,readvalue)
    DisplayBooks()
    NewBookForm.style.display = "none";
    NewBookForm.style.backgroundColor = "white";
}
function Delete(event){
    console.log(event)
    let parent = event.target.parentElement
    let id = parent.getAttribute("data-id")
    console.log(id)
    parent.remove()
    let item = MyLibrary.find(item => item.id === id)
    let index = MyLibrary.indexOf(item)
    console.log(index)
    console.log(item);
    MyLibrary.splice(index,1)
}
AddBookToLibrary("Harry Potter","JK ROWLING", 455, false)
AddBookToLibrary("Hunger Games","Susanne Collins", 234,true)
AddBookToLibrary("Harry Potter","JK ROWLING", 455, false)
DisplayBooks()
