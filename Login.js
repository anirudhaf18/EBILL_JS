document.getElementById("toggleLoginPassword").addEventListener("click", function () {
  const password = document.getElementById("login-password");
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

function validateLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  let valid = true;

  // Check if email is empty
  if (email === "") {
    emailError.classList.remove("d-none");
    emailError.textContent = "Please enter your email address.";
    valid = false;
  } else {
    emailError.classList.add("d-none");
  }

  // Check if password is empty
  if (password === "") {
    passwordError.classList.remove("d-none");
    passwordError.textContent = "Please enter your password.";
    valid = false;
  } else {
    passwordError.classList.add("d-none");
  }

  // If any field is invalid, prevent form submission
  if (!valid) {
    return false;
  }

  // Admin credentials
  const adminEmail = "anirudhafandade@gmail.com";
  const adminPassword = "Anir1234"; // Replace with the actual admin password

  // Check if admin credentials are entered
  if (email === adminEmail && password === adminPassword) {
    window.location.href = "Admin.html";
    return false;
  }

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user matching email and password
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    sessionStorage.setItem("first_name", user.first_name);
    sessionStorage.setItem("last_name", user.last_name);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("consumer_id", user.consumer_id);
    window.location.href = "Home_Page.html";
    return false;
  } else {
    alert("Invalid email or password.");
    return false;
  }
}

// Real-time validation
document.getElementById("login-email").addEventListener("input", function () {
  const emailError = document.getElementById("email-error");
  if (this.value.trim() === "") {
    emailError.classList.remove("d-none");
    emailError.textContent = "Please enter your email address.";
  } else {
    emailError.classList.add("d-none");
  }
});

document.getElementById("login-password").addEventListener("input", function () {
  const passwordError = document.getElementById("password-error");
  if (this.value.trim() === "") {
    passwordError.classList.remove("d-none");
    passwordError.textContent = "Please enter your password.";
  } else {
    passwordError.classList.add("d-none");
  }
});