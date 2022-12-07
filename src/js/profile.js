import { LISTING_URL, PROFILE_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderProfile } from "./modules/renderProfile.js";
import { splitStringToArray } from "./modules/splitStringToArray.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const profileName = params.get("name");

const localUser = localStorage.getItem("name");

if(!profileName) {
    const MY_URL = PROFILE_URL + localUser + "?_listings=true";
    const profile = await doFetch(MY_URL, "GET");
    renderProfile(profile);
} else {
    const MY_URL = PROFILE_URL + profileName + "?_listings=true";
    const profile = await doFetch(MY_URL, "GET");
    renderProfile(profile);
}

//EDIT profile Image


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