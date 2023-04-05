export const createImageMarkup =  (data)=> {

    const markup =  data.hits.map((image)=> {
       
   
       return `<div class="photo-card">
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
   
   
   
   }).join("");
   
    return markup;
   
   }