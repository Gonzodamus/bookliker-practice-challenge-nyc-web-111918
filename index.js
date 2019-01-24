document.addEventListener("DOMContentLoaded", () =>{
    const list = document.getElementById('list')
    const showPanel = document.getElementById('show-panel')
    let selectedBook = {id: ""}
    const bookStore = []

    const renderBooks = (books) =>{
            books.forEach(book =>{
                list.innerHTML += `<li class="book-title" data-id=${book.id}>${book.title}</li>`
            })
        }

    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(bookList => bookList.forEach(book =>{
        bookStore.push(book)
    }))
    .then(() => renderBooks(bookStore))


    list.addEventListener('click', (e) =>{
        if (e.target.className === "book-title"){
            if(selectedBook.id === parseInt(e.target.dataset.id)){
                selectedBook = {id: ""}
                showPanel.innerHTML = ""
            }  else {  
                selectedBook = bookStore.find(book => {
                    return book.id === parseInt(e.target.dataset.id)
                })
                showPanel.innerHTML = `
                <img class="book-image" src=${selectedBook.img_url} />
                <h1>${selectedBook.title}</h1>
                <p>${selectedBook.description}</p>
                `
            }
        }
    })






});
