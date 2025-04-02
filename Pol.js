// Create Event functions 

const eventArray = model.data.events;

function showEvent (){
    const eventContainer = document.getElementById('eventContainer');

    eventContainer.innerHTML = /*HTML*/ `

    <h1 class="titleField">${eventArray.title}</h1> // title field
    <p class="locationField">${eventArray.place}</p>// location field 
    <p class="dateField">${eventArray.date}</p>// date field 
    <p class="descriptionField">${eventArray.description}</p>// description field 
    <p class="extraField">${eventArray.extraInfo}</p>
    <table class="friendField">${eventArray.attendees}</table>
    <button onclick="editEvent()">Edit event</button>
    <button onclick="createNewEvent()">Create new event</button>
    <button onclick="deleteEvent()">Delete event</button>
    `;
}

function createNewEvent() {

}

function deleteEvent(index) {
    eventArray.splice(index, 1);
    show();
}

function editEvent(index) {
    eventArray[index].editMode = true;
    show();
}

function updateTask(index) {
    const task = tasks[index];
    task.person = document.getElementById(`editPerson${index}`).value;
    task.description = document.getElementById(`editDescription${index}`).value;
    task.deadline = document.getElementById(`editDeadline${index}`).value;
    task.editMode = false;
    show();
}