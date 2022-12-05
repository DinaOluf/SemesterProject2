import { LISTING_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { splitStringToArray } from "./modules/splitStringToArray.js";
import { formatDate } from "./modules/timeDate.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//Get listing
const LISTING_ID_URL = LISTING_URL + id + "?_seller=true&_bids=true";
const listing = await doFetch(LISTING_ID_URL, "GET");
console.log(listing)

//Place title 
const listingName = document.querySelector("#listingName");
listingName.classList.remove("placeholder");
listingName.innerHTML = listing.title;

//Place tags if any
const tagsContainer = document.querySelector("#tags");

for(let i = 0; i < listing.tags.length; i++) {
        tagsContainer.innerHTML += `<div
        class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mx-1 m-auto"
      >
        ${listing.tags[i]}
      </div>`
}

//Place profile link
document.querySelector("#userLink").href = `./profile.html?name=${listing.seller.name}`;

//Place user image if any
const userImage = document.querySelector("#userImage");
userImage.classList.remove("placeholder");
if(listing.seller.avatar !== null) {
    userImage.src = listing.seller.avatar;
    userImage.onerror = "this.src='./../../../assets/icons/profile-icon.png'";
} else {
    userImage.src = "./assets/icons/profile-icon.png";
}

//Place username 
const userName = document.querySelector("#userName");
userName.classList.remove("placeholder");
userName.innerHTML = listing.seller.name;


//Place owner options if owner
const ownersOptions = document.querySelector(".owners-options");
if(localStorage.getItem("name") === listing.seller.name){
    ownersOptions.innerHTML = `<div class="post-options" data-author="${listing.seller.name}">
    <div class="dropdown d-flex justify-content-end">
      <div type="button" class="dropdown-toggle" class="rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="./../../../assets/icons/options-icon.png" alt="edit wheel for posts"  width="28" height="28">
      </div>
      <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
          <li><button class="dropdown-item" id="editPost" data-bs-toggle="modal" data-bs-target="#editModal" value="${listing.id}">Edit Post</button></li>
          <li><button class="dropdown-item" id="removePost" value="${listing.id}"> Delete post</button></li>
      </ul>
      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-uppercase" id="editModalLabel">Edit Listing</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="editErrorFeedback"></div>
              <form id="editForm" class="row flex-column flex-nowrap mh-100">
                <div class="col-12 col-sm-10 col-md-8">
                  <label for="editTitleInput">Title</label>
                  <input
                    id="editTitleInput"
                    class="bg-secondary p-1 rounded form-control text-dark"
                    value="${listing.title}"
                    title="max 280 characters"
                  />
                </div>
                <div class="mt-3">
                  <label for="editDescInput">Description</label>
                  <textarea
                    id="editDescInput"
                    class="bg-secondary p-1 rounded form-control text-dark"
                    title="max 280 characters"
                  >${listing.description}</textarea>
                </div>
                <div class="mt-3">
                  <label for="editImageInput"
                    >Image Direct Link
                    <span class="text-secondary"
                      >(generate on
                      <a href="https://postimages.org/"  target="_blank">PostImages.org</a
                      >)</span
                    ></label
                  >
                  <input
                    id="editImageInput"
                    class="bg-secondary p-1 rounded form-control text-dark"
                    value="${listing.media[0]}"
                    title="must be direct image link"
                  />
                </div>
                <div class="col-12 col-sm-10 col-md-8 mt-3">
                  <label for="editTagsInput"
                    >Tags
                    <span class="text-secondary"
                      >(separated by comma, eg. "Pearl, Ring")</span
                    ></label
                  >
                  <input
                    id="editTagsInput"
                    class="bg-secondary p-1 rounded form-control text-dark"
                    value="${String(listing.tags)}"
                    title="max 8 tags"
                  />
                </div>
                <div class="modal-footer mt-4 pb-0">
                  <button type="button" class="btn btn-dark border border-danger text-danger" data-bs-dismiss="modal">Close</button>
                  <button id="editFormButton" type="submit" for="editForm" class="btn btn-primary border border-secondary text-secondary" value="${listing.id}">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>`
}

//Place image if any
const listingImage = document.querySelector("#listingImage");
const imageWrap = document.querySelector(".listing-image");
if(listing.media[0]) {
    listingImage.src = listing.media[0];
    listingImage.onerror = "imageWrap.remove()";
    listingImage.classList.remove("placeholder");
} else {
    imageWrap.remove();
}

//Place description if any
const listingDescription = document.querySelector(".listings-descriptions");
if(listing.description){
    listingDescription.classList.remove("placeholder");
    listingDescription.innerHTML = listing.description;
} else {
    listingDescription.remove();
}


//Bids
const bidsCounter = document.querySelector(".bids-count");
bidsCounter.classList.remove("placeholder");
bidsCounter.innerHTML = `${listing._count.bids} bid(s)`
if(listing._count.bids === 0) {
    bidsCounter.classList.add("text-danger");
} else {
    bidsCounter.classList.add("text-secondary");
}

//Date
const dateEnd = document.querySelector(".dates-end");
dateEnd.classList.remove("placeholder");
dateEnd.innerHTML = `- Ends: ${formatDate(new Date(listing.endsAt))}`
if(new Date(listing.endsAt) < new Date()) {
    dateEnd.classList.add("text-danger");
}

//Render bids -or- message that there is none


//Place bid form -or- message that time has ran out


//EDIT auction listing
let myID = ""; //Variable that will hold the ID of the post you want to edit

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
    window.location.reload(); 
  }
}

function listenForEditSubmit(e) {
  myID = e.target.value;
  const editForm = document.querySelector("#editForm");
  editForm.addEventListener("submit", editListing);
}

if(localStorage.getItem("name") === listing.seller.name) {
const editPost = document.querySelector("#editPost");
editPost.addEventListener("click", listenForEditSubmit);
}


//DELETE auction listing -- Add "are you sure?"-modal
async function deleteListing(e) {
  const deleteID = e.target.value;
  const ID_URL = LISTING_URL + deleteID;

  const sentPost = await doFetch(ID_URL, "DELETE");

  if (!sentPost.errors) {
    window.location.reload();
  }
}

if(localStorage.getItem("name") === listing.seller.name) {
    const removePost = document.querySelector("#removePost");
    removePost.addEventListener("click", deleteListing);
}
