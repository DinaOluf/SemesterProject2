import { LISTING_URL, PROFILE_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderProfile } from "./modules/renderProfile.js";
import { splitStringToArray } from "./modules/splitStringToArray.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const profileName = params.get("name");

//Check if accessToken
if (!localStorage.getItem("accessToken")) {
  window.location.href = "./welcome.html";
}

const localUser = localStorage.getItem("name");

const USER_URL = PROFILE_URL + localUser;
const user = await doFetch(USER_URL, "GET");
const headerProfileIcon = document.querySelector("#header-profile-icon");
headerProfileIcon.src = user.avatar;

if(!profileName || profileName === localUser) {
    const MY_URL = PROFILE_URL + localUser + "?_listings=true";
    const profile = await doFetch(MY_URL, "GET");
    renderProfile(profile);

    const editPost = document.querySelectorAll("#editPost");
    editPost.forEach((post) => {
    post.addEventListener("click", listenForEditSubmit);
    });
  
    const removePost = document.querySelectorAll("#removePost");
    removePost.forEach((post) => {
    post.addEventListener("click", deleteListing);
    });

} else {
    const MY_URL = PROFILE_URL + profileName + "?_listings=true";
    const profile = await doFetch(MY_URL, "GET");
    renderProfile(profile);
}

//EDIT profile Image
  if (!profileName || profileName === localUser) {
    const editImageBtn = document.querySelector("#editImageBtn");

    editImageBtn.classList.remove("disabled");
    editImageBtn.innerHTML += `<img src="./assets/icons/options-icon.png" id="imageOption" height="25" width="25" class="position-absolute bottom-0">`;
  }

  async function editProfileImage(e) {
    e.preventDefault();

    const editImageInput = document.querySelector("#editImageInput");
    const IMAGE_URL = PROFILE_URL + localUser + "/media";

    const info = {
      "avatar": `${editImageInput.value}`
    }

    const response = await doFetch(IMAGE_URL, "PUT", info);

    //Feedback
    const imageErrorFeedback= document.querySelector(`#editImageError`);

    if (!response.errors) {
      imageErrorFeedback.style.padding = "0";
      imageErrorFeedback.style.border = "0";
      imageErrorFeedback.innerHTML = ``;
    }

    if(response.errors) {
      imageErrorFeedback.style.padding = ".5rem";
      imageErrorFeedback.style.border = "solid 1px #bea6ff";
      imageErrorFeedback.innerHTML = `${response.errors[0].message}`;
    } else {
      window.location.reload(); 
    }
  }

  const editImageForm = document.querySelector("#editImageForm");
  editImageForm.addEventListener("submit", editProfileImage);
  

//EDIT auction listing
let myID = ""; //Variable that will hold the ID of the post you want to edit/delete

async function editListing(e) {
  e.preventDefault();

const titleInput = document.querySelector(`#editTitleInput${myID}`);
const descInput = document.querySelector(`#editDescInput${myID}`);
const imageInput = document.querySelector(`#editImageInput${myID}`);
const tagsInput = document.querySelector(`#editTagsInput${myID}`);

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
  const errorFeedback = document.querySelector(`.editErrorFeedback${myID}`);

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

  const editForm = document.querySelector(`#editForm${myID}`);
  editForm.addEventListener("submit", editListing);
}



//DELETE auction listing -- Add modal
async function deleteListing(e) {
  let deleteID = e.target.value;
  const ID_URL = LISTING_URL + deleteID;

  const sentPost = await doFetch(ID_URL, "DELETE");

  if (!sentPost.errors) {
    window.location.reload();
  }
}
