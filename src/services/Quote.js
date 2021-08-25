import axios from 'axios';

let data = [];

async function fetchData(){
    const API_URL = `http://api.quotable.io/random`;
    return await axios.get(API_URL)
            .then(res=>res.data)
            .then(data=>data.results)
            .catch(e=>e);
}

const QuoteArray = data;




export { QuoteArray, fetchData };

