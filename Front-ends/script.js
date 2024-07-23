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
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed due to a network error.');
    }
}

// Handle todo form submission
async function handleTodoSubmit(event) {
    event.preventDefault();
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    const title = document.getElementById('todo-title').value.trim();
    const content = document.getElementById('todo-content').value.trim();
    const createdAt = new Date().toISOString();

    if (title && content) {
        try {
            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, title, content, createdAt })
            });

            const data = await response.json();

            if (response.ok) {
                const todoItem = document.createElement('li');
                todoItem.textContent = `${data.title} (Created at: ${new Date(data.createdAt).toLocaleString()})`;
                document.getElementById('todo-list').appendChild(todoItem);
                document.getElementById('todo-title').value = '';
                document.getElementById('todo-content').value = '';
            } else {
                alert(`Failed to add todo: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add todo due to a network error.');
        }
    }
}

// Show and hide forms
function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('form-title').innerText = 'Login';
}

function showSignupForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('form-title').innerText = 'Register';
}

function showTodoSection() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('todo-section').style.display = 'block';
}

// Attach event listeners
document.getElementById('signup-form').addEventListener('submit', handleRegister);
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('todo-form').addEventListener('submit', handleTodoSubmit);
