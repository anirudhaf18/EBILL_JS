
    document.getElementById('feedbackForm').addEventListener('submit', function (e) {
      e.preventDefault();


      const billing = document.getElementById('billing');
      const services = document.getElementById('services');
      const use = document.getElementById('use');
      const experience = document.getElementById('experience');
      const recommendation = document.querySelector('input[name="recommendation"]:checked');

      let valid = true;

      if (billing.value === 'select') {
        document.getElementById('billingError').style.display = 'block';
        valid = false;
      } else {
        document.getElementById('billingError').style.display = 'none';
      }

      if (services.value === 'select') {
        document.getElementById('servicesError').style.display = 'block';
        valid = false;
      } else {
        document.getElementById('servicesError').style.display = 'none';
      }

      if (use.value === 'select') {
        document.getElementById('useError').style.display = 'block';
        valid = false;
      } else {
        document.getElementById('useError').style.display = 'none';
      }

      if (experience.value === 'select') {
        document.getElementById('experienceError').style.display = 'block';
        valid = false;
      } else {
        document.getElementById('experienceError').style.display = 'none';
      }

      if (!recommendation) {
        document.getElementById('recommendationError').style.display = 'block';
        valid = false;
      } else {
        document.getElementById('recommendationError').style.display = 'none';
      }

      if (valid) {
        const first_name = sessionStorage.getItem('first_name');
        const last_name = sessionStorage.getItem('last_name');
        const email = sessionStorage.getItem('email');

        const feedback = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          billing: billing.value,
          services: services.value,
          use: use.value,
          experience: experience.value,
          recommendation: recommendation ? recommendation.value : ''
        };

        let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedback);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

        Swal.fire({
          icon: 'success',
          title: 'Feedback Submitted!',
          text: 'Thank you for your valuable feedback.',
          showConfirmButton: false,
          timer: 3000  // Auto close alert after 2 seconds
      });
        document.getElementById('feedbackForm').reset();
      }
    });

    document.getElementById('billing').addEventListener('change', function () {
      if (this.value !== 'select') {
        document.getElementById('billingError').style.display = 'none';
      }
    });

    document.getElementById('services').addEventListener('change', function () {
      if (this.value !== 'select') {
        document.getElementById('servicesError').style.display = 'none';
      }
    });

    document.getElementById('use').addEventListener('change', function () {
      if (this.value !== 'select') {
        document.getElementById('useError').style.display = 'none';
      }
    });

    document.getElementById('experience').addEventListener('change', function () {
      if (this.value !== 'select') {
        document.getElementById('experienceError').style.display = 'none';
      }
    });

    document.querySelectorAll('input[name="recommendation"]').forEach(function (input) {
      input.addEventListener('change', function () {
        document.getElementById('recommendationError').style.display = 'none';
      });
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
  