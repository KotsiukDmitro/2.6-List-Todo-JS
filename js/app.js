document.addEventListener('DOMContentLoaded', function () {
    todosLoad()
    document.querySelector('#input').addEventListener('keyup', function (e) {
        if (e.code === 'Enter' || e.code === 'NumpadEnter')
            saveTodo()
    })

    document.querySelector('.btn').addEventListener('click', function (event) {
        event.preventDefault()
        saveTodo()
    })
    document.querySelector('.clear').addEventListener('click', function (event) {
        event.preventDefault()
        deleteAll()

    })
})
function todosLoad() {
    document.querySelector('#item').innerHTML = getTodoFromStorage().reduce((prevTodo, currentTodo) => {
        if (currentTodo.deleteAt) {
            return prevTodo
        } else {
            return prevTodo + htmlTodo(currentTodo)
        }
    }, '')
    document.querySelector('.element-input')?.addEventListener('keyup', function (e) {

        if (e.code === 'Enter' || e.code === 'NumpadEnter')
            updateTodo(e.target.getAttribute('data-id'))
    })
}

function htmlTodo(todo) {
    return '<li class="element-item" id="element-' + todo.id + '">' +
        '<div class="element element-view">' +
        todo.name + '<div class="icons"><button onclick="editTodo(' + todo.id + ')" class="icons-btn"><i class="fa fa-pen-to-square fa-icon"></i></button><button onclick="deleteTodo(' + todo.id + ')" class="icons-btn"><i class="fa fa-trash"></i></button></div>' +
        '</div>' +
        '<div class="element element-edit"> <input class="element-input" type="text" value="' + todo.name + '" data-id="' + todo.id + '">' +

        '<button class="btn" onclick="updateTodo(' + todo.id + ')">Edit</button></div>' +
        '</li>'
}
function updateTodo(id) {
    const item = document.querySelector(`#element-${id} .element-input`).value
    const todos = getTodoFromStorage().map((elem) => {

        if (elem.id == id) {
            if (item === '') {
                elem.deleteAt = Date.now().toString()
            }
            else {
                elem.name = item
            }
        }
        return elem
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    todosLoad(todos)
}
function saveTodo() {
    const arr = getTodoFromStorage()
    const item = document.querySelector('#input')?.value
    const inputEdit = document.querySelector('#input-edit')?.value

    if (item === '') {
        return false
    }
    const obj = {
        name: item,
        id: arr.length + 1,
        deleteAt: null
    }

    arr.push(obj)
    localStorage.setItem('todos', JSON.stringify(arr))

    todosLoad(arr)
    document.querySelector('#input').value = ''
    document.querySelector('#input-edit').value = ''
}

function deleteTodo(id) {
    const todos = getTodoFromStorage().map((elem) => {
        if (id === elem.id)
            elem.deleteAt = Date.now().toString()
        return elem
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    todosLoad()
}

function deleteAll() {
    const todos = getTodoFromStorage().map((elem) => {
        elem.deleteAt = Date.now().toString()
        return elem
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    todosLoad()
}

function editTodo(id) {
    // const todo = getTodoFromStorage().find(elem => id === elem.id)
    // document.querySelector('#input').value = todo.name
    // document.querySelector('#input-edit').value = todo.id
    document.getElementById(`element-${id}`).classList.add('edit')
}

function getTodoFromStorage() {
    return JSON.parse(localStorage.getItem('todos')) || []
}
