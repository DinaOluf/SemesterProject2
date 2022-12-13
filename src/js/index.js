import {
  ACTIVE_URL,
  LISTINGS_URL,
  LISTING_URL,
  PROFILE_URL,
} from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderPosts } from "./modules/renderHTML.js";
import { splitStringToArray } from "./modules/splitStringToArray.js";

//Check if accessToken
if (!localStorage.getItem("accessToken")) {
  window.location.href = "./welcome.html";
}

//Display profile image in heading
const profileImage = document.querySelector("#header-profile-icon");
const ME_URL = PROFILE_URL + localStorage.getItem("name");
const localProfile = await doFetch(ME_URL, "GET");

if (localProfile.avatar) {
  profileImage.src = localProfile.avatar;
}

//LOG OUT
const logOutBtn = document.querySelector("#logOut");

function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("name");

  window.location.href = "./welcome.html";
}

logOutBtn.addEventListener("click", logOut);

//GET listings
const listings = await doFetch(LISTINGS_URL, "GET");
console.log(listings); //Remove later

//Filter by active only
const filterSelect = document.querySelector("#filterSelect");
async function filterActive() {
  if (filterSelect.value === "default") {
    const listings = await doFetch(LISTINGS_URL, "GET");
    renderPosts(listings);
  }

  if (filterSelect.value === "active") {
    const activeListings = await doFetch(ACTIVE_URL, "GET");
    renderPosts(activeListings);
  }

  if (filterSelect.value === "title") {
    console.log("title");

    listings.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    renderPosts(listings);
  }

  if (filterSelect.value === "username") {
    console.log("username");

    listings.sort(function (a, b) {
      if (a.seller.name < b.seller.name) {
        return -1;
      }
      if (a.seller.name > b.seller.name) {
        return 1;
      }
      return 0;
    });

    renderPosts(listings);
  }

  const editPost = document.querySelectorAll("#editPost");
  editPost.forEach((post) => {
    post.addEventListener("click", listenForEditSubmit);
  });

  const removePost = document.querySelectorAll("#removePost");
  removePost.forEach((post) => {
    post.addEventListener("click", deleteConfirm);
  });
}

filterActive();
filterSelect.addEventListener("change", filterActive);

//POST auction listing
const titleInput = document.querySelector("#titleInput");
const dateInput = document.querySelector("#dateInput");
const descInput = document.querySelector("#descInput");
const imageInput = document.querySelector("#imageInput");
const tagsInput = document.querySelector("#tagsInput");
const auctionForm = document.querySelector("#auctionForm");

dateInput.min = new Date().toJSON().slice(0, -8);

async function listItem(e) {
  e.preventDefault();

  const tagsArray = splitStringToArray(tagsInput.value);
  let info = {};

  if (imageInput.value !== "") {
    info = {
      title: titleInput.value, // Required
      endsAt: new Date(dateInput.value), // Required - Instance of new Date()
      media: [imageInput.value], // Optional
      description: descInput.value, // Optional
      tags: tagsArray, // optional
    };
  } else {
    info = {
      title: titleInput.value, // Required
      endsAt: new Date(dateInput.value), // Required - Instance of new Date()
      description: descInput.value, // Optional
      tags: tagsArray, // optional
    };
  }

  const sentPost = await doFetch(LISTING_URL, "POST", info);

  //Feedback
  const errorFeedback = document.querySelector(".errorFeedback");

  if (!sentPost.errors) {
    errorFeedback.style.padding = "0";
    errorFeedback.style.border = "0";
    errorFeedback.innerHTML = ``;
  }

  if (sentPost.errors) {
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

  const titleInput = document.querySelector(`#editTitleInput${myID}`);
  const descInput = document.querySelector(`#editDescInput${myID}`);
  const imageInput = document.querySelector(`#editImageInput${myID}`);
  const tagsInput = document.querySelector(`#editTagsInput${myID}`);

  const tagsArray = splitStringToArray(tagsInput.value);
  const ID_URL = LISTING_URL + myID;

  const info = {
    title: titleInput.value,
    media: [imageInput.value],
    description: descInput.value,
    tags: tagsArray,
  };

  const sentPost = await doFetch(ID_URL, "PUT", info);

  //Feedback
  const errorFeedback = document.querySelector(`.editErrorFeedback${myID}`);

  if (!sentPost.errors) {
    errorFeedback.style.padding = "0";
    errorFeedback.style.border = "0";
    errorFeedback.innerHTML = ``;
  }

  if (sentPost.errors) {
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

//DELETE auction listing
async function deleteListing(id) {
  const ID_URL = LISTING_URL + id;
  await doFetch(ID_URL, "DELETE");

  window.location.reload();
}

function deleteConfirm(e) {
  let deleteID = e.target.value;
  const response = confirm("Are you sure you want to delete this listing?");
  if (response) {
    deleteListing(deleteID);
  }
}

//Click arrow in footer = scroll to top
const arrowUp = document.querySelector("#arrowUp");

arrowUp.onclick = function () {
  window.scrollTo(0, 0);
};
