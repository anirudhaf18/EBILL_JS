
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

const formFields = {
  first_name: "First name",
  last_name: "Last name",
  email: "Email address",
  password: "Password",
  mobile_no: "Mobile Number",
  consumer_id: "Consumer ID",
  address: "Address",
  city: "City",
  state: "State",
  postal: "Postal code",
  country: "Country",
  terms: "Terms and conditions",
};

Object.keys(formFields).forEach((field) => {
  document.getElementById(field)?.addEventListener("input", function () {
    document.getElementById(`${field}_error`).innerText = "";
  });
});

function validateAndStoreForm() {
  let isValid = true;
  const formElements = document.forms["signup-form"].elements;
  const errors = {
    first_name: validateNameF(formElements["first_name"].value),
    last_name: validateNameL(formElements["last_name"].value),
    email: validateEmail(formElements["email"].value),
    password: validatePassword(formElements["password"].value),
    mobile_no: validateMobileNumber(formElements["mobile_no"].value),
    consumer_id: validateConsumerID(formElements["consumer_id"].value),
    address: validateAddress(formElements["address"].value),
    city: validateCity(formElements["city"].value),
    state: validateState(formElements["state"].value),
   postal: validatePostal(formElements["postal"].value),
    country: validateCountry(formElements["country"].value),
    terms: validateTerms(formElements["terms"].checked),
  };

  Object.keys(errors).forEach((field) => {
    const error = errors[field];
    document.getElementById(`${field}_error`).innerText = error;
    if (error) {
      isValid = false;
    }
  });

  function validateNameF(nameF) {
  const firstNameRegex = /^[A-Za-z]{1,15}$/;
  if(nameF.trim() === "") return `${formFields.first_name} is required.`;
  if (!firstNameRegex.test(nameF)) return "First name should contain only letters and be up to 15 characters long.";
  return "";
}

function validateNameL(nameL) {
  const lastNameRegex = /^[A-Za-z]{1,15}$/;
  if(nameL.trim() === "") return `${formFields.last_name} is required.`;
  if (!lastNameRegex.test(nameL)) return "Last name should contain only letters and be up to 15 characters long.";
  return "";
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === "") return "Email is required.";
  if (!emailRegex.test(email)) return "Invalid email format.";
  return "";
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (password.trim() === "") return "Password is required.";
  if (!passwordRegex.test(password)) return "Password must be at least 8 characters long and contain at least one letter and one number.";
  return "";
}

function validateMobileNumber(mobile_no) {
  const mobileRegex = /^[0-9]{10}$/;
  if (mobile_no.trim() === "") return "Mobile Number is required.";
  if (!mobileRegex.test(mobile_no)) return "Invalid Mobile Number format.";
  return "";
}

function validateConsumerID(consumer_id) {
  if (consumer_id.trim() === "") return "Consumer ID is required.";
  if(isNaN(consumer_id) || consumer_id.length!=12) return "The consumer ID is 12 digits long.";
  return "";
}

function validateAddress(address) {
  return address.trim() === "" ? "Address is required." : "";
}

function validateCity(city) {
  const cityRegex = /^[A-Za-z]{1,20}$/;
  if(city.trim() === "") return "City is required.";
  if(!cityRegex.test(city)) return "City name should contain only letters."
  return "";
}

function validateState(state) {
  const stateRegex = /^[A-Za-z]{1,20}$/;
  if(state.trim() === "") return "State is required.";
  if(!stateRegex.test(state)) return "State name should contain only letters."
  return "";
}

function validatePostal(postal) {
  if (postal.trim() === "") return "Postal code is required.";
  if (isNaN(postal) || postal.length !== 6) return "Invalid Postal code.";
  return "";
}

function validateCountry(country) {
  const countryRegex = /^[A-Za-z]{1,20}$/;
  if(country.trim() === "") return "Country is required.";
  if(!countryRegex.test(country)) return "Country name should contain only letters."
  return "";
}

function validateTerms(isChecked) { 
   return !isChecked ? "You must agree to the T&C" : "";
}

if (!isValid) {
return false;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

// Check if email is already registered
const email = document.getElementById("email").value;
const consumer_id1 = document.getElementById("consumer_id").value;
const existingUser = users.find((user) => (user.email === email));
const existingUserCustId = users.find((user) => (user.consumer_id1===consumer_id1));
if (existingUser) {
document.getElementById("email_error").textContent =
"Email already registered. Please use a different email.";
return false;
}

if(existingUserCustId){
document.getElementById("consumer_id_error").innerText =
"Consumer ID already registered. Please use a different customer id.";

return false;
}


const userData = {
  first_name:document.getElementById("first_name").value,
  last_name:document.getElementById("last_name").value,
  email:document.getElementById("email").value,
  password:document.getElementById("password").value,
  mobile_no:document.getElementById("mobile_no").value,
  consumer_id:document.getElementById("consumer_id").value,
  address:document.getElementById("address").value,
  city:document.getElementById("city").value,
  state:document.getElementById("state").value,
  postal:document.getElementById("postal").value,
  country:document.getElementById("country").value
};


users.push(userData);
localStorage.setItem("users", JSON.stringify(users));
document.getElementById("signup-form").reset();
window.location.href = "Login.html";
return false;
  
}
