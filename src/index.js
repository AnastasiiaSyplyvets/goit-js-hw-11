// const axios = require('axios/dist/browser/axios.cjs'); // browser
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


// import axios from 'axios';
// const axios = require('axios').default;

import Notiflix from 'notiflix';

import {PixabayApi} from "./smth";

const pixabayApi = new PixabayApi();

import {createImageMarkup} from "./markup";

let gallery = new SimpleLightbox('.gallery a', {captionsData: "alt", captionDelay: 250 });


const formEl = document.querySelector('.search-form');
export const inputEl = document.querySelector('input');
const searchBtnEl = document.querySelector('button');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.classList.add("is-hidden");


formEl.addEventListener('submit',  async (event)=>{
event.preventDefault();
        
let value = inputEl.value.trim();
        
pixabayApi.page = 1;  
if(!value){
    galleryEl.innerHTML = ``;
    
    return;
}


// Variant
try {
  const data = await pixabayApi.fetchImages(value);
  console.log(data)
  console.log(data.totalHits);

  if(data.hits.length === 0) {
    galleryEl.innerHTML = ``;
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  else if(data.hits.length > 0) {
    galleryEl.innerHTML = ``;
    
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    
    galleryEl.insertAdjacentHTML('beforeend', createImageMarkup(data));
    
    galleryEl.refresh();
    
    loadMoreBtn.classList.remove('is-hidden');
    
    if (data.totalHits === 0 || data.totalHits <= 40) {
      loadMoreBtn.classList.add('is-hidden');
      
      setTimeout((event) => {
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.')
      }, 1000)
    }
  }
} catch (err) {
  console.log(err);
}
// Variant End

  // pixabayApi.fetchImages(value).then(data => {
  //   console.log(data)
  // console.log(data.totalHits);

  // if(data.hits.length === 0) {
  //   galleryEl.innerHTML = ``;
  //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  // }
  
  
  
  // else if(data.hits.length >0) {
              
  //             galleryEl.innerHTML=``;
              
  //             Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
              
  //             galleryEl.insertAdjacentHTML('beforeend', createImageMarkup(data));
  //             galleryEl.refresh();
           
  //             loadMoreBtn.classList.remove('is-hidden');
  
  //             // if (data.totalHits <= pixabayApi.page * pixabayApi.perPage) {
  //             //   loadMoreBtn.classList.add('is-hidden');
  //             //   Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
  //             // }
  
  //              if (data.totalHits === 0 || data.totalHits <= 40 ) {
  
  //               loadMoreBtn.classList.add('is-hidden');
              
  //               setTimeout((event)=>{
  //               Notiflix.Notify.info('We are sorry, but you have reached the end of search results.')
  //             }, 1000)
                
                  
  //                 }
                  
  
  //             }

  // }).catch(err=> console.log(err))
  


  

 

})

loadMoreBtn.addEventListener('click', (e)=> {      
    pixabayApi.page += 1;

  pixabayApi.fetchImages().then(data => 
    {  
      
console.log(data.hits.length)

if(data.hits.length === 0) {
  Notiflix.Notify.info('We are sorry, but you have reached the end of search results.')
  loadMoreBtn.classList.add('is-hidden');
  return;
}

console.log(data.hits)

 if  (data.hits.length >0) {

  galleryEl.insertAdjacentHTML('beforeend', createImageMarkup(data));

  galleryEl.refresh();
  loadMoreBtn.classList.remove('is-hidden');
      
}
 


    // if (data.totalHits <= pixabayApi.page * pixabayApi.perPage) {
    //   loadMoreBtn.classList.add('is-hidden');
    //   Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    // }
      
    }).catch(err => {

      console.log(err)
      // Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    })
  }) 

  inputEl.addEventListener('input', () => {
    if (!inputEl.value.trim()) {
      galleryEl.innerHTML = '';
    }
    
    loadMoreBtn.classList.add('is-hidden');
  });