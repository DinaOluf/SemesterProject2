export const API_URL = "https://nf-api.onrender.com";

export const REG_URL = `${API_URL}/api/v1/auction/auth/register`;
export const LOGIN_URL = `${API_URL}/api/v1/auction/auth/login`;
export const LISTINGS_URL = `${API_URL}/api/v1/auction/listings?sort=created&sortOrder=desc&_seller=true`;

export const LISTING_URL = `${API_URL}/api/v1/auction/listings/`;
//<ID>?_seller=true&_bids=true
//<ID>/bids
