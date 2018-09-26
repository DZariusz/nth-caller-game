"use strict"

document.addEventListener("DOMContentLoaded", () => {

  // Grab DOM items
  let newMerkleRoot = document.getElementById('new-root')
  let merkleRoot = document.getElementById('merkleRoot')
  let balance = document.getElementById('balance')
  let resultP = document.getElementById('status')
  let rootCounter = document.getElementById('rootCounter')

  // Event Listeners
  document.getElementById('register').addEventListener('click', register)
  document.getElementById('call').addEventListener('click', call)
  document.getElementById('counter').addEventListener('click', counter)

  /**
   * Grabs gameId and winning number of calls from DOM and registers
   * a new game contract
   */
  function register(){
    // Validate form data
    if (newMerkleRoot.value === ""){
      alert("GameId and Winning Caller are required. No Game Registered.")
      return
    }

    // Setup the request
    let body = {
      root: newMerkleRoot.value
    }

    // Actually send it
    makePost('/register', body)
    .then(data => {
      console.log(data.message)
    })

    // Clear the DOM to prevent double posts
    newMerkleRoot.value = ""
  }

  /**
   * Grabs gameId and username from DOM and calls the
   * corresponding game. Reports result in DOM.
   */
  function call(){
    // Validate form data
    if (merkleRoot.value === "") {
      alert("GameId is required. No Call Made.")
      return
    }

    // Setup the request
    let body = {
      root: merkleRoot.value,
      balance: balance.value,
    }

    // Actually send it
    makePost('/call', body)
    .then(data => {

      // See whether we found any data
      if (!data.success) {
        alert("Voting error")
      }
      else {
        resultP.innerHTML = data.message
      }
    })
  }

  function counter(){
    // Validate form data
    if (rootCounter.value === "") {
      alert("rootCounter is required. No Call Made.")
      return
    }

    // Setup the request
    let body = {
      root: rootCounter.value
    }

    // Actually send it
    makePost('/counter', body)
    .then(data => {

      // See whether we found any data
      if (!data.success) {
        console.log(data);
        alert("Counter error")
      }
      else {
        resultP.innerHTML = data.message
      }
    })
  }

  /**
   * Abstract the boring part of making a post request
   * @param route The request destination as a string. ex: '/call'
   * @param body An object of the data to be passed
   * @return A promise for a response object
   */
  function makePost(route, body){
    let request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    }

    return fetch(route, request)
    .then(res => {return res.json()})
  }
})
