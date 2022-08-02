var eventsList = document.getElementById('eventsList')
var eventTemplate = document.getElementById('eventTemplate').content

var dateInput = document.querySelector(".dateInput")
var categorySel = document.getElementById("categorySelect")
var typeSel = document.getElementById("typeSel")
var nameSelect = document.getElementById("nameSelect")
var filterBtn = document.getElementById("filterBtn")

var moreBtn = document.getElementById('moreBtn')
var searchInput = document.getElementById('searchInput')
var searchImg = document.getElementById('searchImg')
var limit = 3
let pageNumber = 1
// (page-1)*limit, limit
const API = 'https://pressaback.herokuapp.com'
// const API = 'http://localhost:7000'

async function getData(name) {
    try {
        // let res = await fetch(`${API}/${name}`)
        let res = await fetch( API + '/' + `${name}`)
        res = await res.json()
        return res
    } catch (error) {
        console.log(error.message);
    }
}
moreBtn.addEventListener('click',  (e) => {
    e.preventDefault()     
    pageNumber = pageNumber + 1
    firstRender()
})
function  renderPosts(posts) {
    if(!posts.length) {
        eventsList.textContent = 'event\'s not found'
        return
    }  


    eventsList.innerHTML = null
    posts = posts.slice(0, pageNumber*limit)
    posts.forEach(post => {
        let template = eventTemplate.cloneNode(true)
        let img = template.getElementById('eventImg')
        let eventTitle = template.getElementById('eventTitle')
        let evSpeker = template.getElementById('evSpeker')
        let evDate = template.getElementById('evDate')
        let evType = template.getElementById('evType')
        let evJob = template.getElementById('evJob')
        let evTime = template.getElementById('evTime')
        let evViews = template.getElementById('evViews')
        let typeImg = template.getElementById('typeImg')

        let divCard = template.getElementById('events__card')
        divCard.dataset.postid = post.posts_id
        divCard.dataset.postcategory = post.categories

        eventTitle.textContent = post.postTitle
        evSpeker.textContent = post.speaker
        eventTitle.textContent = post.posttitle
        evDate.textContent = post.date_at
        evType.textContent = post.type
        evJob.textContent = post.job
        evTime.textContent = post.time
        evViews.textContent = post.view
        if(post.type == 'online') {
            typeImg.setAttribute('src', '../Img/online.png')
        } else  typeImg.setAttribute('src', '../Img/offline.png')
        img.setAttribute('src', API + '/' + post.images )
        if(post.images.includes('picsum')) {
            img.setAttribute('src',  post.images )
        }

        divCard.onclick = (event) =>  {
            localStorage.removeItem('postId')
            localStorage.removeItem('postCategory')
            localStorage.setItem('postId', divCard.dataset.postid)
            localStorage.setItem('postCategory', divCard.dataset.postcategory)
             window.location.replace('singlePage.html')
        }



        eventsList.append(template)
    });
}

function dateFormat(inputDate) {
    const date = new Date(inputDate);

    var day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();    
    if(month < 10) month = `0${month}` 
    if(day < 10) day = `0${day}` 
    let myDate = `${day}/${month}/${year}`
    return myDate
}


async function rednerSelect () {
    let posts = await getData('posts')
    posts = posts.data
    posts.forEach(post => {
        var opt = document.createElement('option')
        opt.value = post.speaker
        opt.innerHTML = post.speaker
        nameSelect.append(opt)
        opt.o
        nameSelect.appendChild(opt)
    })
}
rednerSelect()

async function firstRender(){
    posts = await getData('posts')
    users = await getData('users')
    posts = posts.data
    // rednerSelect(posts)
    renderPosts(posts)
}
firstRender()


searchImg.addEventListener('click', async (e) => {
        let posts = await getData('posts')
        posts = posts.data
        let arr = []
        posts.forEach(x => {
            if(x.posttitle.toLowerCase().includes(searchInput.value.trim().toLowerCase())) arr.push(x)
            
        })
        renderPosts(arr)
})

searchInput.addEventListener('keyup',  async (e) => {
    if(e.code === 'Enter') {
        let posts = await getData('posts')
        posts = posts.data
        let arr = []
        posts.forEach(x => {
            if(x.posttitle.toLowerCase().includes(searchInput.value.trim().toLowerCase())) arr.push(x)
            
        })
        renderPosts(arr)
    }
})


filterBtn.addEventListener('click', async (e) => {
    let posts = await getData('posts')
        posts = posts.data
        let arr = []
        posts.forEach(x => {
            if(x.subcategory == categorySel.value && x.type == typeSel.value && x.speaker == nameSelect.value && dateFormat(dateInput.value) == x.date_at) {
                arr.push(x)
            } 
        })
        renderPosts(arr)
})



