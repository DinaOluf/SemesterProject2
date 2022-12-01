import { LISTINGS_URL, LISTING_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderPosts } from "./modules/renderHTML.js";
import { splitStringToArray } from "./modules/splitStringToArray.js";

//Check if accessToken
if (!localStorage.getItem("accessToken")) {
  window.location.href = "./welcome.html";
}

//get listings
const listings = await doFetch(LISTINGS_URL, "GET");
console.log(listings); //Remove later
renderPosts(listings);

//post auction listing
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


//edit and delete post
const editPosts = document.querySelectorAll("#editPost");

function editForm(e) {
  const postID = e.target.value;

  console.log(postID); //make URL with ID
  
  //Make form/modal appear with Bootstrap (plan 2: addElement)

  //Use postID to get the listing information and paste the info it to the form

  //eventListener for submit --- Can I have an eventListener inside and eventListener?

  //doFetch(URL, "PUT", object)
}

editPosts.forEach((post) => {
  post.addEventListener("click", editForm);
});

