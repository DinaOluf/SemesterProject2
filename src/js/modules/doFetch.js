/**
 * Gets the API endpoint with accessToken
 * @param {string} url the url to the API endpoint
 * @param {string} method the method you want to use (GET/POST/PUT/DELETE)
 * @returns {object} object from API
 * @example
 * ```js
 * // Use this function to fetch from the API endpoint.
 * const data = await getWithToken(API_ENDPOINT_URL, "GET");
 * ```
 */

//DOUBLE CHECK JSDocs

export async function doFetch(url, method) {
  try {
    const token = localStorage.getItem("accessToken");

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
