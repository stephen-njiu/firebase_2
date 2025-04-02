// Get the element
// add event listener
// whenever the element is clicked, console the input.value


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")


addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value
  console.log(inputValue)
})