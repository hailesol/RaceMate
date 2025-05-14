document.getElementById("pacemateForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Retrieve user inputs
    const effortHours = parseInt(document.getElementById("effortHours").value, 10) || 0;
    const effortMinutes = parseInt(document.getElementById("effortMinutes").value, 10) || 0;
    const effortSeconds = parseInt(document.getElementById("effortSeconds").value, 10) || 0;
  
    const effortDistance = parseFloat(document.getElementById("effortDistance").value);
    const predictedDistance = parseFloat(document.getElementById("predictedDistance").value);
  
    // Mapping distances to race names
    const raceNameMap = {
      "5": "5K",
      "10": "10K",
      "21.097": "Half Marathon",
      "42.195": "Marathon"
    };
  
    const predictedDistanceName = raceNameMap[predictedDistance.toString()];
  
    // Calculate total time in seconds for effort
    const effortTotalSeconds = effortHours * 3600 + effortMinutes * 60 + effortSeconds;
  
    // Use the Riegel formula: T2 = T1 * (D2 / D1)^1.06
    const predictedTime = effortTotalSeconds * Math.pow((predictedDistance / effortDistance), 1.06);
  
    // Convert predicted time (in seconds) back to hours, minutes, and seconds
    const predictedHours = Math.floor(predictedTime / 3600);
    const predictedMinutes = Math.floor((predictedTime % 3600) / 60);
    const predictedSeconds = Math.round(predictedTime % 60);
  
    // Calculate paces
    const pacePerKm = predictedTime / predictedDistance;
    const pacePerMile = predictedTime / (predictedDistance / 1.60934); // 1 mile = 1.60934 km
  
    function formatPace(paceInSeconds) {
      const minutes = Math.floor(paceInSeconds / 60);
      const seconds = Math.round(paceInSeconds % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds} min`;
    }
  
    const paceKmFormatted = formatPace(pacePerKm);
    const paceMileFormatted = formatPace(pacePerMile);
  
    // Display results
    document.getElementById("pacemateResults").style.display = "block";
    document.getElementById("predictedTime").innerHTML =
      `<strong>Predicted time for ${predictedDistanceName}:</strong> ${predictedHours}h ${predictedMinutes}m ${predictedSeconds}s<br>
      <strong>Pace per km:</strong> ${paceKmFormatted}/km<br>
      <strong>Pace per mile:</strong> ${paceMileFormatted}/mile`;
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