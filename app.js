/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Define UI variables first 
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const calender = document.querySelector('.datepicker')
const time = document.querySelector('.timepicker')
const modalprompt = document.querySelectorAll('.modal')  
// var instances = M.Modal.init(modalprompt)


//function to load all event listeners
loadEventListeners()

function loadEventListeners() {
//DOM load local storage event
  document.addEventListener('DOMContentLoaded', getTasks)

  //add task form event
  form.addEventListener('submit', addTask)
  //Remove task event
  taskList.addEventListener('click', removeTask)
  //clear all tasks
  clearBtn.addEventListener('click', clearTasks)
  //filter through the tasks event
  filter.addEventListener('keyup', filterTasks)

  // yes.addEventListener('click', removeTask)

  M.Datepicker.init(calender, {
    showClearBtn: true,
    clear: 'Remove' 
  })

  M.Timepicker.init(time, {
    showClearBtn: true,
    clear: 'Remove' 
  })

}

//Get Tasks from Local Storage function
function getTasks() {
  let tasks
  let dates
  let timedeadline
  //first want to check if there's any task in there
  if (localStorage.getItem('tasks') === null && 
  localStorage.getItem('dates') === null && 
  localStorage.getItem('timedeadline') === null) {
    tasks = []
    dates = []
    timedeadline = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    dates = JSON.parse(localStorage.getItem('dates'))
    timedeadline = JSON.parse(localStorage.getItem('timedeadline'))
  }
  tasks.forEach(function(task) {
    //copying dom elements from add task function and looping through each array in local storage
    const li = document.createElement('li')
    li.className = 'collection-item' 
    li.appendChild(document.createTextNode(task))
    const link = document.createElement('a')
    link.className = 'delete-item btn modal-trigger secondary-content'
    link.href = '#modal1'
    link.innerHTML = '<i class="fa fa-check-square-o"></i>'
    li.appendChild(link)
    taskList.appendChild(li)
  })
  dates.forEach(function(date) {
    console.log(date)
    const li = document.createElement('li')
    li.className = 'collection-item' 
    const footer = document.createElement('footer')
    footer.className = 'datepicking'
    footer.appendChild(document.createTextNode('Complete by: ' + date))
    footer.style.fontSize = 'small'
    li.appendChild(footer)
  })
  
  timedeadline.forEach(function(time) {
    console.log(time)
    const li = document.createElement('li')
    li.className = 'collection-item' 
    const footer = document.createElement('footer')
    footer.className = 'datepicking'
    footer.appendChild(document.createTextNode('Complete by: ' + time))
    footer.style.fontSize = 'small'
    li.appendChild(footer)
  })
}


//Add Task take an event parameter
function addTask(e) {
  if (taskInput.value === '') {
    // alert('Add a task first!')
    M.toast({ html: 'Add a task first!' })  
  } else {
  //create list of items from scratch- li element
    const li = document.createElement('li')
    //then add class 
    li.className = 'collection-item' 
    //create text node and append to li- create text node= we want to pass in whatever's been passed into the input
    li.appendChild(document.createTextNode(taskInput.value))

    //create new link element
    const link = document.createElement('a')
    // then add a class to that
    link.className = 'delete-item btn modal-trigger secondary-content'
    link.href = '#modal1'
    //add icon html
    link.innerHTML = '<i class="fa fa-check-square-o"></i>'
    //append the link to the li 
    li.appendChild(link)
    //now we want to append the li to the ul
    taskList.appendChild(li)

 
    //create a footer element
    const footer = document.createElement('footer')
    //add a classname
    footer.className = 'datepicking'
    footer.appendChild(document.createTextNode('Complete by: ' + calender.value + ' ' + time.value))
    footer.style.fontSize = 'small'
    li.appendChild(footer)
  
    //if dates and times aren't required, remove footer line from list
    calender.value === '' && time.value === '' ? li.removeChild(footer) : li.appendChild(footer)
    //if only date and time added and task field empty, dont add to list, and add prompt to add a task
    taskInput.value === '' ? taskList.removeChild(li) && M.toast({ html: 'Whoops, you forgot to add a task first!' }) : taskList.appendChild(li)
    //avoids adding empty tasks to list if date or time inputted
    calender.value === '' || time.value === '' ? taskList.removeChild(li) : taskList.appendChild(li)
  
    M.toast({ html: 'Task successfully added.' }) 

    //calling function to store in local storage 
    storeTaskInLocalStorage(taskInput.value, calender.value, time.value)


    //clear input once new task is added
    taskInput.value = ''
    calender.value = ''
    time.value = ''

    e.preventDefault()
  }
}

//local storage function

function storeTaskInLocalStorage(task, date, time) {
  let tasks
  let dates
  let timedeadline
  //first want to check if there's any task in there
  if (localStorage.getItem('tasks') === null && 
  localStorage.getItem('dates') === null && 
  localStorage.getItem('timedeadline') === null) {
    tasks = []
    dates = []
    timedeadline = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    dates = JSON.parse(localStorage.getItem('dates'))
    timedeadline = JSON.parse(localStorage.getItem('timedeadline'))
  }
  tasks.push(task)
  dates.push(date)
  timedeadline.push(time)

  localStorage.setItem('tasks', JSON.stringify(tasks))
  localStorage.setItem('dates', JSON.stringify(dates))
  localStorage.setItem('timedeadline', JSON.stringify(timedeadline))

}



//remove task
function removeTask(e) {
  // console.log('clicked yes!')
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove()
      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
//need to check if there's anything in local sotrage to delete first- === null. if it is, set it to an empty array
  let tasks
  let dates
  let timedeadline
  //first want to check if there's any task in there
  if (localStorage.getItem('tasks') === null && 
  localStorage.getItem('dates') === null && 
  localStorage.getItem('timedeadline') === null) {
    tasks = []
    dates = []
    timedeadline = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    dates = JSON.parse(localStorage.getItem('dates'))
    timedeadline = JSON.parse(localStorage.getItem('timedeadline'))
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) { //check to see if the text content of the task matches the current task in the iteration- if it does, i want to delete
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks)) //set local storage and rap in json.stringify
  //need to compled the dates and time once i can figure out how to render them on ui 
}

//remove all tasks
function clearTasks(e) {
  //two ways to remove all:
  // taskList.innerHTML = ''
  //second way is faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  localStorage.clear()
}

//filter tasks 
function filterTasks(e) {
  const text = e.target.value.toLowerCase()
  // console.log(text)
  //getting all the list items and we want to loop through those
  //queryselector all returns a node list
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) !== -1) {
      //we want that task to show
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
} 


//sort by date function
function sortDates(e) {
  const date = e.target.value
  console.log(date)
  //sort sates from picker
}
