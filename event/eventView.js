const model = {
    input: {
        event: {
            title: "", place: "", date: "", slope: "",
            description: "", extraInfo: "", attendees: []
        }
    },
    data: {
        savedEvents: [
            {
                title: "Title 1 - A very long title that needs to be shortened for the overview",
                place: "Location 1 - Another very long location name to be shortened",
                date: "2024-04-01",
                slope: "black",
                description: "This is a very long description that goes on for quite a while and has many more than one hundred characters to illustrate the point of limiting the displayed text in the overview page.",
                extraInfo: "Extra info 1",
                attendees: [{ name: "Mercury" }, { name: "Venus" }, { name: "Mars" }]
            },
            {
                title: "Title 2",
                place: "Location 2",
                date: "2024-05-01",
                slope: "white",
                description: "Short description.",
                extraInfo: "Extra info 2",
                attendees: [{ name: "Jupiter" }, { name: "Saturn" }]
            }
        ],
        users: [
            { id: 0, name: "Mercury", status: "online" },
            { id: 1, name: "Venus", status: "online" },
            { id: 2, name: "Earth", status: "online" },
            { id: 3, name: "Mars", status: "online" },
            { id: 4, name: "Jupiter", status: "online" },
            { id: 5, name: "Saturn", status: "online" },
            { id: 6, name: "Uranus", status: "online" },
            { id: 7, name: "Neptune", status: "online" },
            { id: 8, name: "Pluto", status: "online" },
        ],
        possibleSlopes: ["green", "blue", "red", "black", "white"],
    }
};

const eventArray = model.data.savedEvents;
const textLimitTitle = 15; // Define the character limit for title, location, and description
const textLimitLocation = 20;
const textLimitDescription = 20;

function truncateText(text, textLimit) {
    return text.length > textLimit
        ? text.substring(0, textLimit) + "..."
        : text;
}

function showAllEvents() {
    const container = document.getElementById('eventContainer');
    container.innerHTML = /*HTML*/`
    <table id="eventTable">
        <tr>
        <th>Title</th><th>Location</th><th>Date</th><th>Slope</th>
        <th>Description</th><th>Attendees</th><th>Actions</th>
        </tr>
    </table>
    <button onclick="createNewEvent()">Create New Event</button>
    `;

    const table = document.getElementById('eventTable');
    eventArray.forEach((e, i) => {
        const truncatedTitle = truncateText(e.title, textLimitTitle);
        const truncatedPlace = truncateText(e.place, textLimitLocation);
        const truncatedDescription = truncateText(e.description, textLimitDescription);

        table.innerHTML += /*HTML*/`
        <tr>
        <td>${truncatedTitle}</td>
        <td>${truncatedPlace}</td>
        <td>${e.date}</td>
        <td>${e.slope}</td>
        <td>${truncatedDescription}</td>
        <td>${e.attendees.length}</td>
        <td>
            <button onclick="showEventPage(${i})">Show</button>
            <button onclick="editEvent(${i})">Edit</button>
            <button onclick="deleteEventConfirmation(${i})">Delete</button>
        </td>
        </tr>`;
    });
}

function showEventPage(index) {
    const e = eventArray[index];
    document.getElementById('eventContainer').innerHTML = /*HTML*/`
    <h1>${e.title}</h1>
    <p><strong>Location:</strong> ${e.place}</p>
    <p><strong>Date:</strong> ${e.date}</p>
    <p><strong>Slope:</strong> ${e.slope}</p>
    <p><strong>Description:</strong> ${e.description}</p>
    <p><strong>Extra Info:</strong> ${e.extraInfo}</p>
    <h3>Attendees</h3>
    <ul id="attendeeList${index}">${e.attendees.map((a, i) => `<li>${a.name} <button onclick="deleteAttendee(${index}, ${i})">Delete</button></li>`).join('')}</ul>
    <label for="newAttendee${index}">Add Attendee:</label>
    <select id="newAttendee${index}" onchange="addAttendeeFromDropdown(${index})">
        <option value="">-- Select Attendee --</option>
        ${model.data.users
            .filter(user => !e.attendees.some(attendee => attendee.name === user.name))
            .map(user => `<option value="${user.name}">${user.name}</option>`)
            .join('')}
    </select><br><br>
    <button onclick="editEvent(${index})">Edit</button>
    <button onclick="showAllEvents()">Back</button>
    `;
}

function editEvent(index) {
    const e = model.input.event = { ...eventArray[index] };
    document.getElementById('eventContainer').innerHTML = /*HTML*/`
    <h2>Edit Event</h2>
    ${eventFormFields(e, 'edit', index)}
    <h3>Attendees</h3>
    <ul id="attendeeList${index}">${e.attendees.map((a, i) => `<li>${a.name} <button onclick="deleteAttendee(${index}, ${i})">Delete</button></li>`).join('')}</ul>
    <label for="newAttendee${index}">Add Attendee:</label>
    <select id="newAttendee${index}" onchange="addAttendeeFromDropdown(${index})">
        <option value="">-- Select Attendee --</option>
        ${model.data.users
            .filter(user => !e.attendees.some(attendee => attendee.name === user.name))
            .map(user => `<option value="${user.name}">${user.name}</option>`)
            .join('')}
    </select><br><br>
    <button onclick="updateEvent(${index})">Save</button>
    <button onclick="showAllEvents()">Cancel</button>
    `;
}

function createNewEvent() {
    model.input.event = {
        title: "", place: "", date: "", slope: "",
        description: "", extraInfo: "", attendees: []
    };
    window.newAttendees = [];

    document.getElementById('eventContainer').innerHTML = /*HTML*/`
    <h2>Create New Event</h2>
    ${eventFormFields(model.input.event, 'new')}
    <h3>Attendees</h3>
    <ul id="newAttendeeList">${window.newAttendees.map((a, i) => `<li>${a.name} <button onclick="deleteNewAttendee(${i})">Delete</button></li>`).join('')}</ul>
    <label for="newAttendee">Add Attendee:</label>
    <select id="newAttendee" onchange="addNewEventAttendeeFromDropdown()">
        <option value="">-- Select Attendee --</option>
        ${model.data.users
            .filter(user => !window.newAttendees.some(attendee => attendee.name === user))
            .map(user => `<option value="${user.name}">${user.name}</option>`)
            .join('')}
    </select><br><br>
    <button onclick="saveNewEvent()">Save Event</button>
    <button onclick="showAllEvents()">Cancel</button>
    `;
}

function eventFormFields(e, mode, index = null) {
    return /*HTML*/ `
    <p>Title:<br> <textarea id="${mode}Title" rows="1" cols="160" oninput="model.input.event.title=this.value">${e.title}</textarea></p>
    <p>Location:<br> <textarea id="${mode}Place" rows="1" cols="160" oninput="model.input.event.place=this.value">${e.place}</textarea></p>
    <p>Date:<br> <input id="${mode}Date" type="date" value="${e.date}" oninput="model.input.event.date=this.value" /></p>
    <p>Slope:<br>
        <select id="${mode}Slope" onchange="model.input.event.slope=this.value">
            ${model.data.possibleSlopes.map(slope => `
                <option value="${slope}" ${e.slope === slope ? 'selected' : ''}>${slope}</option>
            `).join('')}
        </select>
    </p>
    <p>Description:<br> <textarea id="${mode}Description" rows="5" cols="160" oninput="model.input.event.description=this.value">${e.description}</textarea></p>
    <p>Extra Info:<br> <textarea id="${mode}Extra" rows="5" cols="160" oninput="model.input.event.extraInfo=this.value">${e.extraInfo}</textarea></p>
    `;
}

function addAttendeeFromDropdown(index) {
    const selectElement = document.getElementById(`newAttendee${index}`);
    const name = selectElement.value;
    if (name) {
        eventArray[index].attendees.push({ name });
        editEvent(index);
    }
    selectElement.value = ""; // Reset the dropdown
}

function deleteAttendee(eventIndex, attendeeIndex) {
    eventArray[eventIndex].attendees.splice(attendeeIndex, 1);
    const currentPage = document.getElementById('eventContainer').querySelector('h1');
    if (currentPage && currentPage.textContent === eventArray[eventIndex].title) {
        showEventPage(eventIndex);
    } else {
        editEvent(eventIndex);
    }
}

function addNewEventAttendeeFromDropdown() {
    const selectElement = document.getElementById('newAttendee');
    const name = selectElement.value;
    if (name && !window.newAttendees.some(attendee => attendee.name === name)) {
        window.newAttendees.push({ name });
        model.input.event.attendees = window.newAttendees;
        renderNewAttendeeList();
    }
    selectElement.value = ""; // Reset the dropdown
}

function deleteNewAttendee(index) {
    window.newAttendees.splice(index, 1);
    model.input.event.attendees = window.newAttendees;
    renderNewAttendeeList();
}

function renderNewAttendeeList() {
    const ul = document.getElementById('newAttendeeList');
    ul.innerHTML = window.newAttendees.map((a, i) => `<li>${a.name} <button onclick="deleteNewAttendee(${i})">Delete</button></li>`).join('');
}

function updateEvent(index) {
    eventArray[index] = { ...model.input.event };
    showAllEvents();
}

function saveNewEvent() {
    eventArray.push({ ...model.input.event });
    showAllEvents();
}

function deleteEventConfirmation(index) {
    const eventToDelete = eventArray[index];
    document.getElementById('eventContainer').innerHTML = /*HTML*/`
    <h2>Confirm Delete</h2>
    <p>Are you sure you want to delete the event "${truncateText(eventToDelete.title, textLimitTitle)}"?</p>
    <button onclick="deleteEvent(${index})">Delete</button>
    <button onclick="showAllEvents()">Cancel</button>
    `;
}

function deleteEvent(index) {
    eventArray.splice(index, 1);
    showAllEvents();
}

// Call showAllEvents to initially render the page
showAllEvents();