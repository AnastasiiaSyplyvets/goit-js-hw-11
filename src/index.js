const axios = require('axios/dist/browser/axios.cjs'); // browser
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm"
import axios from 'axios';

import Notiflix from 'notiflix';

import {PixabayApi} from "./smth";

const pixabayApi = new PixabayApi();


let gallery = new SimpleLightbox('.gallery a', {captionsData: "alt", captionDelay: 250 });


const formEl = document.querySelector('.search-form');
export const inputEl = document.querySelector('input');
const searchBtnEl = document.querySelector('button');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');




loadMoreBtn.classList.add("is-hidden");


    searchBtnEl.addEventListener('click', (event)=>{
        event.preventDefault();
        
        let value = inputEl.value.trim();
        
    
if(!value){
    galleryEl.innerHTML = ``;
    
    return;
}

 else if(inputEl.value.length === 0) {
    galleryEl.innerHTML = ``;
   
}

pixabayApi.fetchImages(value).then(data =>{
  console.log(data)
  console.log(data.totalHits);

  const createImageMarkup =(data)=> {
    data.hits.map((image)=> {
      

        galleryEl.innerHTML += `<div class="photo-card">
        <div class="gallery"><a href="${image.webformatURL}"><img  src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="300" height="200"/><a></div>
        <div class="info">
          <p class="info-item">
            <b>Likes: </b><span>${image.likes}</span>
          </p>
          <p class="info-item">
            <b>Views:</b><span> ${image.views}</span>
          </p>
          <p class="info-item">
            <b>Comments: </b><span>${image.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads: </b><span>${image.downloads}</span>
          </p>
        </div>
      </div>`;



    })

    return galleryEl;
}


if(data.hits.length === 0) {
    
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

else if(data.hits.length >0) {
            
            galleryEl.innerHTML=``;
            
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            
            createImageMarkup(data);
            gallery.on('show.simplelightbox', function () {
              // Do something…
            });

         
            loadMoreBtn.classList.remove('is-hidden');

            console.log(data.totalHits.length)

            }
           

  })})
  

  loadMoreBtn.addEventListener('click', (e)=> {      
    pixabayApi.page += 1;

    pixabayApi.fetchImages().then(data => 
    {  
      

      data.hits.map((image)=> {

      

        galleryEl.innerHTML += `<div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="300" height="200"/>
        <div class="info">
          <p class="info-item">
            <b>Likes: </b><span>${image.likes}</span>
          </p>
          <p class="info-item">
            <b>Views:</b><span> ${image.views}</span>
          </p>
          <p class="info-item">
            <b>Comments: </b><span>${image.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads: </b><span>${image.downloads}</span>
          </p>
        </div>
      </div>`;

    return galleryEl;
    })

    if(data.totalHits === 0) {

      Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
      
      loadMoreBtn.classList.add('is-hidden');
        
        }
        
      
    }).catch(err => {
      Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    })
  }) 