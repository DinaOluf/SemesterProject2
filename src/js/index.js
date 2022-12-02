import { LISTINGS_URL, LISTING_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderPosts } from "./modules/renderHTML.js";
import { splitStringToArray } from "./modules/splitStringToArray.js";

//Check if accessToken
if (!localStorage.getItem("accessToken")) {
  window.location.href = "./welcome.html";
}

//GET listings
const listings = await doFetch(LISTINGS_URL, "GET");
console.log(listings); //Remove later
renderPosts(listings);

//POST auction listing
const titleInput = document.querySelector("#titleInput");
const dateInput = document.querySelector("#dateInput");
const descInput = document.querySelector("#descInput");
const imageInput = document.querySelector("#imageInput");
const tagsInput = document.querySelector("#tagsInput");
const auctionForm = document.querySelector("#auctionForm");

async function listItem(e) {
  e.preventDefault();

  const tagsArray = splitStringToArray(tagsInput.value);

  const info = {
    "title": titleInput.value, // Required
    "endsAt": dateInput.value, // Required - Instance of new Date()
    "media": [imageInput.value], // Optional
    "description": descInput.value, // Optional
    "tags": tagsArray, // optional
  }

  const sentPost = await doFetch(LISTING_URL, "POST", info);

  //Feedback
  const errorFeedback = document.querySelector(".errorFeedback");

  if (!sentPost.errors) {
    errorFeedback.style.padding = "0";
    errorFeedback.style.border = "0";
    errorFeedback.innerHTML = ``;
  }

  if(sentPost.errors) {
    errorFeedback.style.padding = ".5rem";
    errorFeedback.style.border = "solid 1px #bea6ff";
    errorFeedback.innerHTML = `${sentPost.errors[0].message}`;
  } else {
    auctionForm.reset();
    window.location.reload();
  }
}

auctionForm.addEventListener("submit", listItem);


//EDIT auction listing
let myID = ""; //Variable that will hold the ID of the post you want to edit/delete

async function editListing(e) {
  e.preventDefault();

const titleInput = document.querySelector("#editTitleInput");
const descInput = document.querySelector("#editDescInput");
const imageInput = document.querySelector("#editImageInput");
const tagsInput = document.querySelector("#editTagsInput");

  const tagsArray = splitStringToArray(tagsInput.value);
  const ID_URL = LISTING_URL + myID;

  const info = {
    "title": titleInput.value, 
    "media": [imageInput.value], 
    "description": descInput.value, 
    "tags": tagsArray, 
  }

  const sentPost = await doFetch(ID_URL, "PUT", info);

  //Feedback
  const errorFeedback = document.querySelector(".editErrorFeedback");

  if (!sentPost.errors) {
    errorFeedback.style.padding = "0";
    errorFeedback.style.border = "0";
    errorFeedback.innerHTML = ``;
  }

  if(sentPost.errors) {
    errorFeedback.style.padding = ".5rem";
    errorFeedback.style.border = "solid 1px #bea6ff";
    errorFeedback.innerHTML = `${sentPost.errors[0].message}`;
  } else {
    window.location.reload(); // Or send to post page instead !!
  }
}

function listenForEditSubmit(e) {
  myID = e.target.value;
  const editForm = document.querySelector("#editForm");
  editForm.addEventListener("submit", editListing);
}

const editPost = document.querySelectorAll("#editPost");

editPost.forEach((post) => {
  post.addEventListener("click", listenForEditSubmit);
});


//DELETE auction listing -- Add modal
async function deleteListing(e) {
  let deleteID = e.target.value;
  const ID_URL = LISTING_URL + deleteID;

  const sentPost = await doFetch(ID_URL, "DELETE");

  if (!sentPost.errors) {
    window.location.reload();
  }
}

const removePost = document.querySelectorAll("#removePost");
removePost.forEach((post) => {
  post.addEventListener("click", deleteListing);
});