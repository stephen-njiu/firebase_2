// Get all imports
import { add } from "/functions.js"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";


const appSettings = {
  databaseURL: ""
}

/* 
Firebase settings
*/

const app = initializeApp(appSettings)
// console.log(app)
const database = getDatabase(app);
// console.log(database)
const shoppingListDb = ref(database, "shoppingLIst")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

const shoppingLIstEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value
  if (inputValue){
    push(shoppingListDb, inputValue)
  }
  // create innerhtml to append the value to the list
  // appendItemToshoppingListEl(inputValue)
  // clearing the value of the input
  clearInputFieldEl()
})

onValue(shoppingListDb, function(snapshot){
  if (snapshot.exists()){ 
    let itemsArray = Object.entries(snapshot.val())
    if (itemsArray){
      clearShoppingListEl()
      for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToshoppingListEl(currentItem)
      }
    }
  } else {
    shoppingLIstEl.innerHTML = "No Data Avaialble..."
  }
})

function clearShoppingListEl() {
  shoppingLIstEl.innerHTML = ""
}


function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToshoppingListEl(item) {
  if (item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingLIstEl.append(newEl)
    newEl.addEventListener("click", function(){
      let exactLocationOfItemInDB = ref(database, `shoppingLIst/${itemID}`)
      remove(exactLocationOfItemInDB)
      // console.log(exactLocationOfItemInDB)
      // console.log(remove(exactLocationOfItemInDB))
      
    })
  }
}