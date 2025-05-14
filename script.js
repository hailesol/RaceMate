let selectedRaceDate = null;

flatpickr("#raceDatePicker", {
  inline: true,
  minDate: "today",
  onChange: function(selectedDates) {
    selectedRaceDate = selectedDates[0];
  }
});

document.getElementById("raceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const raceDistance = parseFloat(document.getElementById("raceDistance").value);

  const hours = parseInt(document.getElementById("goalHours").value, 10) || 0;
  const minutes = parseInt(document.getElementById("goalMinutes").value, 10) || 0;
  const seconds = parseInt(document.getElementById("goalSeconds").value, 10) || 0;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');  

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (!selectedRaceDate) {
    alert("Please select a race date.");
    return;
  }

  const now = new Date();
  const diffTime = selectedRaceDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Pace per km (for selected race distance)
  const pacePerKm = totalSeconds / raceDistance;
  const paceMinutesKm = Math.floor(pacePerKm / 60);
  const paceSecondsKm = Math.round(pacePerKm % 60).toString().padStart(2, "0");

  // Convert to miles (1 km = 0.621371 miles)
  const raceDistanceMiles = raceDistance * 0.621371;
  const pacePerMile = totalSeconds / raceDistanceMiles;
  const paceMinutesMile = Math.floor(pacePerMile / 60);
  const paceSecondsMile = Math.round(pacePerMile % 60).toString().padStart(2, "0");

  // Calculate gels
  const totalCarbs = Math.round((totalSeconds / 3600) * 60); // grams of carbs per hour
  const gelsNeeded = Math.ceil(totalCarbs / 25); // assume 25g carbs per gel

  // Display results
  document.getElementById("results").style.display = "block";
  document.getElementById("targetTime").textContent = `Your target time: ${hh}:${mm}:${ss}`;
  document.getElementById("countdown").textContent = `Countdown to : ${diffDays} days`;
  document.getElementById("pace").textContent = `Required pace: ${paceMinutesKm}:${paceSecondsKm} min/km`;
  document.getElementById("paceMile").textContent = `Required pace: ${paceMinutesMile}:${paceSecondsMile} min/mile`;
  document.getElementById("gels").textContent = `Recommended: ~${totalCarbs}g of carbs (~${gelsNeeded} gels)`;

  // Show PaceMate button
  document.getElementById("paceMateButton").addEventListener("click", function() {
    window.location.href = "pacemate.html";  // Navigate to the PaceMate page
  });
});
function toggleMenu() {
    const menu = document.getElementById("menu");
    const burger = document.getElementById("burger");
    menu.classList.toggle("show");
    burger.classList.toggle("open");
  }

  document.addEventListener("click", function (event) {
    const menu = document.getElementById("menu");
    const burger = document.getElementById("burger");
    if (!menu.contains(event.target) && !burger.contains(event.target)) {
      menu.classList.remove("show");
      burger.classList.remove("open");
    }
  });

// login script
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("authForm");
  const formTitle = document.getElementById("form-title");
  const toggleText = document.getElementById("toggleText");
  const toggleLink = document.getElementById("toggleLink");
  const confirmPasswordContainer = document.getElementById("confirmPasswordContainer");
  const submitButton = document.getElementById("submitButton");

  let isLogin = false;

  toggleLink.addEventListener("click", function (e) {
    e.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
      formTitle.textContent = "Log In";
      submitButton.textContent = "Log In";
      toggleText.textContent = "Don't have an account?";
      toggleLink.textContent = "Sign Up";
      confirmPasswordContainer.style.display = "none";
    } else {
      formTitle.textContent = "Sign Up";
      submitButton.textContent = "Sign Up";
      toggleText.textContent = "Already have an account?";
      toggleLink.textContent = "Log In";
      confirmPasswordContainer.style.display = "block";
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (isLogin) {
      // Login logic
      if (password === "admin") {
        window.location.href = "admin.html";
      } else {
        alert("Incorrect password. Please try again.");
      }
    } else {
      // Sign up logic
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
      } else {
        // You could store in localStorage or just confirm sign-up
        alert("Sign-up successful! You can now log in.");
        toggleLink.click(); // Switch to login mode
      }
    }
  });
});
