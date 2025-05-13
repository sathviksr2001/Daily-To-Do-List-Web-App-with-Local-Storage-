document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task !== "") {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task;

    li.addEventListener("click", () => {
      li.classList.toggle("done");
      saveTasks();
    });

    const removeBtn = document.createElement("span");
    removeBtn.textContent = "❌";
    removeBtn.className = "remove";
    removeBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
  }
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    li.addEventListener("click", () => {
      li.classList.toggle("done");
      saveTasks();
    });

    const removeBtn = document.createElement("span");
    removeBtn.textContent = "❌";
    removeBtn.className = "remove";
    removeBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(removeBtn);
    document.getElementById("taskList").appendChild(li);
  });
}
