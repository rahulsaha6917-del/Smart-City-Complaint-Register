const form = document.getElementById("complaintForm");
const list = document.getElementById("complaintList");
const clearBtn = document.getElementById("clearBtn");

// Load complaints on refresh
window.onload = loadComplaints;

// Submit Complaint
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const message = document.getElementById("message").value;
  const time = new Date().toLocaleString();

  const complaint = { name, type, message, time };

  addComplaintToUI(complaint);
  saveComplaint(complaint);

  form.reset();
});

// Add complaint to UI
function addComplaintToUI(complaint) {
  const li = document.createElement("li");

  li.innerHTML = `
    <div class="complaint-header">
      👤 ${complaint.name} | 🕒 ${complaint.time} | 📌 ${complaint.type}
    </div>
    <div>${complaint.message}</div>
  `;

  list.appendChild(li);
}

// Save to LocalStorage
function saveComplaint(complaint) {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints.push(complaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));
}

// Load from LocalStorage
function loadComplaints() {
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints.forEach(addComplaintToUI);
}

// Clear all complaints
clearBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all complaints?")) {
    localStorage.removeItem("complaints");
    list.innerHTML = "";
  }
});
