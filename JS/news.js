const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}

const displayCategory = data => {
    const categoryContainer = document.getElementById('category-container');
    data.forEach(news => {

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
        .catch(error => console.log(error))
}

const displayNewsList = newsList => {
    // Loader
    toggleLoader(true);
    console.log(newsList)
    // category
    const catagory = document.getElementById('catagory');
    catagory.innerHTML = `<h2>${newsList.length} items found for this category</h2>`

    // array sorting
    // newsList.sort(function () { return newsList.total_view - newsList.total_view });
    // const sorting = newsList.total_view - newsList.total_view;
    // console.log(sorting)


    const newsListDetail = document.getElementById('news-list');
    newsListDetail.textContent = '';

    newsList.sort(function (a, b) {
        return b.total_view - a.total_view
    })
    newsList.forEach(news => {


        const newsDiv = document.createElement('div');
        newsDiv.classList.add('flex')
        newsDiv.classList.add('mt-4')

        newsDiv.innerHTML = `<div class="card lg:card-side bg-base-100 shadow-xl my-4">
                            <figure><img class="" src="${news.thumbnail_url}" alt="Album"></figure>
                    <div class="card-body">
                            <h2 class="card-title">${news.title.length > 80 ? news.title.slice(0, 100) + '...' : news.title}</h2>
                            <p>${news.details.slice(0, 315)}...</p>
                       
                        <div class="card-actions flex">
                            <img class="w-1/12 rounded-full" src="${news.author.img}" alt="Album">
                            <p>${news.author.name ? news.author.name : "No author name found"}</p>
                            <p><i class="fa-solid fa-eye"></i>${news.total_view ? news.total_view : "No view number found"}</p>
                            <label onclick="loadNewsDetail('${news._id}')" for="my-modal-6" class="btn modal-button">News Details</label>
                        </div>
                    </div>
                    </div>
                
        `
        newsListDetail.appendChild(newsDiv)
    })
    // stop loader
    toggleLoader(false);
}

const loadNewsDetail = (detail) => {
    const url = `https://openapi.programming-hero.com/api/news/${detail}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetail(data.data[0]))
        .catch(error => console.log(error))
};

const displayNewsDetail = newsDetail => {

    const modalTitle = document.getElementById('news-title')
    modalTitle.innerText = newsDetail.title;
    const modalDetail = document.getElementById('news-details')
    modalDetail.innerHTML = `<img src="${newsDetail.image_url}"/>
    <p>${newsDetail.details}</p>`


}

const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    }
    else {
        loaderSection.classList.add('hidden')
    }
}

loadCategory();
