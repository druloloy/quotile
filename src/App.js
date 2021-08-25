/**
 * Suggestions:
 * - Do the one quote fetch per click. Problem: May be slower if have poor connection. Deliverable within a day.
 * - Use Redux. Problem: Inappropriate / Overkill for a one page, one goal application. Longer development process.
*/

import React, { useState, useEffect } from 'react';
import QuoteBox from './components/QuoteBox';
import Controls from './components/Controls'

import $ from 'jquery';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = `http://quotable.io/quotes?limit=150?`;
 function App() {
  const [ isLoaded, setLoadState ] = useState(false);
  const [ quoteData, setQuoteData ] = useState([]);
  const [ currQuote, setCurrQuote ] = useState({})
  const [ currCount, setCurrentCount ] = useState(0);


  function resizeBox(length){
    if( length > 175){
      $("#text").css("font-size", "1.4rem");
      $("#author").css("font-size", "1rem");
      $("#watermark").css("font-size", "1rem");
     
    }else{
      
      $("#text").css("font-size", "1.8rem");
      $("#author").css("font-size", "1.4rem");
      $("#watermark").css("font-size", "1rem");
    }
  }


  async function fetch(url, source =  axios.CancelToken.source()){
    setLoadState(false);
    await axios.get(url, {cancelToken: source.token})
        .then(res=>res.data.results)
        .then(data=>{
          setQuoteData(data); 
          setLoadState(true);
          setCurrentCount(data.length+currCount);
          source.cancel();
        })
        .catch(e=>{
          console.log(e)
          source.cancel()
        });
  }

  function generateRandomQuote(){
    const rdm = Math.floor(Math.random()*quoteData.length);
    const pickedQuote = quoteData[rdm];
    let currQuoteLength = pickedQuote?.content.length;

    // ANIMATE WATERMARK
    $('#watermark').animate({opacity: 0}, 500, function(){
      $(this).animate({opacity: 1}, 500)
    });

    // ANIMATE QUOTE TEXT
    $('#text').animate({opacity: 0}, 500, function(){
      $(this).animate({opacity: 1}, 500)
      $(this).text(pickedQuote?.content)
    });

    // ANIMATE AUTHOR TEXT
    $('#author').animate({opacity: 0}, 500, function(){
        $(this).animate({opacity: 1}, 500)
        $(this).text(pickedQuote?.author)
    });

    const filtered = quoteData.filter(q=>q._id!=pickedQuote._id);

    setCurrQuote(pickedQuote);
    setQuoteData(filtered);
    setCurrentCount(filtered.length);

    setTimeout(() => {
      resizeBox(currQuoteLength);
    }, 500);

  }













  useEffect(() => {
    if(currCount<1){
      setLoadState(false);
    }
  }, [currCount]); // reset if quoteData is empty

  useEffect(()=>{
    let axiosTokenSource = axios.CancelToken.source();
    if(!isLoaded){
        fetch(API_URL, axiosTokenSource);
    }
    return () => {
      axiosTokenSource.cancel();
    }
  },[currCount, isLoaded]) // fetch onload

  useEffect(() => {
    generateRandomQuote();
  }, [isLoaded])
  return (
    <div className="main-frame">
      
      <QuoteBox generate={generateRandomQuote}/>
      <Controls quote={currQuote}/>
      
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeButton="false"
      />
    </div>
  )
}
 
 export default App
 