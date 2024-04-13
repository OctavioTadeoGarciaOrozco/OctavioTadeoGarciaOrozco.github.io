// Obtenemos referencias a los elementos del DOM
var taskInput = document.getElementById("taskInput"); // Input para la tarea
var startDateInput = document.getElementById("startDate"); // Input para la fecha de inicio
var startTimeInput = document.getElementById("startTime"); // Input para la hora de inicio
var endDateInput = document.getElementById("endDate"); // Input para la fecha de finalización
var endTimeInput = document.getElementById("endTime"); // Input para la hora de finalización
var taskList = document.getElementById("taskList"); // Lista de tareas

// Cuando la ventana carga, cargamos las tareas guardadas
window.onload = function() {
    loadTasks();
};

// Función para agregar una nueva tarea
function addTask() {
    // Verificamos si el campo de la tarea está vacío
    if (taskInput.value === "") {
        alert("Por favor, Ingresa una Tarea");
        return;
    }

    // Obtenemos los valores de los campos
    var taskText = taskInput.value;
    var startDate = startDateInput.value;
    var startTime = startTimeInput.value;
    var endDate = endDateInput.value;
    var endTime = endTimeInput.value;

    // Creamos un nuevo elemento <li> para la tarea
    var taskItem = document.createElement("li");
    var taskTextSpan = document.createElement("span");
    // Configuramos el texto de la tarea con los detalles de fecha y hora
    taskTextSpan.textContent = taskText + " - Inicio: " + startDate + " " + startTime + ", Cierre: " + endDate + " " + endTime;
    taskTextSpan.contentEditable = true; // Permite editar el texto de la tarea

    // Creamos botones para eliminar y completar la tarea
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function() {
        // Al hacer clic en el botón Eliminar, eliminamos la tarea y guardamos los cambios
        taskItem.remove();
        saveTasks();
    };

    var completeButton = document.createElement("button");
    completeButton.textContent = "Completar";
    completeButton.onclick = function() {
        // Al hacer clic en el botón Completar, alternamos la clase "task-complete" para marcar la tarea como completada o no, y guardamos los cambios
        taskItem.classList.toggle("task-complete");
        saveTasks();
    };

    // Agregamos los elementos a la lista de tareas
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(completeButton);
    taskList.appendChild(taskItem);

    // Guardamos las tareas actualizadas
    saveTasks();

    // Limpiamos los campos de entrada
    taskInput.value = "";
    startDateInput.value = "";
    startTimeInput.value = "";
    endDateInput.value = "";
    endTimeInput.value = "";
}

// Escuchamos el evento "keypress" en el campo de la tarea para agregar una tarea cuando se presiona la tecla "Enter"
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Función para filtrar las tareas según su estado (todas, activas o completadas)
function filterTasks(status) {
    var tasks = taskList.getElementsByTagName("li");
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        // Si la tarea coincide con el estado proporcionado, la mostramos; de lo contrario, la ocultamos
        if (status === "all" || (status === "active" && !task.classList.contains("task-complete")) || (status === "completed" && task.classList.contains("task-complete"))) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    }
}
// Función para guardar las tareas en el almacenamiento local del navegador
function saveTasks() {
    var tasks = [];
    var taskItems = taskList.getElementsByTagName("li");
    for (var i = 0; i < taskItems.length; i++) {
        var taskText = taskItems[i].querySelector("span").textContent;
        var isCompleted = taskItems[i].classList.contains("task-complete");
        // Guardamos el texto de la tarea y su estado de completado en un objeto y lo agregamos al arreglo de tareas
        tasks.push({ text: taskText, completed: isCompleted });
    }
    // Convertimos el arreglo de tareas a formato JSON y lo guardamos en el almacenamiento local
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Función para cargar las tareas almacenadas desde el almacenamiento local
function loadTasks() {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        var tasks = JSON.parse(savedTasks);
        tasks.forEach(function(task) {
            // Por cada tarea almacenada, creamos un elemento <li> y lo agregamos a la lista de tareas
            var taskItem = document.createElement("li");
            var taskTextSpan = document.createElement("span");
            taskTextSpan.textContent = task.text;
            taskTextSpan.contentEditable = true; // Permitimos editar el texto de la tarea

            if (task.completed) {
                taskItem.classList.add("task-complete"); // Si la tarea está completada, le añadimos la clase "task-complete"
            }

            // Creamos botones de eliminar y completar para la tarea
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = function() {
                // Al hacer clic en el botón Eliminar, eliminamos la tarea y guardamos los cambios
                taskItem.remove();
                saveTasks();
            };

            var completeButton = document.createElement("button");
            completeButton.textContent = "Completar";
            completeButton.onclick = function() {
                // Al hacer clic en el botón Completar, alternamos la clase "task-complete" para marcar la tarea como completada o no, y guardamos los cambios
                taskItem.classList.toggle("task-complete");
                saveTasks();
            };

            // Agregamos los elementos creados a la tarea
            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(deleteButton);
            taskItem.appendChild(completeButton);
            taskList.appendChild(taskItem);
        });
    }
}
