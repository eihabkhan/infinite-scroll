const postsContainer = document.getElementById("posts-container");
const loading = document.getElementById("loader");
const filter = document.getElementById("filter");

let limit = 5
let page = 1

// Fetch posts from API
async function getPosts() {
    return await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then(res => res.json())
            .then(data => data)
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts()
    posts.forEach(post => {

        const postElement = document.createElement("div")
        postElement.classList.add("post")
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        </div>
        `;
        postsContainer.appendChild(postElement)
    })
}

function showLoading() {
    loading.classList.add("show")
    setTimeout(() => {
        loading.classList.remove("show")
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post")
    posts.forEach(post => {
        const title = post.querySelector(".post-title").innerText.toUpperCase()
        const body = post.querySelector(".post-body").innerText.toUpperCase()

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = "flex"            
        } else {
            post.style.display = "none"
        }
    })
    
}

showPosts();

// Event Listeners
addEventListener("scroll", () => {
    const {scrollTop, scrollHeight, clientHeight} =  document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
})


filter.addEventListener("input", filterPosts)