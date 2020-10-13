/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Define UI variables first 
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const Calender = document.querySelector('.datepicker')
const modalprompt = document.querySelectorAll('.modal')  
var instances = M.Modal.init(modalprompt)

const yes = document.querySelector('.yes')

//function to load all event listeners
loadEventListeners()

function loadEventListeners() {
  //add task form event
  form.addEventListener('submit', addTask)
  //Remove task event
  taskList.addEventListener('click', removeTask)
  //clear all tasks
  clearBtn.addEventListener('click', clearTasks)
  //filter through the tasks event
  filter.addEventListener('keyup', filterTasks)

  yes.addEventListener('click', removeTask)

  M.Datepicker.init(Calender, {})

}

//Add Task take an event parameter
function addTask(e) {
  if (taskInput.value === '' && Calender.value === '') {
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
    footer.appendChild(document.createTextNode(Calender.value))
    footer.style.fontSize = 'small'
    li.appendChild(footer)
  


    //clear input
    taskInput.value = ''
    Calender.value = ''

    e.preventDefault()
  }
}


//remove task
function removeTask(e) {
  // console.log('clicked yes!')

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (yes.value === true) {
      e.target.parentElement.parentElement.remove()
    }
  }
}

//remove all tasks
function clearTasks(e) {
  //two ways to remove all:
  // taskList.innerHTML = ''
  //second way is faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
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
