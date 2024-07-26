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
  
  // Submit new todo
  async function handleTodoSubmit(event) {
    event.preventDefault();
  
    const title = document.getElementById('todo-title').value.trim();
    const content = document.getElementById('todo-content').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch('http://localhost:3000/api/notes/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, content })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Check if data contains success object with title and content
          if (data.success && data.success.title && data.success.content) {
            const todoItem = document.createElement('li');
            todoItem.setAttribute('data-id', data.success._id);
            todoItem.innerHTML = `
              ${data.success.title} - ${data.success.content}
              <i class='bx bxs-edit' onclick="handleUpdate('${data.success._id}')"></i>
              <i class='bx bxs-trash' onclick="handleDelete('${data.success._id}')"></i>
            `;
            
            document.getElementById('todo-list').appendChild(todoItem);
  
            // Clear fields after successful submission
            document.getElementById('todo-title').value = '';
            document.getElementById('todo-content').value = '';
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
      const data = await response.json();
  
      if (response.ok) {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        data.forEach(todo => {
          const todoItem = document.createElement('li');
          todoItem.setAttribute('data-id', todo._id);
          todoItem.innerHTML = `
            ${todo.title} - ${todo.content}
            <i class='bx bxs-edit' onclick="handleUpdate('${todo._id}')"></i>
            <i class='bx bxs-trash' onclick="handleDelete('${todo._id}')"></i>
          `;
          todoList.appendChild(todoItem);
        });
      } else {
        console.error('Failed to fetch todos:', data.message);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  // Update todo
  async function handleUpdate(id) {
    const newTitle = prompt('Enter new title:');
    const newContent = prompt('Enter new content:');
  
    if (newTitle && newContent) {
      try {
        const response = await fetch(`http://localhost:3000/api/notes/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTitle, content: newContent })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Update the todo item in the list
          document.querySelector(`#todo-list li[data-id="${id}"]`).innerHTML = `
            ${data.success.title} - ${data.success.content}
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
        alert('Failed to delete todo due to a network error.');
      }
    }
  }// Function to fetch all notes
  async function fetchTodos() {
    try {
        const response = await fetch('http://localhost:3000/api/notes/read');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse JSON response
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = ''; // Clear existing todos

        // Iterate over each note and create list items
        data.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.setAttribute('data-id', todo._id);
            todoItem.innerHTML = `
              ${todo.title} - ${todo.content}
              <i class='bx bxs-edit' onclick="handleUpdate('${todo._id}')"></i>
              <i class='bx bxs-trash' onclick="handleDelete('${todo._id}')"></i>
            `;
            todoList.appendChild(todoItem);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        alert('Failed to GetAllNotes  due to a network error.');
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
  }
  
  // Attach event listeners
  document.getElementById('signup-form').addEventListener('submit', handleRegister);
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('todo-form').addEventListener('submit', handleTodoSubmit);

  // Initial fetch of todos when the page loads
  document.addEventListener('DOMContentLoaded', fetchTodos);
