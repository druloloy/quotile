import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/scss/Main.scss';

// Redirect the page to much secured protocol on page load
function redirectHTTPS(){
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  console.log(protocol, typeof protocol, hostname, typeof hostname);
  if(hostname==="localhost") console.log("DEVELOPMENT MODE") // dev mode
  else if(protocol!=="https:") window.location.assign('https://'+hostname); // prod mode
}
window.addEventListener('load', redirectHTTPS);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
