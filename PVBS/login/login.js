function login() {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");
  const username = usernameEl ? usernameEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';

  // Contoh login hardcoded (boleh ganti dgn check ke database/backend)
  if (username === "admin" && password === "1234") {
    // Simpan sesi sementara
    try { localStorage.setItem("loggedInUser", username); } catch (e){}

    // Redirect ke dashboard
    window.location.href = "dashboard.html";
  } else {
    const errorEl = document.getElementById("error");
    if (errorEl) errorEl.textContent = "Nama pengguna atau kata laluan salah.";
  }
}

// Efek dimmed utk selected - guard for pages that actually have .option elements
const options = document.querySelectorAll(".option");
if (options && options.length > 0) {
  options.forEach(option => {
    option.addEventListener("click", () => {
      // Buang semua class dulu
      options.forEach(opt => {
        opt.classList.remove("selected");
        opt.classList.remove("dimmed");
      });

      // Tandakan yang dipilih
      option.classList.add("selected");

      // Yang lain dimmed
      options.forEach(opt => {
        if (!opt.classList.contains("selected")) {
          opt.classList.add("dimmed");
        }
      });
    });
  });

  // Emerge button 'seterusnya'
  const nextButton = document.getElementById("next");
  let selectedRole = "";

  options.forEach(option => {
    option.addEventListener("click", () => {
      // Remove 'selected' dari semua option dulu
      options.forEach(opt => opt.classList.remove("selected"));

      // Tambah class 'selected' untuk option yang dipilih
      option.classList.add("selected");

      // Tunjukkan butang 'Seterusnya'
      if (nextButton) nextButton.style.display = "block";
    });
  });

  const adminEl = document.getElementById("admin");
  const staffEl = document.getElementById("staff");
  if (adminEl) {
    adminEl.addEventListener("click", function() {
      selectedRole = "admin";
      this.classList.add("selected");
      if (staffEl) staffEl.classList.remove("selected");
    });
  }
  if (staffEl) {
    staffEl.addEventListener("click", function() {
      selectedRole = "staff";
      this.classList.add("selected");
      if (adminEl) adminEl.classList.remove("selected");
    });
  }

  const nextEl = document.getElementById("next");
  if (nextEl) {
    nextEl.addEventListener("click", function() {
      if (selectedRole === "admin") {
        window.location.href = "../admin/pages/registration/formad.html";
      } else if (selectedRole === "staff") {
        window.location.href = "../staffs/formstaff.html"; // kalau ada
      } else {
        alert("Sila pilih jenis akaun dahulu!");
      }
    });
  }
}

// If the page contains a traditional login form, wire it up safely
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    login();
  });
}


