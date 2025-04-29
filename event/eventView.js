const eventArray = model.data.events;
const textLimitTitle = 15;
const textLimitLocation = 20;
const textLimitDescription = 20;

function truncateText(text, textLimit) {
    return text.length > textLimit ? text.substring(0, textLimit) + "..." : text;
}

function showAllEvents() {
    const container = document.getElementById('eventContainer');
    container.innerHTML = /*HTML*/ `
    <table id="eventTable">
        <h1> Events</h1>
        <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Slope</th>
            <th>Weather</th>
            <th>Description</th>
            <th>Attendees</th>
            <th>Actions</th>
        </tr>
    </table>
    <button onclick="createNewEvent()">Create New Event</button>
    `;

    const table = document.getElementById('eventTable');
    eventArray.forEach((e, i) => {
        const truncatedTitle = truncateText(e.title, textLimitTitle);
        const truncatedPlace = truncateText(e.place.join(', '), textLimitLocation); // Assuming place is an array
        const truncatedDescription = truncateText(e.extraInfo, textLimitDescription); // Using extraInfo as description

        table.innerHTML += /*HTML*/ `
        <tr>
            <td>${truncatedTitle}</td>
            <td>${truncatedPlace}</td>
            <td>${e.date}</td>
            <td>${e.slope}</td>
            <td>${e.weather ? e.weather : 'No weather info'}</td>
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
    document.getElementById('eventContainer').innerHTML = /*HTML*/ `
    <h1>${e.title}</h1>
    <p><strong>Location:</strong> ${e.place.join(', ')}</p>
    <p><strong>Date:</strong> ${e.date}</p>
    <p><strong>Slope:</strong> ${e.slope}</p>
    <p><strong>Weather:</strong> ${e.weather ? e.weather : 'No weather info'}</p>
    <p><strong>Description:</strong> ${e.extraInfo}</p>
    <h3>Attendees</h3>
    <ul id="attendeeList${index}">${e.attendees.map(attendeeId => {
        const attendee = model.data.users.find(user => user.id === attendeeId);
        return `<li>${attendee ? attendee.name : 'Unknown User'} <button onclick="deleteAttendee(${index}, ${attendeeId})">Delete</button></li>`;
    }).join('')}</ul>
    <label for="newAttendee${index}">Add Attendee:</label>
    <select id="newAttendee${index}" onchange="addAttendeeFromDropdown(${index})">
        <option value="">-- Select Attendee --</option>
        ${model.data.users
            .filter(user => !e.attendees.includes(user.id))
            .map(user => `<option value="${user.id}">${user.name}</option>`)
            .join('')}
    </select><br><br>
    <button onclick="editEvent(${index})">Edit</button>
    <button onclick="showAllEvents()">Back</button>
    `;
}

function editEvent(index) {
    const e = model.inputs.EventPage = { ...eventArray[index] }; // Use model.inputs.EventPage
    document.getElementById('eventContainer').innerHTML = /*HTML*/ `
    <h2>Edit Event</h2>
    ${eventFormFields(e, 'edit', index)}
    <h3>Attendees</h3>
    <ul id="attendeeList${index}">${e.attendees.map(attendeeId => {
        const attendee = model.data.users.find(user => user.id === attendeeId);
        return `<li>${attendee ? attendee.name : 'Unknown User'} <button onclick="deleteAttendee(${index}, ${attendeeId})">Delete</button></li>`;
    }).join('')}</ul>
    <label for="newAttendee${index}">Add Attendee:</label>
    <select id="newAttendee${index}" onchange="addAttendeeFromDropdown(${index})">
        <option value="">-- Select Attendee --</option>
        ${model.data.users
            .filter(user => !e.attendees.includes(user.id))
            .map(user => `<option value="${user.id}">${user.name}</option>`)
            .join('')}
    </select><br><br>
    <button onclick="updateEvent(${index})">Save</button>
    <button onclick="showAllEvents()">Cancel</button>
    `;
}

function createNewEvent() {
    const weather = `${model.inputs.EventPage.weatherTemperature || ''} ${model.inputs.EventPage.weatherType || ''}`.trim();
    
    model.inputs.EventPage = { // Use model.inputs.EventPage
        title: "",
        date: "",
        place: [""],
        slope: "",
        extraInfo: "",
        attendees: [],
        weather: weather,
    };
    window.newAttendees = [];

    

    document.getElementById('eventContainer').innerHTML = /*HTML*/ `
    <h2>Create New Event</h2>
    ${eventFormFields(model.inputs.EventPage, 'new')}
    <h3>Attendees</h3>
    <ul id="newAttendeeList">${window.newAttendees.map(attendeeId => {
        const attendee = model.data.users.find(user => user.id === attendeeId);
        return `<li>${attendee ? attendee.name : 'Unknown User'} <button onclick="deleteNewAttendee(${attendeeId})">Delete</button></li>`;
    }).join('')}</ul>
    <label for="newAttendee">Add Attendee:</label>
    <select id="newAttendee" onchange="addNewEventAttendeeFromDropdown()">
        <option value="">-- Select Attendee --</option>
        ${model.data.users
            .filter(user => !window.newAttendees.includes(user.id))
            .map(user => `<option value="${user.id}">${user.name}</option>`)
            .join('')}
    </select><br><br>
    <button onclick="saveNewEvent()">Save Event</button>
    <button onclick="showAllEvents()">Cancel</button>
    `;
}

function eventFormFields(e, mode, index = null) {
    return /*HTML*/ `
    <p>Title:<br> <textarea id="${mode}Title" rows="1" cols="160" oninput="model.inputs.EventPage.title=this.value">${e.title}</textarea></p>
    <p>Location:<br> <textarea id="${mode}Place" rows="1" cols="160" oninput="model.inputs.EventPage.place[0]=this.value">${e.place.join(', ')}</textarea></p>
    <p>Date:<br> <input id="${mode}Date" type="date" value="${e.date}" oninput="model.inputs.EventPage.date=this.value" /></p>
    <p>Slope:<br>
        <select id="${mode}Slope" onchange="model.inputs.EventPage.slope=this.value">
            ${model.data.possibleSlopes.map(slope => `
                <option value="${slope}" ${e.slope === slope ? 'selected' : ''}>${slope}</option>
            `).join('')}
        </select>
    </p>
    <p>Temperature:<br>
    <select id="${mode}WeatherTemperature" onchange="model.inputs.EventPage.weatherTemperature=this.value">
        <option value="">Select temperature</option>
        <option value="Cold (below -5°C)">Cold (below -5°C)</option>
        <option value="Chilly (-5°C to 0°C)">Chilly (-5°C to 0°C)</option>
        <option value="Mild (0°C to 5°C)">Mild (0°C to 5°C)</option>
        <option value="Warm (above 5°C)">Warm (above 5°C)</option>
    </select>
</p>

<p>Weather Type:<br>
    <select id="${mode}WeatherType" onchange="model.inputs.EventPage.weatherType=this.value">
        <option value="">Select weather type</option>
        <option value="Fresh Snow">Fresh Snow</option>
        <option value="Packed Snow">Packed Snow</option>
        <option value="Slippery Ice">Slippery Ice</option>
        <option value="Sunny & Clear">Sunny & Clear</option>
        <option value="Overcast">Overcast</option>
        <option value="Windy">Windy</option>
    </select>
</p>
    <p>Description:<br> <textarea id="${mode}ExtraInfo" rows="5" cols="160" oninput="model.inputs.EventPage.extraInfo=this.value">${e.extraInfo}</textarea></p>
    `;
}

function addAttendeeFromDropdown(index) {
    const selectElement = document.getElementById(`newAttendee${index}`);
    const userId = parseInt(selectElement.value);
    if (userId && !eventArray[index].attendees.includes(userId)) {
        eventArray[index].attendees.push(userId);
        editEvent(index);
    }
    selectElement.value = "";
}

function deleteAttendee(eventIndex, attendeeId) {
    eventArray[eventIndex].attendees = eventArray[eventIndex].attendees.filter(id => id !== attendeeId);
    const currentPage = document.getElementById('eventContainer').querySelector('h1');
    if (currentPage && currentPage.textContent === eventArray[eventIndex].title) {
        showEventPage(eventIndex);
    } else {
        editEvent(eventIndex);
    }
}

function addNewEventAttendeeFromDropdown() {
    const selectElement = document.getElementById('newAttendee');
    const userId = parseInt(selectElement.value);
    if (userId && !window.newAttendees.includes(userId)) {
        window.newAttendees.push(userId);
        model.inputs.EventPage.attendees = window.newAttendees;
        renderNewAttendeeList();
    }
    selectElement.value = "";
}

function deleteNewAttendee(userId) {
    window.newAttendees = window.newAttendees.filter(id => id !== userId);
    model.inputs.EventPage.attendees = window.newAttendees;
    renderNewAttendeeList();
}

function renderNewAttendeeList() {
    const ul = document.getElementById('newAttendeeList');
    ul.innerHTML = window.newAttendees.map(attendeeId => {
        const attendee = model.data.users.find(user => user.id === attendeeId);
        return `<li>${attendee ? attendee.name : 'Unknown User'} <button onclick="deleteNewAttendee(${attendeeId})">Delete</button></li>`;
    }).join('');
}

function updateEvent(index) {
    eventArray[index] = { ...model.inputs.EventPage };
    showAllEvents();
}

function saveNewEvent() {
    const weather = `${model.inputs.EventPage.weatherTemperature || ''} ${model.inputs.EventPage.weatherType || ''}`.trim();
    
    const newEvent = {
        id: eventArray.length > 0 ? Math.max(...eventArray.map(e => e.id)) + 1 : 1,
        creatorId: 1, // Or get the current user's ID
        ...model.inputs.EventPage,
        weather: weather, // Sett vær som en sammenflettet streng
    };

    eventArray.push(newEvent);
    showAllEvents();
}

function deleteEventConfirmation(index) {
    const eventToDelete = eventArray[index];
    document.getElementById('eventContainer').innerHTML = /*HTML*/ `
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

// Initialize the possible slopes array from the model
model.data.possibleSlopes = ["green", "blue", "red", "black", "white"];