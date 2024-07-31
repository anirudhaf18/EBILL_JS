
      document
        .getElementById("complaintForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          const first_name = sessionStorage.getItem("first_name");
          const last_name = sessionStorage.getItem("last_name");
          const email = sessionStorage.getItem("email");

          if (!this.checkValidity()) {
            event.stopPropagation();
            this.classList.add("was-validated");
            return;
          }

          const formData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            date: document.querySelector('input[name="date"]').value,
            complaint: document.getElementById("complaint").value,
            file: document.getElementById("file").value,
          };

          let complaintHistory =
          JSON.parse(localStorage.getItem("complaintHistory")) || [];
          complaintHistory.push(formData);
          localStorage.setItem(
            "complaintHistory",
            JSON.stringify(complaintHistory)
          );
    

          Swal.fire({
            icon: 'success',
            title: 'Saved.',
            text: 'You submitted the form successfully',
            showConfirmButton: false,
            timer: 2000  // Auto close alert after 2 seconds
        });

          document.getElementById("complaintForm").reset();
          this.classList.remove("was-validated");
        });


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
  