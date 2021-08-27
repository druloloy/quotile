import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/scss/Main.scss';

// Redirect the page to much secured protocol on page load
function redirectHTTPS(){
  const protocol = window.location.protocol;
  const domain = window.location.domain;

  console.log(protocol, typeof protocol, domain, typeof domain);
  if(protocol!=="https:" && domain!==undefined) window.location = 'https://'+ domain;
  else console.log("DEVELOPMENT MODE") // dev mode
}
window.addEventListener('load', redirectHTTPS);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
