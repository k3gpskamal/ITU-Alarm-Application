const MAX_CONTAINERS = 20;
let alarmCount = 0;

document.getElementById('add-container').addEventListener('click', () => {
  if (alarmCount < MAX_CONTAINERS) {
    createAlarmContainer();
  } else {
    alert("Maximum of 20 alarms allowed.");
  }
});

function createAlarmContainer() {
  alarmCount++;
  const container = document.createElement('div');
  container.className = 'alarm-container';
  container.innerHTML = `
    <div class="alarm-header">
      <span>Alarm ${alarmCount}</span>
      <button class="cancel-btn" onclick="removeContainer(this)">Cancel</button>
    </div>
    <div class="alarm-controls">
      <label for="time-${alarmCount}">Time:</label>
      <input type="time" id="time-${alarmCount}">
      
      <label for="day-${alarmCount}">Day:</label>
      <input type="date" id="day-${alarmCount}">
      
      <label for="music-${alarmCount}">Alarm Sound:</label>
      <select id="music-${alarmCount}">
        <option value="alarm.mp3">Alarm</option>
        <option value="calm.mp3">Calm</option>
        <option value="upbeat.mp3">Upbeat</option>
        <option value="peaceful.mp3">Peaceful</option>
      </select>
      
      <label>
        <input type="checkbox" id="toggle-${alarmCount}">
        Set Alarm
      </label>
    </div>
  `;
  document.getElementById('alarms-container').appendChild(container);

  // Add event listener to the toggle button
  document.getElementById(`toggle-${alarmCount}`).addEventListener('change', (e) => {
    handleAlarmToggle(e.target, alarmCount);
  });
}

function handleAlarmToggle(toggle, id) {
  if (toggle.checked) {
    const time = document.getElementById(`time-${id}`).value;
    const day = document.getElementById(`day-${id}`).value;
    const music = document.getElementById(`music-${id}`).value;

    if (!time || !day) {
      alert("Please set both time and day for the alarm.");
      toggle.checked = false;
      return;
    }

    const alarmDateTime = new Date(`${day}T${time}`);
    const now = new Date();
    if (alarmDateTime < now) {
      alert("Selected time must be in the future.");
      toggle.checked = false;
      return;
    }

    const diff = alarmDateTime.getTime() - now.getTime();
    setTimeout(() => {
      const audio = new Audio(music);
      audio.play();
      setTimeout(() => audio.pause(), 10 * 60 * 1000); // Play for 10 minutes
    }, diff);

    alert(`Alarm set for ${day} at ${time}.`);
  }
}

function removeContainer(button) {
  button.closest('.alarm-container').remove();
  alarmCount--;
}
