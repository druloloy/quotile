const axios = require('axios');

var result = {
    length: 0,
    status: 0,
    data: []    
}

 export const fetchQuote = ()=> new Promise( async (resolve, reject)=>{
    // Fetch
    const fetchResult = await axios.get('http://api.quotable.io/random')
                        .then(res=>res.data)
                        .catch(error=>reject(error));

    // Pass result to result.data
    if(!fetchResult) return Object.assign({}, {status: 500}, result);

    result = {
        length: fetchResult.length || 0,
        status: 200,
        data: [fetchResult] || [{}]
    }
    resolve(result);
});

export const getResult=_=>result;