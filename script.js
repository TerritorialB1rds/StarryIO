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
document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector("#loginButton");

    if (loginButton) {
        loginButton.addEventListener("click", function() {
            console.log("Login button clicked!");
        });
    }
});
