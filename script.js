document.addEventListener("DOMContentLoaded", function(){

const todoInput = document.getElementById("todo-item-input");
const addTodoButton = document.getElementById("add-todo-item-button");
const todoListList = document.getElementById("todoList-list");


//todo item class
class todoItem {
    constructor(taskName) {
        this.taskName = taskName;
    }
    
    createdDate = new Date().toLocaleString();

    //method for testing
    logInfo() {
        console.log(this.taskName + " " + this.createdDate);
    }

    render() {
        const listItem = document.createElement("li");
        listItem.innerHTML = 
        `<lable>` +
            `<input type = "checkbox" class="rounded-checkbox">` +
            `<span>Test Item</span>` +
        `</label>` +
        `<span class = "li-subtitle">Created: ${this.createdDate}</span>` +
        '<span class = "li-subtitle">Completed:</span>';
        todoListList.appendChild(listItem);
    }

}


addTodoButton.addEventListener("click", function() {
    console.log("Add to List buton clicked");
    const newItem = new todoItem("test task");
    newItem.logInfo();

    newItem.render();
});





})