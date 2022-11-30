
export function renderPosts(posts) {
    const postsContainer = document.querySelector(".posts-container");
    const localUser = localStorage.getItem("name");
    postsContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
        postsContainer.innerHTML += `
        <div class="card bg-dark py-2 mb-4">
              <div class="d-flex justify-content-between">
                <div id="tags" class="px-2">
                ${
                    posts[i].tags[0]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[0]}
                        </div>`
                      : ``
                  }
                </div>
                <div class="owners-options mx-2">
                ${
                    localUser === posts[i].seller.name
                      ? `<div class="post-options" data-author="${posts[i].seller.name}">
                      <div class="dropdown d-flex justify-content-end">
                          <div type="button" class="dropdown-toggle mt-1" class="rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src="./assets/components/icons/options-icon.png" alt="edit wheel for posts"  width="40" height="40">
                          </div>
                          <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                              <li><button class="dropdown-item" id="editPost">Edit Post</button></li>
                              <li><button class="dropdown-item" id="removePost"> Delete post</button></li>
                          </ul>
                      </div>
                  </div>`
                      : ``
                  }
                </div>
              </div>
              <div class="ps-2 d-flex align-items-center">
                <div class="d-flex align-items-center text-secondary">
                  <a
                    href="./profile.html?name=${posts[i].seller.name}"
                    class="text-decoration-none d-flex align-items-center"
                  >
                  ${
                    posts[i].seller.avatar !== ""
                      ? `<img src="${posts[i].seller.avatar}" class="profile-images rounded-circle" onerror="this.src='./../../../assets/icons/profile-icon.png'">`
                      : `<img src="./../../../assets/icons/profile-icon.png" class="profile-images rounded-circle">`
                  }
                  <h2 id="userName" class="h3 m-0 ms-2 fs-4">
                    ${posts[i].seller.name}
                  </h2>
                  </a>
                </div>
                <a href="./listing.html?id=${posts[i].id}" class="text-light text-decoration-none ms-2 fs-4">- ${posts[i].title}</a>
              </div>
              ${
                posts[i].media[0]
                  ? `<a href="./listing.html?id=${posts[i].id}"><div
                        class="listings-images mt-2 w-100 overflow-hidden position-relative"
                    >
                        <img
                            src="${posts[i].media[0]}"
                            class="position-absolute bottom-0 text-secondary"
                        />
                    </div></a>`
                  : ``
              }
              ${
                posts[i].description
                  ? `<div class="listings-descriptions mx-2 mt-2">
                        ${posts[i].description}
                    </div>`
                  : ``
              }

              <div class="text-secondary mx-2 mt-2 d-flex">
              ${
                posts[i]._count.bids === 0
                  ? `<div class="bids-count text-danger">${posts[i]._count.bids} bid(s)</div>`
                  : `<div class="bids-count text-secondary">${posts[i]._count.bids} bid(s)</div>`
              }
                <div class="dates-end ms-1">- End: ${posts[i].endsAt}</div>
              </div>
            </div>
        `
        if(i === 50) {
            break;
        }


    }
}


// ... ignore!! Here for reference.

        // const cardDiv = document.createElement("div");
        // const tagsOptionsWrap = document.createElement("div");
        // const tagsWrap = document.createElement("div");
        // const options = document.createElement("div");
        // const avatarNameItem = document.createElement("div");
        // const avatarName = document.createElement("div");

        // cardDiv.className = "card bg-dark py-2";
        // tagsOptionsWrap.className = "d-flex justify-content-between";
        // tagsWrap.id = "tags";
        // tagsWrap.className = "px-2";
        // options.className = "owners-options mx-2";
        // avatarNameItem.className = "ps-2 d-flex align-items-center";
        // avatarName.className = "d-flex align-items-center text-secondary avatar-name";

        // postsContainer.appendChild(cardDiv);

        // //tags and options
        // cardDiv.appendChild[i](tagsOptionsWrap);
        // tagsOptionsWrap.appendChild(tagsWrap);
        // tagsOptionsWrap.appendChild(options);

        // //avatar, name and item
        // cardDiv.appendChild(avatarNameItem);
        // avatarNameItem.appendChild(avatarName);


        // // postsContainer.innerHTML += `
        // //     `