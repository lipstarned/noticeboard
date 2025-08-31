// Predefined admin login
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";

// Elements
const loginForm = document.getElementById("loginForm");
const loginSection = document.getElementById("loginSection");
const loginError = document.getElementById("loginError");

const noticeSection = document.getElementById("noticeSection");
const noticeForm = document.getElementById("noticeForm");
const noticeList = document.getElementById("noticeList");

// Load notices from localStorage
let notices = JSON.parse(localStorage.getItem("notices")) || [];
displayNotices();

// Handle login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    loginSection.classList.add("hidden");
    noticeSection.classList.remove("hidden");
  } else {
    loginError.textContent = "❌ Invalid username or password!";
  }
});

// Handle notice form
noticeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;

  const newNotice = {
    id: Date.now(),
    title,
    message,
    date: new Date().toLocaleString(),
  };

  notices.unshift(newNotice);
  localStorage.setItem("notices", JSON.stringify(notices));
  noticeForm.reset();
  displayNotices();
});

// Display notices
function displayNotices() {
  noticeList.innerHTML = "";

  if (notices.length === 0) {
    noticeList.innerHTML = "<p>No notices available.</p>";
    return;
  }

  notices.forEach((notice) => {
    const div = document.createElement("div");
    div.classList.add("notice");
    div.innerHTML = `
      <h3>${notice.title}</h3>
      <p>${notice.message}</p>
      <small>📅 ${notice.date}</small>
      <br>
      <button class="delete-btn" onclick="deleteNotice(${notice.id})">🗑 Delete</button>
    `;
    noticeList.appendChild(div);
  });
}

// Delete notice
function deleteNotice(id) {
  notices = notices.filter((notice) => notice.id !== id);
  localStorage.setItem("notices", JSON.stringify(notices));
  displayNotices();
}