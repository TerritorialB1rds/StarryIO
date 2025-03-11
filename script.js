// Set the current version of the game
const currentVersion = '1.1.0';  // Change this version when you release an update

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
let score = 0;
const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
clickButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
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
});
// Background Music Setup
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Enable autoplay after user interaction
window.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
    }
}, { once: true }); // Runs only once to enable autoplay

// Toggle Music Button
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = "🔇 Mute Music";
    } else {
        bgMusic.pause();
        musicToggle.textContent = "🎵 Play Music";
    }
});
// Click Sound Effect
const clickSound = document.getElementById('clickSound');

// Play click sound when any button is clicked
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (event) => {
        // Prevent music toggle from playing the click sound
        if (event.target.id !== "musicToggle") {
            clickSound.currentTime = 0; // Reset sound for quick repeat
            clickSound.play().catch(error => console.log("Click sound error:", error));
        }
    });
});
// Function to load progress
function loadProgress() {
    // Retrieve player data from localStorage
    const savedProgress = localStorage.getItem('playerProgress');

    if (savedProgress) {
        // Parse the saved progress and return it
        return JSON.parse(savedProgress);
    }

    // Return default data if no progress is saved
    return { level: 1, score: 0 }; // Default progress
}

// Example usage
const progress = loadProgress();
console.log("Loaded player progress:", progress);
// Set the score to 0 initially (or load from localStorage if it exists)
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

// Function to update the score display
function updateScoreDisplay() {
    document.getElementById("score").innerText = score;
}

// Function to save the score to localStorage
function saveScore() {
    localStorage.setItem('score', score);
}

// Function to handle click event on "Click Me!" button
document.getElementById("clickButton").addEventListener("click", function() {
    // Increment the score
    score++;
    updateScoreDisplay();
    saveScore(); // Save the updated score to localStorage
});

// Load progress on page load
window.onload = function() {
    updateScoreDisplay(); // Update the score display on page load
};

// Handle login functionality (for demo purposes, you can add basic username/password checks)
document.getElementById("loginToggle").addEventListener("click", function() {
    // Toggle visibility of login/signup container
    document.getElementById("authContainer").classList.toggle("hidden");
});

// Handle logout functionality
document.getElementById("logoutBtn").addEventListener("click", function() {
    // Clear the localStorage on logout
    localStorage.removeItem('score');
    score = 0;
    updateScoreDisplay();
    alert("Logged out successfully.");
});

// Handle login button click
document.getElementById("loginBtn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple username/password validation (you can improve this logic)
    if (username && password) {
        alert("Logged in successfully!");
        document.getElementById("authContainer").classList.add("hidden");
        document.getElementById("logoutBtn").classList.remove("hidden");
    } else {
        document.getElementById("authMessage").innerText = "Please enter a valid username and password.";
    }
});

// Handle signup button click (you can expand this to store new users)
document.getElementById("signupBtn").addEventListener("click", function() {
    alert("Signup functionality is not yet implemented.");
});

// Close the authentication window
document.getElementById("closeAuth").addEventListener("click", function() {
    document.getElementById("authContainer").classList.add("hidden");
});
