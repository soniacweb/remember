/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Define UI variables first 
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')


//function to load all event listeners
loadEventListeners()
 
function loadEventListeners() {
  //add task form event
  form.addEventListener('submit', addTask)

}

//Add Task 
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task!')
    console.log(taskInput.value)
  }
  //create list of items from scratch- li element
  const li = document.createElement('li')
  //then add class 
  li.className = 'collection-item' 
  //create text node and append to li- create text node= we want to pass in whatever's been passed into the input
  li.appendChild(document.createTextNode(taskInput.value))

  e.preventDefault()

}