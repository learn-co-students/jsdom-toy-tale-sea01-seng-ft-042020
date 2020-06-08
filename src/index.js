let addToy = false;
const TOYSURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.getElementsByClassName('add-toy-form')[0]

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    let name = event.target.name.value
    // ^^ grabs user input, saves to variable
    event.target.name.value = ''
    // ^^ clears the form itself, which users like

    let image = event.target.image.value
    event.target.image.value = ''

    let configObject = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({"name":name, "image":image, "likes": 0})
    }

    fetch(TOYSURL, configObject)
    .then(response=>response.json())
    .then(json=>buildToyCard(json))
  })

  // pre-existing code
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // pre-existing code above

  function buildToyCard(toy) {
    let newToy = document.createElement('div')
    newToy.className = 'card'

    let toyId = document.createElement('h2')
    toyId.className = "id"
    toyId.textContent = toy["id"]
    toyId.hidden = true

    let toyName = document.createElement('h2')
    toyName.textContent = toy["name"]

    let likes = document.createElement('p')
    likes.innerHTML = `Likes: <span>${toy.likes}</span>`

    let image = document.createElement('img')
    image.src = toy.image
    image.className = "toy-avatar"

    let btn = document.createElement('button')
    btn.className = 'like-btn'
    btn.innerText = 'Like <3'
    addLikeListener(btn)

    newToy.appendChild(toyId)
    newToy.appendChild(toyName)
    newToy.appendChild(likes)
    newToy.appendChild(image)
    newToy.appendChild(btn)

    toyCollection.appendChild(newToy)
  }

  function fetchToys() {
    fetch(TOYSURL)
      .then(response => response.json())
      .then(json => {
        json.forEach(toy => {
          buildToyCard(toy)
        })
      })
  }

  // Like button event listener
  function addLikeListener(button) {
    button.addEventListener('click', function(event) {
      let toyId = event.target.parentElement.querySelector(".id").textContent
      let likes = parseInt(event.target.parentElement.children[2].lastChild.innerText) + 1

      let configObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
          },
          body: JSON.stringify({"likes": likes})
      }

      fetch(TOYSURL + "/" + toyId, configObject)
      .then(response=>response.json())
      .then(json=>event.target.parentElement.children[2].lastChild.innerText = likes)
    })
  }

  // Load Toys on page load
  fetchToys()

});