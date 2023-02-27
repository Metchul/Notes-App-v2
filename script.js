document.addEventListener("DOMContentLoaded", function(){

const todoInput = document.getElementById("todo-item-input");
const addTodoButton = document.getElementById("add-todo-item-button");
const todoListList = document.getElementById("todoList-list");
const exportTodoListButton = document.getElementById("save-list-button");

//list used to export todolist items
const todoListExport = []

//function used for generate ids. I'm using Date.now() and so if by some change items are created 
//at the exact millisecond they will have the same id. So I'm appending two random letters
//to the start of each id
function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * 26); 
    const randomLetter = alphabet.charAt(randomIndex);
    return randomLetter;
}


//todo item class
class todoItem {
    constructor(taskName) {
        this.taskName = taskName;
        this.todoId = "cb-" + generateRandomLetter() + generateRandomLetter() + Date.now();
        this.createdDate = new Date().toLocaleString();
    }
    
    

    //method for testing
    logInfo() {
        console.log(this.taskName + " " + this.createdDate);
    }

    //render what the new listitems will look like
    render() {
        const listItem = document.createElement("li");
        listItem.setAttribute("id", this.todoId);
        listItem.innerHTML = 
        `<lable>` +
            `<input type = "checkbox" class="rounded-checkbox">` +
            `<span class="item-title">${this.taskName}</span>` +
        `</label>` +
        `<span class = "li-subtitle">Created: ${this.createdDate}</span>` +
        '<span class = "li-subtitle">Completed:</span>';
        todoListList.appendChild(listItem);
    }

}


addTodoButton.addEventListener("click", function() {
    console.log("LOG: Add to List buton clicked");
    const newItem = new todoItem(todoInput.value);
    newItem.logInfo();
    newItem.render();
    todoListExport.push(newItem);
});

//will be used to export list but right now it's just for testing
exportTodoListButton.addEventListener("click", function() {
    for (let i = 0; i < todoListExport.length; i++) {
        testString = "TASK: " + todoListExport[i].taskName + "  CREATED DATE: " + todoListExport[i].createdDate + " ID:" + todoListExport[i].todoId;
        console.log(testString); 
    }
});


})