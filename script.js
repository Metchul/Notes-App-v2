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
    
    completedDate = "";

    //method for testing
    logInfo() {
        console.log(
            "New Task Info:\n" +
            "Text: " + this.taskName + "\n" +
            "Id: " + this.todoId + "\n" +
            "Created Date: " + this.createdDate + "\n"
        );
    }

    //render what the new listitems will look like
    render() {
        const listItem = document.createElement("li");
        listItem.setAttribute("id", this.todoId);
        listItem.innerHTML = 
        `<lable>` +
            `<input type = "checkbox" class="rounded-checkbox" id="${this.todoId}">` +
            `<span class="item-title">${this.taskName}</span>` +
        `</label>` +
        `<span class = "li-subtitle">Created: ${this.createdDate}</span>` +
        '<span class = "li-subtitle">Completed:</span>' +
        `<span class = "li-subtitle">Id: ${this.todoId}</span>`;
        todoListList.appendChild(listItem);


        const todoItemObject = this;
        const checkBoxObject = document.getElementById(this.todoId);
        checkBoxObject.addEventListener("change", function(event) {
            const targetCheckbox = event.target;
            if (targetCheckbox.checked) {
                todoItemObject.completedDate = new Date().toLocaleString();
                console.log("Check box " + todoItemObject.todoId + " is checked.\nNew Completed Date: " + todoItemObject.completedDate);
        
                //update todoListExport array with the new compledDate
                for (let i = 0; i < todoListExport.length; i++) {
                    if (todoListExport[i].todoId === todoItemObject.todoId) {
                        todoListExport[i].completedDate = todoItemObject.completedDate;
                        break;
                    }
                }
            } else {
                todoItemObject.completedDate = "";
                console.log("Check box " + todoItemObject.todoId + " is unchecked.\nNew Completed Date: " + todoItemObject.completedDate);
        
                //update todoListExport array with blank completedDate
                for (let i = 0; i < todoListExport.length; i++) {
                    if (todoListExport[i].todoId === todoItemObject.todoId) {
                        todoListExport[i].completedDate = todoItemObject.completedDate;
                        break;
                    }
                }
            }
        });
        
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
        console.log(
            "TASK: " + 
            todoListExport[i].taskName + 
            "\nCREATED DATE: " + todoListExport[i].createdDate + 
            "\nID:" + todoListExport[i].todoId + 
            "\nCompleted:" + todoListExport[i].completedDate
        ); 
    }
});


})