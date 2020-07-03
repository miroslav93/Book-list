// Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI(){

}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>
    `;

    list.appendChild(row);

}

// Show alert
UI.prototype.showAlert = function(message, className){
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Error timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();

    }, 3000)
}

// Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event listener for book addition
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

        console.log(title, author, isbn);
    
    // Instantiating a book
    const book = new Book(title, author, isbn);

    // Instantiating UI
    const ui = new UI();

    // Validation
    if(title === '' || author === '' || isbn === ''){
        // Error - alert
        ui.showAlert('Please fill in all the fields', 'error');
    } else {
    // Add book to list
    ui.addBookToList(book);

    // UI - show alert
    ui.showAlert('Book added!', 'success');
    
    // Clear fields
    ui.clearFields();
    }

    e.preventDefault();
});

// Event listener for book deletion
document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiating UI
    const ui = new UI();

    ui.deleteBook(e.target);

    // Show alert
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault;
})
