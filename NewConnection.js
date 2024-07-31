const formFields = {
  serviceConnection: "serviceConnection",
  meterType: "meterType",
  uploadDocument: "uploadDocument",
  address1: "Address1",
  city: "City",
  state: "State",
  postal: "Postal code",
  country: "Country",
};

Object.keys(formFields).forEach((field) => {
  document.getElementById(field)?.addEventListener("input", function () {
    document.getElementById(`${field}_error`).innerText = "";
  });
});

function validateAndStoreConnectionForm() {
  let isValid = true;
  const formElements = document.forms["connectionForm"].elements;
  const errors = {
    serviceConnection: validateServiceConnection(formElements["serviceConnection"].value),
    meterType: validateMeterType(formElements["meterType"].value),
    uploadDocument: validateDocument(formElements["uploadDocument"].value),
    address1: validateAddress1(formElements["address1"].value),
    city: validateCity(formElements["city"].value),
    state: validateState(formElements["state"].value),
    postal: validatePostal(formElements["postal"].value),
    country: validateCountry(formElements["country"].value)
  };

  Object.keys(errors).forEach((field) => {
    const error = errors[field];
    document.getElementById(`${field}_error`).innerText = error;
    if (error) {
      isValid = false;
    }
  });

  function validateServiceConnection(serviceC) {
  if(serviceC.trim() === "") return `${formFields.serviceConnection} is required.`;
  return "";
}

function validateMeterType(meterT) {
  if(meterT.trim() === "") return `${formFields.meterType} is required.`;
  return "";
}

function validateDocument(doc) {
  return doc.trim() === "" ? "Document is required." : "";
}

function validateAddress1(address) {
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


if (!isValid) {
return false;
}

const first_name = sessionStorage.getItem("first_name");
const last_name = sessionStorage.getItem("last_name");
const email = sessionStorage.getItem("email");
     
const connectionRequests = JSON.parse(localStorage.getItem("connectionRequests")) || [];

const userData = {
  first_name: first_name,
  last_name: last_name,
  email: email,
  uploadDocument:document.getElementById("uploadDocument").value,
  serviceConnection:document.getElementById("serviceConnection").value,
  meterType:document.getElementById("meterType").value,
  address1:document.getElementById("address1").value,
  city:document.getElementById("city").value,
  state:document.getElementById("state").value,
  postal:document.getElementById("postal").value,
  country:document.getElementById("country").value
};



connectionRequests.push(userData);
localStorage.setItem("connectionRequests", JSON.stringify(connectionRequests));

Swal.fire({
  icon: 'success',
  title: 'Saved.',
  text: 'You submitted the form successfully',
  showConfirmButton: false,
  timer: 2000  // Auto close alert after 2 seconds
});

document.getElementById("connectionForm").reset();
return false;
  
}


const profileLink = document.getElementById("profile-link");
    const userPopoverContent = 
   `
    <div class="card text-center">
    <h5 class="card-header">EBILL</h5>
    <div class="card-body">
      <h5 class="card-title">${sessionStorage.getItem(
        "first_name"
      )} ${sessionStorage.getItem(
        "last_name"
      )}</h5>
      <p class="card-text">${sessionStorage.getItem("email")}</p>
    </div>
  </div>
  `;
  
    new bootstrap.Popover(profileLink, {
      trigger: "focus",
      html: true,
      content: userPopoverContent,
      placement: "bottom",
    });
  
    profileLink.addEventListener("click", function (event) {
      event.preventDefault();
    });
  
