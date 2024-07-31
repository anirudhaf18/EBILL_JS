
// Populate data from local storage
document.addEventListener('DOMContentLoaded', function() {
  
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


  const connectionsData = JSON.parse(localStorage.getItem('connectionRequests')) || [];
  const billsData = JSON.parse(localStorage.getItem('paymentData')) || [];
  const complaintsData = JSON.parse(localStorage.getItem('complaintHistory')) || [];

  const connectionsTableBody = document.getElementById('connectionsTableBody');
  const billsTableBody = document.getElementById('billsTableBody');
  const complaintsTableBody = document.getElementById('complaintsTableBody');

  connectionsData.forEach((connection, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${connection.serviceConnection}</td>
      <td>${connection.meterType}</td>
      <td>${connection.uploadDocument}</td>
      <td>${connection.address1}</td>
      <td>${connection.city}</td>
      <td>${connection.state}</td>
      <td>${connection.postal}</td>
      <td>${connection.country}</td>
        <td>
        <span class="badge ${connection.status === 'Approved' ? 'bg-success' : connection.status === 'Rejected' ? 'bg-danger' : 'bg-secondary'}">
          ${connection.status || 'Pending'}
        </span>
      </td>
      <td>${connection.message || ''}</td>
    `;
    connectionsTableBody.appendChild(row);
  });

 

  complaintsData.forEach((complaint, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${complaint.date}</td>
      <td>${complaint.complaint}</td>
      <td><a href="${complaint.document}" target="_blank">${complaint.file}</a></td>
      <td>
        <span class="badge ${complaint.status === 'Resolved' ? 'bg-success' : 'bg-danger'}">
          ${complaint.status || 'Pending'}
        </span>
      </td>
    `;
    complaintsTableBody.appendChild(row);
  });

  
  billsData.forEach((bill,index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bill.consumerID}</td>
      <td>${bill.consumerName}</td>
      <td>${bill.consumerAmount}</td>
    `;
    billsTableBody.appendChild(row);
  });
});
