/**
 * NOTES:
 * ERROR - CANNOT READ PROPERTY OF [0] APP.JS LINE 70
 * WARNING - USE useCallback() for setData() and fetchData.
 */


 import React, { useState, useEffect } from 'react';
 import QuoteBox from './components/QuoteBox';
 import Controls from './components/Controls'
 // services
 
 // fetch data
 import { fetchQuote } from './services/fetchQuote';
 import axios from 'axios';
 
 function App() {
     const [ result, setResult ] = useState({});
 
     const [ isDataLoaded, setIsDataLoaded ] = useState(false);
     const [ willRefresh, setWillRefresh ] = useState(true); 
 
   // Fetch Data from the server
   const fetchData = async () => {
     const API_URL = 'http://api.quotable.io/random';
     if(willRefresh){
       let data = await axios
                 .get(API_URL)
                 .then(res=>res)
                 .catch(error=>error);
       setIsDataLoaded(true);
       return setResult(data); 
     }
   }
 
   // handle incoming data
   // const handleData = (rawData) => {
   //   let data = rawData;
 
   //   if(data?.status < 200 || 
   //     data?.status >= 400 || 
   //     data?.error || 
   //     data === undefined) return setIsDataLoaded(false);
 
   //   setIsDataLoaded(true);
   //   return data;
   // }
 
   // Set fetched data to te state
   // const setData = () => {
   //   const quoteData = handleData(result);
 
   //   if(isDataLoaded){
   //     setQuote(quoteData);
   //   }
 
   // }
   // set willRefresh to true to re-render the page
   const refreshQuote = () => {
     return setWillRefresh(true);
   }
 
   useEffect(()=>{
 
       fetchData(); // start fetching
       setWillRefresh(false);
 
       return;
   }, [willRefresh, isDataLoaded])
 
 
   return (
     <div >
       <QuoteBox quote={result.datayy}/>
       <Controls refreshQuote={refreshQuote}/>
     </div>
   )
 }
 
 export default App
 