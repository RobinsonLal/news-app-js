// api from newsapi.org
const API_KEY = "8f34a5c4b4254a0d82a979e564fe68fb";
const url = "https://newsapi.org/v2/everything?q="


// when load event is called then the following callback function can be called
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload()
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    bindData(data.articles)
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container')
    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-image')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDescription = cardClone.querySelector('#news-description')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} • ${date}`

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank"); // with _blank it opens in new tab
    })
}

let curSelectedtNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id)
    curSelectedtNav?.classList.remove('active')
    curSelectedtNav = navItem;
    curSelectedtNav.classList.add('active')
}

const searchButton = document.getElementById("search-button")
const searchText = document.getElementById("search-text")

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedtNav?.classList.remove("active");
    curSelectedtNav = null;
})