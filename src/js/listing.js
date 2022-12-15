import { LISTING_URL, PROFILE_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { splitStringToArray } from "./modules/splitStringToArray.js";
import { formatDate } from "./modules/timeDate.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//Get localUser
const localUserName = localStorage.getItem("name");
const USER_API = PROFILE_URL + localUserName;
const localUser = await doFetch(USER_API, "GET");

//Check if accessToken
if (!localStorage.getItem("accessToken")) {
  window.location.href = "./welcome.html";
}

//LOG OUT
const logOutBtn = document.querySelector("#logOut");

function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("name");

  window.location.href = "./welcome.html";
}

logOutBtn.addEventListener("click", logOut);

//Display profile image in heading
const profileImage = document.querySelector("#header-profile-icon");
const ME_URL = PROFILE_URL + localUserName;
const localProfile = await doFetch(ME_URL, "GET");

if (localProfile.avatar) {
  profileImage.src = localProfile.avatar;
}

//Get listing
const LISTING_ID_URL = LISTING_URL + id + "?_seller=true&_bids=true";
const listing = await doFetch(LISTING_ID_URL, "GET");
document.title = "Pearls | listing | " + listing.title;

//Place title
const listingName = document.querySelector("#listingName");
listingName.classList.remove("placeholder");
listingName.innerHTML = listing.title;

//Place tags if any
const tagsContainer = document.querySelector("#tags");

for (let i = 0; i < listing.tags.length; i++) {
  if (listing.tags.length > 0 && listing.tags[0] !== "") {
    tagsContainer.innerHTML += `<div
        class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mx-1 m-auto"
      >
        ${listing.tags[i]}
      </div>`;
  }
}

//Place profile link
document.querySelector(
  "#userLink"
).href = `./profile.html?name=${listing.seller.name}`;

//Place user image if any
const userImage = document.querySelector("#userImage");
userImage.classList.remove("placeholder");
if (listing.seller.avatar === null || listing.seller.avatar === "") {
  userImage.src = "./assets/icons/profile-icon.png";
} else {
  userImage.src = listing.seller.avatar;
  userImage.onerror = "this.src='./assets/icons/profile-icon.png'";
}

//Place username
const userName = document.querySelector("#userName");
userName.classList.remove("placeholder");
userName.innerHTML = listing.seller.name;

//Place owner options if owner
const ownersOptions = document.querySelector(".owners-options");
if (localStorage.getItem("name") === listing.seller.name) {
  ownersOptions.innerHTML = `<div class="post-options" data-author="${
    listing.seller.name
  }">
    <div class="dropdown d-flex justify-content-end">
      <div type="button" class="dropdown-toggle" class="rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="./assets/icons/options-icon.png" alt="edit wheel for posts"  width="28" height="28">
      </div>
      <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
          <li><button class="dropdown-item" id="editPost" data-bs-toggle="modal" data-bs-target="#editModal" value="${
            listing.id
          }">Edit Post</button></li>
          <li><button class="dropdown-item" id="removePost" value="${
            listing.id
          }"> Delete post</button></li>
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
                  <button id="editFormButton" type="submit" for="editForm" class="btn btn-primary border border-secondary text-secondary" value="${
                    listing.id
                  }">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>`;
}

//Place image if any
const listingImage = document.querySelector("#listingImage");
const imageWrap = document.querySelector(".listing-image");
if (listing.media[0]) {
  listingImage.src = listing.media[0];
  listingImage.onerror = "imageWrap.remove()";
  listingImage.classList.remove("placeholder");
} else {
  imageWrap.remove();
}

//Place description if any
const listingDescription = document.querySelector(".listings-descriptions");
if (listing.description) {
  listingDescription.classList.remove("placeholder");
  listingDescription.innerHTML = listing.description;
} else {
  listingDescription.remove();
}

//Bids counter
const bidsCounter = document.querySelector(".bids-count");
bidsCounter.classList.remove("placeholder");
bidsCounter.innerHTML = `${listing._count.bids} bid(s)`;
if (listing._count.bids === 0) {
  bidsCounter.classList.add("text-danger");
} else {
  bidsCounter.classList.add("text-secondary");
}

//Date
const dateEnd = document.querySelector(".dates-end");
dateEnd.classList.remove("placeholder");
dateEnd.innerHTML = `- Ends: ${formatDate(new Date(listing.endsAt))}`;
if (new Date(listing.endsAt) < new Date()) {
  dateEnd.classList.add("text-danger");
}

//Render bids -or- message that there is none
const bidsContainer = document.querySelector("#bids");
if (listing.bids.length > 0) {
  for (let i = listing.bids.length - 1; i >= 0; i--) {
    const BIDDER_URL = PROFILE_URL + listing.bids[i].bidderName;
    const bidderProfile = await doFetch(BIDDER_URL, "GET");

    if (listing.bids[i] === listing.bids[listing.bids.length - 6]) {
      break;
    }

    bidsContainer.innerHTML += `${
      listing.bids[i] === listing.bids[listing.bids.length - 1]
        ? `<div class="card bg-dark border border-secondary mb-3 py-2">`
        : `<div class="card bg-dark mb-3 py-2">`
    }
        <div class="ps-2 d-flex align-items-center">
          <a
            href="./profile.html?name=${listing.bids[i].bidderName}"
            class="text-decoration-none d-flex align-items-center"
          >
          ${
            bidderProfile.avatar !== ""
              ? `<img src="${bidderProfile.avatar}" class="profile-images rounded-circle" onerror="this.src='./assets/icons/profile-icon.png'">`
              : `<img src="./assets/icons/profile-icon.png" class="profile-images rounded-circle">`
          }
            <div class="m-0 ms-2 fw-bold">
            ${listing.bids[i].bidderName}
            </div>
          </a>
          <div class="ms-3">Bid: <span class="bid">${
            listing.bids[i].amount
          }</span><img src="./assets/icons/currency-icon.png" class="currency-icon ms-1"></div>
        </div>
      </div>`;
  }
} else {
  bidsContainer.innerHTML = `<div class="d-flex justify-content-center p-2 bg-secondary rounded border border-primary">
    <div class="text-primary">No bid has been made.</div>
  </div>`;
}

//Place bid form -or- message that time has ran out
const makeBidContainer = document.querySelector(".make-bid");
if (new Date(listing.endsAt) < new Date()) {
  makeBidContainer.innerHTML = `<div class="d-flex justify-content-center p-2 bg-danger rounded border border-primary">
    <div class="text-primary">Time has ran out for this listing.</div>
  </div>`;
}
if (localUserName === listing.seller.name) {
  makeBidContainer.innerHTML = "";
} else if (new Date(listing.endsAt) > new Date()) {
  makeBidContainer.innerHTML = `<h2 class="fs-3 text-uppercase">Want to make a bid?</h2>
    <div class="card bg-dark py-3 px-4">
      <div id="bidFeedback" class="d-flex justify-content-center text-center rounded text-danger border-danger"></div>
      <div class="fs-5">Amount</div>
      <form id="bidForm" class="d-flex gap-2">
        <input id="bidInput" title="must be more than highest bid" class="bg-secondary search-input text-dark form-control mh-100" />
        <button id="bidBtn" type="submit" class="btn btn-primary border border-secondary text-secondary py-1 w-75">Send bid</button>
      </form>
      <div class="text-secondary fs-6">Your credits: <span id="creditAmount">${localUser.credits}</span><img src="./assets/icons/currency-icon.png" class="currency-icon ms-1"></div>
    </div>`;
}

const bidForm = document.querySelector("#bidForm");

async function makeBid(e) {
  e.preventDefault();

  const bidInput = document.querySelector("#bidInput");
  const bidFeedback = document.querySelector("#bidFeedback");
  const BID_URL = LISTING_URL + id + "/bids";

  const bid = {
    amount: Number(bidInput.value),
  };

  const postBid = await doFetch(BID_URL, "POST", bid);
  if (postBid.errors) {
    bidFeedback.style.padding = ".5rem";
    bidFeedback.style.border = "solid 1px #bea6ff";
    bidFeedback.innerHTML = `${postBid.errors[0].message}`;
  } else {
    bidFeedback.innerHTML = "";
    bidFeedback.style.padding = "0";
    bidFeedback.style.border = "0";
    window.location.reload();
  }
}

if (bidForm) {
  bidForm.addEventListener("submit", makeBid);
}

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
    title: titleInput.value,
    media: [imageInput.value],
    description: descInput.value,
    tags: tagsArray,
  };

  const sentPost = await doFetch(ID_URL, "PUT", info);

  //Feedback
  const errorFeedback = document.querySelector(".editErrorFeedback");

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
    window.location.reload();
  }
}

function listenForEditSubmit(e) {
  myID = e.target.value;
  const editForm = document.querySelector("#editForm");
  editForm.addEventListener("submit", editListing);
}

if (localStorage.getItem("name") === listing.seller.name) {
  const editPost = document.querySelector("#editPost");
  editPost.addEventListener("click", listenForEditSubmit);
}

//DELETE auction listing
async function deleteListing(id) {
  const ID_URL = LISTING_URL + id;
  await doFetch(ID_URL, "DELETE");

  window.location.href = "./index.html";
}

function deleteConfirm(e) {
  let deleteID = e.target.value;
  const response = confirm("Are you sure you want to delete this listing?");
  if (response) {
    deleteListing(deleteID);
  }
}

if (localStorage.getItem("name") === listing.seller.name) {
  const removePost = document.querySelector("#removePost");
  removePost.addEventListener("click", deleteConfirm);
}

//Click arrow in footer = scroll to top
const arrowUp = document.querySelector("#arrowUp");

arrowUp.onclick = function () {
  window.scrollTo(0, 0);
};
