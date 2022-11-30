import { LISTINGS_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderPosts } from "./modules/renderHTML.js";

//Check if accessToken
if (!localStorage.getItem("accessToken")) {
  window.location.href = "./welcome.html";
}

const listings = await doFetch(LISTINGS_URL, "GET");
console.log(listings);
renderPosts(listings);
