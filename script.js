const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskSummary = document.getElementById("taskSummary");

let tasks = JSON.parse(localStorage.getItem("todo-tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) {
      li.classList.add("completed");
      completed++;
    }

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
      <span>${task.name}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">&times;</button>
    `;
    taskList.appendChild(li);
  });

  const total = tasks.length;
  const pending = total - completed;
  taskSummary.innerText = `Completed: ${completed} | Incomplete: ${pending}`;
}

function addTask() {
  const name = taskInput.value.trim();
  if (!name) return;

  tasks.push({ name, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
