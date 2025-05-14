let selectedMethod = "";
let paceUnit = "km"; // default

function selectMethod(method) {
  selectedMethod = method;
  document.getElementById('hrInput').style.display = method === 'hr' ? 'block' : 'none';
  document.getElementById('paceInput').style.display = method === 'pace' ? 'block' : 'none';
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').style.display = 'none';
}

function calculateZones() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  resultsDiv.style.display = 'none';

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

    resultsDiv.style.display = 'block';

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

    // Unit selector dropdown
    resultsDiv.innerHTML += `
    <div class="unit-selector">
      <select id="unitSelect" onchange="togglePaceUnit(${pacePerKm})">
        <option value="km" selected>min/km</option>
        <option value="mile">min/mi</option>
      </select>
    </div>
    <br>
  `;
  

    generatePaceZones(pacePerKm, 'km');

    resultsDiv.style.display = 'block';
  } else {
    alert('Please select a method (Max HR or 5K Pace).');
  }
}

function togglePaceUnit(pacePerKm) {
  const unit = document.getElementById('unitSelect').value;
  paceUnit = unit;
  generatePaceZones(pacePerKm, unit);
}

function generatePaceZones(pacePerKm, unit) {
  const resultsDiv = document.getElementById('results');

  // Remove old zone outputs (keep dropdown)
  resultsDiv.querySelectorAll('p.zone-output').forEach(p => p.remove());

  const zones = {
    'Zone 1 (Recovery)': [1.35, 1.45],
    'Zone 2 (Endurance)': [1.15, 1.25],
    'Zone 3 (Tempo)': [1.05, 1.10],
    'Zone 4 (Threshold)': [1.00, 1.00],
    'Zone 5 (VO2 Max)': [0.90, 0.95]
  };

  for (const [zone, [lowMultiplier, highMultiplier]] of Object.entries(zones)) {
    const lower = pacePerKm * lowMultiplier;
    const upper = pacePerKm * highMultiplier;

    const paceDisplay = unit === 'mile'
      ? `${formatPace(lower * 1.60934)} – ${formatPace(upper * 1.60934)} min/mi`
      : `${formatPace(lower)} – ${formatPace(upper)} min/km`;

      resultsDiv.innerHTML += `<p class="zone-output"><strong>${zone}:</strong> ${paceDisplay.replace(/(min\/\w+)/g, '<span class="pace-unit">$1</span>')}</p>`;

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
