import {inputEl} from "./index";
import axios from 'axios';



export class PixabayApi {
     #BASE_URL = 'https://pixabay.com/api/?key=34824260-e95f578da3e246504fd89f51b';

     page = 1;


        async fetchImages() {
            try{
             const response =  await  axios.get(`${this.#BASE_URL}&q=${inputEl.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
            
            const data = response.data;
                 console.log(data);
                 return data;
            }
            catch(error){
                throw error;
                console.log(error);
            }
            }
      }
    
    
 

