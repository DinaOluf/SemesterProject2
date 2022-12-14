import { ACTIVE_URL, PROFILE_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderSearchPosts } from "./modules/renderHTML.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const search = params.get("search").toLowerCase();

//See if logged in - display appropriate content in heading
const headerSideWrap = document.querySelector("#headerSideWrap");
if (localStorage.getItem("accessToken")) {
  const ME_URL = PROFILE_URL + localStorage.getItem("name");
  const localProfile = await doFetch(ME_URL, "GET");

  headerSideWrap.innerHTML = `<a
    class="nav-link dropdown-toggle me-3"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
  ${
    localProfile.avatar
      ? `<img
    src="${localProfile.avatar}"
    alt="Empty profile picture, as well as dropdown menu"
    id="header-profile-icon"
    class="rounded-circle"
    onerror="this.src='./assets/icons/profile-icon.png'"
  />`
      : `<img
    src="./assets/icons/profile-icon.png"
    alt="Empty profile picture, as well as dropdown menu"
    id="header-profile-icon"
    class="rounded-circle"
  />`
  }
  </a>
  <ul
    class="dropdown-menu dropdown-menu-end"
    aria-labelledby="dropdownAccountButton"
  >
    <li><a class="dropdown-item" href="./profile.html">Profile</a></li>
    <li class="dropdown-item" id="logOut">Log Out</li>
  </ul>`;

  const logOutBtn = document.querySelector("#logOut");
  logOutBtn.addEventListener("click", logOut);
} else {
  headerSideWrap.innerHTML = `<a
    class="btn btn-primary me-2 text-secondary border border-secondary"
    href="./login.html"
    >Log in</a
  >`;
}

function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("name");

  window.location.href = "./welcome.html";
}

//Show search term in heading
const searchHeading = document.querySelector("#searchHeading");
searchHeading.classList.remove("placeholder");
searchHeading.innerHTML = `Search "${search}"`;

//GET listings
const listings = await doFetch(ACTIVE_URL, "GET");

const searchedListings = [];

//Filter after search param first
function filterSearch(listings) {
  for (let i = 0; i < listings.length; i++) {
    const postTitle = listings[i].title.toLowerCase();
    const tags = listings[i].tags;
    const seller = listings[i].seller.name.toLowerCase();

    if (
      postTitle.includes(search) ||
      (listings[i].description && listings[i].description.includes(search)) ||
      (tags[0] && tags[0].toLowerCase() === search) ||
      (tags[1] && tags[1].toLowerCase() === search) ||
      (tags[2] && tags[2].toLowerCase() === search) ||
      (tags[3] && tags[3].toLowerCase() === search) ||
      (tags[4] && tags[4].toLowerCase() === search) ||
      (tags[5] && tags[5].toLowerCase() === search) ||
      (tags[6] && tags[6].toLowerCase() === search) ||
      (tags[7] && tags[7].toLowerCase() === search) ||
      seller.includes(search)
    ) {
      searchedListings.push(listings[i]);
    }
  }

  renderSearchPosts(searchedListings);
}

filterSearch(listings);

if (searchedListings.length === 0) {
  const postsContainer = document.querySelector(".posts-container");
  postsContainer.innerHTML = `(0 results)`;
  postsContainer.classList.add("text-secondary", "text-center");
}

//Click arrow in footer = scroll to top
const arrowUp = document.querySelector("#arrowUp");

arrowUp.onclick = function () {
  window.scrollTo(0, 0);
};
