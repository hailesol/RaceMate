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

  const raceName = document.getElementById("raceName").value;

  const raceDistance = parseFloat(document.getElementById("raceDistance").value);

  const hours = parseInt(document.getElementById("goalHours").value, 10) || 0;
  const minutes = parseInt(document.getElementById("goalMinutes").value, 10) || 0;
  const seconds = parseInt(document.getElementById("goalSeconds").value, 10) || 0;
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
  document.getElementById("countdown").textContent = `Countdown to ${raceName}: ${diffDays} days`;
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