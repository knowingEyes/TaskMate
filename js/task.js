import { createTaskTemplate } from "./helper.js";

const Tasks = [];
let taskIds = 0;
export function addTask(taskInput) {
    let TaskObj = { task: taskInput, completed: false, id: ++taskIds }
    Tasks.push(TaskObj);
    createTaskTemplate(TaskObj)
    console.log(Tasks)

}


