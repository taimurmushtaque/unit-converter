/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    themeBtn.classList.add("theme-dark")
  }
})

const themeBtn = document.querySelector(".theme-btn")
const localStorageTheme = localStorage.getItem("theme")
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")

let currentThemeSetting = localStorageTheme || (systemSettingDark.matches ? "dark" : "light")

document.documentElement.setAttribute("data-theme", currentThemeSetting)

themeBtn.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark"
  localStorage.setItem("theme", newTheme)
  document.documentElement.setAttribute("data-theme", newTheme)
  currentThemeSetting = newTheme
  themeBtn.classList.toggle("theme-dark")
})

const main = document.getElementById("main")
function render() {
  main.innerHTML = `
    <div class="input-box">
      <h1>Metric/Imperial Unit Conversion</h1>
      <label for="input-value">Value:</label>
      <input type="text" id="input-value" autocomplete="off" aria-label="Enter a value to convert">
      <button id="convert-btn">Convert</button>
    </div>
    <div class="convert-box">
      <div class="conversion">
        <h3 class="convert-head">Length (Meter/Feet)</h3>
        <p id="length" aria-live="polite" aria-relevant="text"></p>
      </div>
      <div class="conversion">
        <h3 class="convert-head">Volume (Liters/Gallons)</h3>
        <p id="volume" aria-live="polite" aria-relevant="text"></p>
      </div>
      <div class="conversion">
        <h3 class="convert-head">Mass (Kilograms/Pounds)</h3>
        <p id="mass" aria-live="polite" aria-relevant="text"></p>
      </div>
    </div>
  `
}

render();

const inputElement = document.getElementById("input-value")
let inputValue = inputElement.value
const convertBtn = document.getElementById("convert-btn")
const lengthTag = document.getElementById("length")
const volumeTag = document.getElementById("volume")
const massTag = document.getElementById("mass")

convertMeter = (value) => {
    const feet = value * 3.281
    return feet.toFixed(3)
}

convertFeet = (value) => {
    const meter = value * 0.304
    return meter.toFixed(3)
}

convertLiters = (value) => {
    const gallon = value * 0.264
    return gallon.toFixed(3)
}

convertGallons = (value) => {
    const liter = value * 3.785
    return liter.toFixed(3)
}

convertKilograms = (value) => {
    const pounds = value * 0.453
    return pounds.toFixed(3)
}

convertPounds = (value) => {
    const kilograms = value * 2.204
    return kilograms.toFixed(3)
}

inputElement.addEventListener("input", () => {
  inputValue = inputElement.value
  const errorElement = document.createElement("div")
  errorElement.className = "error-message"
  errorElement.style.color = "var(--text-color)"

  // Remove any existing error message elements
  const existingErrorElement = inputElement.parentNode.querySelector(".error-message")
  if (existingErrorElement) {
    existingErrorElement.remove()
  }

  if (isNaN(inputValue)) {
    errorElement.textContent = "Please enter a valid number"
    inputElement.parentNode.appendChild(errorElement)
  }
})

inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    convertBtn.click()
  }
})

convertBtn.addEventListener("click", () => {
  if (isNaN(inputValue)) {
      return
  } else {
    const meter = convertMeter(inputValue)
    const feet = convertFeet(inputValue)
    const liters = convertLiters(inputValue)
    const gallons = convertGallons(inputValue)
    const kilograms = convertKilograms(inputValue)
    const pounds = convertPounds(inputValue)

    lengthTag.innerHTML = `${inputValue} meters = ${feet} feet | ${inputValue} feet = ${meter} meters`
    volumeTag.innerHTML = `${inputValue} liters = ${gallons} gallons | ${inputValue} gallons = ${liters} liters`
    massTag.innerHTML = `${inputValue} kilos = ${pounds} pounds | ${inputValue} pounds = ${kilograms} kilograms`
  }
})