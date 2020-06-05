let addToy = false;
const toyURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.querySelectorAll(".add-toy-form")[0]

  toyForm.addEventListener('submit', function(event){
    event.preventDefault();
    const name = event.target.name.value
    event.target.name.value = ''
    const image = event.target.image.value
    event.target.image.value = ''

    const configureObject = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    }

    fetch(toyURL, configureObject)
    .then(response => response.json())
    .then(json => toyCard(json))
  });

  // pre code
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // end of pre code

  function getToys(){
    fetch(toyURL)
    .then(response => response.json())
    .then(json => {
      for(toy of json) {
        toyCard(toy)
      }
    })
  }

  function toyCard(toy) {
    const newToy = document.createElement("div")
    newToy.className = "card"
    const name = document.createElement("h2")
    name.textContent = toy.name
    const image = document.createElement("img")
    image.src = toy.image
    image.className = "toy-avatar"
    const likes = document.createElement("p")
    likes.textContent = `${toy.likes} Likes`
    const button = document.createElement("button")
    button.textContent = "Like"
    button.className = "like-btn"
    button.id = toy.id

    button.addEventListener('click', function(event){
      const id = event.target.id
      const likes = parseInt(event.target.parentElement.querySelector('p').textContent.split(" ")[0]) + 1
      const configureObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likes
        })
      }
      fetch(toyURL + "/" + id, configureObject)
      .then(response => response.json())
      .then(json => {
        document.getElementById(json.id).parentElement.querySelector('p').textContent = `${json.likes} Likes`
      })
      .catch(json => json.error)
    })

    newToy.appendChild(name)
    newToy.appendChild(image)
    newToy.appendChild(likes)
    newToy.appendChild(button)
    toyCollection.appendChild(newToy)
  }

  getToys();
});

function cl(input) {
  console.log(input)
}
