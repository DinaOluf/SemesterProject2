import { formatDate } from "./timeDate.js";

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
                ${
                  posts[i].tags[1]
                    ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[1]}
                        </div>`
                    : ``
                }
                ${
                  posts[i].tags[2]
                    ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[2]}
                        </div>`
                    : ``
                }
                ${
                  posts[i].tags[3]
                    ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[3]}
                        </div>`
                    : ``
                }
                ${
                  posts[i].tags[4]
                    ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[4]}
                        </div>`
                    : ``
                }
                ${
                  posts[i].tags[5]
                    ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[5]}
                        </div>`
                    : ``
                }
                ${
                  posts[i].tags[6]
                    ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[6]}
                        </div>`
                    : ``
                }
                ${
                  posts[i].tags[7]
                    ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                        ${posts[i].tags[7]}
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
                            <img src="./assets/icons/options-icon.png" alt="edit wheel for posts"  width="28" height="28">
                        </div>
                        <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                            <li><button class="dropdown-item" id="editPost" data-bs-toggle="modal" data-bs-target="#editModal" value="${posts[i].id}">Edit Post</button></li>
                            <li><button class="dropdown-item" id="removePost" value="${posts[i].id}"> Delete post</button></li>
                        </ul>
                        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content bg-dark">
                              <div class="modal-header">
                                <h1 class="modal-title fs-5 text-uppercase" id="editModalLabel">Edit Listing</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <div class="editErrorFeedback"></div>
                                <form id="editForm" class="row flex-column flex-nowrap mh-100">
                                  <div class="col-12 col-sm-10 col-md-8">
                                    <label for="editTitleInput">Title</label>
                                    <input
                                      id="editTitleInput"
                                      class="bg-secondary p-1 rounded form-control text-dark"
                                      value="${posts[i].title}"
                                      title="max 280 characters"
                                    />
                                  </div>
                                  <div class="mt-3">
                                    <label for="editDescInput">Description</label>
                                    <textarea
                                      id="editDescInput"
                                      class="bg-secondary p-1 rounded form-control text-dark"
                                      title="max 280 characters"
                                    >${posts[i].description}</textarea>
                                  </div>
                                  <div class="mt-3">
                                    <label for="editImageInput"
                                      >Image Direct Link
                                      <span class="text-secondary"
                                        >(generate on
                                        <a href="https://postimages.org/"  target="_blank">PostImages.org</a
                                        >)</span
                                      ></label
                                    >
                                    <input
                                      id="editImageInput"
                                      class="bg-secondary p-1 rounded form-control text-dark"
                                      value="${posts[i].media[0]}"
                                      title="must be direct image link"
                                    />
                                  </div>
                                  <div class="col-12 col-sm-10 col-md-8 mt-3">
                                    <label for="editTagsInput"
                                      >Tags
                                      <span class="text-secondary"
                                        >(separated by comma, eg. "Pearl, Ring")</span
                                      ></label
                                    >
                                    <input
                                      id="editTagsInput"
                                      class="bg-secondary p-1 rounded form-control text-dark"
                                      value="${String(posts[i].tags)}"
                                      title="max 8 tags"
                                    />
                                  </div>
                                  <div class="modal-footer mt-4 pb-0">
                                    <button type="button" class="btn btn-dark border border-danger text-danger" data-bs-dismiss="modal">Close</button>
                                    <button id="editFormButton" type="submit" for="editForm" class="btn btn-primary border border-secondary text-secondary" value="${posts[i].id}">Save changes</button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>`
                    : ``
                }
                </div>
              </div>
              <div class="name-and-title ps-2 d-flex">
                <div class="d-flex align-items-center text-secondary">
                  <a
                    href="./profile.html?name=${posts[i].seller.name}"
                    class="text-decoration-none d-flex align-items-center"
                  >
                  ${
                    posts[i].seller.avatar !== ""
                      ? `<img src="${posts[i].seller.avatar}" class="profile-images rounded-circle" onerror="this.src='./assets/icons/profile-icon.png'">`
                      : `<img src="./assets/icons/profile-icon.png" class="profile-images rounded-circle">`
                  }
                  <h2 id="userName" class="h3 m-0 ms-2 me-1 fs-4">
                    ${posts[i].seller.name}
                  </h2>
                  </a>
                </div>
                <a href="./listing.html?id=${posts[i].id}" class="text-light text-decoration-none ms-1 my-2 fs-4">| ${posts[i].title}</a>
              </div>
              ${
                posts[i].media[0]
                  ? `<a href="./listing.html?id=${posts[i].id}"><div
                        class="listings-images mt-2 w-100 overflow-hidden position-relative"
                    >
                        <img
                            src="${posts[i].media[0]}"
                            class="position-absolute bottom-0 text-secondary"
                            onerror="this.parentElement.remove()"
                        />
                    </div></a>`
                  : ``
              }
              ${
                posts[i].description
                  ? `<div class="listings-descriptions ms-3 mx-2 mt-2">
                        ${posts[i].description}
                    </div>`
                  : ``
              }

              <div class="text-secondary mx-2 mt-2 row justify-content-start">
              ${
                posts[i]._count.bids === 0
                  ? `<div class="bids-count text-danger p-0 col-3 col-md-2 col-xxl-1">${posts[i]._count.bids} bid(s)</div>`
                  : `<div class="bids-count text-secondary p-0 col-3 col-md-2 col-xxl-1">${posts[i]._count.bids} bid(s)</div>`
              }
              ${
                new Date(posts[i].endsAt) > new Date()
                  ? `<div class="dates-end p-0 col">- Ends: ${formatDate(new Date(posts[i].endsAt))}</div>`
                  : `<div class="dates-end text-danger p-0 col">- Ends: ${formatDate(new Date(posts[i].endsAt))}</div>`
              }
              </div>
            </div>
        `;
    if (i === 50) {
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

export function renderSearchPosts(posts) {
  const postsContainer = document.querySelector(".posts-container");
  postsContainer.innerHTML = "";

  //If user is logged in they can view listing in detail and seller's profile
  if (localStorage.getItem("accessToken")) {
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
                  ${
                    posts[i].tags[1]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[1]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[2]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[2]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[3]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[3]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[4]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[4]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[5]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[5]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[6]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[6]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[7]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[7]}
                          </div>`
                      : ``
                  }
                  </div>
                  <div class="owners-options mx-2">
                  </div>
                </div>
                <div class="name-and-title ps-2 d-flex">
                  <div class="d-flex align-items-center text-secondary">
                    <a
                      href="./profile.html?name=${posts[i].seller.name}"
                      class="text-decoration-none d-flex align-items-center"
                    >
                    ${
                      posts[i].seller.avatar !== ""
                        ? `<img src="${posts[i].seller.avatar}" class="profile-images rounded-circle" onerror="this.src='./assets/icons/profile-icon.png'">`
                        : `<img src="./assets/icons/profile-icon.png" class="profile-images rounded-circle">`
                    }
                    <h2 id="userName" class="h3 m-0 ms-2 me-1 fs-4">
                      ${posts[i].seller.name}
                    </h2>
                    </a>
                  </div>
                  <a href="./listing.html?id=${posts[i].id}" class="text-light text-decoration-none ms-1 my-2 fs-4">| ${posts[i].title}</a>
                </div>
                ${
                  posts[i].media[0]
                    ? `<a href="./listing.html?id=${posts[i].id}"><div
                          class="listings-images mt-2 w-100 overflow-hidden position-relative"
                      >
                          <img
                              src="${posts[i].media[0]}"
                              class="position-absolute bottom-0 text-secondary"
                              onerror="this.parentElement.remove()"
                          />
                      </div></a>`
                    : ``
                }
                ${
                  posts[i].description
                    ? `<div class="listings-descriptions ms-3 mx-2 mt-2">
                          ${posts[i].description}
                      </div>`
                    : ``
                }
  
                <div class="text-secondary mx-2 mt-2 row justify-content-start">
                ${
                  posts[i]._count.bids === 0
                    ? `<div class="bids-count text-danger p-0 col-3 col-md-2 col-xxl-1">${posts[i]._count.bids} bid(s)</div>`
                    : `<div class="bids-count text-secondary p-0 col-3 col-md-2 col-xxl-1">${posts[i]._count.bids} bid(s)</div>`
                }
                ${
                  new Date(posts[i].endsAt) > new Date()
                    ? `<div class="dates-end p-0 col">- Ends: ${formatDate(new Date(posts[i].endsAt))}</div>`
                    : `<div class="dates-end text-danger p-0 col">- Ends: ${formatDate(new Date(posts[i].endsAt))}</div>`
                }
                </div>
              </div>
          `;
      if (i === 50) {
        break;
      }
    }
  } else {
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
                  ${
                    posts[i].tags[1]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[1]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[2]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[2]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[3]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[3]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[4]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[4]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[5]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[5]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[6]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[6]}
                          </div>`
                      : ``
                  }
                  ${
                    posts[i].tags[7]
                      ? `<div class="badge bg-secondary text-primary text-lowercase rounded-pill px-3 py-2 mb-2">
                          ${posts[i].tags[7]}
                          </div>`
                      : ``
                  }
                  </div>
                  <div class="owners-options mx-2">
                  </div>
                </div>
                <div class="name-and-title ps-2 d-flex">
                  <div class="d-flex align-items-center text-secondary">
                    <div
                      class="text-decoration-none d-flex align-items-center"
                    >
                    ${
                      posts[i].seller.avatar !== ""
                        ? `<img src="${posts[i].seller.avatar}" class="profile-images rounded-circle" onerror="this.src='./assets/icons/profile-icon.png'">`
                        : `<img src="./assets/icons/profile-icon.png" class="profile-images rounded-circle">`
                    }
                    <h2 id="userName" class="h3 m-0 ms-2 me-1 fs-4">
                      ${posts[i].seller.name}
                    </h2>
                    </div>
                  </div>
                  <span class="text-light text-decoration-none ms-1 my-2 fs-4">| ${posts[i].title}</span>
                </div>
                ${
                  posts[i].media[0]
                    ? `<div
                          class="listings-images mt-2 w-100 overflow-hidden position-relative"
                      >
                          <img
                              src="${posts[i].media[0]}"
                              class="position-absolute bottom-0 text-secondary"
                              onerror="this.parentElement.remove()"
                          />
                      </div>`
                    : ``
                }
                ${
                  posts[i].description
                    ? `<div class="listings-descriptions ms-3 mx-2 mt-2">
                          ${posts[i].description}
                      </div>`
                    : ``
                }
  
                <div class="text-secondary mx-2 mt-2 row justify-content-start">
                ${
                  posts[i]._count.bids === 0
                    ? `<div class="bids-count text-danger p-0 col-3 col-md-2 col-xxl-1">${posts[i]._count.bids} bid(s)</div>`
                    : `<div class="bids-count text-secondary p-0 col-3 col-md-2 col-xxl-1">${posts[i]._count.bids} bid(s)</div>`
                }
                ${
                  new Date(posts[i].endsAt) > new Date()
                    ? `<div class="dates-end p-0 col">- Ends: ${formatDate(new Date(posts[i].endsAt))}</div>`
                    : `<div class="dates-end text-danger p-0 col">- Ends: ${formatDate(new Date(posts[i].endsAt))}</div>`
                }
                </div>
              </div>
          `;
      if (i === 50) {
        break;
      }
    }
  }
}

export function renderPostsWoTags(user) {
  const postsContainer = document.querySelector(".posts-container");
  const localUser = localStorage.getItem("name");
  postsContainer.innerHTML = "";

  for (let i = user.listings.length - 1; i >= 0; i--) {
    postsContainer.innerHTML += `
        <div class="card bg-dark py-2 mb-4">
              <div class="d-flex justify-content-between">
                <div id="tags" class="px-2">
                </div>
                <div class="owners-options mx-2">
                ${
                  localUser === user.name
                    ? `<div class="post-options" data-author="${user.name}">
                      <div class="dropdown d-flex justify-content-end">
                        <div type="button" class="dropdown-toggle mt-1" class="rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="./assets/icons/options-icon.png" alt="edit wheel for posts"  width="28" height="28">
                        </div>
                        <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
                            <li><button class="dropdown-item" id="editPost" data-bs-toggle="modal" data-bs-target="#editModal" value="${user.listings[i].id}">Edit Post</button></li>
                            <li><button class="dropdown-item" id="removePost" value="${user.listings[i].id}"> Delete post</button></li>
                        </ul>
                        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content bg-dark">
                              <div class="modal-header">
                                <h1 class="modal-title fs-5 text-uppercase" id="editModalLabel">Edit Listing</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <div class="editErrorFeedback"></div>
                                <form id="editForm" class="row flex-column flex-nowrap mh-100">
                                  <div class="col-12 col-sm-10 col-md-8">
                                    <label for="editTitleInput">Title</label>
                                    <input
                                      id="editTitleInput"
                                      class="bg-secondary p-1 rounded form-control text-dark"
                                      value="${user.listings[i].title}"
                                      title="max 280 characters"
                                    />
                                  </div>
                                  <div class="mt-3">
                                    <label for="editDescInput">Description</label>
                                    <textarea
                                      id="editDescInput"
                                      class="bg-secondary p-1 rounded form-control text-dark"
                                      title="max 280 characters"
                                    >${user.listings[i].description}</textarea>
                                  </div>
                                  <div class="mt-3">
                                    <label for="editImageInput"
                                      >Image Direct Link
                                      <span class="text-secondary"
                                        >(generate on
                                        <a href="https://postimages.org/"  target="_blank">PostImages.org</a
                                        >)</span
                                      ></label
                                    >
                                    <input
                                      id="editImageInput"
                                      class="bg-secondary p-1 rounded form-control text-dark"
                                      value="${user.listings[i].media[0]}"
                                      title="must be direct image link"
                                    />
                                  </div>
                                  <div class="col-12 col-sm-10 col-md-8 mt-3">
                                    <label for="editTagsInput"
                                      >Tags
                                      <span class="text-secondary"
                                        >(separated by comma, eg. "Pearl, Ring")</span
                                      ></label
                                    >
                                  </div>
                                  <div class="modal-footer mt-4 pb-0">
                                    <button type="button" class="btn btn-dark border border-danger text-danger" data-bs-dismiss="modal">Close</button>
                                    <button id="editFormButton" type="submit" for="editForm" class="btn btn-primary border border-secondary text-secondary" value="${user.listings[i].id}">Save changes</button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>`
                    : ``
                }
                </div>
              </div>
              <div class="name-and-title ps-2 d-flex">
                <div class="d-flex align-items-center text-secondary">
                  <a
                    href="./profile.html?name=${user.name}"
                    class="text-decoration-none d-flex align-items-center"
                  >
                  ${
                    user.avatar !== ""
                      ? `<img src="${user.avatar}" class="profile-images rounded-circle" onerror="this.src='./assets/icons/profile-icon.png'">`
                      : `<img src="./assets/icons/profile-icon.png" class="profile-images rounded-circle">`
                  }
                  <h2 id="userName" class="h3 m-0 ms-2 me-1 fs-4">
                    ${user.name}
                  </h2>
                  </a>
                </div>
                <a href="./listing.html?id=${user.listings[i].id}" class="text-light text-decoration-none ms-1 my-2 fs-4">| ${user.listings[i].title}</a>
              </div>
              ${
                user.listings[i].media[0]
                  ? `<a href="./listing.html?id=${user.listings[i].id}"><div
                        class="listings-images mt-2 w-100 overflow-hidden position-relative"
                    >
                        <img
                            src="${user.listings[i].media[0]}"
                            class="position-absolute bottom-0 text-secondary"
                            onerror="this.parentElement.remove()"
                        />
                    </div></a>`
                  : ``
              }
              ${
                user.listings[i].description
                  ? `<div class="listings-descriptions ms-3 mx-2 mt-2">
                        ${user.listings[i].description}
                    </div>`
                  : ``
              }
              <div class="text-secondary mx-2 mt-2 row justify-content-start">
              ${
                new Date(user.listings[i].endsAt) > new Date()
                  ? `<div class="dates-end p-0 col">- Ends: ${formatDate(new Date(user.listings[i].endsAt))}</div>`
                  : `<div class="dates-end text-danger p-0 col">- Ends: ${formatDate(new Date(user.listings[i].endsAt))}</div>`
              }
              </div>
            </div>
        `;
    if (i === 50) {
      break;
    }
  }
}