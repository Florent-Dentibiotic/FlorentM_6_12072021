// ID EXTRACTION
const url_id = window.location.search.slice(1);

// DOM ELEMENTS
const intro = document.querySelector('.intro');
const presentation = document.querySelector('.presentation');
const picture = document.querySelector('.intro__picture');
const photos = document.querySelector('.photos');
const likes__infos = document.querySelector('.likes');
const main = document.querySelector('main');
let totalLikes = 0;
const classifyOptions = document.querySelector('.classify__options');
let options = document.querySelectorAll('.options');
let thematicBreak = document.querySelectorAll('hr');
let chevron = document.querySelector('.chevron');
let optionsArray = Array.from(options);    
// radio elements for classification
let popularityClassification = optionsArray[0].children[0];
let dateClassification = optionsArray[1].children[0];
let titleClassification = optionsArray[2].children[0];
let photoPopularitySorted = [];
let photoDateSorted = [];
let photoTitleSorted = [];

// BTN FOR CLASSIFYING PICTURES
classifyOptions.addEventListener('mouseover', radioBtnVisible);
classifyOptions.addEventListener('mouseout', radioBtnInvisible);
//optionsArray.forEach(element => element.addEventListener('change', reloadPhotosSection));

function radioBtnVisible(){
    options.forEach(element => element.classList.replace("d-none", "d-block"));
    thematicBreak.forEach(element => element.classList.replace("d-none", "d-block"));
    chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
};

function radioBtnInvisible(){
    let optionsNotSelected = optionsArray.filter(element => element.children[0].checked != true);
    //let optionSelected = optionsArray.filter(element => element.children[0].checked == true);
    optionsNotSelected.forEach(element => element.classList.replace("d-block", "d-none"));
    thematicBreak.forEach(element => element.classList.replace("d-block", "d-none"));
    chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
}

function reloadPhotosSection(){
    const allArticles = document.querySelectorAll('.article');
    allArticles.forEach(element => element.remove());
    var fishEyeData = request.response;
    addPictures(fishEyeData);
}

//CALL FUNTION NEW ARTICLE WHEN LOAD
request.onload = function() {
    var fishEyeData = request.response;
    createIntro(fishEyeData);
    addPictures(fishEyeData);
  }


// FUNCTION TO CREATE A NEW INTRODUCTION OF THE SELECTED ARTIST
function createIntro(jsonObj) {
    //FINDING THE GOOD PHOTOGRAPHER WITH IS ID
    let photographes = jsonObj['photographers'];
    const found = photographes.findIndex(element => element.id == url_id);
    const thisPhotographe = photographes[found];

    //CREATING NEW ELEMENTS OF INTRO
    let newH1 = document.createElement('h1');
    presentation.appendChild(newH1);
    let newH2 = document.createElement('h2');
    presentation.appendChild(newH2);
    let newP = document.createElement('p');
    presentation.appendChild(newP);
    let newUl = document.createElement('ul');
    presentation.appendChild(newUl);

    // FOR EACH PHOTOGRAPHERS DISPLAYING ALL INFORMATIONS
    newH1.textContent = thisPhotographe.name;
    newH2.textContent = thisPhotographe.city + ', ' + thisPhotographe.country;
    newP.textContent = thisPhotographe.tagline;
    // FOR EACH TAGS A NEW LIST ELEMENT
    thisPhotographe.tags.forEach(element => {
        let newLi = document.createElement('li');
        newUl.appendChild(newLi);
        let newA = document.createElement('a');
        newLi.appendChild(newA);
        newA.textContent = "#" + element;
        newA.setAttribute("href", ('index.html?' + element));
    });
    //PHOTOGRAPHER PORTRAIT
    picture.setAttribute("src", ("./imgs/Sample Photos/Photographers ID Photos/" + thisPhotographe.portrait));
}

//FUNCTION TO ADD PICTURES OF THE SELECTED ARTIST
function addPictures(jsonObj){
    let media = jsonObj['media'];
    const foundPictures = media.filter(element => element.photographerId == url_id);
    foundPictures.sort((a,b) => b.likes - a.likes);
    

    //FINDING THE GOOD PHOTOGRAPHER WITH IS ID
    let photographes = jsonObj['photographers'];
    const found = photographes.findIndex(element => element.id == url_id);
    const thisPhotographe = photographes[found];

    //ADDING PHOTOS AND VIDEOS IN PHOTOGRAPHES PAGE
    for (var i = 0; i < foundPictures.length; i++) {

        let newArticle = document.createElement('article');
        photos.appendChild(newArticle);
        newArticle.classList.add('article');

        //IF ITS A VIDEO
        if(foundPictures[i].image === undefined){
            let newVideo = document.createElement('video');
            newArticle.appendChild(newVideo);
            let newSource = document.createElement('source');
            newVideo.appendChild(newSource);

            newVideo.setAttribute("controls", "");
            newSource.setAttribute("src", ("./imgs/Sample Photos/" + thisPhotographe.name + "/" + foundPictures[i].video));
            newSource.setAttribute("poster", ("./imgs/Sample Photos/" + thisPhotographe.name + "/" + foundPictures[i].poster));
            newSource.setAttribute("video", "video/mp4");
        //ELSE IF ITS A PHOTO
        } else {
            let newImage = document.createElement('img');
            newArticle.appendChild(newImage);
            newImage.setAttribute("src", ("./imgs/Sample Photos/" + thisPhotographe.name + "/" + foundPictures[i].image));
        }

        let newDiv = document.createElement('div');
        newArticle.appendChild(newDiv);
        let newH3 = document.createElement('h3');
        newDiv.appendChild(newH3);
        let newH3bis = document.createElement('h3');
        newDiv.appendChild(newH3bis);
        // FOR EACH PHOTOS DISPLAYING ALL INFORMATIONS
        newDiv.classList.add('img-label');
        newH3.textContent = foundPictures[i].title;
        newH3bis.textContent = foundPictures[i].likes + " ";

        // ADDING THE HEART FOR LIKES
        let newI = document.createElement('i');
        newH3bis.appendChild(newI);
        newI.classList.add('fas');
        newI.classList.add('fa-heart');
    }

    const allFas = document.querySelectorAll('.fa-heart');
    let hearts = Array.from(allFas);
    hearts.forEach(element => element.addEventListener("click", addALike));
    for(let i = 0; i < hearts.length; i++){
        let someLikes = parseInt(hearts[i].previousSibling.textContent, 10);
        totalLikes = totalLikes + someLikes;
    }

    // ADDING TOTAL OF LIKES
    let newP = document.createElement('p');
    likes__infos.appendChild(newP);
    let newPBis = document.createElement('p');
    likes__infos.appendChild(newPBis);
    newP.innerHTML = totalLikes + ' <i class="fas fa-heart"></i>';
    newPBis.textContent = thisPhotographe.price + '€ / jour';
}

function addALike(){
    let thisLikes = parseInt(this.previousSibling.textContent, 10);
    let addLike = thisLikes + 1;
    this.previousSibling.textContent = addLike + " ";

    var fishEyeMedia = request.response['media'];
    const findMediaIndex = fishEyeMedia.findIndex(element => element.title == this.parentElement.parentElement.firstChild.textContent);
    fishEyeMedia[findMediaIndex].likes = addLike;
    let newLike = parseInt(likes__infos.firstElementChild.innerText) + 1;
    likes__infos.firstElementChild.innerHTML = newLike + ' <i class="fas fa-heart"></i>';
}

