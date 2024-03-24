/*Implement basic functionality using JavaScript. On index.js first get references to UI
elements list and input since you need to be able to add new rows to the list and read
input from the input field. QuerySelector is used to get elements and store references
into variables, which then can be used to manipulate HTML elements on the document.

EventListener for input is also added. Whenever used presses Enter key on the input
field, a new row with input text is added to the todo list. In case there is no text, nothing
is added. New line to list is added by creating new li element inside list (which is ul).
List-group-item class is used (this is Bootstrap class and provides nice appearance to
the list item).
 Text from input is displayed on the row. After adding new row input is
set to empty string, so it is convenient for user to add another text (without need to
erase previous text). 
*/

const { json } = require("express");

const BACKEND_ROOT_URL = 'http://127.0.0.1:3001/'
import { Todos } from './class/Todos.js'

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul');
const input = document.querySelector('input');


input.disabled = true

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class','list-group-item')
    li.innerHTML = task.getText()
    list.append(li)
}

const getTask = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })

        input.disabled = false
    }) .catch((error) => {
        alert(error)
    })
}

//previous alert("Error getting tasks" + error.message)
const saveTask = async (task) => {
  try {
    const json = JSON.stringify({description: task})
    const response = await fetch(BACKEND_ROOT_URL + '/new',{
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: json
    })
    return response.json()
  } catch (error) {
    alert("Error saving task" + error.message)
  }
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = input.value.trim()
        if (task !== '') {
            const li = document.createElement('li')
            li.setAttribute('class', 'list-goup-item')
            li.innerHTML = task
            list.append(li)
            input.value = ''
        }
    }

});

getTask()