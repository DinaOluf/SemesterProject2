/**
 * Sign up user
 * @param {string} url the url to the API endpoint
 * @param {object} userData an object with name, email, password
 * @example
 * ```js
 * // Use this function to sign up a user
 * postWithToken(REG_URL, userData);
 * ```
 */

 export async function loginSignup(url, userData) {
    try {
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(url, postData);
      const json = await response.json();

      console.log(json);
  
      //FEEDBACK TO USER
  
      if (json.errors) {
        const errorFeedback = document.querySelector(".errorFeedback");
        errorFeedback.style.padding = ".5rem";
        errorFeedback.style.border = "solid 1px #bea6ff"
        errorFeedback.innerHTML = `${json.errors[0].message}`
      } else if (location.href.endsWith("/signup.html")) {
        window.location.href = "./login.html";
      } else if (location.href.endsWith("/login.html")) {
        const accessToken = json.accessToken;
        const userName = json.name;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("name", userName);

        window.location.href = "./index.html";
      }
    } catch (error) {
      console.log(error);
    }
  }
