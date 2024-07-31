document.addEventListener('DOMContentLoaded', () => {

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


  const consumerID = document.getElementById('consumerID');
  const consumerName = document.getElementById('consumerName');
  const consumerAmount = document.getElementById('consumerAmount');
  const cardNumber = document.getElementById('cardNumber');
  const cardName = document.getElementById('cardName');
  const expiryDate = document.getElementById('expiryDate');
  const cvv = document.getElementById('cvv');
  const paymentForm = document.getElementById('paymentForm');

  const validateField = (field, regex) => {
    if (!regex.test(field.value)) {
      field.classList.add('is-invalid');
      return false;
    } else {
      field.classList.remove('is-invalid');
      return true;
    }
  };

  const validateForm = () => {
    const validConsumerID = validateField(consumerID, /^\d{12}$/);
    const validConsumerName = validateField(consumerName, /.+/);
    const validConsumerAmount = validateField(consumerAmount, /^\d+(\.\d{1,2})?$/);
    const validCardNumber = validateField(cardNumber, /^\d{16}$/);
    const validCardName = validateField(cardName, /.+/);
    const validExpiryDate = validateField(expiryDate, /^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
    const validCVV = validateField(cvv, /^\d{3}$/);

    return validConsumerID && validConsumerName && validConsumerAmount && validCardNumber && validCardName && validExpiryDate && validCVV;
  };

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        consumerID: consumerID.value,
        consumerName: consumerName.value,
        consumerAmount: consumerAmount.value,
        cardNumber: cardNumber.value,
        cardName: cardName.value,
        expiryDate: expiryDate.value,
        cvv: cvv.value
      };

      let paymentData = JSON.parse(localStorage.getItem('paymentData')) || [];
      paymentData.push(formData);
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      Swal.fire({
        title: 'Success!',
        text: 'Payment has been made successfully!',
        icon: 'success',
        timer: 3000
      });
      paymentForm.reset();
    }
  });

  const resetField = (field) => {
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) {
        field.classList.remove('is-invalid');
      }
    });
  };

  resetField(consumerID);
  resetField(consumerName);
  resetField(consumerAmount);
  resetField(cardNumber);
  resetField(cardName);
  resetField(expiryDate);
  resetField(cvv);
});
