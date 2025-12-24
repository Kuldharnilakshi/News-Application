const API_KEY = "7ad7c8887a35b75a741e4dec0f6c8c7a"; // Put your GNews API key here
let page = 1;
let category = "general";

// Fetch news
function fetchNews() {
  const url = `https://gnews.io/api/v4/top-headlines?topic=${category}&lang=en&page=${page}&max=8&apikey=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayNews(data.articles);
      document.getElementById("page-num").innerText = page;
    })
    .catch(err => console.log(err));
}

// Display news
function displayNews(articles) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  if (!articles || articles.length === 0) {
    container.innerHTML = "<p>No news found</p>";
    return;
  }

  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${article.image ? article.image : 'https://via.placeholder.com/400x200'}">
      <div class="card-content">
        <p class="source">${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}</p>
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More →</a>
      </div>
    `;

    container.appendChild(card);
  });
}

// Pagination
function nextPage() {
  page++;
  fetchNews();
}
function prevPage() {
  if (page > 1) page--;
  fetchNews();
}

// Category change
function changeCategory(cat) {
  category = cat;
  page = 1;
  fetchNews();
  // Active button highlight
  document.querySelectorAll(".categories button").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.categories button[onclick="changeCategory('${cat}')"]`).classList.add("active");
}

// Search function
function searchNews() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    page = 1;
    fetchNews();
    return;
  }

  const url = `https://gnews.io/api/v4/top-headlines?lang=en&q=${query}&page=${page}&max=8&apikey=${API_KEY}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayNews(data.articles);
      document.getElementById("page-num").innerText = page;
    })
    .catch(err => console.log(err));
}

// Dark mode toggle
const darkModeCheckbox = document.getElementById("darkModeCheckbox");
darkModeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

// Load initial news
fetchNews();
