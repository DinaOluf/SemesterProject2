import { renderPostsWoBids } from "./renderHTML.js";

export function renderProfile(profile) {
  console.log(profile);

  //Place profile Image if any
  const profileImage = document.querySelector("#profileImage");
  profileImage.classList.remove("placeholder");
  if (profile.avatar === null || profile.avatar === "") {
    profileImage.src = "./assets/icons/profile-icon.png";
  } else {
    profileImage.src = profile.avatar;
    profileImage.onerror = "this.src='./assets/icons/profile-icon.png'";
  }

  //Place user Name
  const userName = document.querySelector("#profileName");
  userName.classList.remove("placeholder");
  userName.innerHTML = profile.name;

  //Place Credit amount
  const credits = document.querySelector("#credits");
  const creditsContainer = document.querySelector(".credits-wrap");
  creditsContainer.classList.remove("placeholder");
  credits.innerHTML = profile.credits;
  creditsContainer.innerHTML += `<img src="./assets/icons/currency-icon.png" class="currency-icon ms-1">`;

  //Place Listings amount
  const listings = document.querySelector("#listings");
  const listingsContainer = document.querySelector(".listings-wrap");
  listingsContainer.classList.remove("placeholder");
  listings.innerHTML = profile.listings.length;

  //Render listings
  renderPostsWoBids(profile);
}
