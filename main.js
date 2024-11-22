/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    button.classList.add("theme-dark")
  }
})

const button = document.querySelector(".theme-btn")
const localStorageTheme = localStorage.getItem("theme")
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")

let currentThemeSetting = localStorageTheme || (systemSettingDark.matches ? "dark" : "light")

document.documentElement.setAttribute("data-theme", currentThemeSetting)

button.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark"
  localStorage.setItem("theme", newTheme)
  document.documentElement.setAttribute("data-theme", newTheme)
  currentThemeSetting = newTheme
  button.classList.toggle("theme-dark")
})

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

convertBtn.addEventListener("click", () => {
        inputValue = Number(inputValue)
        const meter = convertMeter(inputValue)
        const feet = convertFeet(inputValue)
        const liters = convertLiters(inputValue)
        const gallons = convertGallons(inputValue)
        const kilograms = convertKilograms(inputValue)
        const pounds = convertPounds(inputValue)
    
        lengthTag.innerHTML = `${inputValue} meters = ${feet} feet | ${inputValue} feet = ${meter} meters`
        volumeTag.innerHTML = `${inputValue} liters = ${gallons} gallons | ${inputValue} gallons = ${liters} liters`
        massTag.innerHTML = `${inputValue} kilos = ${pounds} pounds | ${inputValue} pounds = ${kilograms} kilograms`
})