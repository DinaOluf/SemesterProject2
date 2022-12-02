
//Connect this directly to pages with search function

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

export function search(e){
    e.prevent.default;
    window.location(`./../../search.html?search="${searchInput.value}"`);
}

searchForm.addEventListener("submit", search);