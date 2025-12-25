let page = 1;
let category = "general";
let query = "";

function fetchNews() {
  const url = `/.netlify/functions/fetch-news?category=${category}&page=${page}&query=${query}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayNews(data.articles);
      document.getElementById("page-num").innerText = page;
    })
    .catch(err => console.log(err));
}

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
      <img src="${article.image || 'https://via.placeholder.com/400x200'}">
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

function nextPage() {
  page++;
  fetchNews();
}

function prevPage() {
  if (page > 1) page--;
  fetchNews();
}

function changeCategory(cat) {
  category = cat;
  page = 1;
  fetchNews();

  document.querySelectorAll(".categories button")
    .forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

function searchNews() {
  query = document.getElementById("searchInput").value.trim();
  page = 1;
  fetchNews();
}

document.getElementById("darkModeCheckbox")
  .addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });

fetchNews();
