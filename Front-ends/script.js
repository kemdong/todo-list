// Register user
async function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById('surname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/users/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful!');
      showLoginForm();
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed due to a network error.');
  }
}

// Login user
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem('userId', data.userId); // Save userId in localStorage
      showTodoSection();
      fetchTodos(); // Fetch todos after successful login
    } else {
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Login failed due to a network error.');
  }
}
// Logout user
async function handleLogout() {
  try {
    const response = await fetch('http://localhost:3000/api/users/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies for session-based auth
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the response is empty
    const responseBody = await response.text();
    let data = {};
    if (responseBody) {
      data = JSON.parse(responseBody);
    }

    if (response.ok) {
      localStorage.removeItem('userId'); // Remove any client-side stored data if needed
      alert('Logout successful!');
      window.location.href = 'index.html'; // Redirect to registration page
    } else {
      alert(`Logout failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to logout due to a network error.');
  }
}



// Submit new todo
async function handleTodoSubmit(event) {
  event.preventDefault();

  const title = document.getElementById('todo-title').value.trim();
  const content = document.getElementById('todo-content').value.trim();
  const date = document.getElementById('todo-date').value;
  const time = document.getElementById('todo-time').value;

  if (title && content && date && time) {
    try {
      const response = await fetch('http://localhost:3000/api/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, date, time })
      });

      const data = await response.json();

      if (response.ok) {
        // Check if data contains success object with title, content, date, and time
        if (data.success && data.success.title && data.success.content && data.success.date && data.success.time) {
          const todoItem = document.createElement('li');
          todoItem.setAttribute('data-id', data.success._id);
          todoItem.innerHTML = `
            ${data.success.title} - ${data.success.content} <br>
            Date: ${data.success.date} <br>
            Time: ${data.success.time}
            <i class='bx bx-check' onclick="handleComplete('${data.success._id}')"></i>
            <i class='bx bxs-edit' onclick="handleUpdate('${data.success._id}')"></i>
            <i class='bx bxs-trash' onclick="handleDelete('${data.success._id}')"></i>
          `;

          document.getElementById('todo-list').appendChild(todoItem);

          // Clear fields after successful submission
          document.getElementById('todo-title').value = '';
          document.getElementById('todo-content').value = '';
          document.getElementById('todo-date').value = '';
          document.getElementById('todo-time').value = '';
        } else {
          console.error('Invalid data format:', data);
          alert('Failed to add todo: Invalid data format.');
        }
      } else {
        alert(`Failed to add todo: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add todo due to a network error.');
    }
  } else {
    alert('Please fill in all fields.');
  }
}

// Fetch todos
async function fetchTodos() {
  try {
    const response = await fetch('http://localhost:3000/api/notes');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status && Array.isArray(data.success)) {
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = ''; // Clear the list before adding new items

      data.success.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.setAttribute('data-id', todo._id);
        todoItem.innerHTML = `
          ${todo.title} - ${todo.content} <br>
          Date: ${todo.date} <br>
          Time: ${todo.time}
          <i class='bx bx-check' onclick="handleComplete('${todo._id}')"></i>
          <i class='bx bxs-edit' onclick="handleUpdate('${todo._id}')"></i>
          <i class='bx bxs-trash' onclick="handleDelete('${todo._id}')"></i>
        `;
        if (todo.completed) {
          todoItem.style.textDecoration = 'line-through'; // Mark as completed visually
          const checkIcon = todoItem.querySelector('.bx-check');
          if (checkIcon) {
            checkIcon.style.color = 'green'; // Change icon color to indicate completion
          }
        }
        todoList.appendChild(todoItem);
      });
    } else {
      console.error('Invalid data format:', data);
      alert('Failed to fetch todos: Invalid data format.');
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
    alert('Failed to fetch todos due to a network error.');
  }
}

// Update todo
async function handleUpdate(id) {
  const newTitle = prompt('Enter new title:');
  const newContent = prompt('Enter new content:');
  const newDate = prompt('Enter new date (YYYY-MM-DD):');
  const newTime = prompt('Enter new time (HH:MM):');

  if (newTitle && newContent && newDate && newTime) {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle, content: newContent, date: newDate, time: newTime })
      });

      const data = await response.json();

      if (response.ok) {
        // Update the todo item in the list
        document.querySelector(`#todo-list li[data-id="${id}"]`).innerHTML = `
          ${data.success.title} - ${data.success.content} <br>
          Date: ${data.success.date} <br>
          Time: ${data.success.time}
          <i class='bx bx-check' onclick="handleComplete('${data.success._id}')"></i>
          <i class='bx bxs-edit' onclick="handleUpdate('${data.success._id}')"></i>
          <i class='bx bxs-trash' onclick="handleDelete('${data.success._id}')"></i>
        `;
      } else {
        alert(`Failed to update todo: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update todo due to a network error.');
    }
  }
}

// Complete todo
async function handleComplete(id) {
  try {
      const response = await fetch(`http://localhost:3000/api/notes/complete/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: true }) // Send the correct data
      });

      const data = await response.json();

      if (response.ok) {
          // Update the todo item in the list
          const todoItem = document.querySelector(`#todo-list li[data-id="${id}"]`);
          if (todoItem) {
              todoItem.style.textDecoration = 'line-through'; // Mark as completed visually
              const checkIcon = todoItem.querySelector('.bx-check');
              if (checkIcon) {
                  checkIcon.style.color = 'green'; // Change icon color to indicate completion
              }
          }
      } else {
          alert(`Failed to complete todo: ${data.message}`);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to complete todo due to a network error.');
  }
}


// Delete todo
async function handleDelete(id) {
  if (confirm('Are you sure you want to delete this todo?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/delete/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        // Find the todo item element
        const todoItem = document.querySelector(`#todo-list li[data-id="${id}"]`);

        if (todoItem) {
          todoItem.remove();
        } else {
          console.error('Todo item not found with ID:', id);
        }
      } else {
        alert(`Failed to delete todo: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete todo due to a networkerror.');
    }
  }
}

// Show login form
function showLoginForm() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('todo-section').style.display = 'none';
  document.getElementById('form-title').innerText = 'Login';
}

// Show signup form
function showSignupForm() {
  document.getElementById('signup-form').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('todo-section').style.display = 'none';
  document.getElementById('form-title').innerText = 'Register';
}

// Show todo section
function showTodoSection() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('todo-section').style.display = 'block';
  document.getElementById('form-title').innerText = 'Todo List';
}

// Attach event listeners
document.getElementById('signup-form').addEventListener('submit', handleRegister);
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('todo-form').addEventListener('submit', handleTodoSubmit);
document.getElementById('logout-button').addEventListener('click', handleLogout);

// Initial fetch of todos when the page loads
document.addEventListener('DOMContentLoaded', fetchTodos);
