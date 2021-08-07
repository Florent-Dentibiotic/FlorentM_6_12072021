const contactModal = document.querySelector('.contact__modal');
const openModal = document.querySelector('.open__modal');
const quitModal = document.querySelector('.quit__modal');
const photoModal = document.querySelector('.photos__modal');
const quitPhotoModal = document.querySelector('.quit__photo__modal');
const mediaDiv = document.querySelector('.media');
const previousMedia = document.querySelector('.fa-chevron-left');
const nextMedia = document.querySelector('.fa-chevron-right');

function closeContactModal(){contactModal.style.display = "none";}

openModal.addEventListener('click', function launchModal(){contactModal.style.display = "block";});
quitModal.addEventListener('click', closeContactModal);

// PHOTO MODAL EVENT LISTENER
quitPhotoModal.addEventListener('click', closePhotoModal);
previousMedia.addEventListener('click', launchPreviousMedia);
nextMedia.addEventListener('click', launchNextMedia);
document.addEventListener('keydown', event => {
    if(event.code == "ArrowRight"){
        if(photoModal.style.display == 'block'){
            launchNextMedia();
        }
    } else if (event.code == "ArrowLeft"){
        if(photoModal.style.display == 'block'){
            launchPreviousMedia();
        }
    } else if (event.code == "Escape"){
        if(photoModal.style.display == 'block'){
            closePhotoModal();
        }
        if(contactModal.style.display == "block"){
            closeContactModal();
        }
    } 
});


// PHOTO MODAL OPEN/QUIT/CHANGE MEDIA
function openPhotosModal(){
    if(mediaDiv.childNodes[0].firstChild != null && (mediaDiv.childNodes[0].firstChild.localName == "img" || mediaDiv.childNodes[0].firstChild.localName == "video")){
        photoModal.firstElementChild.removeChild(photoModal.firstElementChild.lastElementChild);
    }
    photoModal.style.display = 'block';
    mediaDiv.innerHTML = this.outerHTML;
    let newH3 = document.createElement('h3');
    photoModal.firstElementChild.appendChild(newH3);
    newH3.textContent = this.parentElement.children[1].firstChild.innerHTML;
    if(mediaDiv.firstChild.firstChild.localName == "video"){
        mediaDiv.firstChild.firstChild.setAttribute("controls", "");
    }
}

function closePhotoModal(){
    photoModal.style.display = 'none';
}

function launchPreviousMedia(){
    launchMedia(-1);
}

function launchNextMedia(){
    launchMedia(1);
}

function launchMedia(direction){
    if(mediaDiv.firstChild.firstChild.localName == "video"){
        mediaDiv.firstChild.firstChild.removeAttribute("controls", "");
    }
    let mediaIndex = allMedias.findIndex(element => element.outerHTML == mediaDiv.innerHTML)
    let nextMedia = mediaIndex + direction;
    if(nextMedia < allMedias.length && nextMedia > 0){
        mediaDiv.innerHTML = allMedias[nextMedia].outerHTML;
        photoModal.firstElementChild.lastChild.textContent = allMedias[nextMedia].parentElement.children[1].firstChild.innerHTML;
            if(mediaDiv.firstChild.firstChild.localName == "video"){
                mediaDiv.firstChild.firstChild.setAttribute("controls", "");
            }
    } else if(nextMedia >= 0 && nextMedia < allMedias.length){
        mediaDiv.innerHTML = allMedias[nextMedia].outerHTML;
        photoModal.firstElementChild.lastChild.textContent = allMedias[nextMedia].parentElement.children[1].firstChild.innerHTML;
            if(mediaDiv.firstChild.firstChild.localName == "video"){
                mediaDiv.firstChild.firstChild.setAttribute("controls", "");
            }
    } else {
        photoModal.style.display = 'none';
    }
}

function sendData(){
    let inputs = document.querySelectorAll("input");
    inputs.forEach(element => console.log(element.value));
}