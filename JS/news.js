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
        <li onclick="loadNewsList('${news.category_id}')">${news.category_name}</li>
        `;
        categoryContainer.appendChild(catagoryList)
    })
};
const loadNewsList = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsList(data.data))
}

const displayNewsList = newsList => {
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
                            
                            <label onclick="loadNewsDetail('${news._id}')" for="my-modal-6" class="btn modal-button">News Details</label>
                        </div>
                    </div>
                
        `
        newsListDetail.appendChild(newsDiv)
    })
}

const loadNewsDetail = (detail) => {
    const url = `https://openapi.programming-hero.com/api/news/${detail}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetail(data.data[0]))
};

const displayNewsDetail = newsDetail => {
    console.log(newsDetail)
    const modalTitle = document.getElementById('news-title')
    modalTitle.innerText = newsDetail.title;
    const modalDetail = document.getElementById('news-details')
    modalDetail.innerHTML = `<img src="${newsDetail.image_url}"/>
    <p>${newsDetail.details}</p>`


}

loadCategory();
