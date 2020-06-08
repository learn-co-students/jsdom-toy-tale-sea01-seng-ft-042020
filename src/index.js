//Elements from DOM and URLs(unchanging)
let addToy = false;
const TOYS = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const toyCollect = document.getElementById("toy-collection");
  const form = document.getElementsByClassName("add-toy-form")[0];
  //pre-existing
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //end pre-existing

  //building DOM
  function buildToyCard(toy) {
    //create ele/assign value and properties
    let toyDivTag = document.createElement("div");
    toyDivTag.className = "card";
    let toyName = document.createElement("h2");
    toyName.innerText = toy.name;
    let image = document.createElement("img");
    image.src = toy.image;
    image.className = "toy-avatar";
    let likes = document.createElement("p");
    likes.innerHTML = `${toy.name} has <span id=${toy.id}_likes>${toy.likes}</span> likes.`;
    let btn = document.createElement("button");
    btn.innerText = "Like!";
    btn.id = toy.id;
    btn.className = "toy-like-btn";

    //collect ele
    elements = [toyName, image, likes, btn];

    //iterate to append sub-eles to card div
    for (const element of elements) {
      toyDivTag.appendChild(element);
    }
    //append built toy card to collection div
    toyCollect.appendChild(toyDivTag);
    btn.addEventListener("click", handleLike);
  }
  //Communications with Server
  function fetchAllToys() {
    return fetch(TOYS)
      .then((res) => res.json())
      .then((object) => {
        object.forEach((toy) => {
          // console.log(toy)
          buildToyCard(toy);
        });
      });
  }
  function postToy(newToyInfo) {
    let configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToyInfo), // an object
    };
    fetch(TOYS, configObject) // currently save empty string to database, but wont render them on the page.
      .then((res) => {
        if (res.status == 201) {
          return res.json();
        } else {
          console.log("Error!");
        }
      })
      .then((object) => {
        if (object.name !== "" && object.image !== "") {
          buildToyCard(object);
        }
      })
      .catch((error) => {
        alert(`${error.message}`);
      });
  }
  function updateToy(toyId) {
    let toyLikes = document.getElementById(`${toyId}_likes`).innerText; //selects the innerText (a string) of the span element contain he like count
    // console.log(typeof toyLikes)
    let configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: Number(toyLikes), //not super necessary but makes sure the number saved to the DB is an integer instead of string
      }),
    };
    fetch(`${TOYS}/${toyId}`, configObject)
      .then((res) => {
        if (res.status == 201) {
        }
        return res.json();
      })
      .catch((error) => alert(`${error.message}`));
  }
  //event handlers
  function handleSubmit(e) {
    // console.log(e.target.name.value, e.target.image.value)
    e.preventDefault();
    let formData = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };
    postToy(formData);
    e.target.name.value = "";
    e.target.image.value = "";
  }
  function handleLike(e) {
    e.preventDefault();
    console.log(e.target);
    let toyId = e.target.id;
    e.target.parentNode.children[2].children[0].innerText++;
    updateToy(toyId);
  }
  //event listeners
  form.addEventListener("submit", handleSubmit);

  // toyButtons.forEach(button => {
  //   console.log(button)
  // })

  //function calls
  fetchAllToys();
});
