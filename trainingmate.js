// trainingmate.js

let selectedMethod = "";

function selectMethod(method) {
  selectedMethod = method;
  document.getElementById('hrInput').style.display = method === 'hr' ? 'block' : 'none';
  document.getElementById('paceInput').style.display = method === 'pace' ? 'block' : 'none';
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').style.display = 'none'; // Hide results when switching method
}

function calculateZones() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  resultsDiv.style.display = 'none'; // Hide it at the start of calculation

  if (selectedMethod === 'hr') {
    const maxHR = parseInt(document.getElementById('maxHR').value);
    if (isNaN(maxHR) || maxHR <= 0) {
      alert('Please enter a valid Max HR.');
      return;
    }

    const zones = {
      'Zone 1 (Recovery)': [0.6, 0.7],
      'Zone 2 (Endurance)': [0.7, 0.8],
      'Zone 3 (Tempo)': [0.8, 0.87],
      'Zone 4 (Threshold)': [0.87, 0.93],
      'Zone 5 (VO2 Max)': [0.93, 1.0]
    };

    for (const [zone, [low, high]] of Object.entries(zones)) {
      const lower = Math.round(maxHR * low);
      const upper = Math.round(maxHR * high);
      resultsDiv.innerHTML += `<p><strong>${zone}:</strong> ${lower}–${upper} bpm</p>`;
    }

    resultsDiv.style.display = 'block'; // Show results after successful HR calculation

  } else if (selectedMethod === 'pace') {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if ((minutes >= 60 || seconds >= 60) || (hours === 0 && minutes === 0 && seconds === 0)) {
      alert('Please enter a valid 5K time.');
      return;
    }

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const pacePerKm = totalSeconds / 5;

    const zones = {
      'Zone 1 (Recovery)': [1.35, 1.45],
      'Zone 2 (Endurance)': [1.15, 1.25],
      'Zone 3 (Tempo)': [1.05, 1.10],
      'Zone 4 (Threshold)': [1.00, 1.00],
      'Zone 5 (VO2 Max)': [0.90, 0.95]
    };

    for (const [zone, [lowMultiplier, highMultiplier]] of Object.entries(zones)) {
      const lowerPace = pacePerKm * lowMultiplier;
      const upperPace = pacePerKm * highMultiplier;
      resultsDiv.innerHTML += `<p><strong>${zone}:</strong> ${formatPace(lowerPace)} – ${formatPace(upperPace)} min/km</p>`;
    }

    resultsDiv.style.display = 'block'; // Show results after successful pace calculation

  } else {
    alert('Please select a method (Max HR or 5K Pace).');
  }
}

function formatPace(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}
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