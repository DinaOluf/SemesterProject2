import { PROFILE_URL } from "./modules/api.js";
import { doFetch } from "./modules/doFetch.js";
import { renderProfile } from "./modules/renderProfile.js";

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

