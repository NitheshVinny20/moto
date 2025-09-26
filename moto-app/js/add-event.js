import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (!user) return window.location.href = "login.html";

  document.getElementById('eventForm').addEventListener('submit', e => {
    e.preventDefault();

    const event = {
      uid: user.uid,
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      category: document.getElementById('category').value,
      location: {
        address: document.getElementById('address').value,
      },
      isPaid: false,
    };

    fetch('http://localhost:30000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).then(() => window.location.href = "dashboard.html");
  });
});
