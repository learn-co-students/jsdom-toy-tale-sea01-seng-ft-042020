let addToy = false;
let form;

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => { 
    // debugger;
    data.forEach(toy => createToyCard(toy))
    });
};

function addLike(toy){
  newLikes = toy.likes + 1;
  let postUrl = `http://localhost:3000/toys/${toy.id}`;
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: newLikes})
  };
  fetch(postUrl, configObj)
  .then(resp => resp.json())
  .then(obj => createToyCard(obj))
  // .catch(error => alert(error.message));
  document.location.reload();
}

function addNewToy(){
  newLikes = toy.likes + 1;
  let postUrl = `http://localhost:3000/toys/${toy.id}`;
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: newLikes})
  };
  fetch(postUrl, configObj)
  .then(resp => resp.json())
  .then(obj => createToyCard(obj))
  .catch(error => alert(error.message));
};

function createToyCard(toy) {
  let toyCollection = document.getElementById("toy-collection")
  let card = document.createElement("div");
  card.class = "card";
  let image = document.createElement("img");
  image.src = toy.image;
  let name = document.createElement("h2");
  name.innerText = toy.name;
  let likes = document.createElement("p");
  likes.innerText = `likes: ${toy.likes}`;
  let button = document.createElement("button");
  button.class = "likes-btn";
  button.innerText = "Like <3";
  button.addEventListener("click", () => {
    addLike(toy);
    ;
  });

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(likes);
  card.appendChild(button);
  toyCollection.appendChild(card);
}
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  form = document.getElementsByClassName('add-toy-form')[0];

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()

  form.addEventListener('submit', event => {
    event.preventDefault();
    let formData = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    fetch("http://localhost:3000/toys", configObj)
    .then(res => res.json())
    .then(obj => createToyCard(obj))
    .catch(error => alert(error.message))
    // debugger;
  });
});