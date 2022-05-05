var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");




var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings

    if (!taskNameInput || !taskTypeInput) {

        alert("You need to fill out the task form!")

        return false;

    }
    
        formEl.reset();

        // reset form fields for next task to be entered
        document.querySelector("input[name='task-name']").value = "";
        document.querySelector("select[name='task-type']").selectedIndex = 0;
    
    var isEdit = formEl.hasAttribute("data-task-id");

        console.log(isEdit);

    // has data attribute, so get task id and call function to save edit

    if (isEdit) {

        var taskId = formEl.getAttribute("date-task-id")

        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    // no data attribute, so create package date as normal and send to create task function
 
    else {

    var taskDataObj = {

        name: taskNameInput,
        type: taskTypeInput
    };

    // send as an argument to createTaskEl

    createTaskEl(taskDataObj);

    }
}

var completeEditTask = function(taskName, taskType, taskId) {

    // find matching task item

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values

    taskSelected.querySelector("h3.task-name").textContent = taskName;

    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");

    document.querySelector("#save-task").textContent = "Add Task";
}


var createTaskEl = function (taskDataObj) {

    // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as custom element

listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);

listItemEl.appendChild(taskActionsEl);

// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

taskIdCounter++;

}

// create tasks actions for edit and delete 

var createTaskActions = function(taskId) {

    actionContainerEl = document.createElement("div");

    actionContainerEl.className = "class-actions";

    // create edit button 

    var editButtonEl = document.createElement("button");

    editButtonEl.textContent = "Edit";

    editButtonEl.className = "btn edit-btn";

    editButtonEl.setAttribute("data-task-id", taskId);


    actionContainerEl.appendChild(editButtonEl);

    // create delete button

    var deleteButtonEl = document.createElement("button");

    deleteButtonEl.textContent = "Delete";

    deleteButtonEl.className= "btn delete-btn";

    deleteButtonEl.setAttribute("data-task-id", taskId);


    actionContainerEl.appendChild(deleteButtonEl);

    // create status box

    var statusSelectEl = document.createElement("select");

    statusSelectEl.className = "select-status";

    statusSelectEl.setAttribute("name" , "status-change");

    statusSelectEl.setAttribute("data-task-id" , taskId);


    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {

        // create option element

        var statusOptionEl = document.createElement("option");

        statusOptionEl.textContent = statusChoices[i];

        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select

        statusSelectEl.appendChild(statusOptionEl);
      }





    return actionContainerEl;
}

// increase task counter for next unique id



formEl.addEventListener("submit", taskFormHandler);
var taskButtonHandler = function(event) {

    console.log(event.target);

    // edit button was clicked

    if (event.target.matches(".edit-btn")) {

        var taskId= event.target.getAttribute("data-task-id");

        editTask(taskId);
    }


    // delete button was clicked

    if (event.target.matches(".delete-btn")) {

        // get the element id

        var taskId = event.target.getAttribute("data-task-id");

        deleteTask(taskId);
    }
};

var editTask = function(taskId) {

    console.log("editing task #" + taskId);

    // get task list item element

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get task list name and type

    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;

    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("date-task-id", taskId);

   
};

var deleteTask = function(taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.remove();
};

var taskStatusChangeHandler = function(event){

    // get the task item's id

    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase

    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {

        tasksToDoEl.appendChild(taskSelected);

      } 

      else if (statusValue === "in progress") {

        tasksInProgressEl.appendChild(taskSelected);

      } 

      else if (statusValue === "completed") {

        tasksCompletedEl.appendChild(taskSelected);
        
      }

};

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);