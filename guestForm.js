// 65130500094 Chanapol Puntuvadee
// import { createGuestList } from './data/guestdata.js'
const createGuestList = require('./data/guestdata.js')
//
const guestList = createGuestList()
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList

  // 1. register event for searching and adding
  function registerEventHandling() {
    const input = document.getElementById('search-input')
    const addbutton = document.getElementById('add-guest-btn')
    input.addEventListener('keyup', (event) => {
      searchGuest(event)
    })
    addbutton.addEventListener('click', () => {
      addGuest()
    })
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const displayarea = document.getElementById('display-area')
    //create new <div>
    const newGuestDiv = document.createElement('div')

    //create new <span>
    const newGuestItem = document.createElement('span')
    newGuestItem.textContent = `${guestItem.firstname} ${guestItem.lastname}`
    newGuestDiv.appendChild(newGuestItem)

    //create remove button
    const removeButton = document.createElement('span')
    removeButton.innerHTML = '[X]'
    removeButton.className = 'remove-icon'
    removeButton.setAttribute(
      'id',
      `${guestItem.firstname}-${guestItem.lastname}`
    )
    removeButton.setAttribute('style', 'cursor:pointer;color:red')
    removeButton.addEventListener('click', removeGuest)
    newGuestDiv.appendChild(removeButton)
    displayarea.appendChild(newGuestDiv)
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const displayArea = document.getElementById('display-area')
    while (displayArea.firstChild) {
      displayArea.removeChild(displayArea.firstChild)
    }
    guestResult.forEach((guest) => {
      displayGuest(guest)
    })
  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    const searchInput = guests.searchGuests(event.target.value)
    displayGuests(searchInput)
  }

  // 5. Function to add a new guest
  function addGuest() {
    const firstnameInput = document.getElementById('firstname-input')
    const lastnameInput = document.getElementById('lastname-input')
    const firstname = firstnameInput.value.trim()
    const lastname = lastnameInput.value.trim()
    const newGuestObject = guests.addNewGuest(firstname, lastname)
    displayGuest(newGuestObject[newGuestObject.length - 1])
    firstnameInput.value = ''
    lastnameInput.value = ''
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    const removeIcon = event.target
    const guestDiv = removeIcon.parentNode
    const guestName = guestDiv.firstChild.textContent.split(' ')
    const deleteGuest = {
      firstname: guestName[0],
      lastname: guestName[1]
    }

    // Remove guest from the list using GuestManagement class
    guestList.removeGuest(deleteGuest)

    // Remove the guest div element from the display area
    const displayArea = document.getElementById('display-area')
    displayArea.removeChild(guestDiv)
  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest
  }
}
module.exports = guestForm
// export { guestForm }
// const { registerEventHandling, displayGuests } = guestForm()
// registerEventHandling()
// displayGuests(guestList.getAllGuests())
