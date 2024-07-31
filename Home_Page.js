document.addEventListener("DOMContentLoaded", function () {
  const first_name = sessionStorage.getItem("first_name");
  const last_name = sessionStorage.getItem("last_name");

  if (!first_name || !last_name) {
    // If user is not logged in, redirect to login page
    window.location.href = "index.html";
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
});
