let addToy = false;
const TOYSURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.getElementsByClassName('add-toy-form')[0]
  const likeBtn = document.querySelectorAll(".like-btn")

  form.addEventListener('submit', function(event) {
    event.preventDefault()

    let name = event.target.name.value
    event.target.name.value = ''

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
  
// provided code

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

// provided code

function buildToyCard(toy) {
  let newToy = document.createElement('div')
  newToy.className = 'card'
  
  let toyName = document.createElement('h2')
  toyName.textContent = `${toy.name}`

  let toyLikes = document.createElement('p')
  toyLikes.id = `likes_${toy.id}`
  toyLikes.innerText = `${toy.likes}`
  

  let image = document.createElement('img')
  image.src = toy.image
  image.className = "toy-avatar"

  let likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.id = `${toy.id}`
  likeBtn.innerText = 'Like <3'
  likeBtn.addEventListener('click', (event) => {
    addLike(toy);
  })

  newToy.appendChild(toyName)
  newToy.appendChild(toyLikes)
  newToy.appendChild(image)
  newToy.appendChild(likeBtn)

  toyCollection.appendChild(newToy)

}

// update likes
// updates API but not DOM
function addLike(toy) {
  let likeId = toy.id
  let numLikes = document.getElementById(`likes_${likeId}`)
  let newLikes = parseInt(numLikes.innerText)
  newLikes++
  numLikes.innerText = newLikes

  let configObject = {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({"likes": numLikes.innerText}),
  }
    fetch(`${TOYSURL}/${likeId}`, configObject)
    .then(response=>response.json())
    .then(json=> (numLikes.innerText = json.likes ))

}


  function getToys() {
    fetch(TOYSURL)
    .then(response => response.json())
    .then(json => {
      json.forEach(toy => {
        buildToyCard(toy)
      })
    })
  }


getToys()


});