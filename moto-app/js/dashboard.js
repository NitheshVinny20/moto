import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (!user) return window.location.href = "login.html";

  const eventList = document.getElementById('eventList');

  fetch(`http://localhost:30000/api/events/${user.uid}`)
    .then(res => res.json())
    .then(events => {
      if (events.length === 0) return eventList.innerHTML = "<p>No events yet.</p>";
      eventList.innerHTML = events.map(event => `
        <div class="event-card">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <p><b>Location:</b> ${event.location?.address}</p>
          <a href="edit-event.html?id=${event._id}">✏️ Edit</a>
          <button onclick="deleteEvent('${event._id}')">🗑️ Delete</button>
        </div>
      `).join('');
    });

  window.deleteEvent = (id) => {
    fetch(`http://localhost:30000/api/events/${id}`, {
      method: 'DELETE'
    }).then(() => location.reload());
  };
});
