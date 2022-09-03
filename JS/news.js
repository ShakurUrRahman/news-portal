const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = data => {
    const categoryContainer = document.getElementById('category-container');
    data.forEach(news => {
        // console.log(news)
        const catagoryList = document.createElement('li');
        catagoryList.innerHTML = `
        <li onclick="loadNewsDetail('${news.category_id}')">${news.category_name}</li>
        `;
        categoryContainer.appendChild(catagoryList)
    })
};
const loadNewsDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
}

const displayNewsDetails = newsList => {
    console.log(newsList)
    const newsListDetail = document.getElementById('news-list');
    newsListDetail.textContent = '';
    newsList.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('flex')

        newsDiv.innerHTML = `
                    <figure><img class="" src="${news.thumbnail_url}" alt="Album"></figure>
                    <div class="card-body ">
                        <h2 class="card-title">${news.title}</h2>
                        <p>Click the button to listen on Spotiwhy app.</p>
                        
                        <div class="card-actions">
                        <img class="w-1/12 rounded-full" src="${news.author.img}" alt="Album">
                        <p>${news.author.name}</p>
                            <button onclick="loadDetail()" class="btn btn-primary">News Details</button>
                        </div>
                    </div>
                
        `
        newsListDetail.appendChild(newsDiv)
    })
}

loadDetail();
loadCategory();
