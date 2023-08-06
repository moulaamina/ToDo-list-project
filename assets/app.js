let todoList = [];

function updateTodo(todo) {
  localStorage.setItem('todoItemsRef', JSON.stringify(todoList));

  const list = document.querySelector('.list');

  const item = document.querySelector(`[data-key='${todo.id}']`);
  if (todo.deleted) {
    item.remove();
    return;
  }

  const isCompleted = todo.completed ? 'done' : '';
  const li = document.createElement('li');
  li.setAttribute('class', `list-item ${isCompleted}`);
  li.setAttribute('data-key', `${todo.id}`);

  li.innerHTML = `
  <input id="${todo.id}" type="checkbox" class="checkbox" />
  <label for="${todo.id}" class="tick"></label>
  <span>${todo.value}</span>
  <button class="delete-todo">X</button>
  `;

  if (item) {
    list.replaceChild(li, item);
  } else {
    list.append(li);
  }
}

function addTodo(value) {
  todo = {
    value,
    completed: false,
    id: Date.now(),
  };
  todoList.push(todo);
  updateTodo(todo);
}

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('.input-todo');
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const add = document.querySelector('.button-todo');
add.addEventListener('click', () => {
  const input = document.querySelector('.input-todo');
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.list');

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('tick')) {
    const itemKey = e.target.parentElement.dataset.key;
    toggleTodo(itemKey);
  }

  if (e.target.classList.contains('delete-todo')) {
    const itemKey = e.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

function toggleTodo(key) {
  const index = todoList.findIndex((i) => i.id === Number(key));
  todoList[index].completed = !todoList[index].completed;
  updateTodo(todoList[index]);
}

function deleteTodo(key) {
  const index = todoList.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoList[index],
  };
  todoList = todoList.filter((i) => i.id !== Number(key));
  updateTodo(todo);
}

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItemsRef');
  if (ref) {
    todoList = JSON.parse(ref);
    todoList.forEach((e) => {
      updateTodo(e);
    });
  }
});
