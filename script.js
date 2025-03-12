// Set the current version of the game
const currentVersion = '1.1.1';  // Change this version when you release an update

// Check if the version has changed
const savedVersion = localStorage.getItem('gameVersion');

// If the version is different, show the update message
if (savedVersion !== currentVersion) {
    // Display a warning that the game will update soon
    document.getElementById('updateMessage').style.display = 'block';
    
    // Update the stored version to the new one
    localStorage.setItem('gameVersion', currentVersion);
}

// Event listener to hide the message
document.getElementById('closeUpdateMessage').addEventListener('click', function() {
    document.getElementById('updateMessage').style.display = 'none';
});

// Game logic
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;  // Load score from localStorage
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');

// Function to update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

// Function to save the score to localStorage
function saveScore() {
    localStorage.setItem('score', score);
}

// Handle "Click Me!" button click to increment score
clickButton.addEventListener('click', () => {
    score++;
    updateScoreDisplay();
    saveScore();
});

// Login system
const loginToggle = document.getElementById('loginToggle');
const logoutBtn = document.getElementById('logoutBtn');
const authContainer = document.getElementById('authContainer');
const closeAuth = document.getElementById('closeAuth');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const authMessage = document.getElementById('authMessage');

// Check if user is logged in
const currentUser = localStorage.getItem('username');
if (currentUser) {
    loginToggle.textContent = `Welcome, ${currentUser}`;
    logoutBtn.classList.remove('hidden');
} else {
    loginToggle.textContent = 'Login / Sign Up';
    logoutBtn.classList.add('hidden');
}

// Toggle Login / Sign Up form
loginToggle.addEventListener('click', () => {
    authContainer.classList.toggle('hidden');
});

// Close the login/signup form
closeAuth.addEventListener('click', () => {
    authContainer.classList.add('hidden');
});

// Login function
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Simple login validation (for demonstration)
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        localStorage.setItem('username', username);
        loginToggle.textContent = `Welcome, ${username}`;
        authContainer.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        authMessage.textContent = 'Logged in successfully!';
    } else {
        authMessage.textContent = 'Invalid username or password.';
    }
});

// Sign Up function
signupBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (localStorage.getItem(username)) {
        authMessage.textContent = 'Username already exists.';
    } else {
        localStorage.setItem(username, password);
        authMessage.textContent = 'Account created. You can log in now.';
    }
});

// Logout function
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    loginToggle.textContent = 'Login / Sign Up';
    logoutBtn.classList.add('hidden');
    // Clear the score when logging out
    score = 0;  // Reset score to 0
    updateScoreDisplay();  // Update the display
});

// Chat functionality

// Initialize the profanity filter using the bad-words library
const filter = new BadWords();

// Function to send and display chat messages
function sendChatMessage() {
    const message = document.getElementById('chat-input').value.trim();  // Get message from input
    if (message) {
        // Clean the message using the profanity filter
        const cleanMessage = filter.clean(message);

        // Display the cleaned message in the chat box
        const chatBox = document.getElementById('chat-box');
        const user = localStorage.getItem('username') || 'Guest';
        
        // Create a new message element and append to the chat box
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${user}:</strong> ${cleanMessage}`;
        chatBox.appendChild(messageElement);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear the input field
        document.getElementById('chat-input').value = '';
    }
}

// Listen for the "Send" button click
document.getElementById('sendMessageBtn').addEventListener('click', sendChatMessage);

// Optional: Allow users to send a message by pressing "Enter"
document.getElementById('
