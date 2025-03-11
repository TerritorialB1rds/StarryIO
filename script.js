const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginToggle = document.getElementById("loginToggle");
const closeAuth = document.getElementById("closeAuth");
const authMessage = document.getElementById("authMessage");
const authContainer = document.getElementById("authContainer");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const clickButton = document.getElementById("clickButton");
const scoreDisplay = document.getElementById("score");

let currentUser = null;
let score = 0;

// Load saved session (if any)
window.onload = () => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        currentUser = savedUser;
        score = parseInt(localStorage.getItem(`score_${currentUser}`)) || 0;
        scoreDisplay.textContent = score;
        logoutBtn.classList.remove("hidden");
        loginToggle.textContent = `Logged in as ${currentUser}`;
    } else {
        score = parseInt(localStorage.getItem("guest_score")) || 0;
        scoreDisplay.textContent = score;
    }
};

// Fix: Toggle Login/Register Form when clicking "Login / Sign Up"
loginToggle.addEventListener("click", () => {
    authContainer.classList.toggle("hidden");
});

// Close Login/Register Form when clicking "Close"
closeAuth.addEventListener("click", () => {
    authContainer.classList.add("hidden");
});

// Sign up system
signupBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        authMessage.textContent = "Please enter a username and password.";
        return;
    }

    if (localStorage.getItem(`user_${username}`)) {
        authMessage.textContent = "Username already exists. Try logging in.";
        return;
    }

    localStorage.setItem(`user_${username}`, password);
    authMessage.textContent = "Account created! Now login.";
});

// Login system
loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        authMessage.textContent = "Please enter a username and password.";
        return;
    }

    const storedPassword = localStorage.getItem(`user_${username}`);

    if (storedPassword === password) {
        currentUser = username;
        localStorage.setItem("currentUser", username);
        score = parseInt(localStorage.getItem(`score_${username}`)) || 0;
        scoreDisplay.textContent = score;
        logoutBtn.classList.remove("hidden");
        loginToggle.textContent = `Logged in as ${username}`;
        authContainer.classList.add("hidden");
    } else {
        authMessage.textContent = "Invalid username or password.";
    }
});

// Score system (Works with or without login)
clickButton.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;

    if (currentUser) {
        localStorage.setItem(`score_${currentUser}`, score);
    } else {
        localStorage.setItem("guest_score", score);
    }
});

// Logout system
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    currentUser = null;
    loginToggle.textContent = "Login / Sign Up";
    logoutBtn.classList.add("hidden");
    score = parseInt(localStorage.getItem("guest_score")) || 0;
    scoreDisplay.textContent = score;
});
