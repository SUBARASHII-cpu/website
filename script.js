// Copy Discord username to clipboard
document.getElementById('discord-copy').addEventListener('click', function() {
  navigator.clipboard.writeText('subarashii#5555');
  alert('Discord username copied to clipboard!');
});

// Display FPS (Frames Per Second)
let fpsElement = document.getElementById('fps');
let lastFrame = performance.now();
let frameCount = 0;
let fps = 0;

function calculateFPS() {
  let now = performance.now();
  frameCount++;
  if (now - lastFrame >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastFrame = now;
  }
  requestAnimationFrame(calculateFPS);
}

calculateFPS();

// Display memory usage
function updateMemoryUsage() {
  if (performance.memory) {
      let usedJSHeapSize = (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2);
      return usedJSHeapSize + ' MB';
  } else {
      return 'Not available';
  }
}

// Get CHF to USD conversion
async function fetchCurrencyRate() {
  try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/CHF');
      const data = await response.json();
      const rate = data.rates.USD;
      return `1 CHF = ${rate} USD`;
  } catch (error) {
      return 'Error fetching rate';
  }
}

// Get system information
async function getSystemInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const availableMemory = navigator.deviceMemory || 'N/A';
  const numberOfCores = navigator.hardwareConcurrency || 'N/A';
  const browserName = navigator.appName;
  const browserVersion = navigator.appVersion;
  const currentTime = new Date().toLocaleTimeString();
  const memoryUsage = updateMemoryUsage();
  const currencyRate = await fetchCurrencyRate();

  return `
      <strong>Screen Resolution:</strong> ${screenWidth} x ${screenHeight} <br><br>
      <strong>Browser:</strong> ${browserName} ${browserVersion} <br><br>
      <strong>Platform:</strong> ${platform} <br><br>
      <strong>Available Memory:</strong> ${availableMemory} GB <br><br>
      <strong>CPU Cores:</strong> ${numberOfCores} <br><br>
      <strong>Current Time:</strong> ${currentTime} <br><br>
      <strong>FPS:</strong> ${fps} <br><br>
      <strong>Memory Usage:</strong> ${memoryUsage} <br><br>
      <strong>CHF to USD:</strong> ${currencyRate}
  `;
}

// Display system information
async function displaySystemInfo() {
  document.getElementById('system-info').innerHTML = await getSystemInfo();
}

displaySystemInfo();
setInterval(displaySystemInfo, 1000);
