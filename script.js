document.addEventListener("DOMContentLoaded", function(){

const todoInput = document.getElementById("todo-item-input");
const addTodoButton = document.getElementById("add-todo-item-button");
const todoListList = document.getElementById("todoList-list");
const exportTodoListButton = document.getElementById("save-list-button");
const loadTodoListButton = document.getElementById("load-list-button");

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
    constructor(taskName,completedState) {
        this.taskName = taskName;
        this.todoId = "cb-" + generateRandomLetter() + generateRandomLetter() + Date.now();
        this.createdDate = new Date().toLocaleString();
        this.completedState = Boolean(completedState);
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
            `<label>` +
            `<input type="checkbox" class="rounded-checkbox" id="${this.todoId}"${this.completedState ? " checked" : ""}>` +
            `<span class="item-title">${this.taskName}</span>` +
            `</label>` +
            `<span class="li-subtitle">Created: ${this.createdDate}</span>` +
            `<span class="li-subtitle" id="${this.todoId}-completed-date">${this.completedDate ? "Completed: " + this.completedDate : ""}</span>` +
            `<span class="li-subtitle">Id: ${this.todoId}</span>`;
        todoListList.appendChild(listItem);
    

        const todoItemObject = this;
        const checkBoxObject = document.getElementById(this.todoId);
        const completedDateElement = document.getElementById(`${this.todoId}-completed-date`);
        
        if (this.completedState) {
            completedDateElement.textContent = "Completed: " + this.completedDate;
        }

        checkBoxObject.addEventListener("change", function(event) {
            const targetCheckbox = event.target;
            if (targetCheckbox.checked) {
                todoItemObject.completedDate = new Date().toLocaleString();
                completedDateElement.textContent = "Completed: " + todoItemObject.completedDate;
                todoItemObject.completedState = true
                console.log("Check box " + todoItemObject.todoId + " is checked.\nNew Completed Date: " + todoItemObject.completedDate + "\nDone State: " + todoItemObject.completedState);
        
                //update todoListExport array with the new compledDate
                for (let i = 0; i < todoListExport.length; i++) {
                    if (todoListExport[i].todoId === todoItemObject.todoId) {
                        todoListExport[i].completedDate = todoItemObject.completedDate;
                        break;
                    }
                }
            } else {
                todoItemObject.completedDate = "";
                todoItemObject.completedState = false
                completedDateElement.textContent = todoItemObject.completedDate;
                console.log("Check box " + todoItemObject.todoId + " is unchecked.\nNew Completed Date: " + todoItemObject.completedDate + "\nDone State: " + todoItemObject.completedState);
        
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
    const newItem = new todoItem(todoInput.value, false);
    newItem.logInfo();
    newItem.render();
    todoListExport.push(newItem);
});

//will be used to export list
exportTodoListButton.addEventListener("click", function() {
    const jsonString = JSON.stringify(todoListExport);
    const blob = new Blob([jsonString], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "todoList.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});


loadTodoListButton.addEventListener("click", function() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.addEventListener("change", function() {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        const todoList = JSON.parse(reader.result);
        for (const todo of todoList) {
          const newItem = new todoItem(todo.taskName, todo.completedState);
          newItem.todoId = todo.todoId;
          newItem.createdDate = todo.createdDate;
          newItem.completedDate = todo.completedDate;
          newItem.render();
          todoListExport.push(newItem);
        }
      });
      reader.readAsText(file);
    });
    fileInput.click();
  });


})