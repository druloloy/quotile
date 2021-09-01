import React, { useState, useEffect, useCallback } from 'react';
import QuoteBox from './components/QuoteBox';
import Controls from './components/Controls'

import $ from 'jquery';
import axios from 'axios';


import 'react-toastify/dist/ReactToastify.css';

const API_URL = `http://quotable.io/quotes?limit=150`;


 function App() {

  const [ isLoaded, setLoadState ] = useState(false);
  const [ quoteData, setQuoteData ] = useState([]);
  const [ currQuote, setCurrQuote ] = useState({})
  const [ currCount, setCurrentCount ] = useState(0);


  // resize texts if the current quote length is greater than 150 chars
  function resizeText(length){
    if( length > 150){
      $("#text").css("font-size", "1.4rem");
      $("#author").css("font-size", "1rem");
      $("#watermark").css("font-size", "1rem");
     
    }else{
      
      $("#text").css("font-size", "1.8rem");
      $("#author").css("font-size", "1.4rem");
      $("#watermark").css("font-size", "1rem");
    }
  }

  // fetch from third-party API and load to our directory.
  const fetch =  useCallback(async(url, source =  axios.CancelToken.source())=>{
    setLoadState(false);
    await axios.get(url, {cancelToken: source.token})
        .then(res=>res.data.results)
        .then(data=>{
          setCurrentCount(data.length+currCount);
          setQuoteData(data); 
          setLoadState(true);
          
          source.cancel();
        })
        .catch(e=>{
          source.cancel()
        });
  },[currCount]);

  // get random quote from the current directory.
  const generateRandomQuote = useCallback(()=>{
    const rdm = Math.floor(Math.random()*currCount);
    const pickedQuote = quoteData[rdm];
    let currQuoteLength = pickedQuote?.content.length;

    // ANIMATE WATERMARK
    $('#watermark').animate({opacity: 0}, 500, function(){
      $(this).animate({opacity: 1}, 500)
    });

    // ANIMATE QUOTE TEXT
    let text = pickedQuote?.content || ""
    $('#text').animate({opacity: 0}, 500, function(){
      $(this).animate({opacity: 1}, 500)
      $(this).text(text);
    });

    // ANIMATE AUTHOR TEXT
    let author = pickedQuote?.author || "";
    $('#author').animate({opacity: 0}, 500, function(){
        $(this).animate({opacity: 1}, 500)
        $(this).text("— "+author);
    });

    // remove current quote from the main directory
    const filtered = quoteData.filter(q=>q._id!==pickedQuote._id);

    setCurrQuote(pickedQuote);
    setQuoteData(filtered); // set the filtered data
    setCurrentCount(filtered.length);

    setTimeout(() => {
      resizeText(currQuoteLength);
    }, 500);
  }, [quoteData, currCount]);



  // fetch onload
  useEffect(()=>{
    let axiosTokenSource = axios.CancelToken.source();
    if(!isLoaded){
      // TEMPLATE
      $("#watermark").text("");
      $("#text").text("...");
      $("#author").text("");
      // END TEMPLATE
      fetch(API_URL, axiosTokenSource); // FETCH
    }else{
      $("#watermark").text("QUOTILE");
    }
    return () => {
      axiosTokenSource.cancel();
    }
  },[isLoaded, fetch]) 


  useEffect(() => {
    if(currCount<1){
      setLoadState(false);
    }
  }, [currCount]); // reset if quoteData is empty

  // Run this when data is loaded
  useEffect(() => {
    generateRandomQuote();
  }, [isLoaded])
  
  return (
    <div className="main-frame">
      <QuoteBox generate={generateRandomQuote}/>
      <Controls quote={currQuote}/>
    </div>
    
  )
}
 
 export default App
 