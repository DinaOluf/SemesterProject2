import { LISTINGS_URL, LISTING_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderSearchPosts } from "./modules/renderHTML.js";

// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const search = params.get("search");

//GET listings
const listings = await doFetch(LISTINGS_URL, "GET");
console.log(listings); //Remove later

//Filter after search param first

// renderSearchPosts(listings);