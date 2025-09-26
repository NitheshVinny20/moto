import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

onAuthStateChanged(auth, user => {
  if (!user) return window.location.href = "login.html";

  fetch(`http://localhost:30000/api/events/${user.uid}`)
    .then(res => res.json())
    .then(events => {
      const ev = events.find(e => e._id === eventId);
      if (!ev) return alert("Event not found");

      document.getElementById('title').value = ev.title;
      document.getElementById('description').value = ev.description;
      document.getElementById('category').value = ev.category;
      document.getElementById('address').value = ev.location?.address || '';
    });

  document.getElementById('editForm').addEventListener('submit', e => {
    e.preventDefault();
    const updated = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      category: document.getElementById('category').value,
      location: {
        address: document.getElementById('address').value,
      }
    };

    fetch(`http://localhost:30000/api/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).then(() => window.location.href = "dashboard.html");
  });
});
