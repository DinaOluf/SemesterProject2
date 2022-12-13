//Connect this directly to pages with search function

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

export function search(e) {
  e.preventDefault();
  location.href = `./search.html?search=${searchInput.value}`;
}

searchForm.addEventListener("submit", search);
