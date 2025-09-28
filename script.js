// Section toggler
function showSection(sectionId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Logout
function logout() {
  localStorage.removeItem('autoform-user');
  showSection('login-section');
}

// --- Registration ---
document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const user = {
    name: document.getElementById('register-name').value,
    email: document.getElementById('register-email').value,
    password: document.getElementById('register-password').value,
    role: document.getElementById('register-role').value
  };

  localStorage.setItem('autoform-user', JSON.stringify(user));
  alert('Registered successfully! Please log in.');
  showSection('login-section');
});

// --- Login ---
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const storedUser = JSON.parse(localStorage.getItem('autoform-user'));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert(`Welcome, ${storedUser.name}!`);
    showSection('dashboard-section');
  } else {
    alert('Invalid credentials. Please try again.');
  }
});

// --- Request Type Form ---
document.getElementById('request-type-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const requestType = document.getElementById('request-type').value;

  if (!requestType) return alert('Please select a request type.');

  const form = document.getElementById('fill-form');
  form.innerHTML = ''; // Clear previous form

  let title = '';
  let additionalFields = '';

  switch (requestType) {
    case 'leave':
      title = 'Leave Application';
      additionalFields = `
        <label for="leave-dates">Leave Dates</label>
        <input type="text" id="leave-dates" placeholder="e.g. Oct 1 - Oct 5">

        <label for="leave-reason">Reason</label>
        <textarea id="leave-reason" rows="4" placeholder="Reason for leave..."></textarea>
      `;
      break;
    case 'permission':
      title = 'Permission Request';
      additionalFields = `
        <label for="permission-date">Date</label>
        <input type="date" id="permission-date">

        <label for="permission-reason">Reason</label>
        <textarea id="permission-reason" rows="4" placeholder="Reason for permission..."></textarea>
      `;
      break;
    case 'it':
      title = 'IT Support Request';
      additionalFields = `
        <label for="it-issue">Issue</label>
        <input type="text" id="it-issue" placeholder="Describe the problem">

        <label for="it-priority">Priority</label>
        <select id="it-priority">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      `;
      break;
  }

  document.getElementById('form-title').innerText = title;

  form.innerHTML = `
    <label for="full-name">Full Name</label>
    <input type="text" id="full-name" placeholder="Your Name">

    <label for="department">Department</label>
    <input type="text" id="department" placeholder="Your Department">

    ${additionalFields}

    <button type="submit">Submit Request</button>
  `;

  form.onsubmit = function (event) {
    event.preventDefault();

    const statusList = JSON.parse(localStorage.getItem('autoform-status')) || [];

    statusList.push({
      type: title,
      status: 'Pending Approval',
      date: new Date().toLocaleDateString()
    });

    localStorage.setItem('autoform-status', JSON.stringify(statusList));

    alert(`${title} submitted! Awaiting approval.`);
    showSection('status-section');
    loadStatusList();
  };

  showSection('fill-form-section');
});

// --- Load Status ---
function loadStatusList() {
  const list = document.getElementById('status-list');
  list.innerHTML = '';

  const items = JSON.parse(localStorage.getItem('autoform-status')) || [];

  if (items.length === 0) {
    list.innerHTML = '<li>No requests submitted yet.</li>';
    return;
  }

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.type} — ${item.status} (${item.date})`;
    list.appendChild(li);
  });
}

// --- Feedback Form ---
document.getElementById('feedback-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const feedback = document.getElementById('feedback-text').value;
  alert('Thank you for your feedback!');
  document.getElementById('feedback-text').value = '';
  showSection('dashboard-section');
});

// Initial load — show login or dashboard if logged in
window.onload = function () {
  const user = JSON.parse(localStorage.getItem('autoform-user'));
  if (user) {
    showSection('dashboard-section');
  } else {
    showSection('login-section');
  }

  loadStatusList();
};

