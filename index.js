console.log('My code is running');
document.addEventListener("DOMContentLoaded", loadTasks); // Load tasks on page refresh

function addToDo() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
      alert("Please enter a task.");
      return;
  }
  const listItem = createTaskElement(taskText, false);
            document.getElementById("todoList").appendChild(listItem);
            saveTasks();
            taskInput.value = ""; // Clear input after adding
        }

        function createTaskElement(text, isCompleted) {
          const listItem = document.createElement("li");
          listItem.textContent = text;
          if (isCompleted) listItem.classList.add("completed");

          // Toggle strikethrough on click
          listItem.addEventListener("click", function() {
              this.classList.toggle("completed");
              saveTasks(); // Update local storage
          });

          return listItem;
      }

      function removeCompleted() {
        const tasks = document.querySelectorAll("#todoList .completed");
        tasks.forEach(task => task.remove());
        saveTasks(); // Update local storage after removal
    }

    function saveTasks() {
      const taskElements = document.querySelectorAll("#todoList li");
      const tasks = [];

      taskElements.forEach(task => {
          tasks.push({ text: task.textContent, completed: task.classList.contains("completed") });
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const todoList = document.getElementById("todoList");

        tasks.forEach(task => {
            const listItem = createTaskElement(task.text, task.completed);
            todoList.appendChild(listItem);
        });
    }
}