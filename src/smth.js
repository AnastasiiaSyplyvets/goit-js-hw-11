import {inputEl} from "./index";

export class PixabayApi {
     #BASE_URL = 'https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b';

     page = 1;

     

    fetchImages() {
return fetch(`${this.#BASE_URL}&q=${inputEl.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
.then(res => {
     if(!res.ok)
     {
    throw new Error(res.status)
}
return res.json();
})
    }};