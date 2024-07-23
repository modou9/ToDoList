// Tableau pour stocker les tâches en cours
let currentTasks = [];
// Tableau pour stocker les tâches terminées
let completedTasks = [];

// Fonction pour ajouter une tâche à la liste
function addTask(taskText) {
    currentTasks.push(taskText);
    updateTaskList();
}

function ajouterTache() {
    const task = document.getElementById('task');

    if (task.value) {
        addTask(task.value);
        task.value = ''; // Réinitialiser le champ de saisie
        task.focus(); // Remettre le focus sur le champ de saisie
    }
}

function reinitialiser() {
    currentTasks = [];
    completedTasks = [];
    updateTaskList();
}

// Fonction pour marquer une tâche comme terminée
function completeTask(index) {
    const task = currentTasks.splice(index, 1)[0];
    completedTasks.push(task);
    updateTaskList();
}

// Fonction pour supprimer une tâche en cours
function deleteCurrentTask(index) {
    currentTasks.splice(index, 1);
    updateTaskList();
}

// Fonction pour supprimer une tâche terminée
function deleteCompletedTask(index) {
    completedTasks.splice(index, 1);
    updateTaskList();
}

// Fonction pour mettre à jour la liste des tâches
function updateTaskList() {
    $("#taskList").empty();
    $("#tacheFaites").empty();

    currentTasks.forEach(function(task, index) {
        const listItem = $("<li>").text(task);
        listItem.on("swiperight", function() {
            completeTask(index);
        });
        listItem.on("swipeleft", function() {
            deleteCurrentTask(index);
        });
        $("#taskList").append(listItem);
    });
    $("#taskList").listview('refresh'); // Mettre à jour la vue de la liste

    completedTasks.forEach(function(task, index) {
        const listItem = $("<li>").text(task).css("text-decoration", "line-through");
        // Ajout d'un écouteur pour un swipeleft
        listItem.on("swipeleft", function() {
            deleteCompletedTask(index);
        });
        $("#tacheFaites").append(listItem);
    });
    $("#tacheFaites").listview('refresh'); // Mettre à jour la vue de la liste
}
